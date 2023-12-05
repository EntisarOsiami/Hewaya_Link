import { useState, useEffect } from "react";
import axios from "axios";

const PortalManagement = () => {
  const [portals, setPortals] = useState([]);
  const [currentPortal, setCurrentPortal] = useState(null);

  useEffect(() => {
    fetchPortals();
  }, []);

  const fetchPortals = async () => {
    try {
      const response = await axios.get("/api/admin/portals");
      setPortals(response.data.data);
    } catch (error) {
      console.error("Failed to fetch portals:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(`/api/admin/portals/${currentPortal._id}`, currentPortal);
      fetchPortals();
      setCurrentPortal(null);
    } catch (error) {
      console.error("Failed to update portal:", error);
    }
  };

  const startEdit = (portal) => {
    setCurrentPortal({ ...portal });
  };

  const handleChange = (e) => {
    setCurrentPortal({ ...currentPortal, [e.target.name]: e.target.value });
  };

  return (
    <div className="mod-portal-management">
      <h1 className="mod-portal-management-title">Portal Management</h1>
      {portals.map((portal) => (
        <div className="mod-portal-details" key={portal._id}>
          <h2 className="mod-portal-name">{portal.name}</h2>
          <p className="mod-portal-description">
            Description: {portal.description}
          </p>
          <button className="btn-custom" onClick={() => startEdit(portal)}>
            Edit
          </button>
        </div>
      ))}

      {currentPortal && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
        >
          <input
            type="text"
            name="name"
            className="input-custom"
            value={currentPortal.name}
            onChange={handleChange}
            placeholder="Portal Name"
          />
          <textarea
            name="description"
            className="textarea-custom"
            value={currentPortal.description}
            onChange={handleChange}
            placeholder="Portal Description"
          />
          <button className="btn-custom" type="submit">
            Update Portal
          </button>
          <button className="btn-custom" onClick={() => setCurrentPortal(null)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default PortalManagement;
