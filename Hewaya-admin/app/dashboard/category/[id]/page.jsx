import { updateCategory } from "@/app/lib/actions";
import { fetchCategory } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";

const SingleCategoryPage = async ({ params }) => {
  
  const { id } = params;
  const category = await fetchCategory(id);
   
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form action={updateCategory} className={styles.form}>
          <input type="hidden" name="id" value={category.id}/>
          <label>Name</label>
          <input type="text" placeholder={category.name} name="name" required />
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleCategoryPage;
