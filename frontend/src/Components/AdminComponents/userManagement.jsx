import { useEffect, useState } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
const [filterVerified, setFilterVerified] = useState("");
const [filterSuspended, setFilterSuspended] = useState("");


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/admin/users");
      console.log(response.data.data);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleDisable = async (userId) => {
    try {
      await axios.put(`/api/admin/disable/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Failed to disable user:", error);
    }
  };

  const handleEnable = async (userId) => {
    try {
      await axios.put(`/api/admin/enable/${userId}`);
      fetchUsers(); // Refresh the users list
    } catch (error) {
      console.error("Failed to enable user:", error);
    }
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.name?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name?.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchTerm.toLowerCase())
    ) && (filterVerified === "" || user.email?.verified.toString() === filterVerified)
      && (filterSuspended === "" || user.disabled.toString() === filterSuspended);
  });
  return (
    <div className="mod-user-management">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select onChange={(e) => setFilterVerified(e.target.value)}>
        <option value="">Filter by Verification</option>
        <option value="true">Verified</option>
        <option value="false">Not Verified</option>
      </select>

      <select onChange={(e) => setFilterSuspended(e.target.value)}>
        <option value="">Filter by Suspension</option>
        <option value="true">Suspended</option>
        <option value="false">Not Suspended</option>
      </select>
      <h1 className="mod-user-management-title">User Management</h1>
     
      {filteredUsers.map((user) => (
        <div key={user._id}>
            <h2 className="mod-user-name">
            {user.name?.firstName} {user.name?.lastName} ({user.username})
          </h2>
          <p className="mod-user-email">
            Email: {user.email?.address} (Verified:{" "}
            {user.email?.verified ? "Yes" : "No"})
          </p>

          <p>Suspended: {user.disabled ? "Yes" : "No"}</p>
          <button className="btn-custom" onClick={() => handleEnable(user._id)}>Enable</button>
          <button className="btn-custom" onClick={() => handleDisable(user._id)}>Disable</button>
       
        </div>
      ))}
    </div>
  );
};

export default UserManagement;
