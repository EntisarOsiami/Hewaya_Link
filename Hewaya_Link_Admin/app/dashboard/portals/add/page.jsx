import styles from "@/app/ui/dashboard/portals/addPortal/addPortal.module.css"

const AddPortalPage = () => {
  return (
    <div className={styles.container}>
      <form action="" className={styles.form}></form>
    <form action="" className={styles.form}>
      <input type="text" placeholder="name" name="name" required />
      <select name="cat" id="cat">
        <option value="general">Choose a category</option>
        <option value="app">app</option>
        <option value="app">app</option>
      </select>
      <select name="tag" id="tag">
        <option value="general">Choose a tag</option>
        <option value="app">app</option>
        <option value="app">app</option>
      </select>
      <textarea name="description" id="description" placeholder="Description" cols="30" rows="10"></textarea>
      <button type="submit">Save</button>
    </form>
    </div>
  );
};

export default AddPortalPage;
