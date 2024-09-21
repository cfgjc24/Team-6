from flask import Flask, request, jsonify
from models import *

db_FILE = "fgi.db"

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_FILE}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
from models import db_
db_.init_app(app)

# Welcome user to First Generation Investors
@app.route("/")
def main():
    return "Welcome to First Generation Investors!"

# Welcome user to API with message
@app.route("/api/", methods=["GET"])
def api():
    return jsonify({"message": "Welcome to the API!"})

# Login API endpoint
@app.route("/api/login", methods=["PUT"])
def login():
   return jsonify({"message": "Successfully logged in!"})


# Registration API endpoint
@app.route("/api/register", methods=["POST"])
def register():
    return jsonify({"Successfully registered!"})


# Get all students
@app.route("/api/users/students", methods=["GET"])
def get_students():
    students = Student.query.all()
    student_list = []
    for student in students:
        student_list.append({"first_name": student.first_name, "last_name": student.last_name, "email": student.email, "school": student.school, 
                             "tutor": student.tutor, "all_lessons": student.all_lessons, "lessons_completed": student.lessons_completed})
    return jsonify(student_list)

# Get user profile
@app.route("/api/users/<id>", methods=["GET"])
def get_user(id):
    user = user.error_or_404(id)
    user_info = {"first_name": user.first_name, "last_name": user.last_name, "email": user.email, "school": user.school, 
                 "tutor": user.tutor, "all_lessons": user.all_lessons, "lessons_completed": user.lessons_completed}
    return jsonify(user_info)

# Modify a student
@app.route('/api/users/students/<id>', methods=['PUT'])
def update_student(id):
    data = request.get_json()
    student = Student.query.filter_by(id=id).first_or_404()
    student.first_name = data.get('first_name', student.first_name)
    student.last_name = data.get('last_name', student.last_name)
    student.email = data.get('email', student.email)
    student.school = data.get('school', student.school)
    student.tutor = data.get('tutor', student.tutor)
    student.all_lessons = data.get('all_lessons', student.all_lessons)
    student.lessons_completed = data.get('lessons_completed', student.lessons_completed)
    new_details = ({"name": student.name,
        "description": student.description,
        "email": student.email,
        "school": student.school,
        "tutor": student.tutor,
        "all_lessons": student.all_lessons,
        "lessons_completed": student.lessons_completed})
    return jsonify({'Student modified.'}, new_details), 200

# Delete a student
@app.route('/api/users/students/<id>', methods=['DELETE'])
def delete_student(id):
    student = Student.query.filter_by(id=id).first_or_404()
    db_.session.delete(id)
    db_.session.commit()
    deleted_data = ({"first_name": student.first_name, "last_name": student.last_name, "email": 
                     student.email, "school": student.school,})
    return jsonify({'message': 'Student deleted. Sorry to see you go.'}, deleted_data)

# Retrieve data from student
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
        db_.session.add(this_lesson)
        db_.session.commit()
    except:
        return "Error"
    return "No Error"

if __name__ == "__main__":
    with app.app_context():
        db_.create_all()
    app.run()