import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Hero = () => {
  return (
    <div>
      <div className='hero-section d-flex align-items-center justify-content-center  '  >
        <div className='text-center'>
          <h1 className='mb-4' style={{ fontSize: '5rem', color: '#61D2D6', animation: 'fade-in 1s' }}>Hewaya Link</h1>
          <p className='mb-4' style={{ fontSize: '2rem', color: '#61D2D6', animation: 'fade-in 1s' }}>Your gateway to exploring the world of hobbies</p>
          <div className='d-flex justify-content-center'>
            <LinkContainer to='/login'>
              <Button variant='primary' className='me-3' style={{ animation: 'fade-in 1s' }}>
                Sign In
              </Button>
            </LinkContainer>
            <LinkContainer to='/register'>
              <Button variant='secondary' style={{ animation: 'fade-in 1s' }}>Sign Up</Button>
            </LinkContainer>
          </div>
        </div>
      </div>
      
      <Container className="mt-5 " >
  <Row>
    <Col md={3}>
      <Card className="text-center my-3 card-animation colorful-card">
        <Card.Body>
          <Card.Title>Reduced Stress</Card.Title>
          <Card.Text>
            &ldquo;Hobbies are a great way to relax and reduce stress in your life.&rdquo;
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>

    <Col md={3}>
      <Card className="text-center my-3 card-animation colorful-card">
        <Card.Body>
          <Card.Title>Improved Creativity</Card.Title>
          <Card.Text>
            &ldquo;Exploring hobbies can unlock your creativity and inspire new ideas.&rdquo;
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>

    <Col md={3}>
      <Card className="text-center my-3 card-animation colorful-card">
        <Card.Body>
          <Card.Title>Enhanced Well-being</Card.Title>
          <Card.Text>
            &ldquo;Engaging in hobbies contributes to an overall sense of well-being.&rdquo;
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>

    <Col md={3}>
      <Card className="text-center my-3 card-animation colorful-card">
        <Card.Body>
          <Card.Title>Social Connections</Card.Title>
          <Card.Text>
            &ldquo;Many hobbies provide opportunities to connect with others.&rdquo;
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

