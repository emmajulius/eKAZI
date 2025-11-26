import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';
import Home from './pages/Home';
import CandidateProfile from './components/CandidateProfile';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/candidate/:id" element={<CandidateProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

