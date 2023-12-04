
import UserManagement from '../Components/AdminComponents/userManagement.jsx'; 
import TagManagement from '../Components/AdminComponents/tagManagement.jsx';
import PortalManagement from '../Components/AdminComponents/portalManagement.jsx';
import CategoriesManagement from '../Components/AdminComponents/catagoriesManagement.jsx';

const AdminScreen = () => {
  return (
    <div>
      <h1>Moderator Dashboard</h1>
      <div>
        <UserManagement />
      </div>
      <div>
        <TagManagement />
      </div>
      <div>
        <PortalManagement />
      </div>
      <div>
        <CategoriesManagement />
      </div>
    </div>
  );
};

export default AdminScreen;
