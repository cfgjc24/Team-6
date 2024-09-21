import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import StudentHome from './pages/student/Home';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="pages/student/home" element={<StudentHome />} />
      </Routes>
    </Router>
  );
}

export default App;