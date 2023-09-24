import { useState, useEffect } from 'react';
import { Form, Button, Row,Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader.jsx';
import FormContainer from '../Components/FormContainer.jsx';
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import Image from "react-bootstrap/Image";

const UpdateProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  

  const [updateProfile, { isLoading }] = useUpdateUserMutation();
  

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    
  }, [userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        console.log(res);
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    // display current user name and email
    <FormContainer>
      <h1>{name}&apos;s Profile</h1>
     <Container className='my-auto'>
     <Row>
  <Col>
    <Row>
      <span style={{ fontWeight: 'bold' }}>Username:</span> {name}
    </Row>
    <Row>
      <span style={{ fontWeight: 'bold' }}>Email:</span> {email}
    </Row>
  </Col>
  <Col>
    <Image src="assets/60111.jpg" thumbnail />
  </Col>
</Row>

     </Container>
     

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Update Username</Form.Label>
          <Form.Control
            type='name'
            placeholder='Username'
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
          
        </Form.Group>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Update Email Address </Form.Label>
          <Form.Control
            type='email'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter new password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm new password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Update
        </Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>

  );
};

export default UpdateProfileScreen;