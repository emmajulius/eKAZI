import React, { useState, useEffect } from 'react';
import whatsappLogo from '../assets/images/watsapp.jpeg';

const Footer = ({ onLoginClick }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    }
  };
  
  const mobileRowStyle = isMobile ? {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginLeft: 0,
    marginRight: 0
  } : {};
  
  const mobileAboutStyle = isMobile ? {
    flex: '0 0 100%',
    maxWidth: '100%',
    width: '100%',
    order: 1
  } : {};
  
  const mobileAboutLinksStyle = isMobile ? {
    flex: '0 0 calc(33.333% - 4px)',
    maxWidth: 'calc(33.333% - 4px)',
    width: 'calc(33.333% - 4px)',
    order: 2
  } : {};
  
  const mobileFreelancerStyle = isMobile ? {
    flex: '0 0 calc(33.333% - 4px)',
    maxWidth: 'calc(33.333% - 4px)',
    width: 'calc(33.333% - 4px)',
    order: 3
  } : {};
  
  const mobileEmployerStyle = isMobile ? {
    flex: '0 0 calc(33.333% - 4px)',
    maxWidth: 'calc(33.333% - 4px)',
    width: 'calc(33.333% - 4px)',
    order: 4
  } : {};
  
  const mobileHotlineStyle = isMobile ? {
    flex: '0 0 calc(50% - 3px)',
    maxWidth: 'calc(50% - 3px)',
    width: 'calc(50% - 3px)',
    order: 5
  } : {};
  
  const mobileWhatsappStyle = isMobile ? {
    flex: '0 0 calc(50% - 3px)',
    maxWidth: 'calc(50% - 3px)',
    width: 'calc(50% - 3px)',
    order: 6
  } : {};

  return (
    <footer className="footer">
      <div className="container">
        <div 
          className="row footer-main-row"
          style={mobileRowStyle}
        >
          <div 
            className="col-md-5 footer-about mb-4 mb-md-0"
            style={mobileAboutStyle}
          >
            <a href="https://ekazi.co.tz/about" rel="noreferrer" target="_blank">
              <img
                alt="eKazi Logo"
                height="100"
                src="./assets/images/logo1.png"
                onError={(event) => {
                  event.target.style.display = 'none';
                }}
              />
            </a>
            <p id="footers">
              eKazi is An Online Recruitment Management Platform Designed for Employers/Recruiters, Job Seekers and Freelancers.
            </p>
          </div>

          <div 
            className="col-md-2 footer-links footer-about-links mb-4 mb-md-0"
            style={mobileAboutLinksStyle}
          >
            <h6>ABOUT</h6>
            <ul>
              <li>
                <a className="footer-link" href="https://ekazi.co.tz/admin/about" target="_blank" rel="noreferrer">
                  About Us
                </a>
              </li>
              <li>
                <a className="footer-link" href="/login">
                  My Account
                </a>
              </li>
              <li>
                <a className="footer-link" href="https://ekazi.co.tz/admin/contact" target="_blank" rel="noreferrer">
                  Contact
                </a>
              </li>
              <li>
                <a className="footer-link" href="https://ekazi.co.tz/auth/terms" target="_blank" rel="noreferrer">
                  Terms of Use
                </a>
              </li>
              <li>
                <button type="button" className="footer-link-button" onClick={handleLoginClick}>
                  <i className="fa fa-sign-in-alt" aria-hidden="true"></i>
                  Login
                </button>
              </li>
            </ul>
          </div>

          <div 
            className="col-md-2 footer-links footer-freelancer-section mb-4 mb-md-0"
            style={mobileFreelancerStyle}
          >
            <h6>FOR FREELANCER</h6>
            <ul>
              <li>
                <span className="footer-static-link">Browse Freelancers</span>
              </li>
              <li>
                <span className="footer-static-link">Hire me</span>
              </li>
              <li>
                <span className="footer-static-link">Post Project</span>
              </li>
            </ul>
            <div className="footer-hotline-section footer-hotline-nested">
              <h6>TEL HOTLINE</h6>
              <div className="footer-contact-details">
                <a href="tel:+255677400206">+255 677 400 206</a>
                <a href="tel:+255677400205">+255 677 400 205</a>
                <a href="tel:+255677014718">+255 677 014 718</a>
              </div>
            </div>
          </div>

          <div 
            className="col-md-3 footer-links footer-employer-section"
            style={mobileEmployerStyle}
          >
            <h6>FOR EMPLOYER</h6>
            <ul>
              <li>
                <span className="footer-static-link">Browse jobs</span>
              </li>
              <li>
                <a className="footer-link" href="https://ekazi.co.tz/employer/job/post" target="_blank" rel="noreferrer">
                  Post Job
                </a>
              </li>
            </ul>
            <div className="footer-whatsapp-section footer-whatsapp-nested">
              <a className="whatsapp-button" href="https://wa.me/+255677975251" target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp">
                <img src={whatsappLogo} alt="WhatsApp" />
              </a>
            </div>
          </div>

          {/* Separate Tel Hotline for mobile */}
          <div 
            className="col-md-2 footer-links footer-hotline-standalone"
            style={mobileHotlineStyle}
          >
            <h6>TEL HOTLINE</h6>
            <div className="footer-contact-details">
              <a href="tel:+255677400206">+255 677 400 206</a>
              <a href="tel:+255677400205">+255 677 400 205</a>
              <a href="tel:+255677014718">+255 677 014 718</a>
            </div>
          </div>

          {/* Separate WhatsApp for mobile */}
          <div 
            className="col-md-2 footer-links footer-whatsapp-standalone"
            style={mobileWhatsappStyle}
          >
            <h6>WHATSAPP</h6>
            <a className="whatsapp-button" href="https://wa.me/+255677975251" target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp">
              <img src={whatsappLogo} alt="WhatsApp" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <strong>© 2025. All rights reserved</strong>
      </div>
    </footer>
  );
};

export default Footer;

