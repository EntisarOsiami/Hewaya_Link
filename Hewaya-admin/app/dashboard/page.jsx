import { cards } from "../lib/data";
import Card from "../ui/dashboard/card/card";
import styles from "../ui/dashboard/dashboard.module.css";
import LatestPortals from "../ui/dashboard/transactions/LatestPortals";

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        <LatestPortals />
      </div>
    </div>
  );
};

export default Dashboard;
