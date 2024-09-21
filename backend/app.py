from flask import Flask, request, jsonify, redirect, send_file
from flask_cors import CORS, cross_origin
from models import *
from collections import defaultdict
import tempfile

db_FILE = "fgi.db"

app = Flask(__name__)
cors = CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_FILE}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['CORS_HEADERS'] = 'Content-Type'
from models import db_
db_.init_app(app)



##### LOGIN ENDPOINTS #####
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
    user_password = request.form.get('password')
    user_type = request.form.get('user_type')
    email = request.form.get('email')
    user = None
    if user_type == "student":
        user = Student.query.filter_by(email=email).first()
    elif user_type == "tutor":
        user = Tutor.query.filter_by(email=email).first()
    elif user_type == "admin":
        # user = Admin.query.get(user_id)
        # TODO - implement admin model
        return redirect("/api/admin")
    else:
        return jsonify({"error": "Invalid user type"})
    if user is None or user.password != user_password:
        return jsonify({"error": "Invalid username or password"})
    return redirect(f'/api/{user_type}/{user.id}')

# Registration API endpoint
@app.route("/api/register", methods=["POST"])
def register():
    password = request.form.get('password')
    user_type = request.form.get('user_type')
    first_name, last_name, email = request.form.get('first_name'), request.form.get('last_name'), request.form.get('email')
    school = request.form.get('school')
    tutor = "Generic Finance Coach"

    user = None
    if user_type == "student":
        if Student.query.filter_by(email=email).first():
            return jsonify({"error": "User already exists"})
        user = Student(first_name=first_name, last_name=last_name, email=email, school=school, password=password, tutor=tutor)

    elif user_type == "tutor":
        if Tutor.query.filter_by(email=email).first():
            return jsonify({"error": "User already exists"})
        user = Tutor(first_name=first_name, last_name=last_name, email=email)

    try:
        db_.session.add(user)
        db_.session.commit()
        return redirect(f"/api/student/{user.id}")
    except Exception as e:
        return jsonify({"error": "Error registering user"}), 400



##### ADMIN ENDPOINTS #####
# Get average confidence levels for each lesson
@app.route("/api/admin/confidence", methods=["GET"])
def get_confidence_levels():
    confidence_levels = defaultdict(list)
    confidence_level_per_lesson = defaultdict(int)
    all_students = Student.query.all()  
    for student in all_students:
        for lesson in student.lessons:
            if lesson.confidence_level:
                confidence_levels[lesson.id].append(lesson.confidence_level)
    for lesson in confidence_levels:
        confidence_level_per_lesson[lesson] = sum(confidence_levels[lesson])/len(confidence_levels[lesson])
    return jsonify(confidence_level_per_lesson)

# Get confidence level for a specific lesson
@app.route("/api/admin/confidence/<int:lesson_id>", methods=["GET"])
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
            if lesson.belonging_level:
                belonging_levels[lesson.id].append(lesson.belonging_level)
    for lesson in belonging_levels:
        belonging_level_per_lesson[lesson.id] = sum(belonging_levels[lesson])/len(belonging_levels[lesson])
    return jsonify(belonging_level_per_lesson)

# Get all students
@app.route("/api/admin/students", methods=["GET"])
def get_students():
    students = Student.query.all()
    student_list = []
    for student in students:
        student_list.append({"first_name": student.first_name, "last_name": student.last_name, "email": student.email, "school": student.school, 
                             "tutor": student.tutor})
    return jsonify(student_list)

# dump all data
@app.route("/api/admin/dump", methods=["GET"])
def dump_data():
    dumpfile = tempfile.NamedTemporaryFile()
    with open(dumpfile.name, "w") as f:
        f.write("id,first_name,last_name,email,school,password,tutor\n")
        for student in Student.query.all():
            f.write(f"{student.id},{student.first_name},{student.last_name},{student.email},{student.school},{student.password},{student.tutor}\n")
    return send_file(dumpfile.name, as_attachment=True, mimetype="text/csv")

# Get a CSV with lessons data
@app.route("/api/admin/dump/lesson", methods=["GET"])
def dump_lesson_data():
    dumpfile = tempfile.NamedTemporaryFile()
    with open(dumpfile.name, "w") as f:
        f.write("id,title,student_first_name,student_last_name,student_id,question_responses,confidence_level,belonging_level,biggest_challenge,suggestions\n")
        for student in Student.query.all():
            for lesson in student.lessons:
                f.write(f"{lesson.id},{lesson.title},{student.first_name},{student.last_name},{student.id},{lesson.question_responses},{lesson.confidence_level},{lesson.belonging_level},{lesson.biggest_challenge},{lesson.suggestions}\n")
    return send_file(dumpfile.name, as_attachment=True, mimetype="text/csv")



##### STUDENT ENDPOINTS #####
# Get user profile
@app.route("/api/student/<int:id>", methods=["GET"])
def get_user(id):
    user = Student.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    user_info = {"first_name": user.first_name, "last_name": user.last_name, "email": user.email, "school": user.school, 
                 "tutor": user.tutor}
    return jsonify(user_info)

# Modify a student
@app.route('/api/student/<int:id>', methods=['PUT'])
def update_student(id):
    data = request.get_json()
    student = Student.query.filter_by(id=id).first_or_404()
    student.first_name = data.get('first_name', student.first_name)
    student.last_name = data.get('last_name', student.last_name)
    student.email = data.get('email', student.email)
    student.school = data.get('school', student.school)
    student.tutor = data.get('tutor', student.tutor)
    # student.all_lessons = data.get('all_lessons', student.all_lessons)
    # student.lessons_completed = data.get('lessons_completed', student.lessons_completed)
    new_details = ({"name": student.name,
        "description": student.description,
        "email": student.email,
        "school": student.school,
        "tutor": student.tutor,
        # "all_lessons": student.all_lessons,
        # "lessons_completed": student.lessons_completed
        })
    return jsonify({'Student modified.'}, new_details), 200

# Delete a student
@app.route('/api/student/<int:id>', methods=['DELETE'])
def delete_student(id):
    student = Student.query.filter_by(id=id).first_or_404()
    db_.session.delete(id)
    db_.session.commit()
    deleted_data = ({"first_name": student.first_name, "last_name": student.last_name, "email": 
                     student.email, "school": student.school,})
    return jsonify({'message': 'Student deleted. Sorry to see you go.'}, deleted_data)

# Stores this lesson data for this student
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
    
    #lesson.question_responses = request.json.get("question_responses", lesson.question_responses)
    question_responses = []
    for response in request.json["question_responses"]:
        if response:
            question_responses.append(QuestionResponse(response=response))
    lesson.question_responses = question_responses

    completed = False
    if len(question_responses) == len(lesson.questions):
        lesson.completed = True

    #questions_answered = 0
    #for response in lesson.question_responses:
    #    if response:
    #        question_answered += 1

    #if questions_answered == len(lesson.question_responses):
    #    lesson.completed = True
    
    lesson.confidence_level = request.json["confidence_level"]
    lesson.belonging_level = request.json["belonging_level"]
    lesson.biggest_challenge = request.json["biggest_challenge"]
    lesson.suggestions = request.json["suggestions"]
    
    db_.session.commit()
    return jsonify({"message": "Lesson Stored!"})

# Get lesson data for a certain student, lesson_id here isn't the actual lesson_id, but rather, the index of the lesson in the student.lessons
@app.route("/api/course/<int:lesson_id>", methods=["GET"])
def get_lesson(lesson_id):
    id = 1
    lessons = Student.query.get(id).lessons
    lesson = lessons[lesson_id-1]
    if not lesson:
        return jsonify({"error": "User not found"}), 404

    questions = [question.question for question in lesson.questions]

    lesson_info = {
        "title": lesson.title,
        "quizlet_link": lesson.quizlet_link,
        "slide_link": lesson.slide_link,
        "kahoot_link": lesson.kahoot_link,
        "questions": questions
    }
    return lesson_info

# Retrieve data from student
@app.route("/api/student/<int:id>/retrieve_data", methods=["PUT"])
def retrieve_data(id):
    student = Student.query.get(id)
    question_responses = []
    for response in request.json.get("questions"):
        if response:
            question_responses.append(QuestionResponse(response=response))

    lesson = None
    for this_lesson in student.lessons:
        if this_lesson.id == lesson_id:
            lesson = this_lesson

    completed = False
    if len(question_responses) == len(request.json.get("questions")):
        lesson.completed = True
    
    lesson.confidence_level = request.json.get("confidence_level")
    lesson.belonging_level = request.json.get("belonging_level")
    lesson.biggest_challenge = request.json.get("biggest_challenge")
    lesson.suggestions = request.json.get("suggestions")

    this_lesson = Lesson(completed=completed, question_responses=question_responses, confidence_level=confidence_level,
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