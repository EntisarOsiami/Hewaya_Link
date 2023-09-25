import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-auto py-4 footer">
      <Container>
        <Row>
          <Col md={6}>
            <h4>Contact Us</h4>
            <p>
              You can reach us at <a href="mailto:contact@example.com">contact@example.com</a>
            </p>
          </Col>
          <Col md={6}>
            <h4>Follow Us</h4>
            <ul className="list-unstyled">
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">Instagram</a>
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

