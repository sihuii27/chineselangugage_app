import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Lessons from './pages/Lessons';
import Resource from './pages/Resource';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ToneGame from './pages/ToneGame';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} username={username} email={email} />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
        <Route path="/landing" element={<Landing setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/resources" element={<Resource />} />
        <Route path="/tonegame" element={<ToneGame />} />
        <Route path="/profile" element={<Profile setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} setEmail={setEmail} />} />
      </Routes>
    </Router>
  );
}

export default App;
