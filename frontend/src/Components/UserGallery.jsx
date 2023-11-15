import { useState, useEffect } from 'react';
import axios from 'axios';

const UserGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
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

    fetchImages();
}, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/gallery/images/${id}`);
      setImages(images.filter((image) => image._id !== id));
    } catch (error) {
      console.error('Error deleting image', error);
    }
  };

  if (loading) return <div>Loading images...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="UserGallery-container">
      <h2 className="UserGallery-header">User Gallery</h2>
      <div className="image-grid">
        {images.map((image) => (
          <div key={image._id} className="image-item">
            <img src={image.imageUrl} alt={image.imageName} />
            <button
              className="delete-button"
              onClick={() => handleDelete(image._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserGallery;
