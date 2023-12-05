import {Route, Routes, Link } from 'react-router-dom';
import UserManagement from '../Components/AdminComponents/userManagement.jsx'; 
import TagManagement from '../Components/AdminComponents/tagManagement.jsx';
import PortalManagement from '../Components/AdminComponents/portalManagement.jsx';
import CategoriesManagement from '../Components/AdminComponents/catagoriesManagement.jsx';

const ModScreen = () => {
  return (
      <div className="container-menu">
        <div className="row">
          <div className="col-md-2 sidebar">
            <h2 className="text-center mb-4 font-weight-bolder ">Control Board:</h2>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="Link-menu" to="user-management">User Management</Link>
              </li>
              <li className="nav-item">
                <Link className="Link-menu" to="portal-management">Portal Management</Link>
              </li>
              <li className="nav-item">
                <Link className="Link-menu" to="categories-management">Categories Management</Link>
              </li>
              <li className="nav-item">
                <Link className="Link-menu" to="tag-management">Tag Management</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-10">
            <h1 className="text-center mb-4 font-weight-bold">Moderator Dashboard</h1>
            <Routes>
              <Route path="user-management" element={<UserManagement />} />
              <Route path="portal-management" element={<PortalManagement />} />
              <Route path="categories-management" element={<CategoriesManagement />} />
              <Route path="tag-management" element={<TagManagement />} />
            </Routes>
          </div>
        </div>
      </div>
  );
};

export default ModScreen;
