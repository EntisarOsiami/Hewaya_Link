import React from 'react';
import App from './App.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import from react-router-dom
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';
import HomeScreen from './Screens/HomeScreen.jsx';
import LoginScreen from './Screens/LoginScreen.jsx';
import RegisterScreen from './Screens/RegisterScreen.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import ProfileScreen from './Screens/ProfileScreen.jsx';
import BlogScreen from './Screens/BlogScreen.jsx';
import CreateBlogScreen from './Screens/CreateBlogScreen.jsx';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index={true} element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/Blog" element={<BlogScreen />} />
            <Route path="/create-Blog" element={<CreateBlogScreen />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </React.StrictMode>
  </Provider>,
);
