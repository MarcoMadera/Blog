import ActionAnchor from "../../components/ActionAnchor";
import { ALink, H1, H2, Img, P } from "../../components/tags";
import ChartJs from "../../components/icons/ChartJs";
import ReactIcon from "../../components/icons/React";
import Seo from "../../components/Seo";
import { useEffect } from "react";

export default function TestRandomNumbers() {
  useEffect(() => {
    fetch("/api/views/portafolio-random-numbers", {
      method: "POST",
    });
  }, []);
  return (
    <main id="main">
      <Seo title="Portafolio 💼 | Números Pseudo Aleatorios" />
      <H1>Herramienta para verificar números aleatorios</H1>
      <article>
        <div>
          <H2>Pruebas para números aleatorios</H2>
          <ActionAnchor href="https://test-for-random-numbers.marcomadera.vercel.app/">
            Ver en vivo
          </ActionAnchor>
          <ActionAnchor href="https://github.com/MarcoMadera/Test-for-random-numbers">
            Código
          </ActionAnchor>
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
              "https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550,h_268/v1595276090/Potfolio/chiSqrt/chiSqrtCover_mngxy7.png"
            }
            alt="Reporte Diario"
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
        main :global(p) {
          text-align: justify;
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
