// In App.js
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UniversalLayout from './Layouts/UniversalLayout.jsx';

import './styles/index.css';

const App = () => {
  return (
    <UniversalLayout>
      <ToastContainer />
      <Outlet />
  
    </UniversalLayout>
  );
};

export default App;
