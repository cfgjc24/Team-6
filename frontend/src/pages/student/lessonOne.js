import React, { useState } from 'react';
import './lessonOne.css';
import QuestionBox from './components/questionBox';
import Modal from './components/Modal';

const lessonData = {

  link: "https://www.canva.com/design/DAEqdhQurq8/YZFuXmX70XK7WZWIpLaEEg/edit",
  kahoot: "https://create.kahoot.it/share/check-lesson-6/13c58b08-e15e-4b69-af4e-5ffc618f4bb1",
  quizlet: "https://quizlet.com/614503406/lesson-2-what-is-a-stock-flash-cards/?x=1qqt",
  lessonId: 1,
  title: "Personal Finance",
  questions: [
    "Temp Q1",
    "Temp Q2",
    "Temp Q3",
    "Temp Q4",
    "Temp Q5",
  ],

};

const lessonOne = () => {

  const [answers, setAnswers] = useState(Array(lessonData.questions.length).fill('')); // array of answers
  const [submitted, setSubmitted] = useState(Array(lessonData.questions.length).fill(false));

  const handleSubmit = (index) => (e) => {

    e.preventDefault();
    alert(`Your answer to Question ${index + 1} has been submitted: \n${answers[index]}`); // submission confirmation
    const newSubmitted = [...submitted];
    newSubmitted[index] = true;
    setSubmitted(newSubmitted);

  };

  // handles chnage after a question has been submitted
  const handleChange = (index) => (e) => {

    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
    const newSubmitted = [...submitted];
    newSubmitted[index] = false;
    setSubmitted(newSubmitted);

  };

  const [open, setOpen] = React.useState(false);
 
    const handleClose = () => {
        setOpen(false);
    };
 
    const handleOpen = () => {
        setOpen(true);
    };

  return (

    <div className="lessonOne">

      <header className="lessonOne-header">

        <h1>Lesson {lessonData.lessonId}</h1>
        <h1>{lessonData.title}</h1>

      </header>

      {/* link to slides */}
      <h2>LESSON SLIDES:&nbsp;
        <a
          href={lessonData.link}
          target="_blank"
          rel="noopener noreferer"
          style={{ color: '#5FA9E6' }}
        >
          Link
        </a>
      </h2>

      <hr></hr>

      {/* kahoot and quizlet */}
      <h2>CHECK YOUR KNOWLEDGE&nbsp;
      </h2>
      <h2>
        <a
          href={lessonData.kahoot}
          target="_blank"
          rel="noopener noreferer"
          style={{ color: '#5FA9E6' }}
        >
          Kahoot
        </a>
      </h2>

      <h2>
        <a
          href={lessonData.quizlet}
          target="_blank"
          rel="noopener noreferer"
          style={{ color: '#5FA9E6' }}
        >
          Quizlet
        </a>
      </h2>

      <hr></hr>

      <h2>Questions</h2>

      <main>

        {lessonData.questions.map((question, index) => ( // maps through question array and displays them

          <QuestionBox
            key={index}
            question_num={index + 1}
            question_name={question}
            answer={answers[index]}
            handleChange={handleChange(index)}
            handleSubmit={handleSubmit(index)}
            submitted={submitted[index]}
          />

        ))}

      </main>

      <hr></hr>
      
      <h2>LESSON SURVEY</h2>

      <p>Your cannot complete the lesson until you submit the survey!</p>

      <Modal></Modal>

    </div>

  );

};
//test
export default lessonOne;
