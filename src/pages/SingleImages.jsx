import React from "react";
import { useEffect } from "react";
import { api } from "../utils/api.js";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
export default function SingleImages() {
  const navigate = useNavigate();
  const [images, setImages] = useState(null);
  const { id } = useParams();
  // console.log("single image id: ", id);
  useEffect(() => {
    const getSingleImages = async () => {
      try {
        const res = await api.get(`/api/images/${id}`);
        console.log("single image: ", res?.data);
        setImages(res?.data);
      } catch (e) {
        console.log("error single image: ", e?.response?.data?.message);
      }
    };
    getSingleImages();
  }, []);
  const handleDelete = async () => {
    try {
      const res = await api.delete(`/api/images/${id}`);
      console.log("image deleted: ", res?.data);
      navigate("/allimages")
    } catch (e) {
      console.log("error delete: ", e?.response?.data?.message);
    }
  };
  return (
    <div className="container py-5">
      {images ? (
        <>
          {/* Header */}
          <div className="row mb-4">
            <div className="col-12">
              <nav aria-label="breadcrumb">
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
                  <li className="breadcrumb-item active">{images?.title}</li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="row">
            {/* Image Display */}
            <div className="col-lg-8">
              <div className="card border-0 shadow-lg">
                <div className="position-relative">
                  <img
                    src={`http://localhost:3000/uploads/${images?.imageUrl}`}
                    alt={images?.title}
                    className="card-img-top"
                    style={{ height: '500px', objectFit: 'contain', backgroundColor: '#f8f9fa' }}
                  />
                </div>
              </div>
            </div>

            {/* Image Details */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header gradient-bg text-white">
                  <h5 className="mb-0">
                    <i className="bi bi-info-circle me-2"></i>
                    Image Details
                  </h5>
                </div>
                <div className="card-body">
                  <div className="mb-4">
                    <h4 className="fw-bold mb-3">{images?.title}</h4>
                    
                    <div className="mb-3">
                      <small className="text-muted d-block mb-1">Uploaded by</small>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-person-circle me-2 text-primary"></i>
                        <span className="fw-semibold">{images?.user?.name || 'Unknown User'}</span>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <small className="text-muted d-block mb-1">Upload Date</small>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-calendar me-2 text-primary"></i>
                        <span>{new Date(images?.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <small className="text-muted d-block mb-1">File Name</small>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-file-image me-2 text-primary"></i>
                        <span className="text-break">{images?.imageUrl}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="d-grid gap-2">
                    <button 
                      onClick={() => navigate(`/images/${images?._id}/edit`)}
                      className="btn btn-gradient"
                    >
                      <i className="bi bi-pencil me-2"></i>
                      Edit Image
                    </button>
                    
                    <button 
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = `http://localhost:3000/uploads/${images?.imageUrl}`;
                        link.download = images?.imageUrl;
                        link.click();
                      }}
                      className="btn btn-outline-primary"
                    >
                      <i className="bi bi-download me-2"></i>
                      Download
                    </button>
                    
                    <button 
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this image?')) {
                          handleDelete();
                        }
                      }}
                      className="btn btn-outline-danger"
                    >
                      <i className="bi bi-trash me-2"></i>
                      Delete Image
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-5">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5>Loading image details...</h5>
        </div>
      )}
    </div>
  );
}
