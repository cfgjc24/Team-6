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
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;