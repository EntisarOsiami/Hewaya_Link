import React from 'react';
import styles from "../../ui/dashboard/portals/portals.module.css";
import Link from 'next/link';
import { fetchPortals, fetchCategoryName } from "@/app/lib/data";

const PortalPage = async () => {
const portals = await fetchPortals();
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Link href="/dashboard/portals/add">
           <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
        {portals.map((portal) => (
          <tr key={portal.id}>
            <td>
                {portal.name}
            </td>
            <td>
              <div className={styles.buttons}>
              <Link href="/dashboard/portals/test">
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
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default PortalPage;
