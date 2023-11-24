import React from 'react';
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "../../ui/dashboard/portals/portals.module.css";
import Link from 'next/link';

const PortalPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="search for portals"/>
        <Link href="/dashboard/portals/add">
           <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.portal}>
                <Image
                  src="/noproduct.jpg"
                  width={40}
                  height={40}
                  className={styles.portalImage}
                />
                <span className={styles.name}>John Doe</span>
              </div>
            </td>

            <td>
              portal one
            </td>
            <td>cdscsdcscsdc</td>
            <td>test</td>
            <td>test,test</td>
            <td>
              <div className={styles.buttons}>
              <Link href="/dasboard/users/test">
                <button className={`${styles.button} ${styles.view}`}>
                  View
                </button>
              </Link>
              <button className={`${styles.button} ${styles.delete}`}>
                  Delete
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

export default PortalPage;
