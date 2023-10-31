import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UniversalLayout from './Layouts/UniversalLayout.jsx';
import './styles/index.css'

const App = () => {
  return (
    <UniversalLayout> 
      <ToastContainer />
      <Container className="my-1">
        <Outlet />
      </Container>
    </UniversalLayout>
  );
};

export default App;
