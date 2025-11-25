import React, { useState } from 'react';
import { jobCategoriesData, industryData, locationData } from '../data';

const JobCategories = () => {
  const [activeTab, setActiveTab] = useState('categories');

  const renderCategories = () => {
    const MAX_VISIBLE_CATEGORIES = 26;
    return jobCategoriesData.slice(0, MAX_VISIBLE_CATEGORIES).map((category, index) => (
      <div key={index} className="col-md-4">
        <a href="#" style={{ textDecoration: 'none', color: 'blue' }}>
          {category.name} ({category.count})
        </a>
        <br />
      </div>
    ));
  };

  const renderIndustry = () => {
    return industryData.map((industry, index) => (
      <div key={index} className="col-md-4">
        <a href="#" style={{ textDecoration: 'none', color: 'blue' }}>
          {industry.name} ({industry.count})
        </a>
        <br />
      </div>
    ));
  };

  const renderLocations = () => {
    return locationData.map((location, index) => (
      <div key={index} className="col-md-2">
        <a href="#" style={{ textDecoration: 'none', color: 'blue' }}>
          {location.name} ({location.count})
        </a>
        <br />
      </div>
    ));
  };

  return (
    <section className="job-categories" id="categories">
      <div className="container">
        <h4 className="job-categories-title">Job Categories</h4>
        <br />
        <ul className="nav nav-tabs categories-tabs-list" id="myTab" role="tablist">
          <li className="nav-item">
            <a 
              className={`nav-link ${activeTab === 'categories' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveTab('categories'); }}
              href="#industry"
              role="tab"
            >
              By Job Categories
            </a>
          </li>
          <li className="nav-item">
            <a 
              className={`nav-link ${activeTab === 'industry' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveTab('industry'); }}
              href="#byindustry"
              role="tab"
            >
              By Companies Industry
            </a>
          </li>
          <li className="nav-item">
            <a 
              className={`nav-link ${activeTab === 'location' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveTab('location'); }}
              href="#location"
              role="tab"
            >
              By Locations
            </a>
          </li>
        </ul>
        <div className="tab-content categories-tab-content" id="myTabContent">
          <div className={`tab-pane fade ${activeTab === 'categories' ? 'show active' : ''}`} id="industry" role="tabpanel">
            <div className="categories-card">
              <div className="categories-row">
                {renderCategories()}
              </div>
            </div>
          </div>
          <div className={`tab-pane fade ${activeTab === 'industry' ? 'show active' : ''}`} id="byindustry" role="tabpanel">
            <div className="categories-card">
              <div className="categories-row">
                {renderIndustry()}
              </div>
            </div>
          </div>
          <div className={`tab-pane fade ${activeTab === 'location' ? 'show active' : ''}`} id="location" role="tabpanel">
            <div className="categories-card">
              <div className="categories-row">
                {renderLocations()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobCategories;

