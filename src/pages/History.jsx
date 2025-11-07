import { api } from "../utils/api.js";
import { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/images/history");
        setHistory(res.data);
      } catch (e) {
        console.log("Error fetching history:", e?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h1 className="display-4 fw-bold mb-3">
            <i className="bi bi-clock-history me-3"></i>
            Search History
          </h1>
          <p className="lead text-muted">Track your recent search activities</p>
        </div>
      </div>

      {history && history.length > 0 ? (
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="card border-0 shadow-sm">
              <div className="card-header gradient-bg text-white">
                <h5 className="mb-0">
                  <i className="bi bi-list-ul me-2"></i>
                  Recent Searches ({history.length})
                </h5>
              </div>
              <div className="card-body p-0">
                {history.map((h, index) => (
                  <div key={h._id} className={`d-flex align-items-center p-3 ${index !== history.length - 1 ? 'border-bottom' : ''}`}>
                    <div className="me-3">
                      <div className="icon-circle bg-light text-primary" style={{width: '40px', height: '40px', fontSize: '1rem'}}>
                        <i className="bi bi-search"></i>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-1 fw-semibold">{h.term}</h6>
                      <small className="text-muted">
                        <i className="bi bi-calendar me-1"></i>
                        {new Date(h?.timestamp).toLocaleString()}
                      </small>
                    </div>
                    <div>
                      <span className="badge bg-primary rounded-pill">
                        #{index + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-12 text-center py-5">
            <div className="text-muted">
              <i className="bi bi-clock-history fs-1 d-block mb-3"></i>
              <h5>No Search History</h5>
              <p>Start searching for images to see your history here.</p>
              <a href="/allimages" className="btn btn-gradient">
                <i className="bi bi-search me-2"></i>
                Start Searching
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
