import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  Button,
  Pagination,
  Form,
  InputGroup,
  Container,
  Row,
  Col,
  Offcanvas,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faStar as faStarSolid,
  faEye,
  faEyeSlash,
  faUpload,
  faSearch,
  faComment,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const UserGallery = () => {
  const [allImages, setAllImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date-desc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6;
  const [filterOption, setFilterOption] = useState("all");
  const [portals, setPortals] = useState([]);
  const [selectedPortal, setSelectedPortal] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const handleCloseOffcanvas = () => setSelectedImage(null);
  const [expandedComments, setExpandedComments] = useState(null);
  const { t, i18n } = useTranslation();
  // @description : useEffect hook to fetch images and portals when the component mounts

  useEffect(() => {

const fetchImages = async () => {
  setLoading(true);
  try {
    const imagesResponse = await axios.get("/api/gallery/images");
    const images = imagesResponse.data.data.images;
    const imagesWithRatingsAndComments = await Promise.all(
      images.map(async (image) => {
        try {
          const ratingResponse = await axios.get(`/api/ratings/average/Gallery/${image._id}`);
          const commentsResponse = await axios.get(`/api/comments/Gallery/${image._id}`);
          return {
            ...image,
            averageRating: ratingResponse.data.data.averageRating,
            ratingCount: ratingResponse.data.data.ratingCount,
            comments: commentsResponse.data.data,
          };
        } catch (err) {
          console.error("Error fetching additional data for image", image._id, err);
          return {
            ...image,
            averageRating: "Not Rated",
            ratingCount: "Not rated",
            comments: [],
          };
        }
      })
    );

    setAllImages(imagesWithRatingsAndComments);
    setFilteredImages(imagesWithRatingsAndComments);
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

  // @description : useEffect hook to filter images based on search term, sort option, and filter option

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

  // @description : functions to handle image actions - favorite, delete, publish,  visibility and  Comments toggles

const handleFavoriteToggle = async (imageId) => {
  try {
    await axios.patch(`/api/gallery/images/${imageId}/favorite`);

    const updatedImages = allImages.map((img) =>
      img._id === imageId ? { ...img, isFavorite: !img.isFavorite } : img
    );
    setAllImages(updatedImages);

    if (selectedImage && selectedImage._id === imageId) {
      setSelectedImage({
        ...selectedImage,
        isFavorite: !selectedImage.isFavorite,
      });
    }
  } catch (error) {
    console.error("Error toggling favorite status", error);
    setError("Failed to update favorite status.");
  }
};


const handleDelete = async (id) => {
  try {
    await axios.delete(`/api/gallery/images/${id}`);
    setAllImages(allImages.filter((image) => image._id !== id));
    
    if (selectedImage?._id === id) {
      setSelectedImage(null);
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    setError("Failed to delete image.");
  }
};

const handlePublish = async (imageId) => {
  const portalId = selectedPortal[imageId];
  
  if (!portalId) {
    throw new Error("No portal selected for publishing");
  }

  try {
    const response = await axios.patch(`/api/gallery/images/${imageId}/publish`, { portalId });
    console.log(response.data.message);

    const updatedImages = allImages.map((image) =>
      image._id === imageId ? { ...image, published: !image.published } : image
    );

    setAllImages(updatedImages);

    if (selectedImage?._id === imageId) {
      setSelectedImage((prevSelectedImage) => ({
        ...prevSelectedImage,
        published: !prevSelectedImage.published,
      }));
    }
  } catch (error) {
    console.error("Error publishing image", error);
    throw new Error("Failed to publish image");
  }
};

const handleVisibilityToggle = async (imageId, currentVisibility) => {
  try {
    await axios.patch(`/api/gallery/images/${imageId}/visibility`);
    
    const updatedImages = allImages.map((img) => {
      if (img._id === imageId) {
        return {
          ...img,
          visibility: currentVisibility === "public" ? "private" : "public",
        };
      } else {
        return img;
      }
    });

    setAllImages(updatedImages);

    if (selectedImage?._id === imageId) {
      setSelectedImage((prevSelectedImage) => ({
        ...prevSelectedImage,
        visibility: currentVisibility === "public" ? "private" : "public",
      }));
    }
  } catch (error) {
    console.error("Error toggling visibility", error);
    setError("Failed to update image visibility.");
  }
};

const toggleComments = (imageId) => {
  setExpandedComments(prevExpandedComments => prevExpandedComments === imageId ? null : imageId);
};

  // @description : function to format file size in KB or MB


const formatFileSize = (bytes) => {
  const KB = 1024;
  const MB = 1024 * KB;
  const size = bytes < MB ? (bytes / KB).toFixed(2) + " KB" : (bytes / MB).toFixed(2) + " MB";
  return size;
};

  // @ description functions to handle pagination

const currentImages = filteredImages.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );
  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // @ description : return statement to render the component
  if (loading) return <div className="text-center">Loading images...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;


const rtlLanguages = ["ar"];

const isRtlLanguage = () => rtlLanguages.includes(i18n.language);

  return (
    <Container
      className={`UserGallery-container ${isRtlLanguage() ? "rtl" : ""}`}
    >
      {" "}
      <h1 className="UserGallery-header">{t("UserGallery:header")}</h1>
      <InputGroup className="search-input">
        <InputGroup.Text>
          <FontAwesomeIcon icon={faSearch} />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder={t("UserGallery:searchPlaceholder")}
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
        <option value="name-asc">{t("UserGallery:sortOptions:nameAsc")}</option>
        <option value="name-desc">
          {t("UserGallery:sortOptions:nameDesc")}
        </option>
        <option value="date-asc">{t("UserGallery:sortOptions:dateAsc")}</option>
        <option value="date-desc">
          {t("UserGallery:sortOptions:dateDesc")}
        </option>
      </Form.Select>
      <Form.Select
        className="filter-select"
        aria-label="Filter images"
        value={filterOption}
        onChange={(e) => setFilterOption(e.target.value)}
      >
        <option value="all">{t("UserGallery:filterOptions:all")}</option>
        <option value="fav">{t("UserGallery:filterOptions:favorites")}</option>
        <option value="published">
          {t("UserGallery:filterOptions:published")}
        </option>
      </Form.Select>
      <Row xs={1} md={2} lg={3} className="g-4 mt-3">
        {currentImages.map((image) => (
          <Col key={image._id} className="text-center">
            <img
              src={image.imageUrl}
              alt={image.imageName}
              className="img-fluid mb-2"
              onClick={() => setSelectedImage(image)}
              style={{ cursor: "pointer" }}
            />
          </Col>
        ))}
      </Row>
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
      {selectedImage && (
        <Offcanvas show={true} onHide={handleCloseOffcanvas} placement="end" className="offcanvas">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="offcanvas-title">
              {" "}
              {selectedImage.imageName}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="card-actions-container">
              <Button
                variant="outline-warning"
                onClick={() => handleFavoriteToggle(selectedImage._id)}
              >
                <FontAwesomeIcon
                  icon={selectedImage.isFavorite ? faStarSolid : faStarRegular}
                />
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() =>
                  handleVisibilityToggle(
                    selectedImage._id,
                    selectedImage.visibility
                  )
                }
              >
                <FontAwesomeIcon
                  icon={
                    selectedImage.visibility === "public" ? faEye : faEyeSlash
                  }
                />
              </Button>

              <Button
                variant="outline-danger"
                onClick={() => handleDelete(selectedImage._id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            </div>
            <strong className="Bold_meta">
              {t("UserGallery:offcanvas:description")}
            </strong>{" "}
            <p className="p_meta">{selectedImage.description}</p>
            {selectedImage.published && (
              <>
                <div className="rating-container_star">
                  <strong className="Bold_meta">
                    {t("UserGallery:offcanvas:averageRating")}
                  </strong>

                  {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;
                    return (
                      <FontAwesomeIcon
                        key={index}
                        icon={
                          selectedImage.averageRating >= ratingValue
                            ? faStarSolid
                            : selectedImage.averageRating >= ratingValue - 0.5
                            ? faStarHalfAlt
                            : faStarRegular
                        }
                        className={
                          selectedImage.averageRating >= ratingValue
                            ? "star filled"
                            : selectedImage.averageRating >= ratingValue - 0.5
                            ? "star half-filled"
                            : "star"
                        }
                      />
                    );
                  })}
                  <p className="p_meta">
                    {selectedImage.averageRating
                      ? `${selectedImage.averageRating.toFixed(1)}/5`
                      : "Not Rated"}
                  </p>
                </div>
                <strong className="Bold_meta">
                  {t("UserGallery:offcanvas:ratingCount")}
                </strong>
                <p className="p_meta">{selectedImage.ratingCount} </p>
              </>
            )}
            <strong className="Bold_meta">
              {t("UserGallery:offcanvas:metadata")}
            </strong>
            <ul className="list_meta">
              <li>
                {t("UserGallery:offcanvas:resolution")}{" "}
                {selectedImage.metadata.resolution.width} x{" "}
                {selectedImage.metadata.resolution.height} pixels
              </li>
              <li>
                {t("UserGallery:offcanvas:fileType")}{" "}
                {selectedImage.metadata.fileType}
              </li>
              <li>
                {t("UserGallery:offcanvas:fileSize")}{" "}
                {formatFileSize(selectedImage.metadata.fileSize)}
              </li>{" "}
            </ul>
            <strong className="Bold_meta">
              {t("UserGallery:offcanvas:points")}
            </strong>{" "}
            <p className="p_meta">{selectedImage.points} </p>
            <p className="PortalTips">
              {t("UserGallery:offcanvas:publishTip")}
            </p>
            <div className="card-publish-side">
              <div>
                <Form.Select
                  className="card-publish-dropdown"
                  aria-label="Select portal"
                  value={selectedPortal[selectedImage._id] || ""}
                  onChange={(e) =>
                    setSelectedPortal({
                      ...selectedPortal,
                      [selectedImage._id]: e.target.value,
                    })
                  }
                >
                  <option value="">
                    {" "}
                    {t("UserGallery:offcanvas:selectPortal")}
                  </option>
                  {portals.map((portal) => (
                    <option key={portal._id} value={portal._id}>
                      {portal.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="card-publish-button">
                <Button
                  variant={
                    selectedImage.published
                      ? "outline-danger"
                      : "outline-success"
                  }
                  onClick={() => handlePublish(selectedImage._id)}
                  disabled={!selectedPortal[selectedImage._id]}
                >
                  <FontAwesomeIcon
                    icon={selectedImage.published ? faEyeSlash : faUpload}
                  />
                  {selectedImage.published ? " Unpublish" : " Publish"}
                </Button>
              </div>
            </div>
            <br />
            <Button
              className="comments-button"
              variant="outline-secondary"
              onClick={() => toggleComments(selectedImage._id)}
            >
              <FontAwesomeIcon icon={faComment} />
              {t("UserGallery:offcanvas:comments")}
            </Button>
            {expandedComments === selectedImage._id && (
              <div className="comments-section">
                <h5>{t("UserGallery:offcanvas:comments")}:</h5>
                {selectedImage.comments.map((comment) => (
                  <p key={comment._id}>
                    <strong>{comment.author.username}:</strong> {comment.text}
                  </p>
                ))}
              </div>
            )}
          </Offcanvas.Body>
        </Offcanvas>
      )}
    </Container>
  );
};

export default UserGallery;
