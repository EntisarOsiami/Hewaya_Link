import { Carousel } from 'react-bootstrap';


  const MyCarousel = () => {
    return (
      <Carousel>
        {/* Slide 1 */}
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="./assets/sarah-brown-CwSiAVlXOWQ-unsplash.jpg"
            alt="Artistic hobbies canvas"
          />
          <Carousel.Caption className="carousel-caption">
            <h3 className="carousel-title">Unleash Your Creativity</h3>
            <p className="carousel-description">
              Dive into a world where your creativity knows no bounds. Join a vibrant community eager to explore and share.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
  
        {/* Slide 2 */}
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="./assets/geraldine-lewa-N_Z91Evs_oM-unsplash.jpg"
            alt="Gardening hobbyists"
          />
          <Carousel.Caption className="carousel-caption">
            <h3 className="carousel-title">Cultivate Your Passion</h3>
            <p className="carousel-description">
              Let your love for gardening bloom. Connect with fellow green thumbs and grow your hobby together.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
  
        {/* Slide 3 */}
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="./assets/giorgio-trovato-fDhuUS6AmaU-unsplash.jpg"
            alt="Photography adventure"
          />
          <Carousel.Caption className="carousel-caption">
            <h3 className="carousel-title">Capture the Moment</h3>
            <p className="carousel-description">
              Embark on a photographic journey with us. Improve your skills and share your vision with a community that cares.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
  
        {/* Slide 4 */}
        <Carousel.Item>
          <img
            className="d-block carousel-image"
            src="./assets/pexels-ann-poan-5797904.jpg"
            alt="Creative writing and reading"
          />
          <Carousel.Caption className="carousel-caption">
            <h3 className="carousel-title">Craft Your Story</h3>
            <p className="carousel-description">
              Join our circle of storytellers. Whether you&apos;re a writer or a reader, there&apos;s a chapter here for everyone.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
  
        {/* Slide 5 */}
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="./assets/micheile-henderson-v64Pwx7vttk-unsplash.jpg"
            alt="DIY and crafting"
          />
          <Carousel.Caption className="carousel-caption">
            <h3 className="carousel-title">Create with Your Hands</h3>
            <p className="carousel-description">
              Discover the joy of DIY. Share your unique creations and get inspired by a community of crafters.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
  
        {/* Slide 6 */}
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="./assets/flat-lay-bakery.jpg"
            alt="Culinary arts"
          />
          <Carousel.Caption className="carousel-caption">
            <h3 className="carousel-title">Flavorful Adventures Await</h3>
            <p className="carousel-description">
              Stir up your culinary skills. Swap recipes, techniques, and savor the journey with fellow food enthusiasts.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
  
      </Carousel>
    );
  };
  
  export default MyCarousel;
  