from app import db

# Define student model for database
class Student(db.Model):
   id = db.Column(db.Integer, primary_key=True)
   first_name = db.Column(db.String(50), nullable=False)
   last_name = db.Column(db.String(50), nullable=False)
   email = db.Column(db.String(50), unique = True, nullable=False)
   school = db.Column(db.String(50), nullable=False)
   password = db.Column(db.String(50), nullable=False)
   tutor = db.arrays(db.String(50), nullable=False)
   all_lessons = db.arrays(db.String(50), nullable=False)
   lessons_completed = db.arrays(db.String(50), nullable=False)

# Define tutor model for database
class Tutor(db.Model):
   first_name = db.Column(db.String(50), primary_key=True)
   last_name = db.Column(db.String(50), nullable=False)
   email = db.Column(db.String(50), unique = True, nullable=False)
