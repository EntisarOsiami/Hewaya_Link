import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PortalDetails = () => {
  const [portal, setPortal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { portalId } = useParams();

  useEffect(() => {
    const fetchPortalDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/portals/${portalId}`);
        setPortal(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPortalDetails();
  }, [portalId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!portal) return <div>No portal found</div>;

  return (
    <div className="portal-details">
      <h2>{portal.name}</h2>
      <p>{portal.description}</p>
      {/* Render portal images and other details */}
    </div>
  );
};

export default PortalDetails;