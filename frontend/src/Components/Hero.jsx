import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import FormContainer from './FormContainer';

const Hero = () => {
  return (
    <div className='hero-section d-flex align-items-center justify-content-center'>
      <FormContainer>
        <div className='text-center'>
          <h1 className='mb-4'>Hewaya Link</h1>
          <p className='mb-4'>
            Your gateway to exploring the world of hobbies
          </p>
          <div className='d-flex justify-content-center'>
            <LinkContainer to='/login'>
              <Button variant='primary' className='me-3'>
                Sign In
              </Button>
            </LinkContainer>
            <LinkContainer to='/register'>
              <Button variant='secondary'>Sign Up</Button>
            </LinkContainer>
          </div>
        </div>
      </FormContainer>
    </div>
  );
};

export default Hero;
