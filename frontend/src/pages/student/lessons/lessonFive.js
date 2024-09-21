import React, { useEffect, useState } from 'react';
import './lesson.css';
import QuestionBox from '../../../components/questionBox';
import Modal from '../../../components/Modal';

const LessonFive = () => {

  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState([]);
  const [lessonData, setLessonData] = useState({
    questions: [], 
  });

  useEffect(() => {

    const fetchLessonData = async () => {
      try {

        const response = await fetch(`http://127.0.0.1:5000/api/course/5`);
        const data = await response.json();
        console.log(data);

        setLessonData({

          lessonId: 5,
          title: data.title,
          link: data.slide_link,
          kahoot: data.kahoot_link,
          quizlet: data.quizlet_link,
          questions: data.questions || [], 

        });

        setAnswers(Array(data.questions?.length || 0).fill('')); 
        setSubmitted(Array(data.questions?.length || 0).fill(false));

      } catch (error) {

        console.error("Error fetching the data:", error);

      }
      
    };

    fetchLessonData();
  }, []);

  const handleSubmit = (index) => (e) => {

    e.preventDefault();
    alert(`Your answer to Question ${index + 1} has been submitted: \n${answers[index]}`);
    const newSubmitted = [...submitted];
    newSubmitted[index] = true;
    setSubmitted(newSubmitted);

  };

  const handleChange = (index) => (e) => {

    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
    const newSubmitted = [...submitted];
    newSubmitted[index] = false;
    setSubmitted(newSubmitted);

  };

  return (

    <div className="lesson">

      <header className="lesson-header">

        <h1>Lesson {lessonData.lessonId}</h1>
        <h1>{lessonData.title}</h1>

      </header>

      {/* link to slides */}
      <h2>LESSON SLIDES:&nbsp;
        <a
          href={lessonData.link}
          target="_blank"
          rel="noopener noreferrer"
          className="lesson-link"
        >
          Link
        </a>
      </h2>

      <hr />

      {/* Kahoot and Quizlet */}
      <h2>CHECK YOUR KNOWLEDGE&nbsp;</h2>
      <h2>
        <a
          href={lessonData.kahoot}
          target="_blank"
          rel="noopener noreferrer"
          className="lesson-link"
        >
          Kahoot
        </a>
      </h2>

      <h2>
        <a
          href={lessonData.quizlet}
          target="_blank"
          rel="noopener noreferrer"
          className="lesson-link"
        >
          Quizlet
        </a>
      </h2>

      <hr />

      <h2>Questions</h2>

      <main>

        {Array.isArray(lessonData.questions) && lessonData.questions.length > 0 ? (
          lessonData.questions.map((question, index) => (
            <QuestionBox
              key={index}
              question_num={index + 1}
              question_name={question}
              answer={answers[index]}
              handleChange={handleChange(index)}
              handleSubmit={handleSubmit(index)}
              submitted={submitted[index]}
            />
          ))
        ) : (
          <p>No questions available.</p> // no questions are availible
        )}

      </main>

      <hr />

      <h2>LESSON SURVEY</h2>

      <p>You cannot complete the lesson until you submit the survey!</p>

      <Modal />

    </div>

  );

};

export default LessonFive;