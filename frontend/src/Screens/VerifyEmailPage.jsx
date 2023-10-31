import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginRedux } from "../slices/authSlice";

const CombinedVerificationPage = () => {
  const [verificationState, setVerificationState] = useState("pending");
  const navigate = useNavigate();
  const { token } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyEmailToken = async () => {
      try {
        const response = await axios.post("/api/users/verify-email", { token });
        
       
        console.log("Full response:", response.data);

        if (response.data && response.data.success) {
          dispatch(loginRedux({ data: response.data.data }));  
          setVerificationState("success");
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setVerificationState("error");
        }
      } catch (error) {
        console.error("Error during verification:", error);
        setVerificationState("error");
      }
    };

    verifyEmailToken();
  }, [token, navigate, dispatch]);
  const renderContent = () => {
    switch (verificationState) {
      case "pending":
        return (
          <div className="verify-email-card">
            <h2>Registration Successful!</h2>
            <p>
              Please check your email and click on the verification link to
              complete the registration.
            </p>
            <p>If you don’t see the email, please check your spam folder.</p>
            <p>When your email is verified, you can close this window.</p>
            <p>Thank you!</p>
          </div>
        );
      case "success":
        return <p>Email verified successfully! Redirecting to login...</p>;
      case "error":
        return <p>An error occurred while verifying the email.</p>;
      default:
        return null;
    }
  };

  return <div className="verify-email-container">{renderContent()}</div>;
};

export default CombinedVerificationPage;
