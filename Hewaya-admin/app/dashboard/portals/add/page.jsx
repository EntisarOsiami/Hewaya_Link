import { addPortal } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";

const AddPortalPage = () => {
  return (
    <div className={styles.container}>
      <form action={addPortal} className={styles.form}>
        <input type="text" placeholder="name" name="name" required />
        <textarea name="description" id="" cols="30" rows="10" placeholder="description"></textarea>
  
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPortalPage;
