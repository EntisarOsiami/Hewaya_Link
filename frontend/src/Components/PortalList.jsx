import { useState, useEffect } from "react";
import axios from "axios";

const Portals = () => {
  const [portals, setPortals] = useState([]);
  const [selectedPortal, setSelectedPortal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const fetchPortalDetails = async (id) => {
    try {
      const response = await axios.get(`/api/portals/${id}`);
      setSelectedPortal(response.data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Portals</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {portals.map((portal) => (
          <div key={portal._id} onClick={() => fetchPortalDetails(portal._id)} style={{ border: "1px solid black", margin: "10px", padding: "10px", cursor: "pointer" }}>
            <h3>{portal.name}</h3>
            <div style={{ width: "100px", height: "100px", backgroundColor: "#ddd" }}></div>
            <p>{portal.description}</p>
          </div>
        ))}
      </div>

      {selectedPortal && (
        <div style={{ marginTop: "20px", border: "1px solid blue", padding: "10px" }}>
          <h2>Details of {selectedPortal.name}</h2>
          <p>{selectedPortal.description}</p>
          {/* Additional details can be added here */}
        </div>
      )}
    </div>
  );
};

export default Portals;
