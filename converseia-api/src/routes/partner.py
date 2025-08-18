from flask import Blueprint, request, jsonify
from src.models.partner import db, Partner, Sale, Commission, PaymentMethod
from src.models.user import User
from datetime import datetime
import json
import stripe
import os

partner_bp = Blueprint('partner', __name__)

# Configurar Stripe (adicione sua chave secreta nas variáveis de ambiente)
stripe.api_key = os.environ.get('STRIPE_SECRET_KEY', 'sk_test_...')

@partner_bp.route('/partners', methods=['POST'])
def create_partner():
    """Criar novo parceiro"""
    try:
        data = request.get_json()
        
        # Verificar se email já existe
        existing_partner = Partner.query.filter_by(email=data['email']).first()
        if existing_partner:
            return jsonify({'error': 'Email já cadastrado'}), 400
        
        partner = Partner(
            name=data['name'],
            email=data['email'],
            company_name=data['company_name'],
            company_type=data['company_type'],
            phone=data.get('phone', '')
        )
        
        db.session.add(partner)
        db.session.commit()
        
        return jsonify({
            'id': partner.id,
            'name': partner.name,
            'email': partner.email,
            'company_name': partner.company_name,
            'company_type': partner.company_type,
            'created_at': partner.created_at.isoformat()
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@partner_bp.route('/partners/<int:partner_id>', methods=['GET'])
def get_partner(partner_id):
    """Obter dados do parceiro"""
    try:
        partner = Partner.query.get_or_404(partner_id)
        
        # Calcular estatísticas
        total_sales = db.session.query(db.func.sum(Sale.amount)).filter_by(
            partner_id=partner_id, status='confirmed'
        ).scalar() or 0
        
        total_commissions = db.session.query(db.func.sum(Commission.amount)).filter_by(
            partner_id=partner_id, status='paid'
        ).scalar() or 0
        
        pending_commissions = db.session.query(db.func.sum(Commission.amount)).filter_by(
            partner_id=partner_id, status='pending'
        ).scalar() or 0
        
        return jsonify({
            'id': partner.id,
            'name': partner.name,
            'email': partner.email,
            'company_name': partner.company_name,
            'company_type': partner.company_type,
            'phone': partner.phone,
            'created_at': partner.created_at.isoformat(),
            'stats': {
                'total_sales': total_sales,
                'total_commissions': total_commissions,
                'pending_commissions': pending_commissions,
                'sales_count': len(partner.sales)
            }
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@partner_bp.route('/partners/<int:partner_id>/sales', methods=['POST'])
def create_sale(partner_id):
    """Registrar nova venda"""
    try:
        data = request.get_json()
        
        sale = Sale(
            partner_id=partner_id,
            client_name=data['client_name'],
            client_email=data['client_email'],
            amount=data['amount'],
            plan_type=data['plan_type']
        )
        
        db.session.add(sale)
        db.session.commit()
        
        return jsonify({
            'id': sale.id,
            'client_name': sale.client_name,
            'amount': sale.amount,
            'plan_type': sale.plan_type,
            'status': sale.status,
            'created_at': sale.created_at.isoformat()
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@partner_bp.route('/partners/<int:partner_id>/sales', methods=['GET'])
def get_partner_sales(partner_id):
    """Listar vendas do parceiro"""
    try:
        sales = Sale.query.filter_by(partner_id=partner_id).order_by(Sale.created_at.desc()).all()
        
        return jsonify([{
            'id': sale.id,
            'client_name': sale.client_name,
            'client_email': sale.client_email,
            'amount': sale.amount,
            'plan_type': sale.plan_type,
            'status': sale.status,
            'created_at': sale.created_at.isoformat(),
            'confirmed_at': sale.confirmed_at.isoformat() if sale.confirmed_at else None
        } for sale in sales])
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@partner_bp.route('/sales/<int:sale_id>/confirm', methods=['POST'])
def confirm_sale(sale_id):
    """Confirmar venda e gerar comissões"""
    try:
        sale = Sale.query.get_or_404(sale_id)
        
        if sale.status == 'confirmed':
            return jsonify({'error': 'Venda já confirmada'}), 400
        
        sale.status = 'confirmed'
        sale.confirmed_at = datetime.utcnow()
        
        # Verificar faturamento total do parceiro para determinar percentual
        partner = Partner.query.get(sale.partner_id)
        total_revenue = db.session.query(db.func.sum(Sale.amount)).filter_by(
            partner_id=sale.partner_id, status='confirmed'
        ).scalar() or 0
        
        # Determinar percentual de comissão (30% padrão, 50% após R$50.000)
        commission_rate = 0.50 if total_revenue >= 50000 else 0.35
        
        # Gerar comissão (30% ou 50% dependendo do faturamento)
        commission = Commission(
            partner_id=sale.partner_id,
            sale_id=sale.id,
            amount=sale.amount * commission_rate,
            commission_type='standard'
        )
        
        db.session.add(commission)
        db.session.commit()
        
        return jsonify({
            'message': 'Venda confirmada e comissão gerada',
            'commission_rate': f'{commission_rate * 100}%',
            'commission_amount': sale.amount * commission_rate
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@partner_bp.route('/partners/<int:partner_id>/commissions', methods=['GET'])
def get_partner_commissions(partner_id):
    """Listar comissões do parceiro"""
    try:
        commissions = Commission.query.filter_by(partner_id=partner_id).order_by(Commission.created_at.desc()).all()
        
        return jsonify([{
            'id': commission.id,
            'sale_id': commission.sale_id,
            'amount': commission.amount,
            'commission_type': commission.commission_type,
            'status': commission.status,
            'created_at': commission.created_at.isoformat(),
            'paid_at': commission.paid_at.isoformat() if commission.paid_at else None
        } for commission in commissions])
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@partner_bp.route('/partners/<int:partner_id>/payment-methods', methods=['POST'])
def add_payment_method(partner_id):
    """Adicionar método de pagamento"""
    try:
        data = request.get_json()
        
        # Se for método padrão, remover padrão dos outros
        if data.get('is_default', False):
            PaymentMethod.query.filter_by(partner_id=partner_id, is_default=True).update({'is_default': False})
        
        payment_method = PaymentMethod(
            partner_id=partner_id,
            method_type=data['method_type'],
            details=json.dumps(data['details']),
            is_default=data.get('is_default', False)
        )
        
        db.session.add(payment_method)
        db.session.commit()
        
        return jsonify({
            'id': payment_method.id,
            'method_type': payment_method.method_type,
            'is_default': payment_method.is_default,
            'created_at': payment_method.created_at.isoformat()
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@partner_bp.route('/partners/<int:partner_id>/payment-methods', methods=['GET'])
def get_payment_methods(partner_id):
    """Listar métodos de pagamento do parceiro"""
    try:
        methods = PaymentMethod.query.filter_by(partner_id=partner_id).all()
        
        return jsonify([{
            'id': method.id,
            'method_type': method.method_type,
            'details': json.loads(method.details),
            'is_default': method.is_default,
            'created_at': method.created_at.isoformat()
        } for method in methods])
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@partner_bp.route('/partners/<int:partner_id>/payment-methods/<int:method_id>', methods=['DELETE'])
def delete_payment_method(partner_id, method_id):
    """Remover método de pagamento"""
    try:
        method = PaymentMethod.query.filter_by(id=method_id, partner_id=partner_id).first_or_404()
        
        db.session.delete(method)
        db.session.commit()
        
        return jsonify({'message': 'Método de pagamento removido'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@partner_bp.route('/partners/<int:partner_id>/payment-methods/<int:method_id>/default', methods=['PUT'])
def set_default_payment_method(partner_id, method_id):
    """Definir método de pagamento como padrão"""
    try:
        # Remover padrão de todos os métodos
        PaymentMethod.query.filter_by(partner_id=partner_id).update({'is_default': False})
        
        # Definir novo padrão
        method = PaymentMethod.query.filter_by(id=method_id, partner_id=partner_id).first_or_404()
        method.is_default = True
        
        db.session.commit()
        
        return jsonify({'message': 'Método de pagamento definido como padrão'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@partner_bp.route('/commissions/<int:commission_id>/pay', methods=['POST'])
def pay_commission(commission_id):
    """Marcar comissão como paga"""
    try:
        commission = Commission.query.get_or_404(commission_id)
        
        if commission.status == 'paid':
            return jsonify({'error': 'Comissão já paga'}), 400
        
        commission.status = 'paid'
        commission.paid_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({'message': 'Comissão marcada como paga'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# === NOVAS ROTAS PARA PAGAMENTOS ===

@partner_bp.route('/partners/<int:partner_id>/create-payment-intent', methods=['POST'])
def create_payment_intent(partner_id):
    """Criar intenção de pagamento com Stripe"""
    try:
        data = request.get_json()
        amount = data.get('amount')  # em centavos
        currency = data.get('currency', 'brl')
        
        partner = Partner.query.get_or_404(partner_id)
        
        # Criar PaymentIntent no Stripe
        intent = stripe.PaymentIntent.create(
            amount=int(amount),
            currency=currency,
            metadata={
                'partner_id': partner_id,
                'partner_name': partner.name,
                'partner_email': partner.email
            }
        )
        
        return jsonify({
            'client_secret': intent.client_secret,
            'payment_intent_id': intent.id
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@partner_bp.route('/partners/<int:partner_id>/process-pix-payment', methods=['POST'])
def process_pix_payment(partner_id):
    """Processar pagamento PIX (simulado)"""
    try:
        data = request.get_json()
        amount = data.get('amount')
        pix_key = data.get('pix_key')
        
        partner = Partner.query.get_or_404(partner_id)
        
        # Aqui você integraria com um gateway de pagamento PIX real
        # Por enquanto, vamos simular
        
        # Criar registro de pagamento
        payment_record = {
            'partner_id': partner_id,
            'amount': amount,
            'method': 'pix',
            'pix_key': pix_key,
            'status': 'pending',
            'created_at': datetime.utcnow().isoformat()
        }
        
        return jsonify({
            'message': 'Pagamento PIX iniciado',
            'payment_id': f'pix_{partner_id}_{int(datetime.utcnow().timestamp())}',
            'qr_code': f'00020126580014br.gov.bcb.pix0136{pix_key}520400005303986540{amount:.2f}5802BR6009SAO PAULO62070503***6304',
            'status': 'pending'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@partner_bp.route('/partners/<int:partner_id>/bank-transfer', methods=['POST'])
def process_bank_transfer(partner_id):
    """Processar transferência bancária"""
    try:
        data = request.get_json()
        amount = data.get('amount')
        bank_details = data.get('bank_details')
        
        partner = Partner.query.get_or_404(partner_id)
        
        # Aqui você integraria com APIs bancárias
        # Por enquanto, vamos simular
        
        transfer_record = {
            'partner_id': partner_id,
            'amount': amount,
            'method': 'bank_transfer',
            'bank_details': bank_details,
            'status': 'processing',
            'created_at': datetime.utcnow().isoformat(),
            'estimated_completion': '1-2 dias úteis'
        }
        
        return jsonify({
            'message': 'Transferência bancária iniciada',
            'transfer_id': f'bank_{partner_id}_{int(datetime.utcnow().timestamp())}',
            'status': 'processing',
            'estimated_completion': '1-2 dias úteis'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@partner_bp.route('/partners/<int:partner_id>/payment-history', methods=['GET'])
def get_payment_history(partner_id):
    """Obter histórico de pagamentos do parceiro"""
    try:
        # Buscar comissões pagas (histórico real)
        paid_commissions = Commission.query.filter_by(
            partner_id=partner_id, 
            status='paid'
        ).order_by(Commission.paid_at.desc()).all()
        
        payment_history = []
        for commission in paid_commissions:
            sale = Sale.query.get(commission.sale_id)
            payment_history.append({
                'id': commission.id,
                'amount': commission.amount,
                'type': 'commission',
                'description': f'Comissão - Venda para {sale.client_name if sale else "Cliente"}',
                'status': 'completed',
                'date': commission.paid_at.isoformat() if commission.paid_at else None,
                'method': 'bank_transfer'  # Padrão por enquanto
            })
        
        return jsonify(payment_history)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@partner_bp.route('/webhook/stripe', methods=['POST'])
def stripe_webhook():
    """Webhook para receber eventos do Stripe"""
    try:
        payload = request.get_data()
        sig_header = request.headers.get('Stripe-Signature')
        endpoint_secret = os.environ.get('STRIPE_WEBHOOK_SECRET')
        
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
        
        # Processar diferentes tipos de eventos
        if event['type'] == 'payment_intent.succeeded':
            payment_intent = event['data']['object']
            partner_id = payment_intent['metadata'].get('partner_id')
            
            # Atualizar status do pagamento no banco
            # Implementar lógica específica aqui
            
        return jsonify({'status': 'success'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400