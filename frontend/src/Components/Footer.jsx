import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Contact Us</h5>
            <p>
              You can reach us at{' '}
              <a href="mailto:contact@HewayaLink.com" rel="noopener noreferrer">
                contact@HewayaLink.com
              </a>
            </p>
          </Col>
          <Col md={6}>
           
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://www.facebook.com/" rel="noopener noreferrer">
                  <FaFacebook /> Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com/" rel="noopener noreferrer">
                  <FaTwitter /> Twitter
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/" rel="noopener noreferrer">
                  <FaInstagram /> Instagram
                </a>
              </li>
            </ul>
            
          </Col>
        </Row>
        <Row>
          <Col>
            <ul>
              <li><Link to="/about">Terms of Service</Link></li>
              <li><Link to="/about">Privacy Policy</Link></li>     
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="footer-bottom text-center">
        <p className="mb-0">&copy; {new Date().getFullYear()} Hewaya Link. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;