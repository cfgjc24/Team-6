from app import db
class Lesson(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, unique=True, nullable=False)
    completed = db.Column(db.Boolean, unique=False, nullable=False)
    question_responses = db.arrays(db.String(120), unique=False)
    confidence_level = db.Column(db.Integer, unique=False, nullable=False)
    belonging_level = db.Column(db.Integer, unique=False, nullable=False)
    biggest_challenge = db.Column(db.String(120), unique=False, nullable=False)
    suggestions = db.Column(db.String(120), unique=False, nullable=False)
