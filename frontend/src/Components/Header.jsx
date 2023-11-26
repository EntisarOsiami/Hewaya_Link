import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logoutRedux } from "../slices/authSlice";
import { LinkContainer } from "react-router-bootstrap";
import ThemeToggle from "./ThemeToggle";
import { clearUserProfile } from "../slices/profileSlice";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isEmailVerified = useSelector((state) => state.auth.isEmailVerified);
  const [logoutError, setLogoutError] = useState(null);

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
    } catch (err) {
      console.error(err);
      setLogoutError("Failed to log out. Please try again.");
    }
  };

  return (
    <header className="header">
      <Navbar bg="" expand="lg" collapseOnSelect>
        <Container>
            <Navbar.Brand className="logo">
              <img
                src="/assets/logo.png"
                alt="Hewaya Link Logo"
                style={{ maxHeight: "100px" }}
              />
            </Navbar.Brand>{" "}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="menu mx-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/explore">
                <Nav.Link>Explore Hobbies</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/blog">
                <Nav.Link>Hobbyists Blog</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/gallery">
                <Nav.Link>My Gallery</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/subscriptions">
                <Nav.Link>My Portals</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className="ms-auto">
              {isAuthenticated ? (
                <NavDropdown
                  title={
                    <>
                      <div className="avatars-container">
                        <img
                          className="user-avatar avatar"
                          src={user.profilePicture}
                          alt="User Avatar"
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
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
              {logoutError && <p>{logoutError}</p>}

              <br />

              <ThemeToggle />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
