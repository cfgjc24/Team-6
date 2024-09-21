import os
import json

from app import app, db_, db_FILE
from models import Student, Lesson, Question
# from models import Lesson, Tutor
from flask_sqlalchemy import SQLAlchemy

# Create a student named 'cole' with required fields
def create_student():
    user = Student(id='cole', first_name='Cole', last_name='Williams',
        email='cole@wharton.upenn.edu', school='Penn', password='qwerty', 
        tutor=json.dumps(['Jane', 'Josh']),  # Storing as JSON string
        lessons=[])
    db_.session.add(user)
    db_.session.commit()
    print("Student created.")

def load_lesson_data():  
    with open('lessons.json') as file:
        data = json.load(file)
        lessons_dict = {}
        for lesson in data:
            questions = []
            for question_data in lesson['questions']:
                question = Question(
                question=question_data['question'],
                )
                questions.append(question)

            lesson = Lesson(
                confidence_level=lesson['confidence_level'],
                belonging_level=lesson['belonging_level'],
                title=lesson['title'],
                questions=questions,
                slide_link=lesson['slide_link'],
                kahoot_link=lesson['kahoot_link'],
                quizlet_link=lesson['quizlet_link'],
                completed=lesson['completed'],
            )
            #db_.session.add(lesson)
            #print(lesson.id)
            lessons_dict[lesson.title] = lesson
            #print(lessons_dict)
        #db_.session.commit()
        print("Lesson data loaded.")
        return lessons_dict

# Load students.json to the database
def load_student_data():

    lessons_dict = load_lesson_data()

    with open('students.json') as file:
        data = json.load(file)
        for student in data:
            lessons = []
            for lesson_title in lessons_dict:
                    lessons.append(lessons_dict[lesson_title])
            user = Student(id=student['id'], first_name=student['first_name'], last_name=student['last_name'],
                email=student['email'], school=student['school'], password=student['password'], 
                tutor=student['tutor'], lessons=lessons)
            db_.session.add(user)
        db_.session.commit()
        print("Student data loaded.")

if __name__ == "__main__":
    # Delete existing database before bootstrapping a new one
    LOCAL_DB_FILE = "instance/" + db_FILE
    if os.path.exists(LOCAL_DB_FILE):
        os.remove(LOCAL_DB_FILE)

    with app.app_context():
        db_.create_all()
        #create_student()
        #load_lesson_data()
        load_student_data()