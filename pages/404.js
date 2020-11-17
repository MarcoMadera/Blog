import Seo from "../components/Seo";
const Custom404 = () => {
  return (
    <main id="main">
      <Seo title="😫 404 - No encontrado | Marco Madera" />
      <h1>404</h1>
      <p>Página no encontrada</p>
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
};

export default Custom404;
