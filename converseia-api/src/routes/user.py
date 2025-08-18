from flask import Blueprint, jsonify, request
from src.models.user import User, db
from werkzeug.security import generate_password_hash, check_password_hash

user_bp = Blueprint('user', __name__)

@user_bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@user_bp.route('/users', methods=['POST'])
def create_user():
    data = request.json
    
    # Validação para garantir que os dados necessários foram enviados
    if not data or 'username' not in data or 'email' not in data or 'password' not in data:
        return jsonify({"error": "Missing username, email, or password"}), 400

    # Criptografa a senha antes de salvar
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    
    # Cria o novo usuário COM a senha criptografada
    new_user = User(
        username=data['username'], 
        email=data['email'], 
        password=hashed_password
    )
    
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201

@user_bp.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict())

@user_bp.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.json
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)

    # Se uma nova senha for fornecida, atualize-a
    if 'password' in data:
        user.password = generate_password_hash(data['password'], method='pbkdf2:sha256')

    db.session.commit()
    return jsonify(user.to_dict())

@user_bp.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return '', 204

# --- NOVA ROTA DE LOGIN ADICIONADA AQUI ---
@user_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({"error": "E-mail e senha são obrigatórios"}), 400

    user = User.query.filter_by(email=data['email']).first()

    # Verifica se o usuário existe e se a senha está correta
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({"error": "Credenciais inválidas"}), 401
    
    # Se o login for bem-sucedido:
    # Futuramente, você pode adicionar a geração de um token (JWT) aqui.
    return jsonify({"message": "Login realizado com sucesso!", "user": user.to_dict()}), 200