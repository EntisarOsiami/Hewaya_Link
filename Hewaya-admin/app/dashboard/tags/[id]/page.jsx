import { updateTag } from "@/app/lib/actions";
import { fetchTag } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";

const SingleTagPage = async ({ params }) => {
  
  const { id } = params;
  const tag = await fetchTag(id);
   
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form action={updateTag} className={styles.form}>
          <input type="hidden" name="id" value={tag.id}/>
          <label>Name</label>
          <input type="text" placeholder={tag.name} name="name" required />
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleTagPage;