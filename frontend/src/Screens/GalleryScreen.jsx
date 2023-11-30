import { useState, useEffect } from "react";
import UserGallery from "../Components/UserGallery.jsx";
import UploadComponent from "../Components/UploadImage.jsx";
import { useSelector } from "react-redux";
import { Offcanvas } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import axios from "axios";

const GalleryScreen = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const { t, i18n } = useTranslation();

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/gallery/images");
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

  const isRtlLanguage = () => {
    const rtlLanguages = ["ar"];
    return rtlLanguages.includes(i18n.language);
  };

  
  return (
    <div className={`GalleryScreen-container ${isRtlLanguage() ? 'rtl' : ''}`}>
      {isAuthenticated && (
        <>
          <button className="btn-custom-side" onClick={handleShowUpload}>
            {t('galleryScreen:uploadButton')}
          </button>
          <Offcanvas
            show={showUpload}
            onHide={handleCloseUpload}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>{t('galleryScreen:uploadTitle')}</Offcanvas.Title>
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
