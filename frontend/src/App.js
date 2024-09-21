import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import StudentHome from './pages/student/Home';
import AdditionalResources from './pages/student/AdditionalResources';
import FAQ from './pages/student/FAQ';
import Registration from './components/Authentication/Registration';
import Login from './components/Authentication/Login';
import LessonOne from './pages/student/lessons/lessonOne';
import LessonTwo from './pages/student/lessons/lessonTwo';
import LessonThree from './pages/student/lessons/lessonThree';
import LessonFour from './pages/student/lessons/lessonFour';
import LessonFive from './pages/student/lessons/lessonFive';
import LessonSix from './pages/student/lessons/lessonSix';
import LessonSeven from './pages/student/lessons/lessonSeven';



function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/home" element={<StudentHome />} />
        <Route path="/additionalresources" element={<AdditionalResources />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/lessons/lessonOne" element={<LessonOne />} />
        <Route path="/lessons/lessonTwo" element={<LessonTwo />} />
        <Route path="/lessons/lessonThree" element={<LessonThree />} />
        <Route path="/lessons/lessonFour" element={<LessonFour />} />
        <Route path="/lessons/lessonFive" element={<LessonFive />} />
        <Route path="/lessons/lessonSix" element={<LessonSix />} />
        <Route path="/lessons/lessonSeven" element={<LessonSeven />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;