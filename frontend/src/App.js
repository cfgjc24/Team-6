import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import AdditionalResources from './pages/student/AdditionalResources'; 
import Registration from './components/Authentication/Registration';
import Login from './components/Authentication/Login';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Route for the Additional Resources page */}
        <Route path="/additional" element={<AdditionalResources />} />
        <Route path="/register" element={<Registration />} /> {/* Add the registration route */}
        <Route path="/login" element={<Login />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;