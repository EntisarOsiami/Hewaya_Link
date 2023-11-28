import { Carousel } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

const MyCarousel = () => {
  const { t } = useTranslation();

  return (
    <Carousel>
      {/* Slide 1 */}
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="./assets/sarah-brown-CwSiAVlXOWQ-unsplash.jpg"
          alt={t('carousel:slide1:alt')}
        />
        <Carousel.Caption className="carousel-caption">
          <h3 className="carousel-title">{t('carousel:slide1:title')}</h3>
          <p className="carousel-description">
            {t('carousel:slide1:description')}
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src="./assets/Gardening.jpg"
          alt={t('carousel:slide2:alt')}
        />
        <Carousel.Caption className="carousel-caption">
          <h3 className="carousel-title">{t('carousel:slide2:title')}</h3>
          <p className="carousel-description">
            {t('carousel:slide2:description')}
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
          <h3 className="carousel-title">{t('carousel:slide3:title')}</h3>
          <p className="carousel-description">
          {t('carousel:slide3:description')}
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
          <h3 className="carousel-title">{t('carousel:slide4:title')}</h3>
          <p className="carousel-description">
          {t('carousel:slide4:description')}
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
          <h3 className="carousel-title">{t('carousel:slide5:title')}</h3>
          <p className="carousel-description">
          {t('carousel:slide5:description')}
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default MyCarousel;
