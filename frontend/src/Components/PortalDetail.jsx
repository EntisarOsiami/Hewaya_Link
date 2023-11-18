import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PortalDetail = () => {
  const { id } = useParams();
  const [portal, setPortal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPortal = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/portals/${id}`);
        setPortal(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPortal();
  }, [id]); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!portal) return <div>Portal not found</div>;

  return (
    <div>
      <h1>{portal.name}</h1>
      <p>{portal.description}</p>
    </div>
  );
};

export default PortalDetail;
