import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { api } from "../utils/api.js";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
export default function AllImages() {
  console.log("url: ", API_URL);
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAllImages = async () => {
      try {
        const res = await api.get(`/api/images`);
        console.log("all images: ", res?.data);
        setImages(res?.data);
      } catch (e) {
        console.log("error all images: ", e?.response?.data?.message);
      }
    };
    getAllImages();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      console.log("search starts");
      const res = await api.get(`/api/images?search=${search}`);
      console.log("search images: ", res?.data);
      setImages(res?.data);
    } catch (e) {
      console.log("error all images: ", e?.response?.data?.message);
    }
  };

  const toggleSelect = (id) => {
    setSelectedImages((prev) =>
      prev.includes(id) ? prev.filter((img) => img !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    console.log("deleted");
  };

  const handleDownload = async () => {
    const selected = images.filter((img) => selectedImages.includes(img._id));

    for (const img of selected) {
      const response = await fetch(
        `${API_URL}/uploads/${img.imageUrl}`
      );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = img.imageUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h1 className="display-4 fw-bold mb-3">Image Gallery</h1>
          <p className="lead text-muted">
            Discover and manage your image collection
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col-lg-8 mx-auto">
          <form onSubmit={handleSearch}>
            <div className="input-group input-group-lg">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0"
                placeholder="Search images by title or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-gradient px-4" type="submit">
                <i className="bi bi-search me-2"></i>
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Selection Actions */}
      {selectedImages.length > 0 && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-body py-3">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <div>
                    <h6 className="mb-0">
                      <i className="bi bi-check-circle-fill text-primary me-2"></i>
                      {selectedImages.length} image
                      {selectedImages.length > 1 ? "s" : ""} selected
                    </h6>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      onClick={handleDelete}
                      className="btn btn-outline-danger btn-sm"
                    >
                      <i className="bi bi-trash me-1"></i>
                      Delete Selected
                    </button>
                    <button
                      onClick={handleDownload}
                      className="btn btn-gradient btn-sm"
                    >
                      <i className="bi bi-download me-1"></i>
                      Download Selected
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Images Grid */}
      <div className="row g-4">
        {images && images.length > 0 ? (
          images.map((i) => (
            <div key={i._id} className="col-sm-6 col-md-4 col-lg-3">
              <div
                className={`card image-card h-100 ${
                  selectedImages.includes(i._id)
                    ? "border-primary border-3"
                    : "border-0"
                }`}
                onClick={() => toggleSelect(i._id)}
                style={{ cursor: "pointer" }}
              >
                <div className="position-relative">
                  <img
                    src={`http://localhost:3000/uploads/${i.imageUrl}`}
                    alt={i.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />

                  {/* Overlay */}
                  <div className="image-overlay">
                    <div className="text-white text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/images/${i._id}`);
                        }}
                        className="btn btn-light btn-sm me-2"
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/images/${i._id}/edit`);
                        }}
                        className="btn btn-light btn-sm"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                    </div>
                  </div>

                  {/* Selection Checkbox */}
                  <div className="position-absolute top-0 end-0 p-2">
                    <input
                      type="checkbox"
                      checked={selectedImages.includes(i._id)}
                      onChange={() => toggleSelect(i._id)}
                      className="form-check-input"
                      onClick={(e) => e.stopPropagation()}
                      style={{ transform: "scale(1.2)" }}
                    />
                  </div>
                </div>

                <div className="card-body">
                  <h6 className="card-title fw-bold mb-2">{i.title}</h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      <i className="bi bi-person me-1"></i>
                      {i?.user?.name || "Unknown"}
                    </small>
                    <small className="text-muted">
                      <i className="bi bi-calendar me-1"></i>
                      {new Date(i?.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <div className="text-muted">
              <i className="bi bi-images fs-1 d-block mb-3"></i>
              <h5>No Images Found</h5>
              <p>
                Try adjusting your search or upload some images to get started.
              </p>
              <button
                onClick={() => navigate("/form")}
                className="btn btn-gradient"
              >
                <i className="bi bi-plus-circle me-2"></i>
                Upload Images
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
