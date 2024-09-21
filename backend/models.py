from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import DeclarativeBase, MappedAsDataclass
from sqlalchemy.orm import relationship
from sqlalchemy import MetaData

class Base(DeclarativeBase):
    pass

db_ = SQLAlchemy(model_class=Base)

# Association Table linking Student and Lesson
student_lesson_association = db_.Table('student_lesson',
    db_.Column('student_id', db_.Integer, db_.ForeignKey('student.id'), primary_key=True),
    db_.Column('lesson_id', db_.Integer, db_.ForeignKey('lesson.id'), primary_key=True)
)

# Define student model for database
class Student(db_.Model):
   id = db_.Column(db_.Integer, primary_key=True, autoincrement=True)
   first_name = db_.Column(db_.String(50), nullable=False)
   last_name = db_.Column(db_.String(50), nullable=False)
   email = db_.Column(db_.String(50), unique=True, nullable=False)
   school = db_.Column(db_.String(50), nullable=False)
   password = db_.Column(db_.String(50), nullable=False)
   tutor = db_.Column(db_.String(50), nullable=False)
   lessons = relationship('Lesson', secondary=student_lesson_association, back_populates='students')

# Define association tables with correct structure
lesson_question = db_.Table('lesson_question',
    db_.Column('lesson_id', db_.Integer, db_.ForeignKey('lesson.id')),
    db_.Column('question_id', db_.Integer, db_.ForeignKey('question.id'))
)

lesson_question_response = db_.Table('lesson_question_response',
    db_.Column('lesson_id', db_.Integer, db_.ForeignKey('lesson.id')),
    db_.Column('question_response_id', db_.Integer, db_.ForeignKey('question_response.id'))
)

lesson_all_lessons = db_.Table('lesson_all_lessons',
    db_.Column('lesson_id', db_.Integer, db_.ForeignKey('lesson.id')),
    db_.Column('all_lessons_id', db_.Integer, db_.ForeignKey('all_lessons.id'))
)

lesson_completed_lessons = db_.Table('lesson_lessons_completed', 
    db_.Column('lesson_id', db_.Integer, db_.ForeignKey('completed_lessons.id'))
)

class Lesson(db_.Model):
    id = db_.Column(db_.Integer, primary_key=True)
    title = db_.Column(db_.String(120), unique=False, nullable=False)
    questions = relationship('Question', secondary=lesson_question, back_populates='lessons')
    slide_link = db_.Column(db_.String(100), unique=False, nullable=False)
    kahoot_link = db_.Column(db_.String(100), unique=False, nullable=False)
    quizlet_link = db_.Column(db_.String(100), unique=False, nullable=False)
    completed = db_.Column(db_.Boolean, unique=False, nullable=False)
    confidence_level = db_.Column(db_.Integer, unique=False, nullable=True)
    belonging_level = db_.Column(db_.Integer, unique=False, nullable=True)
    biggest_challenge = db_.Column(db_.String(120), unique=False, nullable=True)
    suggestions = db_.Column(db_.String(120), unique=False, nullable=True)
    students = relationship('Student', secondary=student_lesson_association, back_populates='lessons')
    question_responses = relationship('QuestionResponse', secondary=lesson_question_response, back_populates='lessons')

class Question(db_.Model):
    id = db_.Column(db_.Integer, primary_key=True)
    question = db_.Column(db_.String(120), unique=False, nullable=False)
    lessons = relationship('Lesson', secondary=lesson_question, back_populates='questions')

class QuestionResponse(db_.Model):
    id = db_.Column(db_.Integer, primary_key=True)
    lessons = relationship('Lesson', secondary=lesson_question_response, back_populates='question_responses')

class AllLessons(db_.Model):
    id = db_.Column(db_.Integer, primary_key=True)

class CompletedLessons(db_.Model):
    id = db_.Column(db_.Integer, primary_key=True)

# Define tutor model for database
class Tutor(db_.Model):
   id = db_.Column(db_.Integer, primary_key=True)
   first_name = db_.Column(db_.String(50), nullable=False)
   last_name = db_.Column(db_.String(50), nullable=False)
   email = db_.Column(db_.String(50), unique=True, nullable=False)
