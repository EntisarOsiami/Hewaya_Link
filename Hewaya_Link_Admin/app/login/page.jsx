import React from 'react';
import styles from '../ui/login/login.module.css';
const Login = () => {
  return (
    <div className={styles.container}>
      <form action="" className={styles.form}>
      <h1>Login</h1>

        <input type="username" name="name" placeholder="username"/>
        <input type="password" name="password" placeholder="username" />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;