import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";

const Portals = () => {
  const [portals, setPortals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPortals = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/portals");
        setPortals(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPortals();
  }, []);

  function handleJoin() {
    navigate("/register");
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
      <><h1 className="headerPortal">Discover Your Next Hobby</h1><div className="portals-container">

      {portals.map((portal) => (
        <div
          key={portal._id}
          className="portal-card"
          onClick={() => navigate(`/portals/${portal._id}`)}
        >
          <h3>{portal.name}</h3>
          <p>{portal.shortDescription}</p>
        </div>
      ))}
    </div>
    <Row className="join-section">
        <div className="join-content">
          <h5>Join Our Community!</h5>
          <p>
            Discover more hobbies, share your experiences, and connect with
            like-minded people.
          </p>
          <div className="button-container">
            <button className="btn-custom" onClick={handleJoin}>
              Join Now
            </button>{" "}
          </div>
        </div>
      </Row></>
  );
};

export default Portals;
