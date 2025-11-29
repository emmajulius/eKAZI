import React from 'react';
import { useNavigate } from 'react-router-dom';
import { freelancersData } from '../data';

const FeaturedFreelancers = () => {
  const navigate = useNavigate();

  const handleHireFreelancer = (freelancerId) => {
    alert(`Hire functionality for freelancer ID ${freelancerId} would be implemented here.`);
  };

  const handleViewProfile = (freelancerId) => {
    navigate(`/freelancer/${freelancerId}`);
  };

  return (
    <section className="featured-freelancers" id="freelancers">
      <div className="container">
        <h4 className="d-flex font-weight-bold justify-content-center blue featured-freelancers-title">
          Featured Freelancers
        </h4>
        <br />
        <div className="row featured-freelancer-card-row">
          {freelancersData.map((freelancer) => (
            <div key={freelancer.id} className="col-md-4" style={{ marginTop: '-5px', marginBottom: '20px' }}>
              <div className="card freelancer-card" style={{ width: '100%', paddingTop: '15px', minHeight: 'auto', position: 'relative', border: '1px solid #e0e0e0' }}>
                <div className="card-body" style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  <div className="row align-items-center" style={{ marginLeft: 0, marginRight: 0, marginBottom: '0.75rem' }}>
                    <div className="col-4 col-md-3 text-center" style={{ paddingLeft: 0, paddingRight: 0 }}>
                      <img 
                        alt="Freelancer Image" 
                        src={freelancer.image || '/assets/images/pas1.png'} 
                        style={{ 
                          width: '90px',
                          height: '90px',
                          borderRadius: '12px',
                          objectFit: 'cover',
                          backgroundColor: '#E3F2FD',
                          display: 'block',
                          margin: '0 auto'
                        }}
                        onError={(e) => {
                          e.target.src = '/assets/images/pas1.png';
                        }}
                      />
                    </div>
                    <div className="col-8 col-md-9 mt-2" style={{ paddingLeft: '15px', paddingRight: 0 }}>
                      <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
                        <h5 className="blue font-weight-bold" style={{ textTransform: 'uppercase', fontSize: '14px', margin: 0, color: '#333' }}>
                          {freelancer.name}
                        </h5>
                      </div>
                      <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
                        <h6 className="font-weight-normal" style={{ margin: 0, color: '#333', fontSize: '13px' }}>
                          {freelancer.profession}
                        </h6>
                      </div>
                      <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
                        <div style={{ color: '#666', fontSize: '12px' }}>
                          {freelancer.location}
                        </div>
                      </div>
                      <div className="row" style={{ paddingLeft: '2%', marginLeft: 0, marginRight: 0 }}>
                        <span style={{ color: '#D36314', fontSize: '12px', fontWeight: '500' }}>
                          {freelancer.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="freelancer-actions-row" style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '0.5rem', padding: 0 }}>
                    <div className="freelancer-action-item" style={{ flex: 1, textAlign: 'center', padding: '0 3px' }}>
                      <a 
                        href={`/freelancer/${freelancer.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleViewProfile(freelancer.id);
                        }}
                        style={{ fontSize: '11px', textDecoration: 'underline', color: '#333', whiteSpace: 'nowrap', cursor: 'pointer' }}
                      >
                        View Profile
                      </a>
                    </div>
                    <div className="freelancer-action-item" style={{ flex: 1, textAlign: 'center', padding: '0 3px' }}>
                      <a 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          handleHireFreelancer(freelancer.id);
                        }}
                        style={{ fontSize: '11px', textDecoration: 'underline', color: '#333', whiteSpace: 'nowrap', cursor: 'pointer' }}
                      >
                        Hire Me
                      </a>
                    </div>
                    <div className="freelancer-action-item" style={{ flex: 1, textAlign: 'center', padding: '0 3px', marginRight: '20px' }}>
                      <span style={{ fontSize: '11px', color: '#333', whiteSpace: 'nowrap' }}>
                        Rating
                        {Array.from({ length: 3 }).map((_, i) => (
                          <i key={i} className="fa fa-star" style={{ color: '#D36314', marginLeft: '3px' }}></i>
                        ))}
                      </span>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                    <i className="fa fa-heart" style={{ color: '#D36314', cursor: 'pointer', fontSize: '16px' }}></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="browse-all-freelancers" style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href="#" className="btn-browse-all-freelancers" style={{ 
            backgroundColor: '#D36314', 
            color: '#fff', 
            padding: '10px 30px', 
            borderRadius: '5px', 
            textDecoration: 'none', 
            display: 'inline-block',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Browse All
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedFreelancers;

