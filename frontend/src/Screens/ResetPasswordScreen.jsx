import  { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";  

const ResetPassword = () => {
  const { passwordResetToken } = useParams();  
  const navigate = useNavigate(); 

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("/api/users/confirm-reset", { passwordResetToken, newPassword });
      if (response.data.success) {
        toast.success("Password successfully reset!");
        navigate("/login");  
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="resetPasswordContainer">
      <h2 className="resetPasswordTitle">Reset Password</h2>
      <form onSubmit={handleSubmit} className="resetPasswordForm">
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="resetPasswordInput"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="resetPasswordInput"
        />
        <button type="submit" className="resetPasswordButton">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
