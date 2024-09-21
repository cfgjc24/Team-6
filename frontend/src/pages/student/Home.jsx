import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

const original_lessons = [
  { title: 'Personal Finance', link: '/lessons/lessonOne', status: 'completed' },
  { title: 'What is a stock?', link: '/lessons/lessonTwo', status: 'completed' },
  { title: 'Volatility and Diversification', link: '/lessons/lessonThree', status: 'locked' },
  { title: 'What is a bond?', link: '/lessons/lessonFour', status: 'locked' },
  { title: 'Mutual Funds/ETFs', link: '/lessons/lessonFive', status: 'locked' },
  { title: 'Compound Interest/Dollar-cost Averaging', link: '/lessons/lessonSix', status: 'locked' },
  { title: 'Personal Finance II', link: '/lessons/lessonSeven', status: 'locked' },
  { title: 'Capstone Project', link: '/lessons/lessonEight', status: 'locked' },
];

const StudentHome = () => {
  const [lessons, setLessons] = useState(original_lessons);

  const handleCheckClick = (index) => {
    setLessons((prevLessons) =>
      prevLessons.map((lesson, i) =>
        i === index
          ? { ...lesson, status: lesson.status === 'completed' ? 'notCompleted' : 'completed' }
          : lesson
      )
    );
  };

  return (
    <div className="home-container">
      <div className="intro-text">
        <h1>Overview</h1>
      </div>

      <div className="main-content">
        <div className="left-container">
          <h2>User Profile</h2>
          <h4>John Smith</h4>
          <h4>johnsmith@gmail.com</h4>
          <h4>Johnson School</h4>
          <h4>Alice, Bob</h4>
        </div>

        <div className="right-container">
          <h2>Lessons</h2>
          <ul className="links-list">
            {lessons.map((lesson, index) => (
              <li key={index} className={`lesson-item ${lesson.status}`}>
                <span
                  className={`check ${lesson.status}`}
                  onClick={() => handleCheckClick(index)}
                >
                  {lesson.status === 'completed' ? '✔' : '☐'}
                </span>
                <Link to={lesson.link}>{lesson.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentHome