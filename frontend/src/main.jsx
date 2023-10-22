import React from 'react';
import App from './App.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';
import HomeScreen from './Screens/HomeScreen.jsx';
import LoginScreen from './Screens/LoginScreen.jsx';
import RegisterScreen from './Screens/RegisterScreen.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import UserProfileScreen from './Screens/UserProfileScreen.jsx';
import BlogScreen from './Screens/BlogScreen.jsx';
import ExploreScreen from './Screens/ExploreScreen.jsx';
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
            <Route path="/explore" element={<ExploreScreen />} />
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<UserProfileScreen />} />
              <Route path="/blog" element={<BlogScreen />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </React.StrictMode>
  </Provider>,
);
