import React from 'react';
import styles from '../ui/dashboard/dashboard.module.css';
import Card from '../ui/dashboard/card/card';
import Chart from '../ui/dashboard/chart/chart';
import Rightbar from '../ui/dashboard/rightbar/rightbar';
import Transactions from '../ui/dashboard/transactions/transactions';
import { cards } from '../lib/data';

const Dashboard = () => {
  return (
    <div>
      <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
