import { Carousel } from 'react-bootstrap';


const MyCarousel = () => {
  return (
    <Carousel >
      <Carousel.Item>
        <img
          className="carousel-image"
          src="./assets/sarah-brown-CwSiAVlXOWQ-unsplash.jpg"

          
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
          src="./assets/geraldine-lewa-N_Z91Evs_oM-unsplash.jpg"
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
          src="./assets/giorgio-trovato-fDhuUS6AmaU-unsplash.jpg"
          alt="Third slide"
        />

        <Carousel.Caption className="carousel-caption">
          <h3 className="carousel-title">Third slide label</h3>
          <p className="carousel-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="./assets/giulia-bertelli-E25HcrW2Xlc-unsplash.jpg"
          alt="Third slide"
        />

        <Carousel.Caption className="carousel-caption">
          <h3 className="carousel-title">Fourth slide label</h3>
          <p className="carousel-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="./assets/micheile-henderson-v64Pwx7vttk-unsplash.jpg"
          alt="Third slide"
        />

        <Carousel.Caption className="carousel-caption">
          <h3 className="carousel-title">Fifth slide label</h3>
          <p className="carousel-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      
      
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="./assets/cristofer-maximilian-PP1yKpfA4HY-unsplash.jpg"
          alt="Third slide"
        />

        <Carousel.Caption className="carousel-caption">
          <h3 className="carousel-title">Sixth slide label</h3>
          <p className="carousel-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      
    </Carousel>
  );
};

export default MyCarousel;
