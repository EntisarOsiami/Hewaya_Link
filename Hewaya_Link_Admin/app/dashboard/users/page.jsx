import React from 'react';
import Image from "next/image";
import { deleteUser } from "@/app/lib/actions";
import styles from "../../ui/dashboard/users/users.module.css";
import Link from 'next/link';
import { fetchUsers } from "@/app/lib/data";

const UsersPage = async () => {
const users = await fetchUsers();
  return (
    <div className={styles.container}>
      <div className={styles.top}>
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
          {users.map((user) => (
          <tr key={user.id}>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                <span className={styles.name}>{user.name.firstName} {user.name.lastName}</span>
              </div>
            </td>

            <td>
              {user.email}
            </td>
            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
            <td>{user.role}</td>
            <td>{user.disabled ? 'Disabled' : 'Active'}</td>
            <td>
              <div className={styles.buttons}>
              <Link href={`/dashboard/users/${user.id}`}>
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

export default UsersPage;
