import SubscribedPortals from '../Components/SubscribedPortals.jsx';
import { useSelector } from 'react-redux';



function SubscriptionsPortals() {
  const userId = useSelector(state => state.auth.userId);
  return (
    <SubscribedPortals userId={userId} />
  );
}

export default SubscriptionsPortals;
