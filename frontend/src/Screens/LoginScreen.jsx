import  { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import FormContainer from "../Components/FormContainer.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice.js";
import { toast } from "react-toastify";
import Loader from "../Components/Loader.jsx";
import { updateUserProfile } from "../slices/profileSlice.js";
import { loginRedux } from "../slices/authSlice.js";
import { requestPasswordReset } from "../Components/requestPasswordReset.jsx";

const LoginScreen = () => {
  const [userInput, setUserInput] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginDatabase, { isLoading }] = useLoginMutation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [navigate, isAuthenticated]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await loginDatabase({
        emailOrUsername: userInput,
        password,
      }).unwrap();
      dispatch(loginRedux({...res }));
      dispatch(updateUserProfile({...res }));
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handlePasswordReset = async () => {
    await requestPasswordReset(resetEmail);
    setShowResetModal(false); // Close the modal after sending the request
  };

  return (
    <FormContainer>
      <div>
        <h1 className="text-center mb-4">Sign In</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="emailOrUsername">
            <Form.Label>Email Address or Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email or username"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            disabled={isLoading}
            type="submit"
            variant="primary"
            className="mt-3"
          >
            Sign In
          </Button>
        </Form>

        {isLoading && <Loader />}

        <Row className="py-3">
          <Col className="text-center">
            New Member? <Link to="/register">Register</Link>
          </Col>
        </Row>

        <Row className="py-3">
          <Col className="text-center">
            <Link onClick={() => setShowResetModal(true)}>Forgot Password?</Link>
          </Col>
        </Row>

        {/* Password Reset Modal */}
        <Modal show={showResetModal} onHide={() => setShowResetModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Forgot Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Enter your email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowResetModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handlePasswordReset}>
              Send Reset Link
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </FormContainer>
  );
};

export default LoginScreen;
