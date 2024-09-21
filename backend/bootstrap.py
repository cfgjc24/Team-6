import os
import json

from app import app, db, DB_FILE
from models import *
from flask_sqlalchemy import SQLAlchemy

# Create a student named 'cole' with required fields
def create_student():
    user = Student(id='cole', first_name='Cole', last_name='Williams',
        email='cole@wharton.upenn.edu', school='Penn', password='qwerty', 
        tutor=['Jane', 'Josh'], all_lessons=['Personal Finance', 'What is a stock', 
        'Volatility and diversification', 'What is a bond', 'Mutual Funds/ETFs',
        'Compound Interest and Dollar-Cost Averaging', 'Personal Finance II'], 
        lessons_completed=['Personal Finance', 'What is a stock', 
        'Volatility and diversification', 'What is a bond']), 
    db.session.add(user)
    db.session.commit()
    print("Student created.")