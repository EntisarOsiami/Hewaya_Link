import  { useEffect, useState } from 'react';
import axios from 'axios';

const PortalManagement = () => {
  const [portals, setPortals] = useState([]);

  useEffect(() => {
    fetchPortals();
  }, []);

  const fetchPortals = async () => {
    try {
      const response = await axios.get('/api/admin/portals');
      setPortals(response.data.data);
    } catch (error) {
      console.error('Failed to fetch portals:', error);
    }
  };
  
  const handleDelete = async (portalId) => {
    try {
      await axios.delete(`/api/admin/portals/${portalId}`);
      fetchPortals(); 
    } catch (error) {
      console.error('Failed to delete portal:', error);
    }
  };
  

  return (
    <div>
      <h1>Portal Management</h1>
      {portals.map(portal => (
        <div key={portal._id}>
          <h2>{portal.name}</h2>
          <button onClick={() => handleDelete(portal._id)}>Delete</button>         
        </div>
      ))}
    </div>
  );
};

export default PortalManagement;