import  { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Card, Tabs, Tab, Button } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars-2";
import RatingSystem from "./RatingSystem";
import CommentSystem from "./CommentSystem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faTimes } from "@fortawesome/free-solid-svg-icons";
import BlogCard from "./blogCard.jsx"; 

const SubscribedPortals = ({ userId }) => {
  const [subscribedPortals, setSubscribedPortals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeKey, setActiveKey] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState({});

  useEffect(() => {
    const fetchSubscribedPortals = async () => {
      try {
        const response = await axios.get(`/api/portals/${userId}/userSubs`);
        const portals = response.data.data;
        setSubscribedPortals(portals);

        const newSubscriptionStatus = portals.reduce((status, portal) => {
          status[portal._id] = portal.subscribers.includes(userId);
          return status;
        }, {});
        setSubscriptionStatus(newSubscriptionStatus);

        if (portals.length > 0) {
          setActiveKey(portals[0]._id);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribedPortals();
  }, [userId]);

  const formatFileSizeInKBorMB = (bytes) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    } else {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleSubscribeClick = async (portalId) => {
    try {
      await axios.patch(`/api/portals/${portalId}/subscribe`, { userId });
      setSubscriptionStatus((prevStatus) => ({
        ...prevStatus,
        [portalId]: !prevStatus[portalId],
      }));
    } catch (error) {
      console.error("Error toggling subscription:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container-subscribed">
      <Tabs activeKey={activeKey} onSelect={(k) => setActiveKey(k)} className="mb-3">
        {subscribedPortals.map((portal) => (
          <Tab eventKey={portal._id} title={portal.name} key={portal._id}>
            <Button
              className="subscribe-btn"
              onClick={() => handleSubscribeClick(portal._id)}
              variant={subscriptionStatus[portal._id] ? "danger" : "success"}
            >
              {subscriptionStatus[portal._id] ? "Unsubscribe" : "Subscribe"}
            </Button>

            <Scrollbars style={{ height: 800 }}>
              {portal.Images.map((image) => (
                <Card key={image._id}>
                  <Card.Img variant="top" src={image.imageUrl} />
                  <Card.Body>
                    <Card.Title>{image.imageName}</Card.Title>
                    <Card.Text>{image.description}</Card.Text>
                    <br />
                    <RatingSystem itemId={image._id} onModel="Gallery" />
                    <strong>Metadata:</strong>
                    <ul>
                      <li>
                        Resolution: {image.metadata.resolution.width} x{" "}
                        {image.metadata.resolution.height} pixels
                      </li>
                      <li>File Type: {image.metadata.fileType}</li>
                      <li>File Size: {formatFileSizeInKBorMB(image.metadata.fileSize)}</li>
                    </ul>
                    <br />
                    <Button onClick={toggleComments} className="btn-custom">
                      <FontAwesomeIcon icon={showComments ? faTimes : faComment} />
                      {showComments ? " Hide Comments" : " Show Comments"}
                    </Button>
                    {showComments && (
                      <CommentSystem itemId={image._id} onModel="Gallery" />
                    )}
                    <br />
                  </Card.Body>
                </Card>
              ))}
         
              {/* Render blog cards */}
              {portal.blog.map((blog) => (
                <div key={blog._id} className="blog-card-container">
                  <BlogCard blog={blog} />
                </div>
              ))}
            </Scrollbars>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

SubscribedPortals.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default SubscribedPortals;
