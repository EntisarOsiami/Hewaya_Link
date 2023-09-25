import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import './styles.css'; 

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Container className='my-1'>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default App;