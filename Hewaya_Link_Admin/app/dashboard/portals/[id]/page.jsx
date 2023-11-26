import React from 'react';
import Image from 'next/image';
import styles from "@/app/ui/dashboard/portals/singlePortal/singlePortal.module.css"

const SinglePortalPage = () => {
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
        <label>Name</label>
        <input type="text" name="name" placeholder="name" />
        <label>Category</label>
        <select name="category" id="category">
          <option value="general">Choose a category</option>
          <option value="app">app</option>
          <option value="app">app</option>
        </select>
        <label>Tags</label>

        <select name="tag" id="tag">
          <option value="general">Choose a tag</option>
          <option value="app">app</option>
          <option value="app">app</option>
        </select>
        <textarea name="description" id="description" placeholder="Description" cols="30" rows="10"></textarea>
        <button>Update</button>
        </form>
     </div>
    </div>
  );
};

export default SinglePortalPage;
