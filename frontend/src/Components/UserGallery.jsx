import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Button,
  Accordion,
  Pagination,
  Badge,
  Form,
  InputGroup,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faStar as faStarSolid,
  faEye,
  faEyeSlash,
  faUpload,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const UserGallery = () => {
  const [allImages, setAllImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6;
  const [filterOption, setFilterOption] = useState("all");

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/gallery/images");
        setAllImages(response.data.data.images);
        setFilteredImages(response.data.data.images);
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

  useEffect(() => {
    let images = [...allImages];

    switch (filterOption) {
      case "fav":
        images = images.filter((image) => image.isFavorite);
        break;
      case "published":
        images = images.filter((image) => image.published);
        break;
      case "all":
      default:
        break;
    }
    if (!["fav", "published"].includes(sortOption)) {
      switch (sortOption) {
        case "name-asc":
          images.sort((a, b) => a.imageName.localeCompare(b.imageName));
          break;
        case "name-desc":
          images.sort((a, b) => b.imageName.localeCompare(a.imageName));
          break;
        case "date-asc":
          images.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        case "date-desc":
          images.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
      }
    }

    if (searchTerm) {
      images = images.filter(
        (image) =>
          image.imageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          image.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredImages(images);
  }, [searchTerm, sortOption, filterOption, allImages]);

  const currentImages = filteredImages.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );
  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);

  const handleFavoriteToggle = async (imageId) => {
    try {
      await axios.patch(`/api/gallery/images/${imageId}/favorite`);
      setAllImages(
        allImages.map((img) =>
          img._id === imageId ? { ...img, isFavorite: !img.isFavorite } : img
        )
      );
    } catch (error) {
      console.error("Error toggling favorite status", error);
      setError("Failed to update favorite status.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/gallery/images/${id}`);
      setAllImages(allImages.filter((image) => image._id !== id));
    } catch (error) {
      console.error("Error deleting image", error);
      setError("Failed to delete image.");
    }
  };

  const handlePublish = async (imageId) => {
    try {
      const response = await axios.patch(
        `/api/gallery/images/${imageId}/togglePublished`
      );

      if (response.data && response.data.success) {
        setAllImages(
          allImages.map((img) =>
            img._id === imageId ? { ...img, published: !img.published } : img
          )
        );
      }
    } catch (error) {
      console.error("Error toggling publish state", error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="text-center">Loading images...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;

  return (
    <div className="UserGallery-container">
      <InputGroup className="mb-3">
        <InputGroup.Text>
          <FontAwesomeIcon icon={faSearch} />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search images..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
      <Form.Select
        aria-label="Sort images"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="mb-3"
      >
        <option value="name-asc">Name Ascending</option>
        <option value="name-desc">Name Descending</option>
        <option value="date-asc">Date Ascending</option>
        <option value="date-desc">Date Descending</option>
      </Form.Select>
      <Form.Select
        aria-label="Filter images"
        value={filterOption}
        onChange={(e) => setFilterOption(e.target.value)}
        className="mb-3"
      >
        <option value="all">All Images</option>
        <option value="fav">Favorites</option>
        <option value="published">Published</option>
      </Form.Select>
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
              <Button
                variant={image.published ? "outline-danger" : "outline-success"}
                onClick={() => handlePublish(image._id)}
                className="ms-2"
              >
                <FontAwesomeIcon
                  icon={image.published ? faEyeSlash : faUpload}
                />
                {image.published ? " Unpublish" : " Publish"}
              </Button>
              {image.visibility === "public" ? (
                <Badge bg="success" className="ms-2">
                  <FontAwesomeIcon icon={faEye} /> Public
                </Badge>
              ) : (
                <Badge bg="secondary" className="ms-2">
                  <FontAwesomeIcon icon={faEyeSlash} /> Private
                </Badge>
              )}
            </Card.Body>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Details</Accordion.Header>
                <Accordion.Body>
                  <strong>Description:</strong> {image.description}
                  <br />
                  {image.published && (
                    <>
                      <strong>Points:</strong> {image.points}
                      <br />
                      <strong>Rating:</strong>{" "}
                      {image.rating ? `${image.rating}/5` : "Not rated"}
                    </>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card>
        ))}
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
    </div>
  );
};

export default UserGallery;
