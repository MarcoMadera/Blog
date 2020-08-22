import Seo from "../components/Seo";
import PropTypes from "prop-types";
function Error({ statusCode }) {
  return (
    <main>
      <Seo title={`Error ${statusCode} :(`} />
      <h1>{statusCode ? statusCode : "Error"}</h1>
      <p>
        {statusCode
          ? `Ocurrió un error con el código ${statusCode} en el servidor`
          : "Ha ocurrido un error en el cliente"}
      </p>
      <style jsx>{`
        main {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-items: center;
          align-items: center;
          left: 0;
          right: 0;
          margin: 0 auto;
          height: calc(100vh - 120px);
        }

        h1 {
          text-align: center;
          font-size: 100px;
        }

        p {
          text-align: center;
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
  statusCode: PropTypes.string,
};
