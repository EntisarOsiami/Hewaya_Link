import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import  store  from './store';
import { Provider } from 'react-redux';
import HomeScreen from './Screens/HomeScreen.jsx';
import LoginScreen from './Screens/LoginScreen.jsx';
import RegisterScreen from './Screens/RegisterScreen.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import UserProfileScreen from './Screens/UserProfileScreen.jsx';
import ExploreScreen from './Screens/ExploreScreen.jsx';
import About from './Screens/AboutScreen.jsx';
import CombinedVerificationPage from './Screens/VerifyEmailPage.jsx';
import ResetPassword from './Screens/ResetPasswordScreen.jsx';
import GalleryScreen from './Screens/GalleryScreen.jsx';
import AdminScreen from './Screens/AdminScreen.jsx';
import BlogScreen from './Screens/BlogScreen.jsx';
import PortalList from './Components/PortalList.jsx';
import PortalDetail from './Components/PortalDetail.jsx';
import { setInitialTheme } from './slices/themeSlice';

const container = document.getElementById('root');
const root = createRoot(container);

const savedTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', savedTheme);

store.dispatch(setInitialTheme(savedTheme));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomeScreen />} />
            <Route path="login" element={<LoginScreen />} />
            <Route path="register" element={<RegisterScreen />} />
            <Route path="explore" element={<ExploreScreen />} />
            <Route path="about" element={<About />} />
            <Route path="blog/*" element={<BlogScreen />} />
            <Route path="verify/:token" element={<CombinedVerificationPage />} />
            <Route path="gallery" element={<GalleryScreen />} />
            <Route path="reset-password/:passwordResetToken" element={<ResetPassword />} />
            <Route path="/portal"  element={<PortalList/>} />
            <Route path="/admin" element={<AdminScreen />} />
        <Route path="/portal/:id" element={<PortalDetail/>} />
            <Route element={<PrivateRoute />}>
              <Route path="profile" element={<UserProfileScreen />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </React.StrictMode>
  </Provider>
);
