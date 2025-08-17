import Landing from './pages/Landing';
import Lessons from './pages/Lessons';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/lessons" element={<Lessons />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
