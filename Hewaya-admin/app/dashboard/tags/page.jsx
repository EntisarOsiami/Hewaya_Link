import {fetchTags } from "@/app/lib/data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Link from "next/link";
import { deleteTag } from "@/app/lib/actions";


const TagPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const {count , tags} = await fetchTags(q, page);


  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a tags..." />
        <Link href="/dashboard/tags/add">
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
          {tags.map((tag) => (
            <tr key={tag.id}>
              <td>{tag.name}</td>
              <td>{tag.createdAt?.toString().slice(4, 16)}</td>
              <td>{tag.createdAt?.toString().slice(4, 16)}</td>

              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/tags/${tag.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteTag}>
                    <input type="hidden" name="id" value={(tag.id)} />
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

export default TagPage;