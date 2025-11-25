import React, { useState } from 'react';
import { jobsData } from '../data';

const AllJobs = () => {
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('More jobs would be loaded here. This is a demo.');
    }, 1000);
  };

  const handleViewJob = (jobId) => {
    const job = jobsData.find(j => j.id === jobId);
    if (job) {
      alert(`Job Details:\n\nTitle: ${job.title}\nCompany: ${job.company}\nType: ${job.type}\nLocation: ${job.location}\nDeadline: ${job.deadline}\nIndustry: ${job.industry}\nViews: ${job.views}`);
    }
  };

  return (
    <section className="all-jobs" id="jobs">
      <div className="container">
        <h4 className="all-jobs-title">All Jobs</h4>
        <br />
        <div className="jobs-list">
          <div className="row">
            {jobsData.map((job) => (
              <div key={job.id} className="col-md-4 job-card-wrapper">
                <div className="card job-card-item">
                  <div className="card-body">
                    <div className="row">
                      <div className="d-flex justify-content-between job-header-row">
                        <div className="p-2">
                          <img 
                            alt={job.company} 
                            src="/assets/images/060805212930610b8585690db_emcl_logo.png" 
                            className="company-logo-img"
                            onError={(e) => {
                              e.target.src = '/assets/images/default.png';
                            }}
                          />
                        </div>
                        <div className="p-2">
                          <button className="job-type-btn">{job.type}</button>
                        </div>
                      </div>
                    </div>
                    <div className="row job-title-row">
                      <h6 className="font-weight-bold job-title-text">
                        <b>{job.title}</b>
                      </h6>
                      <h5 className="job-company-text">{job.company}</h5>
                    </div>
                    <div className="row job-details-row">
                      <p className="job-details-text">
                        Job Type: {job.type}<br />
                        <span className="job-info-2">Location: {job.location}</span><br />
                        <b style={{ color: '#2E58A6' }}>Deadline : </b>{job.deadline}<br />
                        Industry: {job.industry}
                      </p>
                    </div>
                  </div>
                  <div className="card-footer bg-white job-footer">
                    <div className="job-footer-actions">
                      <a 
                        href="#" 
                        className="job-footer-link" 
                        onClick={(e) => {
                          e.preventDefault();
                          handleViewJob(job.id);
                        }}
                      >
                        Show
                      </a>
                      <div className="job-footer-item">
                        <i className="fa fa-eye job-icon" aria-hidden="true"></i>
                        <span>{job.views}</span>
                      </div>
                      <div className="job-footer-item">
                        <i className="fa fa-heart job-icon" aria-hidden="true"></i>
                        <span>0</span>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
              </div>
            ))}
          </div>
        </div>
        <div className="load-more-container">
          <div className="col-md-12 text-center justify-content-center">
            <button 
              className="btn btn-primary btn-lg shadow-sm load-more-btn" 
              onClick={handleLoadMore}
            >
              Load More Jobs
            </button>
            {loading && (
              <div className="please-wait" style={{ display: 'block' }}>
                <i className="fa fa-spinner fa-spin fa-2x fa-fw"></i> Please Wait
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllJobs;

