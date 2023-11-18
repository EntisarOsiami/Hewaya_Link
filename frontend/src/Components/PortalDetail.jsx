import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const PortalDetail = ({ match }) => {
  const [portal, setPortal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPortal = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/portals/${match.params.id}`);
        setPortal(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPortal();
  }, [match.params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!portal) return <div>Portal not found</div>;

  PortalDetail.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  };

  return (
    <div>
      <h1>{portal.name}</h1>
      <p>{portal.description}</p>
    </div>
  );
};

export default PortalDetail;
