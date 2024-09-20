from app import db
class Lesson(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    completed = db.Column(db.Boolean, unique=False, nullable=False)
    question_responses = db.arrays(db.String, unique=False)
    confidence_level = db.Column(db.Integer, unique=False, nullable=False)
    belonging_level = db.Column(db.Integer, unique=False, nullable=False)
    biggest_challenge = db.Column(db.String, unique=False, nullable=False)
    suggestions = db.Column(db.String, unique=False, nullable=False)
