import { useSelector } from 'react-redux';
import axios from 'axios';

const UploadComponent = () => {
  const { userId, isAuthenticated } = useSelector((state) => state.auth);

  const handleImageUpload = async (file, imageName, description) => {
    if (!file) {
      alert('Please select an image to upload.');
      return;
    }
    const formData = new FormData();
    formData.append('image', file);
    formData.append('imageName', imageName);
    formData.append('description', description);
    formData.append('user', userId);

    try {
      const response = await axios.post('/api/gallery/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const file = event.target.image.files[0];
    const imageName = event.target.imageName.value;
    const description = event.target.description.value;

    handleImageUpload(file, imageName, description);
  };

  if (!isAuthenticated) {
    return <div className="UploadComponent-alert">Please log in to upload images.</div>;
  }

  return (
    <div className="UploadComponent-container">
      <form onSubmit={handleSubmit} className="UploadComponent-form">
        <input type="file" name="image" required className="UploadComponent-input" />
        <input
          type="text"
          name="imageName"
          placeholder="Enter image name"
          required
          className="UploadComponent-input"
        />
        <textarea
          name="description"
          placeholder="Enter image description"
          className="UploadComponent-textarea"
        ></textarea>
        <button type="submit" className="UploadComponent-button">Upload Image</button>
      </form>
    </div>
  );
};

export default UploadComponent;
