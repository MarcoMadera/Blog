import Seo from "components/Seo";
import { ReactElement } from "react";

export default function Custom404(): ReactElement {
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
