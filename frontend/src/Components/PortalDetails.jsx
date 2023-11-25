import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Pagination, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import RatingSystem from "./RatingSystem.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faTimes } from "@fortawesome/free-solid-svg-icons";
import CommentSystem from "./CommentSystem.jsx";
import Masonry from "react-masonry-css";
import { useSelector } from "react-redux";

const PortalDetails = () => {
  const [portal, setPortal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { portalId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6;
  const [selectedImage, setSelectedImage] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const userId = useSelector(state => state.auth.userId);

  useEffect(() => {
    const fetchPortalDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/portals/${portalId}`);
        setPortal(response.data.data);
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortalDetails();
  }, [portalId]);
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = portal?.Images.slice(
    indexOfFirstImage,
    indexOfLastImage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleComments = () => {
    setShowComments(!showComments);
  };
  const randomHeight = () => {
    return Math.floor(Math.random() * (400 - 250 + 1)) + 250;
  };

  const generateDummyUrl = (id) => {
    const width = Math.floor(Math.random() * (300 - 200 + 1)) + 200;
    const height = Math.floor(Math.random() * (400 - 150 + 1)) + 150;

    return `https://picsum.photos/seed/${id}/${width}/${height}`;
  };
  const handleSubscribeClick = async () => {
    try {
       await axios.patch(`/api/portals/${portalId}/subscribe`, { userId });
      setIsSubscribed(!isSubscribed);

    } catch (error) {
      console.error("Error toggling subscription:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!portal) return <div>No portal found</div>;

  return (
    <div className="">
      <div className="header-area">
        <h2>{portal.name}</h2>
        <p>{portal.description}</p>
        <Button onClick={handleSubscribeClick}>
          {isSubscribed ? "Unsubscribe" : "Subscribe"}
        </Button>
      </div>

      {selectedImage && (
        <div className="selected-image-details">
          <Row>
            <Col md={6}>
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.imageName}
                className="img-fluid"
              />
            </Col>
            <Col md={2}>
              <Row className="description-image">
                <h2>{selectedImage.imageName}</h2>
                <p>Uploaded by: {selectedImage.user.username}</p>
                <br />
                <p>{selectedImage.description}</p>
              </Row>
              <Row className="rating-image">
                <RatingSystem itemId={selectedImage._id} onModel="Gallery" />
              </Row>
            </Col>
            <Col md={4}>
              <Button onClick={toggleComments} className="toggle-comments-btn">
                <FontAwesomeIcon icon={showComments ? faTimes : faComment} />
                {showComments ? " Hide Comments" : " Show Comments"}
              </Button>
              {showComments && (
                <CommentSystem itemId={selectedImage._id} onModel="Gallery" />
              )}
            </Col>
          </Row>
        </div>
      )}

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {currentImages.map((image) => (
          <div
            key={image._id}
            onClick={() => setSelectedImage(image)}
            style={{ maxHeight: `${randomHeight()}px`, overflow: "hidden" }}
          >
            <img
              src={image.imageUrl}
              alt={image.imageName}
              className="img-fluid"
            />
          </div>
        ))}
        {Array.from({ length: 18 }, (_, i) => i + currentImages.length).map(
          (dummyId) => (
            <div key={`dummy-${dummyId}`}>
              <img
                src={generateDummyUrl(dummyId)}
                alt={`Dummy ${dummyId}`}
                className="img-fluid"
              />
            </div>
          )
        )}
      </Masonry>

      <Pagination className="justify-content-center my-4">
        {[...Array(Math.ceil(portal.Images.length / imagesPerPage)).keys()].map(
          (number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => paginate(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>
    </div>
  );
};

export default PortalDetails;
