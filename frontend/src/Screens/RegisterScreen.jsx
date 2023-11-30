import { useState, useEffect } from "react";
import { Form, Row, Col, Collapse } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/userApiSlice.js";
import { loginRedux } from "../slices/authSlice.js";
import { toast } from "react-toastify";
import Loader from "../Components/Loader.jsx";
import { updateUserProfile } from "../slices/profileSlice.js";
import defaultAvatars from "../Data/avatars";
import { useTranslation } from "react-i18next";

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [selectedAvatar, setSelectedAvatar] = useState(
    "/Avatars/defaultPlaceholder.jpg"
  );
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate, isAuthenticated]);

  const handleAvatarChange = (avatarUrl) => {
    setSelectedAvatar(avatarUrl);
    setOpen(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await register({
        name: {
          firstName,
          lastName,
        },
        email: {
          address: email,
        },
        username,
        password,
        birthDate,
        profilePicture: { url: selectedAvatar },
      }).unwrap();

      dispatch(loginRedux({ ...res }));
      dispatch(updateUserProfile({ ...res }));

      navigate("/verify/:token");
    } catch (err) {
      console.error("Register error:", err);
      toast.error(err?.data?.message || err.error);
    }
  };
  const isRtl = () => {
    const rtlLanguages = ["ar", "he", "ur"];
    return rtlLanguages.includes(i18n.language);
  };
  return (
    <div className={`register-container ${isRtl() ? "rtl" : ""}`}>
      <h1 className="text-center">{t("registerScreen:createAccount")}</h1>
      <Form onSubmit={submitHandler}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label>{t("registerScreen:firstName")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("registerScreen:firstNamePlaceholder")}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="lastName">
              <Form.Label>{t("registerScreen:lastName")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("registerScreen:lastNamePlaceholder")}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="username">
          <Form.Label>{t("registerScreen:username")}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t("registerScreen:usernamePlaceholder")}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>{t("registerScreen:emailAddress")}</Form.Label>
          <Form.Control
            type="email"
            placeholder={t("registerScreen:emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>{t("registerScreen:password")}</Form.Label>
          <Form.Control
            type="password"
            placeholder={t("registerScreen:passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>{t("registerScreen:confirmPassword")}</Form.Label>
          <Form.Control
            type="password"
            placeholder={t("registerScreen:confirmPasswordPlaceholder")}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="date">
          <Form.Label>{t("registerScreen:dateOfBirth")}</Form.Label>
          <Form.Control
            type="date"
            className="form-control-date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="avatar">
          <Form.Label>{t("registerScreen:chooseAvatar")}</Form.Label>
          <div className="avatar-selection-box" onClick={() => setOpen(!open)}>
            <img src={selectedAvatar} alt="Selected Avatar" />
          </div>
          <Collapse in={open}>
            <div className="avatars-container">
              {defaultAvatars.map((avatar) => (
                <img
                  key={avatar.url}
                  src={avatar.url}
                  alt={avatar.name}
                  className={`avatar-image ${
                    selectedAvatar === avatar.url ? "active" : ""
                  }`}
                  onClick={() => handleAvatarChange(avatar.url)}
                />
              ))}
            </div>
          </Collapse>
        </Form.Group>

        <button type="submit" className="btn-custom w-100">
          {t("registerScreen:createAccountButton")}
        </button>
        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          {t("registerScreen:haveAccount")}{" "}
          <Link to={`/login`}>{t("registerScreen:signIn")}</Link>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterScreen;
