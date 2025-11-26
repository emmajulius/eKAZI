import React from 'react';
import { useNavigate } from 'react-router-dom';
import { candidatesData } from '../data';

const FeaturedCandidates = () => {
  const navigate = useNavigate();

  const handleHireCandidate = (candidateId) => {
    alert(`Hire functionality for candidate ID ${candidateId} would be implemented here.`);
  };

  const handleViewProfile = (candidateId) => {
    navigate(`/candidate/${candidateId}`);
  };

  return (
    <section className="featured-candidates" id="candidates">
      <div className="container">
        <h4 className="d-flex font-weight-bold justify-content-center blue featured-candidates-title">
          Featured Candidate
        </h4>
        <br />
        <div className="row featured-card-row">
          {candidatesData.map((candidate) => (
            <div key={candidate.id} className="col-md-4" style={{ marginTop: '-5px' }}>
              <div className="card" style={{ width: '100%', paddingTop: '15px', minHeight: 'auto' }}>
                <div className="card-body" style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column' }}>
                  <div className="row align-items-center" style={{ marginLeft: 0, marginRight: 0, marginBottom: '0.75rem' }}>
                    <div className="col-4 col-md-3 text-center" style={{ paddingLeft: 0, paddingRight: 0 }}>
                      <img 
                        alt="Applicant Image" 
                        src={candidate.image || './assets/images/default.png'} 
                        style={{ 
                          transition: 'height 2s ease-in-out', 
                          maxWidth: '80px', 
                          height: 'auto', 
                          borderRadius: 0 
                        }}
                        onError={(e) => {
                          e.target.src = './assets/images/default.png';
                        }}
                      />
                    </div>
                    <div className="col-8 col-md-9 mt-2" style={{ paddingLeft: '15px', paddingRight: 0 }}>
                      <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
                        <h5 className="blue font-weight-bold text-with-dots" style={{ textTransform: 'capitalize', fontSize: '14px', margin: 0 }}>
                          {candidate.name}
                        </h5>
                      </div>
                      <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
                        <h6 className="font-weight-normal text-with-dots" style={{ margin: 0 }}>
                          {candidate.position}
                        </h6>
                      </div>
                      <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
                        <div className="text-with-dots" style={{ color: '#2E91C5', fontSize: '12px' }}>
                          {candidate.location}
                        </div>
                      </div>
                      <div className="row" style={{ paddingLeft: '2%', marginLeft: 0, marginRight: 0 }}>
                        <span className="text-with-dots" style={{ color: '#D36314', fontSize: '12px' }}>
                          {candidate.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="candidate-actions-row" style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '0.5rem', padding: 0 }}>
                    <div className="candidate-action-item" style={{ flex: 1, textAlign: 'center', padding: '0 3px' }}>
                      <a 
                        href={`/candidate/${candidate.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleViewProfile(candidate.id);
                        }}
                        style={{ fontSize: '11px', textDecoration: 'underline', color: '#2E58A6', whiteSpace: 'nowrap', cursor: 'pointer' }}
                      >
                        View Profile
                      </a>
                    </div>
                    <div className="candidate-action-item" style={{ flex: 1, textAlign: 'center', padding: '0 3px' }}>
                      <a 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          handleHireCandidate(candidate.id);
                        }}
                        style={{ fontSize: '11px', textDecoration: 'underline', color: '#2E58A6', whiteSpace: 'nowrap' }}
                      >
                        Hire Me
                      </a>
                    </div>
                    <div className="candidate-action-item" style={{ flex: 1, textAlign: 'center', padding: '0 3px' }}>
                      <a style={{ fontSize: '11px', textDecoration: 'none', color: '#2E58A6', whiteSpace: 'nowrap' }}>
                        Score
                        <i className="fa fa-star" style={{ color: '#D36314' }}></i>
                      </a>
                    </div>
                    <div className="candidate-action-item" style={{ flex: 1, textAlign: 'center', padding: '0 3px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}>
                      <i className="fa fa-eye" style={{ color: '#D36314', cursor: 'pointer' }}></i>
                      <span style={{ fontSize: '11px' }}>{candidate.views}</span>
                    </div>
                    <div className="candidate-action-item" style={{ flex: 1, textAlign: 'center', padding: '0 3px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}>
                      <i className="fa fa-thumbs-up" style={{ color: '#D36314', cursor: 'pointer' }} title="Please Sign In"></i>
                      <span style={{ fontSize: '11px' }}>0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="browse-all">
          <a href="#" className="btn-browse-all">Browse All</a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCandidates;

