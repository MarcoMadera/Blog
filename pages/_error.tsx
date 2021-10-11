import Seo from "components/Seo";
import { NextPageContext } from "next";
import { ReactElement } from "react";

interface Props {
  statusCode?: number;
}

export default function Error({ statusCode }: Props): ReactElement {
  return (
    <main id="main">
      <Seo title={`😫 Error ${statusCode || "del cliente"}`} />
      <h1>{statusCode ?? "Error"}</h1>
      <p>
        {statusCode
          ? `Ocurrió un error con el código ${statusCode} en el servidor`
          : "Ha ocurrido un error en el cliente"}
      </p>
      <style jsx>{`
        main {
          height: calc(100vh - 257px);
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

Error.getInitialProps = ({ res, err }: NextPageContext): Props => {
  const statusCode = res?.statusCode ?? err?.statusCode;
  return { statusCode };
};
