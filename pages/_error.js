import styles from "./Error.module.css";
import PropTypes from "prop-types";
function Error({ statusCode }) {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{statusCode ? statusCode : "Error"}</h1>
      <p className={styles.message}>
        {statusCode
          ? `Ocurrió un error con el código ${statusCode} en el servidor`
          : "Ha ocurrido un error en el cliente"}
      </p>
    </main>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

Error.propTypes = {
  statusCode: PropTypes.string,
};
