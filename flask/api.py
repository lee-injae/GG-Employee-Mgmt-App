from flask import Flask 
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS, cross_origin

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    
    app.config['CORS_HEADERS'] = 'Content-Type'
    cors = CORS(app, resources={r"/*": {"origins": "*"}})
    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

    db.init_app(app)

    from views import main 
    app.register_blueprint(main) 

    return app 
