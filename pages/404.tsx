import Seo from "components/Seo";
import useAnalytics from "hooks/useAnalytics";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { HitType } from "types/analytics";

export default function Custom404(): ReactElement {
  const { pathname } = useRouter();
  const { trackWithGoogleAnalytics } = useAnalytics();

  useEffect(() => {
    trackWithGoogleAnalytics(HitType.EXCEPTION, {
      exDescription: `404 page not found: ${pathname}`,
      exFatal: "0",
    });
  }, [pathname, trackWithGoogleAnalytics]);

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
