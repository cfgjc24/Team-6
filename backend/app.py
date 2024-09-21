from flask import Flask, request, jsonify, redirect
from flask_sqlalchemy import SQLAlchemy

from models import *

DB_FILE = "studenttutor.db"

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{DB_FILE}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)



# Welcome user to First Generation Investors
@app.route("/")
def main():
    return "Welcome to First Generation Investors!"

# Welcome user to API with message
@app.route("/api/", methods=["GET"])
def api():
    return jsonify({"message": "Welcome to the API!"})

# Login API endpoint
@app.route("/api/login", methods=["POST"])
def login():
    # TODO - resolve these three fields in the frontend
    user_id, user_password, user_type = request.form.get('username'), request.form.get('password'), request.form.get('user_type')
    user = None
    if user_type == "student":
        user = Student.query.get(user_id)
    elif user_type == "tutor":
        user = Tutor.query.get(user_id)
    elif user_type == "admin":
        # user = Admin.query.get(user_id)
        # TODO - implement admin model
        return redirect("/api/admin")
    else:
        return jsonify({"error": "Invalid user type"})
    if user is None or user.password != user_password:
        return jsonify({"error": "Invalid username or password"})
    return redirect(f'/api/users/{user_type}/{user_id}')

# Registration API endpoint
@app.route("/api/register", methods=["POST"])
def register():
    # TODO - resolve these three fields in the frontend
    user_id, password, user_type = request.form.get('username'), request.form.get('password'), request.form.get('user_type')
    first_name, last_name, email = request.form.get('first_name'), request.form.get('last_name'), request.form.get('email')
    school = request.form.get('school')
    tutor = ["Generic Finance Coach"] # TODO - resolve this field
    all_lessons = [] # TODO - resolve this field
    lessons_completed = [] # TODO - resolve this field
    
    user = None
    if user_type == "student":
        if Student.query.get(user_id) is not None:
            return jsonify({"error": "User already exists"})
        user = Student(id=user_id, first_name=first_name, last_name=last_name, email=email, school=school, password=password, tutor=[], all_lessons=all_lessons, lessons_completed=lessons_completed)
    elif user_type == "tutor":
        if Tutor.query.get(user_id) is not None:
            return jsonify({"error": "User already exists"})
        user = Tutor(id=user_id, first_name=first_name, last_name=last_name, email=email)
    
    try:
        db.session.add(user)
        db.session.commit()
        return redirect("/api/login")
    except:
        return jsonify({"error": "Error registering user"})

# Get user profile
@app.route("/api/users/<user_type>/<id>", methods=["GET"])
def get_user(user_type, id):
    user = user.error_or_404(id)
    user_info = {"first_name": user.first_name, "last_name": user.last_name, "email": user.email, "school": user.school, 
                 "tutor": user.tutor, "all_lessons": user.all_lessons, "lessons_completed": user.lessons_completed}
    return jsonify(user_info)

@app.route("/api/users/student/<id>/retrieve_data", methods=["POST"])
def retrieve_data(id):
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

    this_lesson = Lesson(student_id=id, completed=completed, question_responses=question_responses, confidence_level=confidence_level,
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