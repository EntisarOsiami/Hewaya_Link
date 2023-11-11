import UserGallery from '../Components/UserGallery.jsx';
import UploadComponent from '../Components/UploadImage.jsx';
import { useSelector } from 'react-redux';

const GalleryScreen = () => {
  const { isAuthenticated } = useSelector((state) => state.auth); 

  return (
    <div className="GalleryScreen-container">
      <h1 className="GalleryScreen-header">Gallery</h1>
      {isAuthenticated && (
        <>
          <h2 className="GalleryScreen-subheader">Upload New Image</h2>
          <UploadComponent />
        </>
      )}
      <UserGallery />
    </div>
  );
};

export default GalleryScreen;
