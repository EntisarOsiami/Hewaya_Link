import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import Loader from '../Components/Loader.jsx';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../slices/userApiSlice.js';
import Image from "react-bootstrap/Image";
import { updateUserProfile } from '../slices/profileSlice.js';

const UserProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState({ firstName: '', lastName: '' });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showUpdateFields, setShowUpdateFields] = useState(false);
  const dispatch = useDispatch();
  const [ updateUserInfo, {isLoading} ] = useUpdateUserMutation();
  const { user } = useSelector((state) => state.profile.user);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateUserInfo({
          username,
          email,
          password,
          name: { firstName: name.firstName, lastName: name.lastName }
        }).unwrap();
        
        dispatch(updateUserProfile({ ...res }));
        toast.success('Profile updated successfully');
        setShowUpdateFields(false);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div>
      <h1>{name.firstName} {name.lastName}&rsquo;s Profile</h1>
      <Container>
        <Row>
          <Col>
            <Row>
              <h3>Current Information</h3>
            </Row>
            <Row>
              <Col>
                <p>Username: {username}</p>
                <p>Email: {email}</p>
              </Col>
              <Col>
                <Image src="assets/60111.jpg" thumbnail />
              </Col>
            </Row>
            <Row>
              {showUpdateFields ? null : (
                <Button onClick={() => setShowUpdateFields(true)}>Update</Button>
              )}
            </Row>
          </Col>
          {showUpdateFields && (
            <Col>
              <h3>Update Information</h3>
              <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='name'>
                  <Form.Label>Update Username</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Username'
                    value={user.username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='my-2' controlId='email'>
                  <Form.Label>Update Email Address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Email'
                    value={user.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='my-2' controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Enter new password'
                    value={user.password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='my-2' controlId='confirmPassword'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Confirm new password'
                    value={user.confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                <Button type='submit' className='mr-2'>
                  Update
                </Button>
                <Button variant='secondary' onClick={() => setShowUpdateFields(false)}>
                  Cancel
                </Button>
                {isLoading && <Loader />}
              </Form>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default UserProfileScreen;
