import {  Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import FormContainer from './FormContainer';

const Hero = () => {
  return (
    <div className='hero-section'>
      <FormContainer>
        <Card className='p-5 text-center hero-card'>
          <h1 className='mb-4'>Hewaya Link</h1>
          <p className='mb-4'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
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
        </Card>
      </FormContainer>
    </div>
  );
};

export default Hero;
