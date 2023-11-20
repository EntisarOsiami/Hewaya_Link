import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Button,
  Accordion,
  Pagination,
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
  const [portals, setPortals] = useState([]);
  const [selectedPortal, setSelectedPortal] = useState({});

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

    const fetchPortals = async () => {
      try {
        const response = await axios.get("/api/portals");
        setPortals(response.data.data);
      } catch (error) {
        console.error("Error fetching portals:", error);
      }
    };

    fetchImages();
    fetchPortals();
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
    const portalId = selectedPortal[imageId];
    if (!portalId) {
      console.error("No portal selected for publishing");
      return;
    }
    try {
      const response = await axios.patch(`/api/gallery/images/${imageId}/publish`, { portalId });
      console.log(response.data.message);
  
      const updatedImages = allImages.map((img) =>
        img._id === imageId ? { ...img, published: !img.published } : img
      );
  
      setAllImages(updatedImages);
      setFilteredImages(updatedImages.filter(image =>
        filterOption === "all" ||
        (filterOption === "fav" && image.isFavorite) ||
        (filterOption === "published" && image.published)
      ));
    } catch (error) {
      console.error("Error publishing image", error);
    }
  };
  
  const formatFileSize = (bytes) => {
    const KB = 1024;
    const MB = 1024 * KB;
    if (bytes < MB) {
      return (bytes / KB).toFixed(2) + " KB";
    } else {
      return (bytes / MB).toFixed(2) + " MB";
    }
  };

  const handleVisibilityToggle = async (imageId, currentVisibility) => {
    try {
      await axios.patch(`/api/gallery/images/${imageId}/visibility`);
      setAllImages(
        allImages.map((img) =>
          img._id === imageId
            ? {
                ...img,
                visibility:
                  currentVisibility === "public" ? "private" : "public",
              }
            : img
        )
      );
    } catch (error) {
      console.error("Error toggling visibility", error);
      setError("Failed to update image visibility.");
    }
  };


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="text-center">Loading images...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;

  return (
    
    <div className="UserGallery-container">
      
      <InputGroup className="search-input">
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
        className="sort-select"
        aria-label="Sort images"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
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
        className="filter-select"
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
              <Card.Title className="card-title">{image.imageName}</Card.Title>

              <div className="card-actions-container">
                <Button
                  variant="outline-warning"
                  onClick={() => handleFavoriteToggle(image._id)}
                >
                  <FontAwesomeIcon
                    icon={image.isFavorite ? faStarSolid : faStarRegular}
                  />
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() =>
                    handleVisibilityToggle(image._id, image.visibility)
                  }
                >
                  <FontAwesomeIcon
                    icon={image.visibility === "public" ? faEye : faEyeSlash}
                  />
                </Button>

                <Button
                  variant="outline-danger"
                  onClick={() => handleDelete(image._id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
              </div>
              <p className="text-center mt-4">
                To share an image, select a portal from the dropdown and then
                click the Publish button.
              </p>
              <div className="card-publish-side">
                <div>
                  <Form.Select
                    className="card-publish-dropdown"
                    aria-label="Select portal"
                    value={selectedPortal[image._id] || ""}
                    onChange={(e) =>
                      setSelectedPortal({
                        ...selectedPortal,
                        [image._id]: e.target.value,
                      })
                    }
                  >
                    <option value="">Select a Portal</option>
                    {portals.map((portal) => (
                      <option key={portal._id} value={portal._id}>
                        {portal.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                <div className="">
                  <Button
                    variant={
                      image.published ? "outline-danger" : "outline-success"
                    }
                    onClick={() => handlePublish(image._id)}
                    className="w-100 card-publish-button"
                    disabled={!selectedPortal[image._id]}
                  >
                    <FontAwesomeIcon
                      icon={image.published ? faEyeSlash : faUpload}
                    />
                    {image.published ? " Unpublish" : " Publish"}
                  </Button>
                </div>
              </div>
            </Card.Body>
            <Accordion className="accordion-container">
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
                      <br />
                    </>
                  )}
                  <strong>Metadata:</strong>
                  <ul>
                    <li>
                      Resolution: {image.metadata.resolution.width} x{" "}
                      {image.metadata.resolution.height} pixels
                    </li>
                    <li>File Type: {image.metadata.fileType}</li>
                    <li>
                      File Size: {formatFileSize(image.metadata.fileSize)}
                    </li>{" "}
                  </ul>
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
