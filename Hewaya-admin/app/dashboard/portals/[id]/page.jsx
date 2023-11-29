import { updatePortal } from "@/app/lib/actions";
import { fetchPortal } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";

const SinglePortalPage = async ({ params }) => {
  
  const { id } = params;
  const portal = await fetchPortal(id);
   
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form action={updatePortal} className={styles.form}>
          <input type="hidden" name="id" value={portal.id}/>
          <label>Name</label>
          <input type="text" placeholder="name" name="name" 
          value={portal.name} required />
          <label>description</label>
        <textarea name="description" id="" cols="30" rows="10" 
        placeholder="description">
            {portal.description}
        </textarea>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SinglePortalPage;
