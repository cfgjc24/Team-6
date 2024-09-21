from flask import Flask, request, jsonify, redirect, send_file
from flask_sqlalchemy import SQLAlchemy
import tempfile

from models import *
from collections import defaultdict

DB_FILE = "fgi.db"

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

# Get average confidence levels for each lesson
@app.route("/api/admin/confidence", methods=["GET"])
def get_confidence_levels():
    confidence_levels = defaultdict(list)
    confidence_level_per_lesson = defaultdict(int)
    all_students = Student.query.all()  
    for student in all_students:
        for lesson in student.lessons:
            confidence_levels[lesson.id].append(lesson.confidence_level)
    for lesson in confidence_levels:
        confidence_level_per_lesson[lesson.id] = sum(confidence_levels[lesson])/len(confidence_levels[lesson])
    return jsonify(confidence_level_per_lesson)

# Get confidence level for a specific lesson
@app.route("/api/admin/confidence/<lesson_id>", methods=["GET"])
def get_lesson_confidence_level(lesson_id):
    all_students = Student.query.all()  
    for student in all_students:
        confidence_levels = [lesson.confidence_level for lesson in student.lessons if lesson.id == lesson_id]
    return jsonify(confidence_levels)

# Get average belonging levels for each lesson
@app.route("/api/admin/belonging", methods=["GET"])
def get_belonging_levels():
    belonging_levels = defaultdict(list)
    belonging_level_per_lesson = defaultdict(int)
    all_students = Student.query.all()  
    for student in all_students:
        for lesson in student.lessons:
            belonging_levels[lesson.id].append(lesson.belonging_level)
    for lesson in belonging_levels:
        belonging_level_per_lesson[lesson.id] = sum(belonging_levels[lesson])/len(belonging_levels[lesson])
    return jsonify(belonging_level_per_lesson)


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
    student = Student.query.filter_by(name=name).first_or_404()
    student.name = data.get('name', student.name)
    student.description = data.get('description', student.description)
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
    db.session.delete(id)
    db.session.commit()
    deleted_data = ({"first_name": student.first_name, "last_name": student.last_name, "email": 
                     student.email, "school": student.school,})
    return jsonify({'message': 'Student deleted. Sorry to see you go.'}, deleted_data)

@app.route("/api/student/<int:id>/<int:lesson_id>/store_lesson_data", methods=["PATCH"])
def store_lesson_data(id, lesson_id):
    student = Student.query.get(id)

    if not student:
        return jsonify({"message": "Student not found!"}), 404

    lesson = None
    for this_lesson in student.lessons:
        if this_lesson.id == lesson_id:
            lesson = this_lesson

    if not lesson:
        return jsonify({"message": "Lesson not found!"}), 404
    
    lesson.question_responses = request.json.get("question_responses", lesson.question_responses)
    questions_answered = 0
    for response in lesson.question_responses:
        if response:
            question_answered += 1

    if questions_answered == len(lesson.question_responses):
        lesson.completed = True
    
    lesson.confidence_level = request.json.get("confidence_level", lesson.confidence_level)
    lesson.belonging_level = request.json.get("belonging_level", lesson.belonging_level)
    lesson.biggest_challenge = request.json.get("biggest_challenge", lesson.biggest_challenge)
    lesson.suggestions = request.json.get("suggestions", lesson.suggestions)
    
    db.session.commit()
    return jsonify({"message": "Lesson Stored!"})

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
        db.session.add(this_lesson)
        db.session.commit()
    except:
        return "Error"
    
    return "No Error"

# dump all data
@app.route("/api/dump", methods=["GET"])
def dump_data():
    dumpfile = tempfile.NamedTemporaryFile()
    with open(dumpfile.name, "w") as f:
        f.write("id,first_name,last_name,email,school,password,tutor_count,lessons_completed_count\n")
        for student in Student.query.all():
            f.write(f"{student.id},{student.first_name},{student.last_name},{student.email},{student.school},{student.password},{len(student.tutor)},{len(student.lessons_completed)}\n")
    return send_file(dumpfile.name)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run()