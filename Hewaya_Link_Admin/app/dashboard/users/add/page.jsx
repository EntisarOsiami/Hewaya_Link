import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css"
import { addUser } from "../../../lib/actions";
const AddUserPage = () => {
  return (
    <div className={styles.container}>
    <form action={addUser} className={styles.form}>
      <input type="text" placeholder="username" name="username" required />
      <input type="text" placeholder="email" name="email" required />
      <input type="password" placeholder="password" name="password" required />

      <select name="active" id="active">
        <option value="general">Is Active?</option>
        <option value={true}>yes</option>
        <option value={false}>no</option>
      </select>
      <select name="role" id="role">
        <option value="general">Choose a role</option>
        <option value="app">moderator</option>
        <option value="app">user</option>
      </select>
      <button type="submit">Save</button>
    </form>
    </div>
  );
};

export default AddUserPage;
