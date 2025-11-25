import React from 'react';

const JobTitles = () => {
  const jobTitles = [
    { title: 'Tracking officer', subtitle: 'Assistant Operation Manager' },
    { title: 'Logistics', subtitle: 'Logistics' },
    { title: 'Logistics', subtitle: 'Fleet manager' }
  ];

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <div className="row">
        {jobTitles.map((job, index) => (
          <div key={index} className="col-md-4" id={index === 0 ? "subfooter" : ""} style={{ fontSize: '1.1em !important', textAlign: 'center' }}>
            <i className="fa fa-check-circle fa-2x" style={{ color: '#D36314' }}></i>
            <br />
            <a href="#searching" style={{ textDecoration: 'none', color: 'inherit' }}>
              <b style={{ color: '#2E58A6' }}>{job.title}</b>
              <br />
              <p style={{ color: '#2E58A6' }}>{job.subtitle}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobTitles;

