import { Carousel } from "react-bootstrap";
import { useTranslation } from 'react-i18next';



const MyCarousel = () => {
  const { t } = useTranslation();

  const slides = [
    {
      imgSrc: "./assets/sarah-brown-CwSiAVlXOWQ-unsplash.jpg",
      alt: t('carousel:slide1:alt'),
      title: t('carousel:slide1:title'),
      description: t('carousel:slide1:description'),
    },
    {
      imgSrc: "./assets/Gardening.jpg",
      alt: t('carousel:slide2:alt'),
      title: t('carousel:slide2:title'),
      description: t('carousel:slide2:description'),
    },
    {
      imgSrc: "./assets/giorgio-trovato-fDhuUS6AmaU-unsplash.jpg",
      alt: "Photography adventure",
      title: t('carousel:slide3:title'),
      description: t('carousel:slide3:description'),
    },
    {
      imgSrc: "./assets/pexels-ann-poan-5797904.jpg",
      alt: "Creative writing and reading",
      title: t('carousel:slide4:title'),
      description: t('carousel:slide4:description'),
    },
    {
      imgSrc: "./assets/micheile-henderson-v64Pwx7vttk-unsplash.jpg",
      alt: "DIY and crafting",
      title: t('carousel:slide5:title'),
      description: t('carousel:slide5:description'),
    },
  ];

  return (
    <Carousel>
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100 carousel-image"
            src={slide.imgSrc}
            alt={slide.alt}
          />
          <Carousel.Caption className="carousel-caption">
            <h3 className="carousel-title">{slide.title}</h3>
            <p className="carousel-description">{slide.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default MyCarousel;
