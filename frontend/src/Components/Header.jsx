import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logoutRedux } from "../slices/authSlice";
import { LinkContainer } from "react-router-bootstrap";
import ThemeToggle from "./ThemeToggle";
import { clearUserProfile } from "../slices/profileSlice";
import { useTranslation } from "react-i18next";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isEmailVerified = useSelector((state) => state.auth.isEmailVerified);
  const [logoutError, setLogoutError] = useState(null);
  const { t, i18n } = useTranslation();

  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logoutRedux());
      dispatch(clearUserProfile());
      navigate("/login");
    } catch (error) {
      console.error(error);
      setLogoutError(t("errors:logoutFailed"));
    }
  };

  return (
    <header className={`header ${i18n.language === "ar" ? "rtl" : ""}`}>
      <Navbar bg="" expand="lg" collapseOnSelect>
        <Navbar.Brand className="logo">
          <img
            className="img-logo"
            src="/assets/logo.png"
            alt={t("nav:hewayaLinkLogo")}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="menu">
            <LinkContainer to="/">
              <Nav.Link>{t("nav:home")}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/explore">
              <Nav.Link>{t("nav:exploreHobbies")}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/blog">
              <Nav.Link>{t("nav:hobbyistsBlog")}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/gallery">
              <Nav.Link>{t("nav:myGallery")}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/subscriptions">
              <Nav.Link>{t("nav:myPortals")}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>{t("nav:about")}</Nav.Link>
            </LinkContainer>
          </Nav>

          <Nav className="Nav-secondary">
            <ThemeToggle />
            <Nav.Link
              className="eng-toggle"
              onClick={() => i18n.changeLanguage("en")}
            >
              English
            </Nav.Link>
            <Nav.Link
              className="ar-toggle"
              onClick={() => i18n.changeLanguage("ar")}
            >
              العربية
            </Nav.Link>

            {isAuthenticated ? (
              <NavDropdown
                title={
                  <>
                    <div className="avatars-container">
                      <img
                        className="user-avatar avatar"
                        src={user.profilePicture}
                        alt={t("user:greeting")}
                      />
                      {!isEmailVerified && (
                        <div className="notification-badge"></div>
                      )}
                    </div>
                    {user.username}
                  </>
                }
                id="username"
                className="custom-dropdown"
              >
                <LinkContainer to="/profile">
                  <NavDropdown.Item>{t("nav:profile")}</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  {t("nav:logout")}
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaSignInAlt /> {t("nav:signIn")}
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>
                    <FaSignOutAlt /> {t("nav:signUp")}
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
            {logoutError && <p>{logoutError}</p>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
