import Seo from "components/Seo";

export default function Custom404() {
  return (
    <main id="main">
      <Seo title="😫 404 - No encontrado | Marco Madera" />
      <h1>404</h1>
      <p>Página no encontrada</p>
      <style jsx>{`
        h1 {
          margin: 0;
          font-size: 100px;
        }
        main {
          height: calc(100vh - 257px);
          text-align: center;
        }
        p {
          font-size: 30px;
        }
      `}</style>
    </main>
  );
}
