import { Carousel } from 'react-bootstrap';
import  '../styles.css';

const MyCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="https://via.placeholder.com/800x400?text=Slide+1"
          alt="First slide"
        />
        <Carousel.Caption className="carousel-caption">
          <h3 className="carousel-title">First slide label</h3>
          <p className="carousel-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="https://via.placeholder.com/800x400?text=Slide+2"
          alt="Second slide"
        />

        <Carousel.Caption className="carousel-caption">
          <h3 className="carousel-title">Second slide label</h3>
          <p className="carousel-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="https://via.placeholder.com/800x400?text=Slide+3"
          alt="Third slide"
        />

        <Carousel.Caption className="carousel-caption">
          <h3 className="carousel-title">Third slide label</h3>
          <p className="carousel-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default MyCarousel;
