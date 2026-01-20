import Landing from './pages/Landing';
import Lessons from './pages/Lessons';
import Resource from './pages/Resource';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ToneGame from './pages/ToneGame';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/resources" element={<Resource />} />
        <Route path="/tonegame" element={<ToneGame />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
