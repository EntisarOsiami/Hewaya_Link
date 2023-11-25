import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import PropTypes from "prop-types";

const UploadComponent = ({ onImageUpload }) => {
  const { userId, isAuthenticated } = useSelector((state) => state.auth);
  const [uploading, setUploading] = useState(false);
  const [visibility, setVisibility] = useState("private");

  const handleVisibilityChange = (e) => {
    setVisibility(e.target.checked ? "public" : "private");
  };

  const handleImageUpload = async (file, imageName, description, visibility) => {
    if (!file) {
      alert("Please select an image to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    formData.append("imageName", imageName);
    formData.append("description", description);
    formData.append("userId", userId);
    formData.append("visibility", visibility);

    try {
      await axios.post("/api/gallery/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (onImageUpload) {
        console.log("Calling onImageUpload to refresh images");
        onImageUpload();  
      }
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
    handleImageUpload(file, imageName, description, visibility).finally(() => setUploading(false));
  };

  if (!isAuthenticated) {
    return (
      <div className="UploadComponent-alert">
        Please log in to upload images.
      </div>
    );
  }
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Public images will be visible to all users viewing your gallery. Private
      images will only be visible to you.
    </Tooltip>
  );

  return (
    <div className="UploadComponent-container">   
    <Form onSubmit={handleSubmit} className="UploadComponent-form">
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" name="image" required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Image Name</Form.Label>
        <Form.Control
          type="text"
          name="imageName"
          placeholder="Enter image name"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          placeholder="Enter image description"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check
          type="switch"
          id="visibility-switch"
          label={visibility === "public" ? "Public" : "Private"}
          onChange={handleVisibilityChange}
          checked={visibility === "public"}
        />
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <span className="ms-2 info-icon">ℹ️</span>
        </OverlayTrigger>
      </Form.Group>
      <button type="submit" className="UploadComponent-button">
        Upload Image
      </button>
    </Form>
    {uploading && <div>Uploading...</div>}
  </div>
  
  );
};

UploadComponent.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};

export default UploadComponent;
