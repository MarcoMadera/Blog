import Seo from "../components/Seo";
const Custom404 = () => {
  return (
    <main>
      <Seo title="404 - No encontrado" />
      <h1>404</h1>
      <p>Página no encontrada</p>
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
};

export default Custom404;
