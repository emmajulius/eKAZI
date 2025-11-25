import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with ${email}!`);
      setEmail('');
    }
  };

  return (
    <div className="row" style={{ backgroundColor: 'transparent', zIndex: 1, paddingTop: '20px', paddingBottom: '40px' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center">
            <h5 style={{ color: '#2E58A6', marginBottom: '10px' }}>Subscribe to receive job notifications.</h5>
            <p style={{ fontSize: '1.1em !important', color: '#333' }}>Join our weekly Newsletter</p>
          </div>
          <div className="col-md-6">
            <form 
              className="form-inline d-flex align-items-center justify-content-center" 
              onSubmit={handleSubmit}
            >
              <div className="form-group mb-2" style={{ flex: '1', minWidth: '200px' }}>
                <input 
                  className="form-control" 
                  placeholder="Your Email" 
                  required 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', minWidth: '200px' }}
                />
              </div>
              <div className="form-group mb-2" style={{ marginLeft: '12px' }}>
                <button 
                  className="btn btn-primary" 
                  type="submit" 
                  style={{ color: '#fff', backgroundColor: '#D36314', border: 'none', whiteSpace: 'nowrap' }}
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;

