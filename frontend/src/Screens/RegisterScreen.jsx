import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Collapse } from 'react-bootstrap';
import FormContainer from '../Components/FormContainer.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/userApiSlice.js';
import { loginRedux } from '../slices/authSlice.js';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader.jsx';
import { updateUserProfile } from '../slices/profileSlice.js';
import defaultAvatars from '../Data/avatars';

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [selectedAvatar, setSelectedAvatar] = useState('/Avatars/defaultPlaceholder.jpg');
  const [open, setOpen] = useState(false);
  
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [navigate, isAuthenticated]);

  const handleAvatarChange = (avatarUrl) => {
    setSelectedAvatar(avatarUrl);
    setOpen(false);  
  };


  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const res = await register({
        name: {
          firstName,
          lastName,
        },
        email: {
          address: email
        },
        username,
        password,
        birthDate,
        profilePicture: { url: selectedAvatar }
      }).unwrap();
      
      console.log(res);

      dispatch(loginRedux({ ...res }));
      dispatch(updateUserProfile({ ...res }));

      navigate('/verify/:token');
    } catch (err) {
      console.error('Register error:', err);
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <FormContainer>
      <h1 className='text-center'>Create an Account</h1>
      <Form onSubmit={submitHandler}>
        <Row>
          <Col md={6}>
            <Form.Group controlId='firstName'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter first name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='lastName'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter last name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='date'>
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type='date'
            placeholder=''
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            style={{
              padding: '10px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#f2f2f2',
              fontSize: '16px',
              color: '#333',
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='avatar'>
          <Form.Label>Choose an Avatar</Form.Label>
          <div className="avatar-selection-box" onClick={() => setOpen(!open)}>
            <img src={selectedAvatar} alt="Selected Avatar" />
          </div>
          <Collapse in={open}>
            <div className="avatars-container">
              {defaultAvatars.map(avatar => (
                <img 
                  key={avatar.url} 
                  src={avatar.url} 
                  alt={avatar.name} 
                  className={`avatar-image ${selectedAvatar === avatar.url ? 'active' : ''}`}
                  onClick={() => handleAvatarChange(avatar.url)} 
                />
              ))}
            </div>
          </Collapse>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3 w-100'>
          Create Account
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className='py-3'>
        <Col>
          Already have an account? <Link to={`/login`}>Sign In</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;



 


