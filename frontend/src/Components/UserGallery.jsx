import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Accordion, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faStar as faStarSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const UserGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6;

  useEffect(() => {
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

    fetchImages();
  }, []);

  const handleFavoriteToggle = async (imageId) => {
    try {
     await axios.patch(`/api/gallery/images/${imageId}/favorite`);
      setImages(images.map((img) =>
        img._id === imageId ? { ...img, isFavorite: !img.isFavorite } : img
      ));
    } catch (error) {
      console.error("Error toggling favorite status", error);
      setError("Failed to update favorite status.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/gallery/images/${id}`);
      setImages(images.filter((image) => image._id !== id));
    } catch (error) {
      console.error("Error deleting image", error);
      setError("Failed to delete image.");
    }
  };

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="text-center">Loading images...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;

  return (
    <div className="UserGallery-container">
      <div className="card-container">
        {currentImages.map((image) => (
          <Card key={image._id} className="image-card">
            <Card.Img
              variant="top"
              src={image.imageUrl}
              alt={image.imageName}
            />
            <Card.Body>
              <Card.Title>{image.imageName}</Card.Title>
              <Button
                variant="outline-danger"
                onClick={() => handleDelete(image._id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>{" "}
              <Button
                variant="outline-warning"
                onClick={() => handleFavoriteToggle(image._id)}
              >
                <FontAwesomeIcon
                  icon={image.isFavorite ? faStarSolid : faStarRegular}
                />
              </Button>
            </Card.Body>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Details</Accordion.Header>
                <Accordion.Body>
                  <strong>Description:</strong> {image.description}
                  <br />
                  <strong>Points:</strong> {image.points}
                  <br />
                  <strong>Rating:</strong>{" "}
                  {image.rating ? `${image.rating}/5` : "Not rated"}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card>
        ))}
      </div>
      <Pagination className="justify-content-center my-4">
        {[...Array(totalPages).keys()].map((number) => (
          <Pagination.Item
            key={number + 1}
            active={number + 1 === currentPage}
            onClick={() => paginate(number + 1)}
          >
            {number + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default UserGallery;
