import { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/admin/users');
      console.log(response.data.data);
      setUsers(response.data.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleDisable = async (userId) => {
    try {
      await axios.put(`/api/admin/disable/${userId}`);
      fetchUsers(); // Refresh the users list
    } catch (error) {
      console.error('Failed to disable user:', error);
    }
  };
  
  const handleEnable = async (userId) => {
    try {
      await axios.put(`/api/admin/enable/${userId}`);
      fetchUsers(); // Refresh the users list
    } catch (error) {
      console.error('Failed to enable user:', error);
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      {users.map(user => (
        <div key={user._id}>
          <h2>{user.name.firstName} {user.name.lastName}</h2>
          <p>Email: {user.email.address} (Verified: {user.email.verified ? 'Yes' : 'No'})</p>
          <p>Disabled: {user.disabled ? 'Yes' : 'No'}</p> 
          <button onClick={() => handleDisable(user._id)}>Disable</button>
          <button onClick={() => handleEnable(user._id)}>Enable</button>
        </div>
      ))}
    </div>
  );
  
};

export default UserManagement;
