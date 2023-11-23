import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="portals-container">
      <h1>Portals</h1>
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
  );
};

export default Portals;
