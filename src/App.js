import Landing from './pages/Landing';
import Lessons from './pages/Lessons';
import Resource from './pages/Resource';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ToneGame from './pages/ToneGame';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  return (
    <>
    <Router>
      <Navbar isLoggedIn={isLoggedIn} username={username} />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
        <Route path="/landing" element={<Landing setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/resources" element={<Resource />} />
        <Route path="/tonegame" element={<ToneGame />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
