from app import db
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy import Table, Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

# Association Table linking Student and Lesson
student_lesson_association = db.Table('student_lesson',
    db.Column('student_id', db.Integer, db.ForeignKey('student.id'), primary_key=True),
    db.Column('lesson_id', db.Integer, db.ForeignKey('lesson.id'), primary_key=True)
)

# Define student model for database
class Student(db.Model):
   id = db.Column(db.Integer, primary_key=True)
   first_name = db.Column(db.String(50), nullable=False)
   last_name = db.Column(db.String(50), nullable=False)
   email = db.Column(db.String(50), unique = True, nullable=False)
   school = db.Column(db.String(50), nullable=False)
   password = db.Column(db.String(50), nullable=False)
   tutor = db.Column(ARRAY(db.String(50)), nullable=False)
   all_lessons = db.Column(ARRAY(db.String(150)), nullable=False)
   lessons_completed = db.Column(ARRAY(db.String(50)), nullable=False)
   lessons = relationship('Lesson', secondary=student_lesson_association, back_populates='students')
    
class Lesson(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), unique=False, nullable=False)
    completed = db.Column(db.Boolean, unique=False, nullable=False)
    questions = db.Column(ARRAY(db.String(120)), unique=False)
    question_responses = db.Column(ARRAY(db.String(120)), unique=False)
    confidence_level = db.Column(db.Integer, unique=False, nullable=True)
    belonging_level = db.Column(db.Integer, unique=False, nullable=True)
    biggest_challenge = db.Column(db.String(120), unique=False, nullable=True)
    suggestions = db.Column(db.String(120), unique=False, nullable=True)
    slide_link = db.Column(db.String(100), unique=True, nullable=False)
    quizlet_link = db.Column(db.String(100), unique=True, nullable=False)
    kahoot_link = db.Column(db.String(100), unique=True, nullable=False)
    students = relationship('Student', secondary=student_lesson_association, back_populates='lessons')

# Define tutor model for database
class Tutor(db.Model):
   id = db.Column(db.Integer, primary_key=True)
   first_name = db.Column(db.String(50), primary_key=True)
   last_name = db.Column(db.String(50), nullable=False)
   email = db.Column(db.String(50), unique = True, nullable=False)
