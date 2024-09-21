from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

DB_FILE = "studenttutor.db"

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{DB_FILE}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from models import *

# Welcome user to First Generation Investors
@app.route("/")
def main():
    return "Welcome to First Generation Investors!"

# Welcome user to API with message
@app.route("/api/", methods=["GET"])
def api():
    return jsonify({"message": "Welcome to the API!"})

# Get user profile
@app.route("/api/users/<id>", methods=["GET"])
def get_user(id):
    user = user.error_or_404(id)
    user_info = {"first_name": user.first_name, "last_name": user.last_name, "email": user.email, "school": user.school, 
                 "tutor": user.tutor, "all_lessons": user.all_lessons, "lessons_completed": user.lessons_completed}
    return jsonify(user_info)

# Login API endpoint
@app.route("/api/login", methods=["PUT"])
def login():
   return jsonify({"Successfully logged in!"})

# Registration API endpoint
@app.route("/api/register", methods=["POST"])
def register():


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run()