import ActionButton from "components/ActionButton";
import { ALink, H1, H2, Img, P } from "components/tags";
import { ChartJs, ReactIcon } from "components/icons";
import Seo from "components/Seo";
import { ReactElement } from "react";
import useAnalytics from "hooks/useAnalytics";

export default function TestRandomNumbers(): ReactElement {
  useAnalytics("portafolio-random-numbers");

  return (
    <main id="main">
      <Seo title="Portafolio 💼 | Números Pseudo Aleatorios" />
      <H1>Herramienta para verificar números aleatorios</H1>
      <article>
        <div>
          <H2>Pruebas para números aleatorios</H2>
          <ActionButton
            type="anchor"
            href="https://random-numbers-test.marcomadera.com/"
          >
            Ver en vivo
          </ActionButton>
          <ActionButton
            type="anchor"
            href="https://github.com/MarcoMadera/Test-for-random-numbers"
          >
            Código
          </ActionButton>
          <P>
            Esta es una sencilla herramienta para verificar si los números
            insertados cumplen el comportamiento de los números aleatorios, se
            puede encontrar información detallada sobre la realización de este
            proyecto en el{" "}
            <ALink
              href="/blog/numeros-pseudo-aleatorios"
              title="Blog: Números Pseudo Aleatorios"
            >
              blog de números pseudo aleatorios
            </ALink>{" "}
            dónde explico cómo determinar el comportamiento y puedes ver los
            resultados que obtuve al aplicarlo con Math.Random() de JavaScript.
          </P>
          <ReactIcon width={50} height={50} />
          <ChartJs width={50} height={50} />
        </div>
        <div>
          <Img
            src={
              "https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550,h_268/Potfolio/chiSqrt/chiSqrtCover_mngxy7.png"
            }
            alt="Reporte Diario"
            blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAFAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAYH/8QAHhAAAgEEAwEAAAAAAAAAAAAAAQIEAAMFEQcSIVH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A1nKYeJneS7d6TGjGVh1svHkOHa4nYFtLpwF9+g73V/SlB//Z"
          />
        </div>
      </article>
      <style jsx>{`
        article {
          align-items: center;
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin-bottom: 40px;
        }
        article > div:nth-of-type(2) {
          padding: 40px;
        }
        div :global(a) {
          margin: 20px 20px 0 0;
        }
        div:nth-of-type(1) {
          padding: 40px;
        }
        main {
          margin: 0 auto;
          max-width: 1300px;
          min-height: calc(100vh - 257px);
          padding: 0 20px;
        }
        main :global(h1) {
          text-align: center;
        }
        @media print, screen and (max-width: 876px) {
          article {
            grid-template-columns: auto;
            margin-bottom: 20px;
            margin-top: 0px;
          }
          article > div:nth-of-type(1),
          article > div:nth-of-type(2) {
            padding: 0px;
          }
          article > div:nth-of-type(1) a {
            margin-bottom: 10px;
          }
        }
      `}</style>
    </main>
  );
}
