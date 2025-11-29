import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';
import Home from './pages/Home';
import CandidateProfile from './components/CandidateProfile';
import FreelancerProfile from './components/FreelancerProfile';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/candidate/:id" element={<CandidateProfile />} />
          <Route path="/freelancer/:id" element={<FreelancerProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

