from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

from models import *

DB_FILE = "clubreview.db"

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{DB_FILE}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)



app.route("/")
def main():
    return "Welcome to First Generation Investors!"

app.route("/api", methods=["GET"])

@app.route("/student/<student_id>/retrieve_data", methods=["POST"])
def retrieve_data(student_id):
    question_responses = []
    for response in request.json.get("questions"):
        if response:
            question_responses.append(response)

    completed = False
    if len(question_responses) == len(request.json.get("questions")):
        completed = True
    
    confidence_level = request.json.get("confidence_level")
    belonging_level = request.json.get("confidence_level")
    biggest_challenge = request.json.get("confidence_level")
    suggestions = request.json.get("confidence_level")

    this_lesson = Lesson(student_id, completed=completed, question_responses=question_responses, confidence_level=confidence_level,
                         belonging_level=belonging_level, biggest_challenge=biggest_challenge, suggestions=suggestions)

    try:
        db.session.add(this_lesson)
        db.session.commit()
    except:
        return "Error"
    
    return "No Error"



if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run()