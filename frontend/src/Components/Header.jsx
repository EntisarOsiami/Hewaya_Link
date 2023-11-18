import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
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
    }
  };

  return (
    <header className="header">
      <Navbar bg="" expand="lg" collapseOnSelect >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="logo">Hewaya Link</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="menu mx-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/explore">
                <Nav.Link>Explore</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/blog">
                <Nav.Link>Blog</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/gallery">
                <Nav.Link>Gallery</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/portal">
                <Nav.Link>Portal</Nav.Link>
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
              <ThemeToggle />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
