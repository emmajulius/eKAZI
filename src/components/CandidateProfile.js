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
  const candidate = fullCandidatesData[Number(id)];

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
    skillsRating: candidate.profileAssessment?.skillsRating ?? 0,
    average: candidate.profileAssessment?.averageRating ?? candidate.profileAssessment?.average ?? 0
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
      <div className="skills-row" key={label}>
        <div className="skills-row-label">{label}</div>
        <div className="skills-row-value">{values.join(', ')}</div>
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
          <div className="modern-card profile-header-card">
            <div className="card-header">
              <div className="card-icon">
                <i className="fa fa-user-circle"></i>
              </div>
              <h3 className="card-title">Profile Overview</h3>
            </div>
            <div className="card-content">
              <div className="profile-header-content">
                <div className="profile-image-wrapper">
                  <div className="profile-image-frame">
                    <img
                      src={candidate.image || './assets/images/default.png'}
                      alt={candidate.name}
                      className="profile-avatar"
                      onError={handleImageError}
                    />
                    <div className="profile-image-badge">
                      <i className="fa fa-check-circle"></i>
                    </div>
                  </div>
                </div>
                <div className="profile-main-info">
                  <h2 className="profile-name">{candidate.name}</h2>
                  <div className="profile-position">
                    <i className="fa fa-briefcase"></i>
                    <span>{candidate.position || 'No Position Records'}</span>
                  </div>
                  <button className="hire-me-btn" onClick={handleHireCandidate}>
                    <i className="fa fa-handshake"></i>
                    Hire Me
                  </button>
                </div>
              </div>
              <div className="profile-details-grid">
                <div className="profile-detail-item">
                  <div className="detail-icon location">
                    <i className="fa fa-map-marker-alt"></i>
                  </div>
                  <div className="detail-content">
                    <span className="detail-label">Location</span>
                    <span className="detail-value">
                      {candidate.location ? `${candidate.location}, Tanzania` : 'Not specified'}
                    </span>
                  </div>
                </div>
                <div className="profile-detail-item">
                  <div className="detail-icon contacts">
                    <i className="fa fa-phone"></i>
                  </div>
                  <div className="detail-content">
                    <span className="detail-label">Contacts</span>
                    <div className="detail-contacts">
                      {candidate.phone && (
                        <span className="contact-item">
                          <i className="fa fa-phone"></i> {candidate.phone}
                        </span>
                      )}
                      {candidate.email && (
                        <span className="contact-item">
                          <i className="fa fa-envelope"></i> {candidate.email}
                        </span>
                      )}
                      {!candidate.phone && !candidate.email && (
                        <span className="detail-value">No contact info</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="profile-detail-item">
                  <div className="detail-icon institute">
                    <i className="fa fa-university"></i>
                  </div>
                  <div className="detail-content">
                    <span className="detail-label">Institute</span>
                    <span className="detail-value">
                      {educationPrimary ? educationPrimary.institution : 'Not specified'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="candidate-content-grid">
            <div className="content-main-column">
              <div className="modern-card about-card">
                <div className="card-header">
                  <div className="card-icon">
                    <i className="fa fa-user-circle"></i>
                  </div>
                  <h3 className="card-title">About</h3>
                </div>
                <div className="card-content">
                  <p className="about-text">{candidate.about || 'No about information available.'}</p>
            {candidate.careerObjectives && (
                    <div className="career-objectives-block">
                      <h4 className="subsection-title">
                        <i className="fa fa-bullseye"></i> Career Objectives
                      </h4>
                <p>{candidate.careerObjectives}</p>
              </div>
            )}
                </div>
              </div>

              <div className="modern-card experience-card">
                <div className="card-header">
                  <div className="card-icon">
                    <i className="fa fa-briefcase"></i>
                  </div>
                  <h3 className="card-title">Professional Experience</h3>
                </div>
                <div className="card-content">
                  {candidate.experience?.length ? (
                    <div className="experience-timeline">
                      {candidate.experience.map((experience, index) => (
                        <div className="timeline-item" key={`${experience.title}-${index}`}>
                          <div className="timeline-marker"></div>
                          <div className="timeline-content">
                            <div className="experience-title-row">
                              <h4 className="experience-title">{experience.title}</h4>
                              <span className="experience-badge">{experience.period}</span>
                            </div>
                            <div className="experience-company-row">
                              <span className="experience-company">
                                <i className="fa fa-building"></i> {experience.company}
                              </span>
                              {experience.location && (
                                <span className="experience-location">
                                  <i className="fa fa-map-marker"></i> {experience.location}
                                </span>
                              )}
                            </div>
                            {experience.industry && (
                              <span className="experience-industry">
                                <i className="fa fa-industry"></i> {experience.industry}
                              </span>
                            )}
                            {experience.description && (
                              <p className="experience-description">{experience.description}</p>
                            )}
                  {experience.responsibilities?.length ? (
                              <div className="responsibilities-list">
                                <h5 className="responsibilities-title">Key Responsibilities:</h5>
                                <ul>
                      {experience.responsibilities.map((item, idx) => (
                                    <li key={`${experience.title}-resp-${idx}`}>
                                      <i className="fa fa-check-circle"></i> {item}
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
                    <p className="no-data-message">No work experience records available.</p>
                  )}
                </div>
              </div>

              <div className="modern-card education-card">
                <div className="card-header">
                  <div className="card-icon">
                    <i className="fa fa-graduation-cap"></i>
                  </div>
                  <h3 className="card-title">Education</h3>
                </div>
                <div className="card-content">
            {candidate.education?.length ? (
                    <div className="education-list">
                      {candidate.education.map((education, index) => (
                        <div className="education-item" key={`${education.institution}-${index}`}>
                          <div className="education-header">
                            <h4 className="education-institution">
                              <i className="fa fa-university"></i> {education.institution}
                            </h4>
                            {education.year && (
                              <span className="education-year">{education.year}</span>
                            )}
                          </div>
                  <p className="education-degree">
                            <i className="fa fa-certificate"></i> {education.degree}
                  </p>
                          {education.description && (
                            <p className="education-description">{education.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-data-message">No education records available.</p>
                  )}
                </div>
              </div>

          {candidate.skills ? (
                <div className="modern-card skills-card">
                  <div className="card-header">
                    <div className="card-icon">
                      <i className="fa fa-star"></i>
                    </div>
                    <h3 className="card-title">Skills & Endorsements</h3>
                  </div>
                  <div className="card-content">
                    <div className="skills-categories">
                {renderSkillsRow('Culture Fit', candidate.skills.cultureFit)}
                {renderSkillsRow('Personality', candidate.skills.personality)}
                {renderSkillsRow('Skills & Knowledge', candidate.skills.skillsKnowledge)}
                {renderSkillsRow('Software', candidate.skills.software)}
                {renderSkillsRow('Tools', candidate.skills.tools)}
              </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="content-sidebar-column">
              {candidate.certifications?.length ? (
                <div className="modern-card certifications-card">
                  <div className="card-header">
                    <div className="card-icon">
                      <i className="fa fa-certificate"></i>
                    </div>
                    <h3 className="card-title">Certifications</h3>
                  </div>
                  <div className="card-content">
                    <div className="certifications-list">
                      {candidate.certifications.map((certification, index) => (
                        <div className="certification-item" key={`${certification.name}-${index}`}>
                          <i className="fa fa-check-circle"></i>
                          <span>{certification.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {candidate.training?.length ? (
                <div className="modern-card training-card">
                  <div className="card-header">
                    <div className="card-icon">
                      <i className="fa fa-chalkboard-teacher"></i>
                    </div>
                    <h3 className="card-title">Training & Workshops</h3>
                  </div>
                  <div className="card-content">
                    <div className="training-list">
                      {candidate.training.map((session, index) => (
                        <div className="training-item" key={`${session.name}-${index}`}>
                          <i className="fa fa-book"></i>
                          <span>{session.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {languages.length ? (
                <div className="modern-card languages-card">
                  <div className="card-header">
                    <div className="card-icon">
                      <i className="fa fa-language"></i>
                    </div>
                    <h3 className="card-title">Languages</h3>
                  </div>
                  <div className="card-content">
                    <div className="languages-tags">
                      {languages.map((language, index) => (
                        <span className="language-badge" key={`${language.name}-${index}`}>
                          {language.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
          ) : null}

          {candidate.jobFit && Object.keys(candidate.jobFit).length ? (
                <div className="modern-card jobfit-card">
                  <div className="card-header">
                    <div className="card-icon">
                      <i className="fa fa-briefcase"></i>
                    </div>
                    <h3 className="card-title">Job Fit</h3>
                  </div>
                  <div className="card-content">
                    <div className="jobfit-categories">
              {Object.entries(candidate.jobFit).map(([category, roles]) => (
                        <div className="jobfit-category" key={category}>
                          <h4 className="jobfit-category-title">{category}</h4>
                          <div className="jobfit-roles">
                            {roles.map((role, idx) => (
                              <span className="jobfit-role-tag" key={`${category}-${idx}`}>
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
          ) : null}

              <div className="modern-card assessment-card">
                <div className="card-header">
                  <div className="card-icon">
                    <i className="fa fa-chart-line"></i>
                  </div>
                  <h3 className="card-title">Profile Assessment</h3>
                </div>
                <div className="card-content">
                  <div className="assessment-stats-grid">
                    <div className="assessment-stat-item">
                      <div className="stat-icon views">
                        <i className="fa fa-eye"></i>
                      </div>
                      <div className="stat-info">
                        <span className="stat-label">Views</span>
                        <span className="stat-value">{stats.views}</span>
                      </div>
                    </div>
                    <div className="assessment-stat-item">
                      <div className="stat-icon likes">
                        <i className="fa fa-thumbs-up"></i>
              </div>
                      <div className="stat-info">
                        <span className="stat-label">Likes</span>
                        <button type="button" className="stat-value-btn" onClick={handleLikeClick}>
                          {stats.likes}
                </button>
              </div>
                    </div>
                    <div className="assessment-stat-item rating-item">
                      <div className="stat-icon rating">
                        <i className="fa fa-star"></i>
                      </div>
                      <div className="stat-info">
                        <span className="stat-label">Rating</span>
                        <button type="button" className="stat-rating-btn" onClick={handleRateClick}>
                          <span className="rating-score">{ratingValue}</span>
                          <span className="rating-stars-display">{renderRatingStars()}</span>
                          <span className="rating-count">({ratingCount})</span>
                </button>
              </div>
            </div>
                  </div>
                  <div className="assessment-scores">
                    <div className="score-card">
                      <div className="score-icon">
                        <i className="fa fa-trophy"></i>
                      </div>
                      <div className="score-details">
                        <span className="score-label">Skills Score</span>
                        <span className="score-value">{stats.skillsRating}</span>
                      </div>
                    </div>
                    <div className="score-card">
                      <div className="score-icon">
                        <i className="fa fa-chart-bar"></i>
                      </div>
                      <div className="score-details">
                        <span className="score-label">Average Rating</span>
                        <span className="score-value">{stats.average}</span>
                      </div>
                    </div>
                  </div>
              </div>
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
