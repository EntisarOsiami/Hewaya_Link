import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
// import FormContainer from './FormContainer';

const Hero = () => {
  return (
    <div className='hero-section d-flex align-items-center justify-content-center' style={{ backgroundImage: "url('assets/sarah-brown-CwSiAVlXOWQ-unsplash.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
  
        <div className='text-center'>
          <h1 className='mb-4' style={{ fontSize: '5rem', color: '#fff', animation: 'fade-in 1s' }}>Hewaya Link</h1>
          <p className='mb-4' style={{ fontSize: '2rem', color: '#fff', animation: 'fade-in 1s' }}>Your gateway to exploring the world of hobbies </p>
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
  );
};

export default Hero;