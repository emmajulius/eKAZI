import React from 'react';
import whatsappLogo from '../assets/images/watsapp.jpeg';

const Footer = ({ onLoginClick }) => {

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="row footer-main-row">
          <div className="col-md-5 footer-about mb-4 mb-md-0">
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

          <div className="col-md-2 footer-links mb-4 mb-md-0">
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

          <div className="col-md-2 footer-links mb-4 mb-md-0">
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
          </div>

          <div className="col-md-3 footer-links footer-employer-section">
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
            
            <div className="footer-hotline-section" style={{ marginTop: '20px' }}>
              <p style={{ marginBottom: '10px' }}>
                <i className="fa fa-phone"></i> Tel Hotline:
              </p>
              <div className="row">
                <div className="col-md-10">
                  <div className="footer-contact-details">
                    <a href="tel:+255677400206">+255 677 400 206</a><br />
                    <a href="tel:+255677400205">+255 677 400 205</a><br />
                    <a href="tel:+255677014718">+255 677 014 718</a>
                  </div>
                </div>
                <div className="col-md-2">
                  <a className="whatsapp-button" href="https://wa.me/+255677975251" target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp">
                    <img src={whatsappLogo} alt="WhatsApp" />
                  </a>
                </div>
              </div>
            </div>
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

