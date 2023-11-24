import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Pagination,Collapse, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import  RatingSystem  from "./RatingSystem.jsx";
import  CommentSystem  from "./CommentSystem.jsx";

const PortalDetails = () => {
  const [portal, setPortal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { portalId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6;
  const [collapsedComments, setCollapsedComments] = useState({});

  useEffect(() => {
    const fetchPortalDetails = async () => {
      try {
        const response = await axios.get(`/api/portals/${portalId}`);
        setPortal(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortalDetails();
  }, [portalId]);

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = portal?.Images.slice(indexOfFirstImage, indexOfLastImage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleComments = (imageId) => {
    setCollapsedComments(prev => ({
      ...prev,
      [imageId]: !prev[imageId]
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!portal) return <div>No portal found</div>;

  return (
    <div className="portal-details">
      <h2>Photography Lovers</h2>
      <p>A hub for photographers to share and discuss their work.</p>
      <div className="scrollable-gallery">
        {currentImages?.map((image) => (
          <Card key={image._id} className="image-card">
            <Card.Img variant="top" src={image.imageUrl} alt={image.imageName} />
            <Card.Body>
              <Card.Title>{image.imageName}</Card.Title>
              <Card.Text>{image.description}</Card.Text>
              <RatingSystem itemId={image._id} onModel="Gallery" />
              <Button
                onClick={() => toggleComments(image._id)}
                aria-controls={`collapse-comments-${image._id}`}
                aria-expanded={collapsedComments[image._id]}
              >
                {collapsedComments[image._id] ? 'Hide Comments' : 'Show Comments'}
              </Button>
              <Collapse in={collapsedComments[image._id]}>
                <div id={`collapse-comments-${image._id}`}>
                  <CommentSystem itemId={image._id} onModel="Gallery" />
                </div>
              </Collapse>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Pagination className="justify-content-center my-4">
        {[...Array(Math.ceil(portal?.Images.length / imagesPerPage)).keys()].map((number) => (
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
export default PortalDetails;

