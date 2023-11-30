import { Outlet } from 'react-router-dom';  
import { ToastContainer } from 'react-toastify'; // For the toast notifications
import 'react-toastify/dist/ReactToastify.css'; // For the toast notifications
import UniversalLayout from './Layouts/UniversalLayout.jsx'; // For the layout of the app itself
import i18n from './i18n.js'; // For the translation
import './styles/index.css';

const App = () => {
  return (
    <UniversalLayout key={i18n.language}>
      <ToastContainer />
      <Outlet />
    </UniversalLayout>
  );
};

export default App;
