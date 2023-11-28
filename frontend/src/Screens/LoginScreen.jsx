import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice.js";
import { toast } from "react-toastify";
import Loader from "../Components/Loader.jsx";
import { updateUserProfile } from "../slices/profileSlice.js";
import { loginRedux } from "../slices/authSlice.js";
import { requestPasswordReset } from "../Components/requestPasswordReset.jsx";
import { useTranslation } from "react-i18next";

const LoginScreen = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginDatabase, { isLoading }] = useLoginMutation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate, isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginDatabase({
        emailOrUsername,
        password,
      }).unwrap();
      dispatch(loginRedux({ ...res }));
      dispatch(updateUserProfile({ ...res }));
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handlePasswordReset = async () => {
    await requestPasswordReset(resetEmail);
    setShowResetModal(false);
  };

  const isRtl = () => {
    const rtlLanguages = ["ar", "he", "ur"];
    return rtlLanguages.includes(i18n.language);
  };

  return (
    <div className={`login-screen ${isRtl() ? "rtl" : ""}`}>
      <h1 className="text-center mb-4">{t("loginScreen:title")}</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="emailOrUsername">
          <Form.Label>{t("loginScreen:emailOrUsernameLabel")}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t("loginScreen:emailOrUsernamePlaceholder")}
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>{t("loginScreen:passwordLabel")}</Form.Label>
          <Form.Control
            type="password"
            placeholder={t("loginScreen:passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button
          disabled={isLoading}
          type="submit"
          className="btn-custom w-100 mt-4"
        >
          {t("loginScreen:signInButton")}
        </Button>
      </Form>

      {isLoading && <Loader />}

      <Row className="py-3">
        <Col className="text-center">
          {t("loginScreen:newMember")}{" "}
          <Link to="/register">{t("loginScreen:registerLink")}</Link>
        </Col>
      </Row>

      <Row className="py-3">
        <Col className="text-center">
          <Link onClick={() => setShowResetModal(true)}>
            {t("loginScreen:forgotPasswordLink")}
          </Link>
        </Col>
      </Row>

      <Modal show={showResetModal} onHide={() => setShowResetModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {t("loginScreen:forgotPasswordModal:title")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>
              {t("loginScreen:forgotPasswordModal:emailLabel")}
            </Form.Label>
            <Form.Control
              type="email"
              placeholder={t(
                "loginScreen:forgotPasswordModal:emailPlaceholder"
              )}
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowResetModal(false)}>
            {t("loginScreen:forgotPasswordModal:closeButton")}
          </Button>
          <Button variant="primary" onClick={handlePasswordReset}>
            {t("loginScreen:forgotPasswordModal:sendLinkButton")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginScreen;
