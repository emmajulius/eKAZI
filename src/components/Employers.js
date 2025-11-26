import React, { useEffect, useRef } from 'react';
import { employerLogos } from '../data';

const Employers = () => {
  const employerListRef = useRef(null);

  useEffect(() => {
    const employerList = employerListRef.current;
    if (!employerList) return;

    const handleTouchStart = () => {
      employerList.style.animationPlayState = 'paused';
    };

    const handleTouchEnd = () => {
      employerList.style.animationPlayState = 'running';
    };

    const handleMouseEnter = () => {
      employerList.style.animationPlayState = 'paused';
    };

    const handleMouseLeave = () => {
      employerList.style.animationPlayState = 'running';
    };

    employerList.addEventListener('touchstart', handleTouchStart);
    employerList.addEventListener('touchend', handleTouchEnd);
    employerList.addEventListener('mouseenter', handleMouseEnter);
    employerList.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      employerList.removeEventListener('touchstart', handleTouchStart);
      employerList.removeEventListener('touchend', handleTouchEnd);
      employerList.removeEventListener('mouseenter', handleMouseEnter);
      employerList.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Duplicate logos for seamless scrolling
  const allLogos = [...employerLogos, ...employerLogos];

  return (
    <section className="employers-section" id="employers">
      <div className="scroll-container">
        <h4 className="employers-title">Employers</h4>
        <div className="employer-marquee">
          <div className="employer-list" ref={employerListRef}>
            {allLogos.map((employer, index) => (
              <div key={index} className="employer-card">
                <a href="#">
                  <img 
                    src={employer.image} 
                    alt={employer.name} 
                    onError={(e) => {
                      e.target.src = './assets/images/default.png';
                    }}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
        <br />
        <div className="browse-all-employers">
          <a href="#" className="browse-all-btn">Browse All</a>
        </div>
      </div>
    </section>
  );
};

export default Employers;

