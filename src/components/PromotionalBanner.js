import React from 'react';
import { jobCategoriesData } from '../data';

const PromotionalBanner = () => {
  const handleImageError = (e) => {
    e.target.src = './assets/images/default.png';
  };

  const allCategories = [
    { name: "All Categories", value: "all" },
    ...jobCategoriesData
      .map(cat => ({
        name: cat.name,
        value: cat.name.toLowerCase().replace(/\s+/g, '-').replace(/[&/]/g, '-')
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
  ];

  return (
    <section className="promotional-banner">
      <div className="hero-search-container banner-search-container">
        <div className="search-form-wrapper">
          <input type="text" className="search-input-field" placeholder="What are you looking for..." />
          <select className="category-select">
            <option value="">Select Category</option>
            {allCategories.map((category, index) => (
              <option key={index} value={category.value}>
                {category.name}
              </option>
            ))}
          </select>
          <button type="button" className="search-submit-btn">Search</button>
        </div>
      </div>
      <div className="promo-main-container">
        <div className="banner-image-container">
          <img 
            src="./assets/images/bunner.jpg" 
            alt="Banner" 
            className="banner-image"
            onError={handleImageError}
          />
          <button
            type="button"
            className="banner-carousel-control carousel-control-next"
            aria-label="Next slide"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
          <div className="slider-indicators">
            <span className="slider-dot active"></span>
            <span className="slider-dot"></span>
            <span className="slider-dot"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;

