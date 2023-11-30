import { addTag } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";

const AddTagPage = () => {
  return (
    <div className={styles.container}>
      <form action={addTag} className={styles.form}>
        <input type="text" placeholder="name" name="name" required />  
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddTagPage;
