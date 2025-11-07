import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section text-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h1 className="display-3 fw-bold mb-4">
                Welcome to <span className="text-warning">ImageVault</span>
              </h1>
              <p className="lead mb-5">
                Your ultimate destination for storing, organizing, and sharing beautiful images. 
                Upload, search, and manage your photo collection with ease.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Link to="/form" className="btn btn-light btn-lg rounded-pill px-4">
                  <i className="bi bi-cloud-upload me-2"></i>
                  Start Uploading
                </Link>
                <Link to="/allimages" className="btn btn-outline-light btn-lg rounded-pill px-4">
                  <i className="bi bi-images me-2"></i>
                  Browse Gallery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-12">
              <h2 className="display-5 fw-bold mb-3">Why Choose ImageVault?</h2>
              <p className="lead text-muted">Powerful features to manage your images efficiently</p>
            </div>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="stats-card card-hover h-100">
                <div className="icon-circle gradient-bg text-white">
                  <i className="bi bi-cloud-upload"></i>
                </div>
                <h4 className="fw-bold mb-3">Easy Upload</h4>
                <p className="text-muted">
                  Drag and drop or click to upload your images instantly. 
                  Support for multiple formats with automatic optimization.
                </p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="stats-card card-hover h-100">
                <div className="icon-circle" style={{background: 'var(--secondary-gradient)'}}>
                  <i className="bi bi-search text-white"></i>
                </div>
                <h4 className="fw-bold mb-3">Smart Search</h4>
                <p className="text-muted">
                  Find your images quickly with our intelligent search system. 
                  Search by tags, titles, or upload dates.
                </p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="stats-card card-hover h-100">
                <div className="icon-circle" style={{background: 'var(--success-gradient)'}}>
                  <i className="bi bi-shield-check text-white"></i>
                </div>
                <h4 className="fw-bold mb-3">Secure Storage</h4>
                <p className="text-muted">
                  Your images are stored securely with backup protection. 
                  Access your collection from anywhere, anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5" style={{background: 'var(--dark-gradient)'}}>
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <h3 className="text-white mb-4">Ready to Get Started?</h3>
              <p className="text-light mb-4">
                Join thousands of users who trust ImageVault for their photo storage needs.
              </p>
              <Link to="/auth" className="btn btn-light btn-lg rounded-pill px-5">
                <i className="bi bi-person-plus me-2"></i>
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
