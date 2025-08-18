# Guia de Deploy - ConverseIA Direito Portal de Parceiros

## Visão Geral

Este guia explica como fazer o deploy completo da aplicação, incluindo frontend React e API Flask com funcionalidades de pagamento.

## Pré-requisitos

### Contas Necessárias
1. **Render.com** - Para hospedar a API
2. **Netlify/Vercel** - Para hospedar o frontend (opcional)
3. **Stripe** - Para processamento de pagamentos
4. **PostgreSQL** - Banco de dados em produção

### Variáveis de Ambiente Necessárias

#### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@host:port/database
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
SECRET_KEY=your_super_secret_key_here
FLASK_ENV=production
```

#### Frontend (.env)
```env
VITE_API_URL=https://your-api-domain.onrender.com
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
```

## Deploy do Backend (API Flask)

### 1. Preparar o Render.com

1. Conecte seu repositório ao Render
2. Configure as variáveis de ambiente
3. Configure o comando de build: `pip install -r requirements.txt`
4. Configure o comando de start: `python src/main.py`

### 2. Configurar Banco de Dados

```sql
-- Criar banco PostgreSQL no Render ou outro provedor
-- As tabelas serão criadas automaticamente pela aplicação
```

### 3. Configurar Webhooks do Stripe

1. No dashboard do Stripe, vá em "Webhooks"
2. Adicione endpoint: `https://your-api-domain.onrender.com/api/webhook/stripe`
3. Selecione eventos: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copie o webhook secret para as variáveis de ambiente

## Deploy do Frontend

### Opção 1: Servido pelo Flask (Atual)
O frontend já está sendo servido pelo Flask. Apenas faça o build:

```bash
cd converseia-advogado-parceiro-main
npm run build
cp -r dist/* ../converseia-api/src/static/
```

### Opção 2: Deploy Separado (Recomendado para produção)

#### Netlify
```bash
cd converseia-advogado-parceiro-main
npm run build
# Upload da pasta dist/ para o Netlify
```

#### Vercel
```bash
cd converseia-advogado-parceiro-main
npm run build
vercel --prod
```

## Configurações de Produção

### 1. Segurança
- Use HTTPS em produção
- Configure CORS adequadamente
- Use senhas fortes para banco de dados
- Mantenha as chaves do Stripe seguras

### 2. Monitoramento
- Configure logs da aplicação
- Monitore transações do Stripe
- Configure alertas para falhas de pagamento

### 3. Backup
- Configure backup automático do banco de dados
- Mantenha backup das configurações

## Testes em Produção

### 1. Teste de Cadastro
1. Acesse o site em produção
2. Cadastre um novo parceiro
3. Verifique se os dados foram salvos no banco

### 2. Teste de Login
1. Faça login com as credenciais criadas
2. Verifique se o dashboard carrega corretamente

### 3. Teste de Pagamentos
1. Configure métodos de pagamento
2. Teste transações com cartões de teste do Stripe
3. Verifique webhooks no dashboard do Stripe

## Troubleshooting

### Problemas Comuns

1. **Erro de CORS**
   - Verifique se o CORS está configurado para o domínio correto
   - Adicione o domínio frontend nas configurações do Flask-CORS

2. **Erro de Banco de Dados**
   - Verifique a string de conexão DATABASE_URL
   - Confirme se o banco PostgreSQL está acessível

3. **Erro do Stripe**
   - Verifique se as chaves estão corretas (test vs live)
   - Confirme se o webhook está configurado corretamente

### Logs Úteis

```bash
# Ver logs do Render
render logs

# Ver logs locais
tail -f api.log
```

## Manutenção

### Atualizações
1. Teste mudanças em ambiente de desenvolvimento
2. Faça backup do banco antes de atualizações
3. Deploy gradual (backend primeiro, depois frontend)

### Monitoramento Contínuo
- Monitore métricas de performance
- Acompanhe logs de erro
- Verifique status dos pagamentos regularmente

## Suporte

Para problemas específicos:
1. Verifique os logs da aplicação
2. Consulte a documentação do Stripe
3. Verifique o status dos serviços (Render, Stripe)