import React from 'react';

const Statistics = () => {
  return (
    <section className="statistics-display">
      <div className="stats-main-container">
        <div className="stats-grid-layout">
          <div className="stat-item-card">
            <div className="stat-icon-wrapper">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-number-display">1453</div>
            <div className="stat-text-label">Employers have recruited with us</div>
          </div>
          <div className="stat-item-card">
            <div className="stat-icon-wrapper">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-number-display">30686</div>
            <div className="stat-text-label">Job Seekers</div>
          </div>
          <div className="stat-item-card">
            <div className="stat-icon-wrapper">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-number-display">13091</div>
            <div className="stat-text-label">Job Posts</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;

