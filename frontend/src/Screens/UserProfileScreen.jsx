import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Card } from "react-bootstrap";
import Loader from "../Components/Loader.jsx";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../slices/userApiSlice.js";
import Image from "react-bootstrap/Image";
import { updateUserProfile } from "../slices/profileSlice.js";

const UserProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState({ firstName: "", lastName: "" });
  const [username, setUsername] = useState("");
  const [showUpdateFields, setShowUpdateFields] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const [updateUserInfo, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUserInfo({
        username,
        email,
        name: { firstName: name.firstName, lastName: name.lastName },
      }).unwrap();

      dispatch(updateUserProfile({ ...res }));
      toast.success("Profile updated successfully");
      setShowUpdateFields(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container>
      <h1 className="mt-5">Profile</h1>
      <Row>
        <Col lg={4} md={5} className="mb-4">
          <Card>
            <Card.Body>
              <Image
                src="assets/60111.jpg"
                thumbnail
                className="mx-auto d-block"
              />
              <Card.Title className="text-center">
                {name.firstName} {name.lastName}
              </Card.Title>
              <Card.Text className="text-center">
                <strong>Username:</strong> {username}
                <br />
                <strong>Email:</strong> {email}
              </Card.Text>
              {showUpdateFields ? null : (
                <Button
                  onClick={() => setShowUpdateFields(true)}
                  variant="primary"
                  className="w-100 mt-3"
                >
                  Update Profile
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
        {showUpdateFields && (
          <Col lg={8} md={7}>
            <Card>
              <Card.Body>
                <h3 className="mb-4">Update Information</h3>
                <Form onSubmit={submitHandler}>
                  <Row>
                    <Col>
                      <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="First Name"
                          value={name.firstName}
                          onChange={(e) =>
                            setName({ ...name, firstName: e.target.value })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Last Name"
                          value={name.lastName}
                          onChange={(e) =>
                            setName({ ...name, lastName: e.target.value })
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Button type="submit" variant="success" className="mt-4 me-4">
                    Update
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setShowUpdateFields(false)}
                    className="mt-4 me-4" 
                  >
                    Cancel
                  </Button>
                  {isLoading && <Loader />}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default UserProfileScreen;
