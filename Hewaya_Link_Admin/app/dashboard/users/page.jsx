import React from 'react';
import Image from "next/image";
import { deleteUser } from "@/app/lib/actions";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "../../ui/dashboard/users/users.module.css";
import Link from 'next/link';

const UsersPage = () => {
  

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="search for users"/>
        <Link href="/dashboard/users/add">
           <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Created at</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                <span className={styles.name}>John Doe</span>
              </div>
            </td>

            <td>
              some@some.com
            </td>
            <td>2012</td>
            <td>admin</td>
            <td>active</td>
            <td>
              <div className={styles.buttons}>
              <Link href="/">
                <button className={`${styles.button} ${styles.view}`}>
                  View
                </button>
              </Link>
              <button className={`${styles.button} ${styles.delete}`}>
                  View
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination count={10} />
    </div>
  );
};

export default UsersPage;
