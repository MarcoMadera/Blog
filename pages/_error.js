import Seo from "../components/Seo";
import PropTypes from "prop-types";
function Error({ statusCode }) {
  return (
    <main id="main">
      <Seo title={`😫 Error ${statusCode || "del cliente"}`} />
      <h1>{statusCode ? statusCode : "Error"}</h1>
      <p>
        {statusCode
          ? `Ocurrió un error con el código ${statusCode} en el servidor`
          : "Ha ocurrido un error en el cliente"}
      </p>
      <style jsx>{`
        main {
          height: calc(100vh - 160px);
          text-align: center;
        }
        h1 {
          margin: 0;
          font-size: 100px;
        }
        p {
          font-size: 30px;
        }
      `}</style>
    </main>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

Error.propTypes = {
  statusCode: PropTypes.number,
};
