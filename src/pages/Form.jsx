import React, { useState } from "react";
import { api } from "../utils/api.js";
import { useNavigate } from "react-router-dom";
const Form = () => {
  const navigate = useNavigate()
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [term, setTerm] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !term)
      return alert("Please select an image and enter a term.");
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", term);
    console.log("image to send", formData);
    try {
      const res = await api.post("/images/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("image uploaded: ", res?.data);
      navigate("/allimages")
    } catch (e) {
      console.log("error uplaoding: ", e?.response?.data?.message);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card card-hover border-0 shadow-lg">
            <div className="card-header gradient-bg text-white text-center py-4">
              <h3 className="mb-0 fw-bold">
                <i className="bi bi-cloud-upload me-2"></i>
                Upload New Image
              </h3>
              <p className="mb-0 mt-2 opacity-75">Share your amazing photos with the world</p>
            </div>
            
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-tag me-2"></i>
                    Image Title / Category
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="title"
                    placeholder="e.g. Beautiful Sunset, Mountain View, City Life"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    required
                  />
                  <div className="form-text">Choose a descriptive title to help others find your image</div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-image me-2"></i>
                    Choose Image File
                  </label>
                  <input
                    type="file"
                    className="form-control form-control-lg"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                  <div className="form-text">Supported formats: JPG, PNG, GIF (Max 5MB)</div>
                </div>

                {preview && (
                  <div className="text-center mb-4">
                    <div className="position-relative d-inline-block">
                      <img
                        src={preview}
                        alt="Preview"
                        className="img-fluid rounded-3 shadow"
                        style={{ maxHeight: "300px", maxWidth: "100%" }}
                      />
                      <div className="position-absolute top-0 start-0 m-2">
                        <span className="badge bg-success">
                          <i className="bi bi-check-circle me-1"></i>
                          Ready to upload
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <button type="submit" className="btn btn-gradient btn-lg w-100 fw-semibold">
                  <i className="bi bi-upload me-2"></i>
                  Upload Image
                </button>
              </form>
            </div>
          </div>
          
          {/* Tips Card */}
          <div className="card mt-4 border-0 bg-light">
            <div className="card-body">
              <h6 className="fw-bold mb-3">
                <i className="bi bi-lightbulb text-warning me-2"></i>
                Upload Tips
              </h6>
              <ul className="list-unstyled mb-0 small">
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Use descriptive titles for better searchability
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  High-quality images get more views
                </li>
                <li className="mb-0">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Keep file sizes under 5MB for faster uploads
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
