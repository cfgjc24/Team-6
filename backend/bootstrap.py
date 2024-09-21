import os
import json

from app import app, db_, db_FILE
from models import Student
# from models import Lesson, Tutor
from flask_sqlalchemy import SQLAlchemy

# Create a student named 'cole' with required fields
def create_student():
    user = Student(id='cole', first_name='Cole', last_name='Williams',
        email='cole@wharton.upenn.edu', school='Penn', password='qwerty', 
        tutor=json.dumps(['Jane', 'Josh']),  # Storing as JSON string
        all_lessons=json.dumps(['Personal Finance', 'What is a stock', 'Volatility and diversification', 
        'What is a bond', 'Mutual Funds/ETFs', 'Compound Interest and Dollar-Cost Averaging', 
        'Personal Finance II']), 
        lessons_completed=json.dumps(['Personal Finance', 'What is a stock', 
        'Volatility and diversification', 'What is a bond']))
    db_.session.add(user)
    db_.session.commit()
    print("Student created.")

# Load students.json to the database
def load_data():
    with open('students.json') as file:
        data = json.load(file)
        lessons = {}
        for item in data:
            for student_lesson in item['lessons']:
                if student_lesson not in lessons:
                    student = Student(id=student_lesson)
                    db_.session.add(student)
                    lessons[student_lesson] = student
            
            student = Student(id=item['id'], first_name=item['first_name'], 
                              last_name=item['last_name'],)
            for student_lesson in item['lessons']:
                lesson = lessons[student_lesson]
                student.lessons.append(lessons[student_lesson])
            db_.session.commit()
        db_.session.commit()
        print("Students and lessons created.")

if __name__ == "__main__":
    # Delete existing database before bootstrapping a new one
    LOCAL_DB_FILE = "instance/" + db_FILE
    if os.path.exists(LOCAL_DB_FILE):
        os.remove(LOCAL_DB_FILE)

    with app.app_context():
        db_.create_all()
        create_student()
        load_data()