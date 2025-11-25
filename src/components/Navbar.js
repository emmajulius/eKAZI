import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Navbar = ({ onLoginClick, onRegisterClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // If already on home, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to home page
      navigate('/');
    }
    setIsMenuOpen(false);
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // Only smooth scroll if we're on the home page
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to home page with hash
      navigate(`/${targetId}`);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-wrapper">
          <div className="logo">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img 
                alt="eKazi Logo" 
                style={{ height: '80px', maxHeight: '80px', width: 'auto' }}
                src="/assets/images/logo1.png" 
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </Link>
          </div>
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="/" onClick={handleHomeClick}>Home</a></li>
            <li><a href="#jobs" onClick={(e) => handleSmoothScroll(e, '#jobs')}>Find jobs</a></li>
            <li><a href="#employers" onClick={(e) => handleSmoothScroll(e, '#employers')}>Employers</a></li>
            <li><a href="#cv-builder" onClick={(e) => handleSmoothScroll(e, '#cv-builder')}>Cv Builder</a></li>
            <li><a href="#salary-calculator" onClick={(e) => handleSmoothScroll(e, '#salary-calculator')}>Salary Calculator</a></li>
            <li><a href="#pricing" onClick={(e) => handleSmoothScroll(e, '#pricing')}>Pricing</a></li>
          </ul>
          <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="nav-right">
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onRegisterClick(); }}>Register</a>
            <span className="nav-separator"></span>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onLoginClick(); }}>Login</a>
            <a href="#" className="btn-post-job">Post job</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

