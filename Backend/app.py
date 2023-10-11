from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
import os

# Load environment variables from the .env file
from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__)
CORS(app)




secret_key = os.getenv("secret_key")
db_url = os.getenv("db_url")

app.config['SECRET_KEY'] = secret_key
app.config['SQLALCHEMY_DATABASE_URI'] = db_url

# db configuration 

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# using migrate for creating table in database
migrate = Migrate(app, db)

# jwt configurations
app.config['JWT_SECRET_KEY'] = os.getenv("jwt_secret_key")
jwt = JWTManager(app)

# importing route
from routes import *

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create all database tables
    app.run(debug=True)