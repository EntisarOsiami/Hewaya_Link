import React from 'react';
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import Image from 'next/image';

const SingleUserPage = () => {
  return (
    <div className={styles.container}>
     <div className={styles.infoContainer}>
        <div className={styles.imageContainer}>
            <Image src="/noavatar.png" alt="Picture of the author" width={200} height={200} />

        </div>
        John doe
     </div>
     <div className={styles.formContainer}>
        <form className={styles.form}>
        <label>Username</label>
        <input type="text" name="username" placeholder="username" />
        <label>Email</label>
        <input type="text" name="email" placeholder="email" />
        <label>Password</label>
        <input type="password" name="password" placeholder="password" />
        <label>Is Active?</label>
        <select name="active" id="active">
          <option value="general">Is Active?</option>
          <option value={true}>yes</option>
          <option value={false}>no</option>
        </select>
        <label>Role</label>
        <select name="role" id="role">
          <option value="general">Choose a role</option>
          <option value="app">moderator</option>
          <option value="app">user</option>
        </select>
        <button>Update</button>
        </form>
     </div>
    </div>
  );
};

export default SingleUserPage;
