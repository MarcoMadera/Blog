import Seo from "../../../components/Seo";
import { H1, H2, Img, P, ALink } from "../../../components/tags";
import { Anchor } from "../../../components/Challenge";

const Random = () => {
  return (
    <main id="main">
      <Seo title="Portafolio 💼 | Números Pseudo Aleatorios" />
      <H1>Herramienta para verificar números aleatorios</H1>
      <article>
        <div>
          <H2>Pruebas para números aleatorios</H2>
          <Anchor href="https://test-for-random-numbers.marcomadera.vercel.app/">
            Ver en vivo
          </Anchor>
          <Anchor href="https://github.com/MarcoMadera/Test-for-random-numbers">
            Código
          </Anchor>
          <P>
            Esta es una sencilla herramienta para verificar si los números
            insertados cumplen el comportamiento de los números aleatorios, se
            puede encontrar información detallada sobre la realización de este
            proyecto en el blog de{" "}
            <ALink
              href="/blog/numeros-pseudo-aleatorios"
              title="blog de números pseudo aleatorios"
            >
              números pseudo aleatorios
            </ALink>{" "}
            dónde explico cómo determinar el comportamiento y puedes ver los
            resultados que obtuve al aplicarlo con Math.Random() de JavaScript.
          </P>
        </div>
        <div>
          <Img
            loading="lazy"
            src={
              "https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550/v1595276090/Potfolio/chiSqrt/chiSqrtCover_mngxy7.png"
            }
            alt="Reporte Diario"
          />
        </div>
      </article>
      <style global jsx>{`
        .btn-primary {
          margin-right: 20px;
        }
      `}</style>
      <style jsx>{`
        main {
          margin: 0 auto;
          padding: 0 20px;
          max-width: 1300px;
          min-height: calc(100vh - 160px);
        }
        :global(h1) {
          text-align: center;
        }
        :global(p) {
          text-align: justify;
        }
        article {
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin-bottom: 40px;
          align-items: center;
        }
        article > div:nth-of-type(2) {
          padding: 40px;
        }
        div:nth-of-type(1) {
          padding: 40px;
        }
        @media print, screen and (max-width: 876px) {
          article {
            grid-template-columns: auto;
          }
          article {
            margin-top: 0px;
            margin-bottom: 20px;
          }
          article > div:nth-of-type(2),
          article > div:nth-of-type(1) {
            padding: 0px;
          }
          article > div:nth-of-type(1) a {
            margin-bottom: 10px;
          }
        }
      `}</style>
    </main>
  );
};

export default Random;
