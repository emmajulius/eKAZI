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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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
    event.target.src = '/assets/images/default.png';
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
        <div className="featured-banner">
          <p>Featured Candidate</p>
        </div>

        <div className="candidate-shell">
          <div className="candidate-header-card">
            <div className="candidate-header-top">
              <img
                src={candidate.image || '/assets/images/default.png'}
                alt={candidate.name}
                className="candidate-avatar"
                onError={handleImageError}
              />
              <div>
                <p className="candidate-label">Profile overview</p>
                <h2>{candidate.name}</h2>
                <p className="candidate-role">{candidate.position || 'No Position Records'}</p>
              </div>
            </div>
            <div className="candidate-header-actions">
              <button className="candidate-btn primary" onClick={handleHireCandidate}>Hire Me</button>
              <div className="candidate-pill">
                {candidate.location ? `${candidate.location}, Tanzania` : 'Location not specified'}
              </div>
              <button className="candidate-btn ghost" onClick={handleContactCandidate}>Contact Info</button>
              <div className="candidate-pill">
                {educationPrimary ? educationPrimary.institution : 'Education info unavailable'}
              </div>
            </div>
          </div>

          <section className="candidate-section">
            <h3>About</h3>
            <div className="section-divider" />
            <p>{candidate.about || 'No about information available.'}</p>
            {candidate.careerObjectives && (
              <div className="section-block">
                <h4>Career Objectives</h4>
                <p>{candidate.careerObjectives}</p>
              </div>
            )}
          </section>

          <section className="candidate-section">
            <h3>Experience</h3>
            <div className="section-divider" />
            {candidate.experience?.length ? (
              candidate.experience.map((experience, index) => (
                <div className="experience-entry" key={`${experience.title}-${index}`}>
                  <div className="experience-header">
                    <span className="experience-title">{experience.title}</span>
                    <span className="experience-company">{experience.company}</span>
                    <span className="experience-meta">
                      {experience.location && `${experience.location} • `}
                      {experience.industry || ''}
                    </span>
                    <span className="experience-meta">
                      {experience.period}
                      {experience.duration ? ` • ${experience.duration}` : ''}
                    </span>
                  </div>
                  {experience.description && <p className="experience-description">{experience.description}</p>}
                  {experience.responsibilities?.length ? (
                    <ul className="experience-responsibilities">
                      {experience.responsibilities.map((item, idx) => (
                        <li key={`${experience.title}-resp-${idx}`}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {index < candidate.experience.length - 1 && <div className="section-divider subtle" />}
                </div>
              ))
            ) : (
              <p>No work experience records available.</p>
            )}
          </section>

          <section className="candidate-section">
            <h3>Education</h3>
            <div className="section-divider" />
            {candidate.education?.length ? (
              candidate.education.map((education, index) => (
                <div className="education-entry" key={`${education.institution}-${index}`}>
                  <h4>{education.institution}</h4>
                  <p className="education-degree">
                    {education.degree}
                    {education.year ? ` • ${education.year}` : ''}
                  </p>
                  {education.description && <p>{education.description}</p>}
                </div>
              ))
            ) : (
              <p>No education records available.</p>
            )}
          </section>

          {candidate.certifications?.length ? (
            <section className="candidate-section">
              <h3>Proficiency Certifications</h3>
              <div className="section-divider" />
              <ul className="simple-list">
                {candidate.certifications.map((certification, index) => (
                  <li key={`${certification.name}-${index}`}>{certification.name}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {candidate.training?.length ? (
            <section className="candidate-section">
              <h3>Training &amp; Workshops</h3>
              <div className="section-divider" />
              <ul className="simple-list">
                {candidate.training.map((session, index) => (
                  <li key={`${session.name}-${index}`}>{session.name}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {languages.length ? (
            <section className="candidate-section">
              <h3>Languages</h3>
              <div className="section-divider" />
              <div className="languages-grid">
                {languages.map((language, index) => (
                  <InfoTag key={`${language.name}-${index}`}>{language.name}</InfoTag>
                ))}
              </div>
            </section>
          ) : null}

          {candidate.skills ? (
            <section className="candidate-section">
              <h3>Skills &amp; Endorsements</h3>
              <div className="section-divider" />
              <div className="skills-grid">
                {renderSkillsRow('Culture Fit', candidate.skills.cultureFit)}
                {renderSkillsRow('Personality', candidate.skills.personality)}
                {renderSkillsRow('Skills & Knowledge', candidate.skills.skillsKnowledge)}
                {renderSkillsRow('Software', candidate.skills.software)}
                {renderSkillsRow('Tools', candidate.skills.tools)}
              </div>
            </section>
          ) : null}

          {candidate.jobFit && Object.keys(candidate.jobFit).length ? (
            <section className="candidate-section">
              <h3>Job Fit</h3>
              <div className="section-divider" />
              {Object.entries(candidate.jobFit).map(([category, roles]) => (
                <div className="jobfit-group" key={category}>
                  <p className="jobfit-label">{category}</p>
                  <p className="jobfit-value">{roles.join(', ')}</p>
                </div>
              ))}
            </section>
          ) : null}

          <section className="candidate-section">
            <h3>Profile Assessment</h3>
            <div className="section-divider" />
            <div className="profile-assessment-row">
              <div className="profile-assessment-item">
                <p className="assessment-label">View</p>
                <i className="fa fa-eye assessment-icon" aria-hidden="true"></i>
                <span className="assessment-value">{stats.views}</span>
              </div>
              <div className="profile-assessment-item">
                <p className="assessment-label">Like</p>
                <button type="button" className="assessment-action" onClick={handleLikeClick}>
                  <i className="fa fa-thumbs-up assessment-icon" aria-hidden="true"></i>
                  <span className="assessment-value">{stats.likes}</span>
                </button>
              </div>
              <div className="profile-assessment-item rate">
                <p className="assessment-label">Rate</p>
                <button type="button" className="assessment-action" onClick={handleRateClick}>
                  <span className="assessment-score">{ratingValue}</span>
                  <span className="assessment-stars">{renderRatingStars()}</span>
                  <span className="assessment-count">({ratingCount})</span>
                </button>
              </div>
            </div>
            <div className="profile-assessment-meta">
              <div className="profile-meta-card">
                <span className="meta-label">Skills Score</span>
                <span className="meta-value">{stats.skillsRating}</span>
              </div>
              <div className="profile-meta-card">
                <span className="meta-label">Average Rating</span>
                <span className="meta-value">{stats.average}</span>
              </div>
            </div>
          </section>

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
