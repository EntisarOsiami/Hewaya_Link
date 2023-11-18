import { useState, useEffect } from "react";
import axios from "axios";

const PortalList = () => {
  const [portals, setPortals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPortals = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/portals");
        console.log("Portals data:", response.data);
        
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
    <div>
      <h1>Portals</h1>
      <ul>
        {portals.map((portal) => (
          <li key={portal._id}>{portal.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PortalList;
