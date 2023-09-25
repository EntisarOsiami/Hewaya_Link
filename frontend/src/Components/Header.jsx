import { Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'; 
import {BsPersonFill} from 'react-icons/bs'; 
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authenticateSlice';
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg='dark' expand='lg' collapseOnSelect variant='dark'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Hewaya Link</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-4'>
              <Link to='/' className='nav-link'>
                Home
              </Link>
              <Link to='/explore' className='nav-link'>
                Explore
              </Link>
              <Link to='/blog' className='nav-link'>
                Blog
              </Link>
              <Link to='/about' className='nav-link'>
                About
              </Link>
            </Nav>
            <Nav className='ms-auto'> {/* Use ms-auto to align to the right */}
              {userInfo ? (
                <NavDropdown title={<><BsPersonFill className='me-2' />{userInfo.name}</>} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
