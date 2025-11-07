import React from "react";
import { useState } from "react";
import { api } from "../utils/api.js";
import { useNavigate, useParams } from "react-router-dom";
export default function EditImages() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [images, setImages] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImages(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
  
  const handleUpdateImages = async (e) => {
    e.preventDefault();
    if (!images) {
      alert('Please select a new image to upload.');
      return;
    }
    
    setLoading(true);
    const formData = new FormData();
    formData.append("image", images);
    
    try {
      const res = await api.patch(`/images/${id}`, formData);
      console.log("image updated: ", res?.data);
      navigate(`/images/${id}`);
    } catch (e) {
      console.log("error update: ", e?.response?.data?.message);
      alert('Failed to update image. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <button 
                  onClick={() => navigate('/allimages')}
                  className="btn btn-link p-0 text-decoration-none"
                >
                  <i className="bi bi-images me-1"></i>
                  Gallery
                </button>
              </li>
              <li className="breadcrumb-item">
                <button 
                  onClick={() => navigate(`/images/${id}`)}
                  className="btn btn-link p-0 text-decoration-none"
                >
                  Image Details
                </button>
              </li>
              <li className="breadcrumb-item active">Edit</li>
            </ol>
          </nav>
          
          <div className="card card-hover border-0 shadow-lg">
            <div className="card-header gradient-bg text-white text-center py-4">
              <h3 className="mb-0 fw-bold">
                <i className="bi bi-pencil-square me-2"></i>
                Edit Image
              </h3>
              <p className="mb-0 mt-2 opacity-75">Replace the current image with a new one</p>
            </div>
            
            <div className="card-body p-4">
              <form onSubmit={handleUpdateImages}>
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-image me-2"></i>
                    Select New Image
                  </label>
                  <input
                    type="file"
                    className="form-control form-control-lg"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                  <div className="form-text">
                    <i className="bi bi-info-circle me-1"></i>
                    Choose a new image to replace the current one. Supported formats: JPG, PNG, GIF (Max 5MB)
                  </div>
                </div>

                {preview && (
                  <div className="text-center mb-4">
                    <div className="position-relative d-inline-block">
                      <img
                        src={preview}
                        alt="New image preview"
                        className="img-fluid rounded-3 shadow"
                        style={{ maxHeight: "300px", maxWidth: "100%" }}
                      />
                      <div className="position-absolute top-0 start-0 m-2">
                        <span className="badge bg-warning">
                          <i className="bi bi-exclamation-triangle me-1"></i>
                          New Image
                        </span>
                      </div>
                    </div>
                    <p className="text-muted mt-2 mb-0">
                      <small>This will replace the current image</small>
                    </p>
                  </div>
                )}

                <div className="d-grid gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-gradient btn-lg fw-semibold"
                    disabled={loading || !images}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Update Image
                      </>
                    )}
                  </button>
                  
                  <button 
                    type="button"
                    onClick={() => navigate(`/images/${id}`)}
                    className="btn btn-outline-secondary"
                    disabled={loading}
                  >
                    <i className="bi bi-x-circle me-2"></i>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Warning Card */}
          <div className="card mt-4 border-warning bg-warning bg-opacity-10">
            <div className="card-body">
              <h6 className="fw-bold text-warning mb-2">
                <i className="bi bi-exclamation-triangle me-2"></i>
                Important Notice
              </h6>
              <p className="mb-0 small text-dark">
                Updating this image will permanently replace the current file. 
                This action cannot be undone. Make sure you have a backup if needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
