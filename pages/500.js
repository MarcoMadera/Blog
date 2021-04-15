import Seo from "../components/Seo";

export default function Custom500() {
  return (
    <main id="main">
      <Seo title="😫 500 - Servidor? | Marco Madera" />
      <h1>500?</h1>
      <p>Ha ocurrido un error en el servidor</p>
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
