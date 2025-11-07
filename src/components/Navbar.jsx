// components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark gradient-bg shadow-lg py-3 sticky-top">
      <div className="container">
        {/* Logo / Brand */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <i className="bi bi-camera-fill me-2 fs-3"></i>
          <span className="fs-4">ImageVault</span>
        </Link>

        {/* Toggler for Mobile */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1">
            <li className="nav-item">
              <Link className="nav-link px-3 py-2 rounded-pill" to="/">
                <i className="bi bi-house me-1"></i> Home
              </Link>
            </li>
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link px-3 py-2 rounded-pill" to="/dashboard">
                    <i className="bi bi-speedometer2 me-1"></i> Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3 py-2 rounded-pill" to="/allimages">
                    <i className="bi bi-images me-1"></i> Gallery
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3 py-2 rounded-pill" to="/form">
                    <i className="bi bi-plus-circle me-1"></i> Upload
                  </Link>
                </li>
                <li className="nav-item ms-2">
                  <button
                    className="btn btn-outline-light btn-sm rounded-pill px-3"
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/auth");
                    }}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i> Logout
                  </button>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <li className="nav-item ms-2">
                <Link className="btn btn-outline-light btn-sm rounded-pill px-4" to="/auth">
                  <i className="bi bi-person-circle me-1"></i> Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
