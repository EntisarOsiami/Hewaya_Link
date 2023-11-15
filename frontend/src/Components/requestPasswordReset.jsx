import axios from 'axios';
import { toast } from 'react-toastify';

export const requestPasswordReset = async (email) => {
    try {
      const response = await axios.post('/api/users/reset-password', { email });
      if (response.data.success) {
        // Display success message or perform further actions
        toast.success("If an account with that email exists, a password reset link has been sent.");
      } else {
        // Handle error - user not found or other issues
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while sending the reset link. Please try again.");
    }
  }
  
