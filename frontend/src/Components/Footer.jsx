import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 footer">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Contact Us</h5>
            <p>
              You can reach us at{' '}
              <a href="mailto:contact@example.com">contact@HewayaLink.com</a>
            </p>
          </Col>
          <Col md={6}>
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white">
                  <FaFacebook /> Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-white">
                  <FaTwitter /> Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-white">
                  <FaInstagram /> Instagram
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="bg-secondary text-center py-2">
        <p className="mb-0">&copy; {new Date().getFullYear()} Hewaya Link. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
