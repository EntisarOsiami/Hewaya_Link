import { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  Collapse,
  ProgressBar,
} from "react-bootstrap";
import Loader from "../Components/Loader.jsx";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../slices/userApiSlice.js";
import Image from "react-bootstrap/Image";
import { updateUserProfile } from "../slices/profileSlice.js";
import defaultAvatars from "../Data/avatars";
import EmailVerificationBanner from "../Components/EmailVerificationBanner.jsx";
import { requestPasswordReset } from "../Components/requestPasswordReset.jsx";
import { useTranslation } from "react-i18next";
import axios from "axios";

const UserProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState({ firstName: "", lastName: "" });
  const { isEmailVerified } = useSelector((state) => state.auth);
  const { t, i18n } = useTranslation();
  const [profilePicture, setProfilePicture] = useState(
    "/Avatars/defaultPlaceholder.jpg"
  );
  const [selectedAvatar, setSelectedAvatar] = useState(
    "/Avatars/defaultPlaceholder.jpg"
  );
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [showUpdateFields, setShowUpdateFields] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const [updateUserInfo, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username);
      setEmail(user.email.address);
      setProfilePicture(user.profilePicture);
      setSelectedAvatar(user.profilePicture);
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("/api/users/profile");
      dispatch(updateUserProfile({ data: { user: response.data.data } }));
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch profile data");
    }
  };

  const getRankInfo = (points) => {
    const ranks = [
        { name: t("userProfileScreen:ranks:noviceExplorer"), minPoints: 0, nextRankPoints: 25 },
        { name: t("userProfileScreen:ranks:enthusiasticHobbyist"), minPoints: 25, nextRankPoints: 100 },
        { name: t("userProfileScreen:ranks:skilledArtisan"), minPoints: 100, nextRankPoints: 250 },
        { name: t("userProfileScreen:ranks:masterCrafter"), minPoints: 250, nextRankPoints: 500 },
        { name: t("userProfileScreen:ranks:legendaryCreator"), minPoints: 500, nextRankPoints: Infinity },
    ];

    const currentRank = ranks.find((rank) => points < rank.nextRankPoints);
    const progress =
      ((points - currentRank.minPoints) /
        (currentRank.nextRankPoints - currentRank.minPoints)) *
      100;

    return {
      rankName: currentRank.name,
      progress: isNaN(progress) ? 100 : Math.min(progress, 100),
    };
  };

  const rankInfo = user
    ? getRankInfo(user.userRanking)
    : { rankName: "", progress: 0 };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUserInfo({
        username,
        email,
        name: { firstName: name.firstName, lastName: name.lastName },
        profilePicture: { url: selectedAvatar },
      }).unwrap();

      dispatch(updateUserProfile({ ...res }));
      toast.success("Profile updated successfully");
      setShowUpdateFields(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const isRtl = () => {
    const rtlLanguages = ["ar", "he", "ur"];
    return rtlLanguages.includes(i18n.language);
  };

  return (
    <div className={`profileContainer ${isRtl() ? "rtl" : ""}`}>
      {!isEmailVerified && <EmailVerificationBanner />}
      <h1>{t("userProfileScreen:profileHeader")}</h1>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Image
                src={profilePicture || "/Avatars/defaultPlaceholder.jpg"}
                thumbnail
              />
              <Card.Title>
                {name.firstName} {name.lastName}
              </Card.Title>
              <Card.Text>
                <strong>
                  {t("userProfileScreen:profileDetails.username")}:
                </strong>{" "}
                {username}
                <br />
                <strong>
                  {t("userProfileScreen:profileDetails.email")}:
                </strong>{" "}
                {email}
                <br />
                <div>
                  <strong>{t("userProfileScreen:profileDetails:rank")}</strong> {rankInfo.rankName}
                  <ProgressBar
                    now={rankInfo.progress}
                    label={`${rankInfo.progress.toFixed(0)}%`}
                  />
                </div>
                <br />
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => {
                    if (
                      window.confirm(
                        t("userProfileScreen:confirmations.resetPassword")
                      )
                    ) {
                      requestPasswordReset(email);
                    }
                  }}
                >
                  {t("userProfileScreen:profileDetails.resetPasswordButton")}
                </Button>
              </Card.Text>
              {showUpdateFields ? null : (
                <button
                  onClick={() => setShowUpdateFields(true)}
                  className="btn-custom"
                  size="sm"
                >
                  {t("userProfileScreen:profileDetails.updateProfileButton")}
                </button>
              )}
            </Card.Body>
          </Card>
        </Col>
        {showUpdateFields && (
          <Col lg={8} md={7}>
            <Card>
              <Card.Body>
                <h3>{t("userProfileScreen:updateInformation.header")}</h3>
                <Form onSubmit={submitHandler}>
                  <Row>
                    <Col>
                      <Form.Group controlId="firstName">
                        <Form.Label>
                          {t(
                            "userProfileScreen:updateInformation.labels.firstName"
                          )}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={t(
                            "userProfileScreen:updateInformation.placeholders.firstName"
                          )}
                          value={name.firstName}
                          onChange={(e) =>
                            setName({ ...name, firstName: e.target.value })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="lastName">
                        <Form.Label>
                          {t(
                            "userProfileScreen:updateInformation.labels.lastName"
                          )}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={t(
                            "userProfileScreen:updateInformation.placeholders.lastName"
                          )}
                          value={name.lastName}
                          onChange={(e) =>
                            setName({ ...name, lastName: e.target.value })
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group controlId="username">
                    <Form.Label>
                      {t("userProfileScreen:updateInformation.labels.username")}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t(
                        "userProfileScreen:updateInformation.placeholders.username"
                      )}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>
                      {t(
                        "userProfileScreen:updateInformation.labels.emailAddress"
                      )}
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder={t(
                        "userProfileScreen:updateInformation.placeholders.email"
                      )}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="avatar">
                    <Form.Label>
                      {t(
                        "userProfileScreen:updateInformation.labels.chooseAvatar"
                      )}
                    </Form.Label>
                    <div
                      className="avatar-selection-box"
                      onClick={() => setOpen(!open)}
                    >
                      <img src={selectedAvatar} alt="Selected Avatar" />
                    </div>
                    <Collapse in={open}>
                      <div className="avatars-container">
                        {defaultAvatars.map((avatar) => (
                          <img
                            key={avatar.url}
                            src={avatar.url}
                            alt={avatar.name}
                            className={`avatar-image ${
                              selectedAvatar === avatar.url ? "active" : ""
                            }`}
                            onClick={() => setSelectedAvatar(avatar.url)}
                          />
                        ))}
                      </div>
                    </Collapse>
                  </Form.Group>

                  <button type="submit" className="btn-custom">
                    {t("userProfileScreen:updateInformation.buttons.update")}
                  </button>
                  <button
                    type="button"
                    className="btn-custom-side"
                    onClick={() => setShowUpdateFields(false)}
                  >
                    {t("userProfileScreen:updateInformation.buttons.cancel")}
                  </button>
                  {isLoading && <Loader />}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default UserProfileScreen;
