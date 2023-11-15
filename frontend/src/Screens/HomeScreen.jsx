import Hero from '../Components/Hero.jsx';
import SlideImages from '../Components/CarouselMainPage.jsx';

const HomeScreen = () => {
  return (
    <div className='home-screen d-flex flex-column'>
       <Hero />
      <SlideImages />
     
    </div>
  );
};

export default HomeScreen;
