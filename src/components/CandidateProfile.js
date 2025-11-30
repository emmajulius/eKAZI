import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import LoginModal from './LoginModal';
import { fullCandidatesData } from '../data';

const InfoTag = ({ children }) => (
  <span className="language-pill">{children}</span>
);

const CandidateProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    about: false,
    experience: false,
    skills: false
  });
  const candidate = fullCandidatesData[Number(id)];
  
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sentence1 = "Explore featured candidates information";
  const sentence2 = "Discover talented professionals ready to join your team";
  const sentence3 = "Connect with skilled candidates and build your dream workforce.";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const sentence1El = document.querySelector('.sentence-1');
    const sentence2El = document.querySelector('.sentence-2');
    const sentence3El = document.querySelector('.sentence-3');
    const caret = document.querySelector('.animated-caret');
    const container = document.querySelector('.animated-sentences');
    
    if (!sentence1El || !sentence2El || !sentence3El || !caret || !container) return;

    let currentSentence = 1;
    let currentTextIndex = 0;
    let isDeleting = false;
    let animationTimeout;

    const getCurrentSentence = () => {
      if (currentSentence === 1) return { text: sentence1, element: sentence1El };
      if (currentSentence === 2) return { text: sentence2, element: sentence2El };
      return { text: sentence3, element: sentence3El };
    };

    const getTextWidth = (text) => {
      const tempSpan = document.createElement('span');
      tempSpan.style.visibility = 'hidden';
      tempSpan.style.position = 'absolute';
      tempSpan.style.whiteSpace = 'pre';
      tempSpan.style.fontSize = window.getComputedStyle(sentence1El).fontSize;
      tempSpan.style.fontWeight = window.getComputedStyle(sentence1El).fontWeight;
      tempSpan.style.fontFamily = window.getComputedStyle(sentence1El).fontFamily;
      tempSpan.textContent = text;
      document.body.appendChild(tempSpan);
      const width = tempSpan.offsetWidth;
      document.body.removeChild(tempSpan);
      return width;
    };

    const updateTextAndCaret = (element, currentText, fullText) => {
      if (!element || !caret || !container) return;
      
      // Set the current text
      element.textContent = currentText;
      
      // Calculate positions
      const containerRect = container.getBoundingClientRect();
      const containerCenterX = containerRect.width / 2;
      const fullTextWidth = getTextWidth(fullText);
      const currentTextWidth = getTextWidth(currentText);
      
      // Position element to center the full text (so it stays centered as it expands)
      // The text element is positioned so the full sentence will be centered
      const fullTextLeft = containerCenterX - (fullTextWidth / 2);
      element.style.position = 'absolute';
      element.style.left = `${fullTextLeft}px`;
      element.style.top = '50%';
      element.style.transform = 'translateY(-50%)';
      
      // Position caret: starts at center, moves right as text expands
      // Cursor position = full text left edge + current text width
      const caretPosition = fullTextLeft + currentTextWidth;
      caret.style.left = `${caretPosition}px`;
      caret.style.top = '50%';
      caret.style.transform = 'translateY(-50%)';
      caret.classList.add('active');
    };

    const clearAllSentences = () => {
      sentence1El.textContent = '';
      sentence2El.textContent = '';
      sentence3El.textContent = '';
    };

    const type = () => {
      const { text, element } = getCurrentSentence();
      clearAllSentences();

      if (!isDeleting && currentTextIndex < text.length) {
        // Typing forward
        const currentText = text.substring(0, currentTextIndex);
        updateTextAndCaret(element, currentText, text);
        currentTextIndex++;
        
        const typingSpeed = 30 + Math.random() * 20; // Very fast typing speed
        animationTimeout = setTimeout(type, typingSpeed);
      } else if (!isDeleting && currentTextIndex === text.length) {
        // Show completed sentence and wait 2 seconds
        const currentText = text.substring(0, currentTextIndex);
        updateTextAndCaret(element, currentText, text);
        isDeleting = true;
        currentTextIndex = text.length; // Keep it at full length
        animationTimeout = setTimeout(type, 2000);
      } else if (isDeleting && currentTextIndex > 0) {
        // Deleting backward
        currentTextIndex--;
        const currentText = text.substring(0, currentTextIndex);
        updateTextAndCaret(element, currentText, text);
        
        const deletingSpeed = 0; // Instant deleting
        animationTimeout = setTimeout(type, deletingSpeed);
      } else {
        // Finished deleting, move to next sentence
        isDeleting = false;
        element.textContent = '';
        element.style.position = '';
        element.style.left = '';
        element.style.top = '';
        element.style.transform = '';
        caret.classList.remove('active');
        
        currentSentence = currentSentence === 3 ? 1 : currentSentence + 1;
        currentTextIndex = 0;
        
        animationTimeout = setTimeout(type, 500);
      }
    };

    // Start typing animation
    setTimeout(type, 500);

    return () => {
      caret?.classList.remove('active');
      if (animationTimeout) clearTimeout(animationTimeout);
    };
  }, [id, sentence1, sentence2, sentence3]);

  if (!candidate) {
    return (
      <div className="container" style={{ marginTop: '120px', textAlign: 'center' }}>
        <h2>Candidate not found</h2>
        <button className="candidate-btn primary" onClick={() => navigate('/')}>Go back home</button>
      </div>
    );
  }

  const handleHireCandidate = () => {
    alert(`You are about to hire ${candidate.name}. This action would connect you with the candidate on ekazi.co.tz.`);
  };

  const handleContactCandidate = () => {
    setShowContactModal(true);
  };

  const handleLikeClick = () => {
    setShowLoginModal(true);
  };

  const handleRateClick = () => {
    setShowLoginModal(true);
  };

  const handleImageError = (event) => {
    event.target.src = './assets/images/default.png';
  };

  const educationPrimary = candidate.education?.[0];
  const stats = {
    views: candidate.profileAssessment?.views ?? candidate.views ?? 0,
    likes: candidate.profileAssessment?.likes ?? candidate.likes ?? 0,
    rating: candidate.profileAssessment?.rating ?? candidate.rating ?? 0,
    // skillsRating and average are only used in modal, not in main Profile Assessment card
  };

  const ratingValue = Number(stats.rating) || 0;
  const ratingCount = Number(candidate.profileAssessment?.totalRatings ?? stats.average ?? 0);

  const renderRatingStars = () =>
    Array.from({ length: 5 }).map((_, index) => (
      <span key={`assessment-star-${index}`} className="assessment-star" aria-hidden="true">
        ☆
      </span>
    ));

  const languages = candidate.languages || [];

  const renderCommaList = (items) => (items && items.length ? items.join(', ') : 'Information not provided.');

  const renderSkillsRow = (label, values) => (
    values && values.length > 0 ? (
      <div key={label} style={{ marginBottom: '15px' }}>
        <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
          {label}
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {values.map((value, idx) => (
            <span
              key={`${label}-${idx}`}
              style={{
                backgroundColor: '#f0f0f0',
                color: '#333',
                padding: '8px 15px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '500'
              }}
            >
              {value}
            </span>
          ))}
        </div>
      </div>
    ) : null
  );

  return (
    <div>
      <Navbar onLoginClick={() => setShowLoginModal(true)} onRegisterClick={() => alert('Register flow handled on ekazi.co.tz')} />

      <section className="candidate-featured-wrapper">
        <div className="candidate-shell">
          <div className="animated-writing-container">
            <div className="animated-sentences">
              <span className="sentence sentence-1"></span>
              <span className="sentence sentence-2"></span>
              <span className="sentence sentence-3"></span>
              <div className="animated-caret"></div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              {/* Left Column */}
              <div className="col-md-4">
                {/* Profile Overview Card */}
                <div className="freelancer-profile-card" style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    marginBottom: '20px', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    overflow: 'visible'
                  }}>
                    <img
                      src={candidate.image || './assets/images/default.png'}
                      alt={candidate.name}
                      style={{
                        maxWidth: '150px',
                        height: 'auto',
                        borderRadius: '12px',
                        backgroundColor: '#E3F2FD',
                        marginBottom: '15px',
                        display: 'block'
                      }}
                      onError={handleImageError}
                    />
                  </div>
                  <h2 style={{ 
                    fontSize: '20px', 
                    fontWeight: 'bold', 
                    marginBottom: '10px',
                    textTransform: 'uppercase',
                    color: '#333'
                  }}>
                    {candidate.name}
                  </h2>
                  <p style={{ 
                    fontSize: '16px', 
                    color: '#666', 
                    marginBottom: '15px' 
                  }}>
                    {candidate.position || 'No Position Records'}
                  </p>
                  <div style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
                    {candidate.location && (
                      <p style={{ margin: '5px 0' }}>
                        <i className="fa fa-map-marker-alt" style={{ marginRight: '8px', color: '#D36314' }}></i>
                        {candidate.location}, Tanzania
                      </p>
                    )}
                    {candidate.phone && (
                      <p style={{ margin: '5px 0' }}>
                        <i className="fa fa-phone" style={{ marginRight: '8px', color: '#D36314' }}></i>
                        {candidate.phone}
                      </p>
                    )}
                    {candidate.email && (
                      <p style={{ margin: '5px 0' }}>
                        <i className="fa fa-envelope" style={{ marginRight: '8px', color: '#D36314' }}></i>
                        {candidate.email}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleHireCandidate}
                    style={{
                      backgroundColor: '#D36314',
                      color: '#fff',
                      border: 'none',
                      padding: '12px 30px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      width: '100%',
                      transition: 'background-color 0.3s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#b8520f'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#D36314'}
                  >
                    <i className="fa fa-handshake"></i> Hire Me
                  </button>
                </div>

                {/* Education Card */}
                {candidate.education?.length ? (
                  <div className="freelancer-info-card" style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '20px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    <h3 style={{ 
                      fontSize: '18px', 
                      fontWeight: 'bold', 
                      marginBottom: '15px',
                      color: '#333'
                    }}>
                      <i className="fa fa-graduation-cap" style={{ marginRight: '10px', color: '#D36314' }}></i>
                      Education
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      {candidate.education.map((education, index) => (
                        <div key={`${education.institution}-${index}`} style={{ textAlign: 'left' }}>
                          <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#333', marginBottom: '5px' }}>
                            {education.institution}
                          </h4>
                          <p style={{ fontSize: '13px', color: '#666', marginBottom: '5px' }}>
                            {education.degree}
                          </p>
                          {education.year && (
                            <p style={{ fontSize: '12px', color: '#999' }}>{education.year}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Certifications Card */}
                {candidate.certifications?.length ? (
                  <div className="freelancer-info-card" style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '20px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    <h3 style={{ 
                      fontSize: '18px', 
                      fontWeight: 'bold', 
                      marginBottom: '15px',
                      color: '#333'
                    }}>
                      <i className="fa fa-certificate" style={{ marginRight: '10px', color: '#D36314' }}></i>
                      Certifications
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {candidate.certifications.map((certification, index) => (
                        <div key={`${certification.name}-${index}`} style={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          fontSize: '14px',
                          color: '#333'
                        }}>
                          <i className="fa fa-check-circle" style={{ marginRight: '10px', color: '#D36314' }}></i>
                          <span>{certification.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Languages Card */}
                {languages.length ? (
                  <div className="freelancer-info-card" style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '20px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    <h3 style={{ 
                      fontSize: '18px', 
                      fontWeight: 'bold', 
                      marginBottom: '15px',
                      color: '#333'
                    }}>
                      <i className="fa fa-language" style={{ marginRight: '10px', color: '#D36314' }}></i>
                      Languages
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {languages.map((language, index) => (
                        <span
                          key={`${language.name}-${index}`}
                          style={{
                            backgroundColor: '#f0f0f0',
                            color: '#333',
                            padding: '8px 15px',
                            borderRadius: '20px',
                            fontSize: '13px',
                            fontWeight: '500'
                          }}
                        >
                          {language.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Profile Assessment Card */}
                <div className="freelancer-info-card" style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: 'bold', 
                    marginBottom: '15px',
                    color: '#333'
                  }}>
                    <i className="fa fa-chart-line" style={{ marginRight: '10px', color: '#D36314' }}></i>
                    Profile Assessment
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '14px', color: '#333' }}>Views</span>
                        <span style={{ fontSize: '14px', color: '#333', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <i className="fa fa-eye" style={{ color: '#FF9800' }}></i>
                          {stats.views}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '14px', color: '#333' }}>Likes</span>
                        <button 
                          type="button" 
                          onClick={handleLikeClick}
                          style={{ 
                            fontSize: '14px', 
                            color: '#333', 
                            fontWeight: '600',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'color 0.2s ease'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.color = '#D36314'}
                          onMouseOut={(e) => e.currentTarget.style.color = '#333'}
                        >
                          <i className="fa fa-thumbs-up" style={{ color: '#FF9800', cursor: 'pointer' }}></i>
                          {stats.likes}
                        </button>
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '14px', color: '#333' }}>Rating</span>
                        <button 
                          type="button" 
                          onClick={handleRateClick}
                          style={{ 
                            fontSize: '14px', 
                            color: '#333', 
                            fontWeight: '600',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'color 0.2s ease'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.color = '#D36314'}
                          onMouseOut={(e) => e.currentTarget.style.color = '#333'}
                        >
                          <i className="fa fa-star" style={{ color: '#FF9800', cursor: 'pointer' }}></i>
                          {ratingValue} ({ratingCount})
                        </button>
                      </div>
                      <div style={{ fontSize: '14px' }}>{renderRatingStars()}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-md-8">
                {/* Collapsible About Section */}
                <div className="freelancer-tabs-card" style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  <div 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      borderBottom: '2px solid #e0e0e0',
                      paddingBottom: '10px',
                      marginBottom: expandedSections.about ? '20px' : '0'
                    }}
                    onClick={() => toggleSection('about')}
                  >
                    <h3 style={{ 
                      fontSize: '18px', 
                      fontWeight: 'bold',
                      color: '#333',
                      margin: 0
                    }}>
                      About
                    </h3>
                    <i 
                      className={`fa fa-chevron-${expandedSections.about ? 'up' : 'down'}`}
                      style={{ color: '#D36314', fontSize: '14px' }}
                    ></i>
                  </div>
                  {expandedSections.about && (
                    <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.8', paddingTop: '10px' }}>
                      {/* About Text */}
                      {candidate.about && (
                        <div style={{ marginBottom: '20px' }}>
                          <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{candidate.about}</p>
                        </div>
                      )}
                      
                      {/* Career Objectives */}
                      {candidate.careerObjectives && (
                        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e0e0e0' }}>
                          <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                            <i className="fa fa-bullseye" style={{ marginRight: '8px', color: '#D36314' }}></i>
                            Career Objectives
                          </h4>
                          <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{candidate.careerObjectives}</p>
                        </div>
                      )}
                      
                      {/* No information message */}
                      {!candidate.about && !candidate.careerObjectives && (
                        <p>No about information available.</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Collapsible Professional Experience Section */}
                <div className="freelancer-tabs-card" style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  <div 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      borderBottom: '2px solid #e0e0e0',
                      paddingBottom: '10px',
                      marginBottom: expandedSections.experience ? '20px' : '0'
                    }}
                    onClick={() => toggleSection('experience')}
                  >
                    <h3 style={{ 
                      fontSize: '18px', 
                      fontWeight: 'bold',
                      color: '#333',
                      margin: 0
                    }}>
                      Professional Experience
                    </h3>
                    <i 
                      className={`fa fa-chevron-${expandedSections.experience ? 'up' : 'down'}`}
                      style={{ color: '#D36314', fontSize: '14px' }}
                    ></i>
                  </div>
                  {expandedSections.experience && (
                    <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.8', paddingTop: '10px' }}>
                      {candidate.experience?.length ? (
                        <div className="experience-timeline">
                          {candidate.experience.map((experience, index) => (
                            <div className="timeline-item" key={`${experience.title}-${index}`} style={{ marginBottom: '25px' }}>
                              <div className="timeline-content">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#333', margin: 0 }}>
                                    {experience.title}
                                  </h4>
                                  <span style={{ 
                                    fontSize: '12px', 
                                    color: '#666',
                                    backgroundColor: '#f0f0f0',
                                    padding: '4px 10px',
                                    borderRadius: '4px'
                                  }}>
                                    {experience.period}
                                  </span>
                                </div>
                                <div style={{ marginBottom: '8px' }}>
                                  <span style={{ fontSize: '14px', color: '#666', marginRight: '15px' }}>
                                    <i className="fa fa-building" style={{ marginRight: '5px', color: '#D36314' }}></i>
                                    {experience.company}
                                  </span>
                                  {experience.location && (
                                    <span style={{ fontSize: '14px', color: '#666' }}>
                                      <i className="fa fa-map-marker" style={{ marginRight: '5px', color: '#D36314' }}></i>
                                      {experience.location}
                                    </span>
                                  )}
                                </div>
                                {experience.industry && (
                                  <p style={{ fontSize: '13px', color: '#999', marginBottom: '10px' }}>
                                    <i className="fa fa-industry" style={{ marginRight: '5px' }}></i>
                                    {experience.industry}
                                  </p>
                                )}
                                {experience.responsibilities?.length ? (
                                  <div style={{ marginTop: '10px' }}>
                                    <h5 style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                                      Key Responsibilities:
                                    </h5>
                                    <ul style={{ paddingLeft: '20px', margin: 0 }}>
                                      {experience.responsibilities.map((item, idx) => (
                                        <li key={`${experience.title}-resp-${idx}`} style={{ marginBottom: '5px', fontSize: '13px' }}>
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>No work experience records available.</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Collapsible Skills & Endorsements Section */}
                {candidate.skills && (
                  <div className="freelancer-tabs-card" style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '20px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    <div 
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        borderBottom: '2px solid #e0e0e0',
                        paddingBottom: '10px',
                        marginBottom: expandedSections.skills ? '20px' : '0'
                      }}
                      onClick={() => toggleSection('skills')}
                    >
                      <h3 style={{ 
                        fontSize: '18px', 
                        fontWeight: 'bold',
                        color: '#333',
                        margin: 0
                      }}>
                        Skills & Endorsements
                      </h3>
                      <i 
                        className={`fa fa-chevron-${expandedSections.skills ? 'up' : 'down'}`}
                        style={{ color: '#D36314', fontSize: '14px' }}
                      ></i>
                    </div>
                    {expandedSections.skills && (
                      <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.8', paddingTop: '10px' }}>
                        <div className="skills-categories">
                          {renderSkillsRow('Culture Fit', candidate.skills.cultureFit)}
                          {renderSkillsRow('Personality', candidate.skills.personality)}
                          {renderSkillsRow('Skills & Knowledge', candidate.skills.skillsKnowledge)}
                          {renderSkillsRow('Software', candidate.skills.software)}
                          {renderSkillsRow('Tools', candidate.skills.tools)}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Job Fit Card */}
                {candidate.jobFit && Object.keys(candidate.jobFit).length ? (
                  <div className="freelancer-skills-card" style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '20px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    <h3 style={{ 
                      fontSize: '18px', 
                      fontWeight: 'bold', 
                      marginBottom: '15px',
                      color: '#333'
                    }}>
                      Job Fit
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      {Object.entries(candidate.jobFit).map(([category, roles]) => (
                        <div key={category}>
                          <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                            {category}
                          </h4>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {roles.map((role, idx) => (
                              <span
                                key={`${category}-${idx}`}
                                style={{
                                  backgroundColor: '#f0f0f0',
                                  color: '#333',
                                  padding: '8px 15px',
                                  borderRadius: '20px',
                                  fontSize: '13px',
                                  fontWeight: '500'
                                }}
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Training & Workshops Card */}
                {candidate.training?.length ? (
                  <div className="freelancer-language-card" style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    <h3 style={{ 
                      fontSize: '18px', 
                      fontWeight: 'bold', 
                      marginBottom: '15px',
                      color: '#333'
                    }}>
                      Training & Workshops
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {candidate.training.map((session, index) => (
                        <div key={`${session.name}-${index}`} style={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          fontSize: '14px',
                          color: '#333'
                        }}>
                          <i className="fa fa-book" style={{ marginRight: '10px', color: '#D36314' }}></i>
                          <span>{session.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <section className="newsletter-section candidate-newsletter">
            <div className="newsletter-text">
              <h4>Subscribe to receive job notifications.</h4>
              <p>Join our weekly Newsletter</p>
            </div>
            <form
              className="newsletter-form"
              onSubmit={(event) => {
                event.preventDefault();
                const email = event.target.elements.candidateNewsletter?.value;
                if (email) {
                  alert(`Thank you for subscribing with ${email}!`);
                  event.target.reset();
                }
              }}
            >
              <input
                type="email"
                name="candidateNewsletter"
                placeholder="Your Email"
                required
              />
              <button type="submit" className="candidate-btn primary">
                Subscribe
              </button>
            </form>
          </section>
        </div>
      </section>

      {showContactModal && (
        <div className="modal-backdrop" onClick={() => setShowContactModal(false)}>
          <div className="contact-modal" onClick={(event) => event.stopPropagation()}>
            <header>
              <h4>{candidate.name}</h4>
              <button type="button" className="close" onClick={() => setShowContactModal(false)}>×</button>
            </header>
            <div className="contact-modal-body">
              <div>
                <span className="stat-label">Location</span>
                <p>{candidate.location || 'Not provided'}</p>
              </div>
              <div>
                <span className="stat-label">Phone</span>
                <p>{candidate.phone || 'No data'}</p>
              </div>
              <div>
                <span className="stat-label">Email</span>
                <p>{candidate.email || 'No data'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer onLoginClick={() => setShowLoginModal(true)} />
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
};

export default CandidateProfile;
