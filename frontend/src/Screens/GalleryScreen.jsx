import { useState, useEffect } from "react";
import UserGallery from "../Components/UserGallery.jsx";
import UploadComponent from "../Components/UploadImage.jsx";
import { useSelector } from "react-redux";
import { Offcanvas } from 'react-bootstrap';

import axios from "axios";

const GalleryScreen = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showUpload, setShowUpload] = useState(false);


  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/gallery/images");
      console.log("Fetched images:", response.data.data.images);
      setImages(response.data.data.images);
      setError("");
    } catch (error) {
      console.error("Error fetching images", error);
      setError("Failed to fetch images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);
  const handleShowUpload = () => setShowUpload(true);
const handleCloseUpload = () => setShowUpload(false);


  return (
    <div className="GalleryScreen-container">
    {isAuthenticated && (
      <>
        <button className="btn-custom-side"  onClick={handleShowUpload}>Upload Image</button>
        <Offcanvas show={showUpload} onHide={handleCloseUpload} placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Upload Image</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <UploadComponent onImageUpload={fetchImages} />
          </Offcanvas.Body>
        </Offcanvas>
      </>
    )}
    <UserGallery images={images} loading={loading} error={error} />
  </div>
  );
};

export default GalleryScreen;
