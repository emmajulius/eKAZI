import React from 'react';
const Hero = () => {
  const handleImageError = (e) => {
    e.target.src = './assets/images/default.png';
  };

  return (
    <section className="hero-section" id="home">
      <div className="hero-main-container">
        <div className="hero-left-content">
          <h1 className="hero-headline">
            <b>
              A place where <span className="hero-highlight">employers</span>
              <br />
              meets potential candidates
            </b>
          </h1>
          <p className="hero-subheadline">Set your career in motion with ekazi.</p>
        </div>
        <div className="hero-right-image">
          <div className="hero-profile-image">
            <img 
              src="./assets/images/hero.jpg" 
              alt="Hero Profile" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={handleImageError}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

