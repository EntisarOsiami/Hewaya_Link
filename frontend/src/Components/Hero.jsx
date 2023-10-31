import { Card, Container, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Hero = () => {
  return (
    <div>
      <div className="hero-section">
        <div className="text-center">
          <h1 className="mb-4">Hewaya Link</h1>
          <p className="mb-4">Your gateway to exploring the world of hobbies</p>
          <div className="d-flex">
            <LinkContainer to="/login">
              <button className="btn-custom">Sign In</button>
            </LinkContainer>
            <LinkContainer to="/register">
              <button className="btn-custom">Sign Up</button>
            </LinkContainer>
          </div>
        </div>
      </div>
      
      <Container className="card-container">
        <Row className="row-equal-height">
          <Col md={3}>
            <Card className="custom-card">
              <Card.Body>
                <Card.Title>Reduced Stress</Card.Title>
                <Card.Text>
                  “Hobbies are a great way to relax and reduce stress in your life.”
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="custom-card">
              <Card.Body>
                <Card.Title>Improved Creativity</Card.Title>
                <Card.Text>
                  “Exploring hobbies can unlock your creativity and inspire new ideas.”
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="custom-card">
              <Card.Body>
                <Card.Title>Enhanced Well-being</Card.Title>
                <Card.Text>
                  “Engaging in hobbies contributes to an overall sense of well-being.”
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="custom-card">
              <Card.Body>
                <Card.Title>Social Connections</Card.Title>
                <Card.Text>
                  “Many hobbies provide opportunities to connect with others.”
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;
