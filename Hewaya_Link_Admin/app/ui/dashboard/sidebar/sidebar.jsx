import React from 'react';
import styles from '../sidebar/sidebar.module.css';
import { MdWork, MdAnalytics, MdPeople, MdDashboard, 
  MdAttachMoney,MdSupervisedUserCircle, MdLogout,
  MdShoppingBag,MdHelpCenter ,MdOutlineSettings} from "react-icons/md";
import MenuLink from '../sidebar/menuLink/menuLink';
import Image from 'next/image'
const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Portals",
        path: "/dashboard/portals",
        icon: <MdShoppingBag />,
      },
      {
        title: "Category",
        path: "/dashboard/category",
        icon: <MdShoppingBag />,
      },
      {
        title: "Tags",
        path: "/dashboard/tags",
        icon: <MdShoppingBag />,
      },
      {
        title: "Transactions",
        path: "/dashboard/transactions",
        icon: <MdAttachMoney />,
      },
    ],
  },

];

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image src="/noavatar.png" className={styles.userImage} width={50} height={50} /> 
      </div>
      <div className={styles.userDetail}>
        <span className={styles.username}>John Doe</span>
        <span className={styles.userTitle}>Admin</span>

      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map(item => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <button className={styles.logout}> <MdLogout/> Logout</button>
    </div>
  );
};
export default Sidebar;

