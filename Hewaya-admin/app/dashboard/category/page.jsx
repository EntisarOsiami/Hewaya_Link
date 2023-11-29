import {fetchCategories } from "@/app/lib/data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Link from "next/link";
import { deleteCategory } from "@/app/lib/actions";


const CategoryPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const {count , categories} = await fetchCategories(q, page);


  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a categories..." />
        <Link href="/dashboard/category/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Created At</td>
            <td>Updated At</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.createdAt?.toString().slice(4, 16)}</td>
              <td>{category.createdAt?.toString().slice(4, 16)}</td>

              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/category/${category.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteCategory}>
                    <input type="hidden" name="id" value={(category.id)} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default CategoryPage;