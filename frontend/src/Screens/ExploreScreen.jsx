import { Col, Row } from "react-bootstrap";
import { useState } from "react";
import CardContainer from "../Components/CardContainer.jsx";
import ImageModal from "../Components/ImageModal.jsx";
import { useNavigate } from "react-router-dom";

function ExploreScreen() {
  const [modalImageSrc, setModalImageSrc] = useState(null);

  const navigate = useNavigate();

  function handleJoin() {
    navigate("/register");
  }

  const openModal = (imageSrc) => {
    setModalImageSrc(imageSrc);
  };

  const closeModal = () => {
    setModalImageSrc(null);
  };

  const hobbies = [
    {
      title: "Photography",
      descriptions: [
        "Pixel perfection meets creative passion.",
        "Brush strokes in a digital dimension.",
        "Where technology meets artistry.",
        "Crafting visual wonders, byte by byte."
      ]
    },
    {
      title: "Digital Art",
      descriptions: [
        "Where creativity meets technology.",
        "Art in the age of digital mastery.",
        "From digital dreams to vibrant visuals.",
        "Pushing boundaries, one pixel at a time."
      ]
    },
    {
      title: "Cooking",
      descriptions: [
        "Where there’s smoke, there’s dinner.",
        "A symphony of flavors and techniques.",
        "Creating culinary masterpieces one dish at a time.",
        "The kitchen is where magic happens."
      ]
    },
    {
      title: "Painting",
      descriptions: [
        "Every artist dips his brush in his own soul.",
        "Painting is silent poetry.",
        "Creating visions that speak louder than words.",
        "Colors, shapes, and emotions in harmony."
      ]
    },
    {
      title: "Gardening",
      descriptions: [
        "To plant a garden is to believe in tomorrow.",
        "Nature's canvas, painted by diligent hands.",
        "Growth, patience, and beauty in every petal.",
        "A sanctuary of green in a concrete world."
      ]
    }
  ];

  return (
    <div className="explore-container">
      {hobbies.map((hobby, index) => (
        <Row key={index} className="hobby-row">
          <h4>{hobby.title}</h4>
            {hobby.descriptions.map((description, idx) => (
              <Col key={idx}>
                <CardContainer
                  title={hobby.title}
                  description={description}
                  cardIndex={idx}
                  openModal={openModal}
                />
              </Col>
            ))}
        </Row>
      ))}

      <ImageModal
        isOpen={!!modalImageSrc}
        imageSrc={modalImageSrc}
        onClose={closeModal}
      />
      <Row className="join-section">
        <div className="join-content">
          <h5>Join Our Community!</h5>
          <p>
            Discover more hobbies, share your experiences, and connect with
            like-minded people.
          </p>
          <div className="button-container">
            <button className="btn-custom" onClick={handleJoin}>
              Join Now
            </button>{" "}
          </div>
        </div>
      </Row>
    </div>
  );
}

export default ExploreScreen;
