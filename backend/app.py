<<<<<<< HEAD
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

DB_FILE = "clubreview.db"

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{DB_FILE}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from models import *

app.route("/")
def main():
    return "Welcome to First Generation Investors!"

app.route("/api", methods=["GET"])

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run()

=======
from flask import Flask, request, jsonify
>>>>>>> 18d622b90ba1884787ec45d382b4faff8983e688
