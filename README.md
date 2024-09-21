# Team-6

### Our tech stack
**Frontend**: React
**Backend**: Python, Flask, SQLAlchemy

# Code For Good Hackathon

## Backend Documentation

**Design Decisions for Models:**
1. **Student Model** <br/>
    To seamlessly convert between the data's JSON and database representation, the first name, last name, email, school, password, and tutor should be set as non-nullable since they are all essential pieces of information in order to register a student in First Generation Investors. The Student Model additionally has an id so it can be uniquely identified. There is also a relationship on the Student after creating an association table for students and lessons. There is more information about the association table below.
2. **Lesson Model** <br/>
   To represent lessons, I chose to include fields for title, completed, confidence level, belonging level, biggest challenge, suggestions, slides link, Quizlet link, and Kahoot link. The main focus of this web application is to allow administrators to effectively track their metriccs so there are multiple fields here.
   All fields are not unique since each student can have the same answers for all of the fields except for the slide link, Quizlet link, and Kahoot link because links should be unique. There is more about the association tables below.
3. **Tutor Model** <br />
    The fields that were included in the tutor model were first name, last name, and email. None of these fields are nullable because they would be required for the tutor to sign up and the student would need the tutor's email to contact them.
4. **Association Table to Associate Tags with Clubs** <br/>
    The Student table and the Lesson table are connected with an association table so that a student can have many lessons and a lesson can have many students. It represents a many-to-many relationship. The association table is above the Student table so it can be used a secondary in the Student table. The back reference in the Student table serves as a pseudo column that gets created on the Lesson table to allow the backend team to see all of the lessons for a certain student. Similar association tables were created to connect lessons and questions, lessons and question responses, and lesson and lessons completed.

**Admin Routes <br/>**
1. /api/login
2. /api/register
3. /api/admin/confidence
4. /api/admin/confidence/<int:lesson_id>
5. /api/admin/belonging
6. /api/admin/students
7. /api/admin/dump
8. /api/admin/dump/lesson

**Student Routes <br/>**
1. 
2. 
3. 
4. 
5. 
6. 
7. 
8. 

### Running Locally

Run the backend server first:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 app.py
```

Then in a separate terminal, run the frontend server:

```bash
cd frontend
npm install
npm start
```

### Team Members

*(insert contributions here)*

**Angelina**

**Camilly**

**Cathy**

**Eduardo**

**Elaine**

**Malachi**

**Samuel**