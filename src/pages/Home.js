import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PromotionalBanner from '../components/PromotionalBanner';
import Statistics from '../components/Statistics';
import Employers from '../components/Employers';
import JobCategories from '../components/JobCategories';
import AllJobs from '../components/AllJobs';
import FeaturedCandidates from '../components/FeaturedCandidates';
import FeaturedFreelancers from '../components/FeaturedFreelancers';
import JobTitles from '../components/JobTitles';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';

function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);

  useEffect(() => {
    // Show newsletter popup after 3 seconds
    const timer = setTimeout(() => {
      if (!localStorage.getItem('newsletterClosed')) {
        setShowNewsletterPopup(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseNewsletter = () => {
    setShowNewsletterPopup(false);
    localStorage.setItem('newsletterClosed', 'true');
  };

  return (
    <div>
      <Navbar 
        onLoginClick={() => setShowLoginModal(true)}
        onRegisterClick={() => alert('Register functionality would be implemented here.')}
      />
      <Hero />
      <PromotionalBanner />
      <Statistics />
      <Employers />
      <JobCategories />
      <AllJobs />
      <FeaturedCandidates />
      <FeaturedFreelancers />
      <JobTitles />
      <Newsletter />
      <Footer onLoginClick={() => setShowLoginModal(true)} />
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
      {showNewsletterPopup && (
        <div className="newsletter-popup show">
          <div className="newsletter-content">
            <span className="close-newsletter" onClick={handleCloseNewsletter}>&times;</span>
            <h3>Subscribe to receive job notifications.</h3>
            <p>Join our weekly Newsletter</p>
            <form className="newsletter-form" onSubmit={(e) => {
              e.preventDefault();
              const email = e.target.querySelector('input[type="email"]').value;
              alert(`Thank you for subscribing with ${email}!`);
              handleCloseNewsletter();
            }}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

