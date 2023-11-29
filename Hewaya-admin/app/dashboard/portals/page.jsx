import {fetchPortals } from "@/app/lib/data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Link from "next/link";
import { deletePortal } from "@/app/lib/actions";


const PortalsPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const {count , portals} = await fetchPortals(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a portals..." />
        <Link href="/dashboard/portals/add">
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
          {portals.map((portal) => (
            <tr key={portal.id}>
              <td>{portal.name}</td>
              <td>{portal.createdAt?.toString().slice(4, 16)}</td>
              <td>{portal.createdAt?.toString().slice(4, 16)}</td>

              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/portals/${portal.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deletePortal}>
                    <input type="hidden" name="id" value={(portal.id)} />
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

export default PortalsPage;