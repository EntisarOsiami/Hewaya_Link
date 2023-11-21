import { useState, useEffect } from "react";
import axios from "axios";
import { Scrollbars } from 'react-custom-scrollbars-2';

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
    <div className="portals-container">
      <h1>Portals</h1>
      <div className="portals-list">
        {portals.map((portal) => (
          <div
            key={portal._id}
            onClick={() => fetchPortalDetails(portal._id)}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <h3>{portal.name}</h3>
            <p>{portal.description}</p>
          </div>
        ))}
      </div>

      {selectedPortal && (
        <div className="portal-details">
          <h2>Details of {selectedPortal.name}</h2>
          <p>{selectedPortal.description}</p>
          <Scrollbars style={{ width: 'auto', height: '500px' }} autoHide>
            <div className="images-feed">
              {selectedPortal.Images && selectedPortal.Images.length > 0 && 
                selectedPortal.Images.map((image, index) => (
                  <div key={index} className="image-card">
                    <img src={image.imageUrl} alt={`Image for ${selectedPortal.name}`} className="portal-image" />
                    <div className="card-content">
                      <h4>{image.imageName}</h4>
                      <p>{image.description}</p>
                      {/* You can add more content here */}
                    </div>
                  </div>
                ))
              }
            </div>
          </Scrollbars>
        </div>
      )}
    </div>
  );
};

export default Portals;