import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdLogout,
} from "react-icons/md";

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
      }
    ],
  },
];

const Sidebar = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <div className={styles.userDetail}>
          <span className={styles.username}>Ent</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      {/* <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </form> */}
    </div>
  );
};

export default Sidebar;
