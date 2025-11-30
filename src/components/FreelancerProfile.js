import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import LoginModal from './LoginModal';
import { fullFreelancersData } from '../data';

const FreelancerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Profile');
  const freelancer = fullFreelancersData[Number(id)];

  const sentence1 = "Explore featured freelancers information";
  const sentence2 = "Discover skilled professionals ready to work on your projects";
  const sentence3 = "Connect with talented freelancers and build your dream team.";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const sentence1Words = sentence1.split(' ');
    const sentence2Words = sentence2.split(' ');
    const sentence3Words = sentence3.split(' ');
    const sentence1El = document.querySelector('.freelancer-profile-section .sentence-1');
    const sentence2El = document.querySelector('.freelancer-profile-section .sentence-2');
    const sentence3El = document.querySelector('.freelancer-profile-section .sentence-3');
    const caret = document.querySelector('.freelancer-profile-section .animated-caret');
    const container = document.querySelector('.freelancer-profile-section .animated-sentences');
    
    if (!sentence1El || !sentence2El || !sentence3El || !caret || !container) return;

    let currentSentence = 1;
    let expansionIndex = 0; // How many words expanded on each side from center
    let animationTimeout;

    // Split words into left and right halves from center
    const splitSentence = (words) => {
      const mid = Math.floor(words.length / 2);
      const isOdd = words.length % 2 === 1;
      
      if (isOdd) {
        return {
          center: [words[mid]],
          left: words.slice(0, mid),
          right: words.slice(mid + 1)
        };
      } else {
        return {
          center: [],
          left: words.slice(0, mid),
          right: words.slice(mid)
        };
      }
    };

    const positionCaretAtCenter = () => {
      if (!caret || !container) return;
      
      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.width / 2;
      
      caret.style.left = `${centerX}px`;
      caret.style.top = `${containerRect.height / 2 - 21}px`;
      caret.classList.add('active');
    };

    const updateCaretPosition = (element) => {
      if (!element || !caret || !container) return;
      
      const tempSpan = document.createElement('span');
      tempSpan.style.visibility = 'hidden';
      tempSpan.style.position = 'absolute';
      tempSpan.style.fontSize = window.getComputedStyle(element).fontSize;
      tempSpan.style.fontWeight = window.getComputedStyle(element).fontWeight;
      tempSpan.style.fontFamily = window.getComputedStyle(element).fontFamily;
      tempSpan.textContent = element.textContent;
      document.body.appendChild(tempSpan);
      
      const textWidth = tempSpan.offsetWidth;
      document.body.removeChild(tempSpan);
      
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      
      caret.style.left = `${elementRect.left - containerRect.left + textWidth + 4}px`;
      caret.style.top = `${elementRect.top - containerRect.top + elementRect.height / 2 - caret.offsetHeight / 2}px`;
      caret.classList.add('active');
    };

    const clearAllSentences = () => {
      sentence1El.textContent = '';
      sentence2El.textContent = '';
      sentence3El.textContent = '';
    };

    const buildBilateralText = (words, expansionIdx) => {
      const { center, left, right } = splitSentence(words);
      
      if (expansionIdx === 0) {
        // Show only center word(s) if exists
        const centerText = center.length > 0 ? center.join(' ') : '';
        return { fullText: centerText };
      }
      
      // Build text from center outward
      // Start with words from left side (working from center outward)
      const leftWordsToShow = Math.min(expansionIdx - 1, left.length);
      const rightWordsToShow = Math.min(expansionIdx - 1, right.length);
      
      const leftPart = left.slice(left.length - leftWordsToShow);
      const rightPart = right.slice(0, rightWordsToShow);
      
      // Combine: left part (reversed order) + center + right part
      const allWords = [...leftPart, ...center, ...rightPart];
      
      return { fullText: allWords.join(' ') };
    };

    const writeWord = () => {
      let words, sentenceEl, maxExpansion;
      
      if (currentSentence === 1) {
        words = sentence1Words;
        sentenceEl = sentence1El;
      } else if (currentSentence === 2) {
        words = sentence2Words;
        sentenceEl = sentence2El;
      } else {
        words = sentence3Words;
        sentenceEl = sentence3El;
      }

      const { center, left, right } = splitSentence(words);
      // maxExpansion: 1 (for center) + max words on either side
      maxExpansion = Math.max(left.length, right.length) + 1;

      if (expansionIndex === 0) {
        // Start at center
        clearAllSentences();
        positionCaretAtCenter();
        const result = buildBilateralText(words, 0);
        if (result.fullText) {
          sentenceEl.textContent = result.fullText;
          positionCaretAtCenter();
        }
        expansionIndex = 1;
        animationTimeout = setTimeout(writeWord, 300);
      } else {
        const result = buildBilateralText(words, expansionIndex);
        
        if (expansionIndex <= maxExpansion && result.fullText) {
          clearAllSentences();
          sentenceEl.textContent = result.fullText;
          updateCaretPosition(sentenceEl);
          expansionIndex++;
          animationTimeout = setTimeout(writeWord, 300);
        } else {
          // Sentence complete, wait then erase
          setTimeout(() => {
            eraseWord();
          }, 2000);
        }
      }
    };

    const eraseWord = () => {
      let words, sentenceEl;
      
      if (currentSentence === 1) {
        words = sentence1Words;
        sentenceEl = sentence1El;
      } else if (currentSentence === 2) {
        words = sentence2Words;
        sentenceEl = sentence2El;
      } else {
        words = sentence3Words;
        sentenceEl = sentence3El;
      }

      const { center, left, right } = splitSentence(words);
      const maxExpansion = Math.max(left.length, right.length) + (center.length > 0 ? 1 : 0);

      if (expansionIndex > 0) {
        expansionIndex--;
        clearAllSentences();
        
        if (expansionIndex === 0) {
          sentenceEl.textContent = '';
          caret.classList.remove('active');
          // Move to next sentence
          currentSentence = currentSentence === 3 ? 1 : currentSentence + 1;
          expansionIndex = 0;
          setTimeout(() => {
            positionCaretAtCenter();
            setTimeout(writeWord, 500);
          }, 500);
        } else {
          const result = buildBilateralText(words, expansionIndex);
          
          if (result.fullText) {
            sentenceEl.textContent = result.fullText;
            updateCaretPosition(sentenceEl);
          } else {
            sentenceEl.textContent = '';
            positionCaretAtCenter();
          }
          animationTimeout = setTimeout(eraseWord, 200);
        }
      }
    };

    // Start animation with cursor at center
    positionCaretAtCenter();
    setTimeout(writeWord, 500);

    return () => {
      caret?.classList.remove('active');
      if (animationTimeout) clearTimeout(animationTimeout);
    };
  }, [id, sentence1, sentence2, sentence3]);

  if (!freelancer) {
    return (
      <div className="container" style={{ marginTop: '120px', textAlign: 'center' }}>
        <h2>Freelancer not found</h2>
        <button className="candidate-btn primary" onClick={() => navigate('/')}>Go back home</button>
      </div>
    );
  }

  const handleMessage = () => {
    alert(`Message functionality for ${freelancer.name} would be implemented here.`);
  };

  const handleImageError = (event) => {
    event.target.src = './assets/images/Engineer_pass.jpg';
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return (
      <>
        {Array.from({ length: fullStars }).map((_, i) => (
          <i key={i} className="fa fa-star" style={{ color: '#FFA500' }}></i>
        ))}
        {hasHalfStar && <i className="fa fa-star-half-alt" style={{ color: '#FFA500' }}></i>}
        {Array.from({ length: 5 - Math.ceil(rating) }).map((_, i) => (
          <i key={`empty-${i}`} className="fa fa-star" style={{ color: '#ddd' }}></i>
        ))}
      </>
    );
  };

  return (
    <div>
      <Navbar 
        onLoginClick={() => setShowLoginModal(true)} 
        onRegisterClick={() => alert('Register flow handled on ekazi.co.tz')} 
      />

      <section className="freelancer-profile-section" style={{ padding: '40px 0', backgroundColor: '#f5f5f5', minHeight: '80vh' }}>
        <div className="candidate-shell">
          <div className="animated-writing-container">
            <div className="animated-sentences">
              <span className="sentence sentence-1"></span>
              <span className="sentence sentence-2"></span>
              <span className="sentence sentence-3"></span>
              <div className="animated-caret"></div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {/* Left Column */}
            <div className="col-md-4">
              {/* Main Profile Card */}
              <div className="freelancer-profile-card" style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <div style={{ marginBottom: '20px' }}>
                  <img
                    src={freelancer.image || './assets/images/Engineer_pass.jpg'}
                    alt={freelancer.name}
                    style={{
                      width: '150px',
                      height: '150px',
                      borderRadius: '12px',
                      objectFit: 'cover',
                      backgroundColor: '#E3F2FD',
                      marginBottom: '15px'
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
                  {freelancer.name}
                </h2>
                <p style={{ 
                  fontSize: '16px', 
                  color: '#666', 
                  marginBottom: '15px' 
                }}>
                  {freelancer.profession}
                </p>
                <div style={{ marginBottom: '20px' }}>
                  <span style={{
                    backgroundColor: '#D36314',
                    color: '#fff',
                    padding: '5px 15px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {freelancer.status}
                  </span>
                </div>
                <button
                  onClick={handleMessage}
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
                  Message
                </button>
              </div>

              {/* Contact/Completeness/Ratings Card */}
              <div className="freelancer-info-card" style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                    {freelancer.website}
                  </p>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', color: '#333' }}>Profile Completeness</span>
                    <span style={{ fontSize: '14px', color: '#333', fontWeight: '600' }}>{freelancer.profileCompleteness}%</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${freelancer.profileCompleteness}%`,
                      height: '100%',
                      backgroundColor: '#D36314',
                      transition: 'width 0.3s'
                    }}></div>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', color: '#333' }}>Ratings</span>
                    <span style={{ fontSize: '14px', color: '#333', fontWeight: '600' }}>{freelancer.rating}</span>
                  </div>
                  <div style={{ fontSize: '18px' }}>
                    {renderStars(freelancer.rating)}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '15px' }}>
                  <div style={{ marginBottom: '10px' }}>
                    <span style={{ fontSize: '14px', color: '#666' }}>Hourly Rate: </span>
                    <span style={{ fontSize: '14px', color: '#333', fontWeight: '600' }}>{freelancer.hourlyRate}</span>
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <span style={{ fontSize: '14px', color: '#666' }}>Age: </span>
                    <span style={{ fontSize: '14px', color: '#333', fontWeight: '600' }}>{freelancer.age}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '14px', color: '#666' }}>Experience: </span>
                    <span style={{ fontSize: '14px', color: '#333', fontWeight: '600' }}>{freelancer.experience}</span>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="freelancer-location-card" style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '20px',
                marginTop: '30px',
                marginBottom: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  marginBottom: '15px',
                  color: '#333'
                }}>
                  Location {freelancer.mapLocation?.address || `${freelancer.location}, Tanzania`}
                </h3>
                <div style={{ 
                  width: '100%', 
                  height: '300px', 
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid #e0e0e0'
                }}>
                  <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(freelancer.mapLocation?.address || `${freelancer.location}, Tanzania`)}&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                  ></iframe>
                </div>
              </div>

              {/* Social Media Accounts Card */}
              <div className="freelancer-social-card" style={{
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
                  Social Media Accounts
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {freelancer.socialMedia?.facebook && (
                    <a 
                      href={freelancer.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: '#333',
                        fontSize: '14px'
                      }}
                    >
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#1877F2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '12px',
                        flexShrink: 0
                      }}>
                        <i className="fa fa-facebook" style={{ color: '#fff', fontSize: '16px' }}></i>
                      </div>
                      <span>{freelancer.socialMedia.facebook}</span>
                    </a>
                  )}
                  {freelancer.socialMedia?.twitter && (
                    <a 
                      href={freelancer.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: '#333',
                        fontSize: '14px'
                      }}
                    >
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#1DA1F2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '12px',
                        flexShrink: 0
                      }}>
                        <i className="fa fa-twitter" style={{ color: '#fff', fontSize: '16px' }}></i>
                      </div>
                      <span>{freelancer.socialMedia.twitter}</span>
                    </a>
                  )}
                  {freelancer.socialMedia?.instagram && (
                    <a 
                      href={freelancer.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: '#333',
                        fontSize: '14px'
                      }}
                    >
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '12px',
                        flexShrink: 0
                      }}>
                        <i className="fa fa-instagram" style={{ color: '#fff', fontSize: '16px' }}></i>
                      </div>
                      <span>{freelancer.socialMedia.instagram}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-md-8">
              {/* Tabs Section */}
              <div className="freelancer-tabs-card" style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  borderBottom: '2px solid #e0e0e0',
                  marginBottom: '20px'
                }}>
                  <button
                    onClick={() => setActiveTab('Profile')}
                    style={{
                      padding: '10px 20px',
                      border: 'none',
                      backgroundColor: activeTab === 'Profile' ? '#f5f5f5' : 'transparent',
                      borderBottom: activeTab === 'Profile' ? '2px solid #D36314' : '2px solid transparent',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: activeTab === 'Profile' ? '600' : '400',
                      color: activeTab === 'Profile' ? '#D36314' : '#666',
                      marginRight: '10px'
                    }}
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => setActiveTab('Portfolio')}
                    style={{
                      padding: '10px 20px',
                      border: 'none',
                      backgroundColor: activeTab === 'Portfolio' ? '#f5f5f5' : 'transparent',
                      borderBottom: activeTab === 'Portfolio' ? '2px solid #D36314' : '2px solid transparent',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: activeTab === 'Portfolio' ? '600' : '400',
                      color: activeTab === 'Portfolio' ? '#D36314' : '#666',
                      marginRight: '10px'
                    }}
                  >
                    Portfolio
                  </button>
                  <button
                    onClick={() => setActiveTab('Ratings')}
                    style={{
                      padding: '10px 20px',
                      border: 'none',
                      backgroundColor: activeTab === 'Ratings' ? '#f5f5f5' : 'transparent',
                      borderBottom: activeTab === 'Ratings' ? '2px solid #D36314' : '2px solid transparent',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: activeTab === 'Ratings' ? '600' : '400',
                      color: activeTab === 'Ratings' ? '#D36314' : '#666'
                    }}
                  >
                    Ratings
                  </button>
                </div>
                <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.8' }}>
                  {activeTab === 'Profile' && (
                    <p>{freelancer.about}</p>
                  )}
                  {activeTab === 'Portfolio' && (
                    <p>{freelancer.portfolio}</p>
                  )}
                  {activeTab === 'Ratings' && (
                    <p>{freelancer.ratings}</p>
                  )}
                </div>
              </div>

              {/* Skills Card */}
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
                  Skills
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {freelancer.skills.map((skill, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: '#f0f0f0',
                        color: '#333',
                        padding: '8px 15px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '500'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Language Card */}
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
                  Language
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {freelancer.languages.map((language, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: '#f0f0f0',
                        color: '#333',
                        padding: '8px 15px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '500'
                      }}
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer onLoginClick={() => setShowLoginModal(true)} />
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </div>
  );
};

export default FreelancerProfile;

