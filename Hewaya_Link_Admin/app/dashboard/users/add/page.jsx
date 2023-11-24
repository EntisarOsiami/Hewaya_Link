import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css"

const AddUserPage = () => {
  return (
    <div className={styles.container}>
      <form action="" className={styles.form}></form>
    <form action="" className={styles.form}>
      <input type="text" placeholder="username" name="username" required />
      <input type="text" placeholder="firstname" name="firstname" required />
      <input type="text" placeholder="lastname" name="lastname" required />
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
      <textarea name="description" id="description" placeholder="Description" cols="30" rows="10"></textarea>
      <button type="submit">Save</button>
    </form>
    </div>
  );
};

export default AddUserPage;
