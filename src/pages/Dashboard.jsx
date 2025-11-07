import React from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api.js";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Dashboard() {
  const [topSearch, setTopSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleTopSearch = async () => {
    setLoading(true);
    try {
      const res = await api.get("/images/top-searches");
      setTopSearch(res?.data);
    } catch (e) {
      console.log("top error: ", e?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container py-5">
      {/* Header */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="display-4 fw-bold mb-3">Dashboard</h1>
          <p className="lead text-muted">Manage your images and explore popular searches</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card card-hover h-100 text-center p-4">
            <div className="icon-circle gradient-bg text-white mx-auto mb-3">
              <i className="bi bi-images"></i>
            </div>
            <h5 className="fw-bold mb-3">View Gallery</h5>
            <p className="text-muted mb-4">Browse and manage all your uploaded images</p>
            <button 
              onClick={() => navigate("/allimages")}
              className="btn btn-gradient rounded-pill px-4"
            >
              <i className="bi bi-arrow-right me-2"></i>
              View All Images
            </button>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card card-hover h-100 text-center p-4">
            <div className="icon-circle text-white mx-auto mb-3" style={{background: 'var(--secondary-gradient)'}}>
              <i className="bi bi-clock-history"></i>
            </div>
            <h5 className="fw-bold mb-3">Search History</h5>
            <p className="text-muted mb-4">Review your recent search activities</p>
            <button 
              onClick={() => navigate("/history")}
              className="btn btn-gradient rounded-pill px-4"
            >
              <i className="bi bi-arrow-right me-2"></i>
              View History
            </button>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card card-hover h-100 text-center p-4">
            <div className="icon-circle text-white mx-auto mb-3" style={{background: 'var(--success-gradient)'}}>
              <i className="bi bi-trending-up"></i>
            </div>
            <h5 className="fw-bold mb-3">Top Searches</h5>
            <p className="text-muted mb-4">Discover what others are searching for</p>
            <button 
              onClick={handleTopSearch}
              className="btn btn-gradient rounded-pill px-4"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Loading...
                </>
              ) : (
                <>
                  <i className="bi bi-search me-2"></i>
                  Load Top Searches
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Top Searches Results */}
      {topSearch.length > 0 && (
        <div className="row">
          <div className="col-12">
            <div className="card card-hover">
              <div className="card-header gradient-bg text-white">
                <h5 className="mb-0">
                  <i className="bi bi-fire me-2"></i>
                  Popular Search Terms
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  {topSearch.map((s, index) => (
                    <div key={s?.term} className="col-md-6 col-lg-4">
                      <Link
                        to={`/allimages?search=${s?.term}`}
                        className="text-decoration-none"
                      >
                        <div className="card border-0 bg-light card-hover h-100">
                          <div className="card-body d-flex align-items-center">
                            <div className="me-3">
                              <div className="badge bg-primary rounded-pill fs-6">
                                #{index + 1}
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="fw-bold mb-1 text-dark">{s?.term}</h6>
                              <small className="text-muted">
                                <i className="bi bi-search me-1"></i>
                                {s?.count} searches
                              </small>
                            </div>
                            <div>
                              <i className="bi bi-arrow-right text-primary"></i>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
