# Team-6

### Our tech stack
**Frontend**: React
**Backend**: Python, Flask, SQLAlchemy

# Code For Good Hackathon

## Backend Documentation

**Design Decisions for Models:**
1. **Student Model** <br/>
    To seamlessly convert between the data's JSON and database representation, the first name, last name, email, school, password, and tutor should be set as non-nullable since they are all essential pieces of information in order to register a student in First Generation Investors. The Student Model additionally has an id so it can be uniquely identified. There is also a relationship on the Student after creating an association table for students and lessons. There is more information about the association table below.

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