import os
import sys
from flask import Flask, send_from_directory
from flask_cors import CORS
from src.models.user import db
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv()

# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

# --- Importar todas as rotas ---
from src.routes.user import user_bp
from src.routes.partner import partner_bp

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = 'asdf#FGSgvasgf$5$WGT'

# --- Configuração do Banco de Dados ---
# Procura pela URL do banco de dados do Render primeiro.
# Se não encontrar, usa o banco de dados SQLite local.
database_url = os.environ.get('DATABASE_URL')
if database_url:
    # Corrige a URL do PostgreSQL para ser compatível com SQLAlchemy
    if database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql://", 1)
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# --- Habilitar CORS ---
CORS(app)

# --- Registrar as rotas (Blueprints) ---
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(partner_bp, url_prefix='/api')

# --- Criar todas as tabelas do banco de dados na inicialização ---
# Importar todos os modelos para garantir que são registados antes de criar as tabelas
from src.models.partner import Partner, Sale, Commission, PaymentMethod, PaymentTransaction
from src.models.user import User

with app.app_context():
    db.create_all()

# --- Rota para servir a aplicação React (Front-end) ---
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    static_folder_path = app.static_folder
    if static_folder_path is None:
        return "Static folder not configured", 404

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return "index.html not found", 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)