import Seo from "components/Seo";
import useAnalytics from "hooks/useAnalytics";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";

interface Props {
  statusCode?: number;
}

export default function Error({ statusCode }: Props): ReactElement {
  const { pathname } = useRouter();
  const { trackWithGoogleAnalytics } = useAnalytics();

  useEffect(() => {
    trackWithGoogleAnalytics("exception", {
      exDescription: `${statusCode || "client"} error: ${pathname}`,
      exFatal: "1",
    });
  }, [pathname, statusCode, trackWithGoogleAnalytics]);

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
