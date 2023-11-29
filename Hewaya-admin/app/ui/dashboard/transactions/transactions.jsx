import styles from "./transactions.module.css";
import {fetchLatestPortals } from "@/app/lib/data";


const Transactions = async () => {
  const portals = await fetchLatestPortals();
  return (
    <div className={styles.container}>
    <table className={styles.table}>
      <thead>
        <tr>
          <td>Name</td>
          <td>Created At</td>
          <td>Updated At</td>
        </tr>
      </thead>
      <tbody>
        {portals.map((portal) => (
          <tr key={portal.id}>
            <td>{portal.name}</td>
            <td>{portal.createdAt?.toString().slice(4, 16)}</td>
            <td>{portal.createdAt?.toString().slice(4, 16)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default Transactions;
