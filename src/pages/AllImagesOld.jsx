import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { api } from "../utils/api.js";
import { useNavigate } from "react-router-dom";
export default function AllImages() {
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  // console.log("search: ", search)
  useEffect(() => {
    const getAllImages = async () => {
      try {
        const res = await api.get(`/images`);
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
      const res = await api.get(`/images?search=${search}`);
      console.log("search images: ", res?.data);
      setImages(res?.data);
    } catch (e) {
      console.log("error all images: ", e?.response?.data?.message);
    }
  };
  const toggleSelect = (id) => {
    setSelectedImages(
      (prev) =>
        prev.includes(id)
          ? prev.filter((img) => img !== id) // remove if already selected
          : [...prev, id] // add if new
    );
  };
  const handleDelete = () => {
    console.log("deleted");
  };
  // const handleDownload = () => {
  //   selectedImages.forEach((url) => {
  //     const link = document.createElement("a");
  //     link.href = url; // image URL
  //     link.download = url.split("/").pop(); // filename from URL
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   });
  // };
const handleDownload = async () => {
  const selected = images.filter((img) => selectedImages.includes(img._id));

  for (const img of selected) {
    const response = await fetch(`http://localhost:3000/uploads/${img.imageUrl}`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = img.imageUrl; // ✅ forces download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};



  return (
    <div>
      <h1>All Images</h1>
      <form onSubmit={handleSearch}>
        <input
          placeholder="search title"
          name="image"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {selectedImages.length > 0 && (
        <div className="actions">
          <button onClick={handleDelete}>Delete Selected</button>
          <button onClick={handleDownload}>Download Selected</button>
        </div>
      )}
      {/* 🟣 Counter display */}
      <p className="mb-4 font-medium text-gray-600">
        Selected: {selectedImages.length} images
      </p>
      {/* 🟢 Grid layout using Tailwind */}
      <div className="grid grid-cols-4 gap-4">
        {images
          ? images.map((i) => (
              <div
                key={i._id}
                onClick={() => toggleSelect(i._id)}
                className={`relative cursor-pointer rounded-lg overflow-hidden border-4 transition-all duration-300 ${
                  selectedImages.includes(i._id)
                    ? "border-blue-500 scale-105" // 🔵 highlight selected
                    : "border-transparent"
                }`}
              >
                {/* image itself */}
                <img
                  src={`http://localhost:3000/uploads/${i.imageUrl}`}
                  alt={i.title}
                  className="w-full h-40 object-cover"
                  style={{ height: "8rem" }}
                />

                {/* overlay checkbox in corner */}
                <input
                  type="checkbox"
                  checked={selectedImages.includes(i._id)}
                  onChange={() => toggleSelect(i._id)}
                  className="absolute top-2 right-2 h-5 w-5 accent-blue-600"
                  onClick={(e) => e.stopPropagation()} // stops event bubbling (don’t trigger parent click)
                />
                <p>{i?._id}</p>
                <p>{i?.user?.name}</p>
                <p>{i?.imageUrl}</p>
                <p>{new Date(i?.createdAt).toLocaleString()}</p>
                <button onClick={() => navigate(`/images/${i?._id}`)}>
                  View
                </button>
                <p className="text-center mt-2 text-sm font-medium">
                  {i.title}
                </p>
              </div>
            ))
          : "No Images..."}
      </div>
    </div>
  );
}
