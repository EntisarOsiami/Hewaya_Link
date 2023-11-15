import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import { Form } from 'react-bootstrap';

const UploadComponent = () => {
  const { userId, isAuthenticated } = useSelector((state) => state.auth);
  const [uploading, setUploading] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

  const handleImageUpload = async (file, imageName, description, isPublic) => {
    if (!file) {
      alert('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('imageName', imageName);
    formData.append('description', description);
    formData.append('userId', userId);
    formData.append('isPublic', isPublic);

    try {
      await axios.post('/api/gallery/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const file = event.target.image.files[0];
    const imageName = event.target.imageName.value;
    const description = event.target.description.value;

    setUploading(true);
    handleImageUpload(file, imageName, description, isPublic).finally(() => setUploading(false));
  };

  if (!isAuthenticated) {
    return <div>Please log in to upload images.</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" name="image" required />
        <input type="text" name="imageName" placeholder="Enter image name" required />
        <textarea name="description" placeholder="Enter image description"></textarea>
        <div className="toggle-switch custom-toggle">
          <Form.Check 
            type="switch"
            id="custom-switch"
            label={isPublic ? 'Public' : 'Private'}
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />
        </div>
        <button type="submit">Upload Image</button>
      </form>
      {uploading && <div>Uploading...</div>}
    </div>
  );
};

export default UploadComponent;
