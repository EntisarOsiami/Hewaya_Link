import  { useState, useEffect } from 'react';
import UserGallery from '../Components/UserGallery.jsx';
import UploadComponent from '../Components/UploadImage.jsx';
import { useSelector } from 'react-redux';
import axios from 'axios';

const GalleryScreen = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/gallery/images');
      setImages(response.data.data.images);
      setError('');
    } catch (error) {
      console.error('Error fetching images', error);
      setError('Failed to fetch images.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  
  const handleImageUpload = () => {
    fetchImages();
  };

  return (
    <div className="GalleryScreen-container">
    <div> 
      <h1 className="GalleryScreen-header">Gallery</h1>
      {isAuthenticated && (
        <>
          <h2 className="GalleryScreen-subheader">Upload New Image</h2>
          <UploadComponent onImageUpload={handleImageUpload} />
        </>

      )}
      </div>
      <UserGallery images={images} loading={loading} error={error} />
    </div>
  );
};

export default GalleryScreen;
