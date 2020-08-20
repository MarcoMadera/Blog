import styles from "./Error.module.css";
const Custom404 = () => {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Página no encontrada</p>
    </main>
  );
};

export default Custom404;
