import Link from "next/link";
import Seo from "../../../components/Seo";
import { colors } from "../../../styles/theme";
const Random = () => {
  return (
    <main id="main">
      <Seo
        title="Portafolio 💼 | Números Pseudo Aleatorios"
        path="/portafolio/random-numbers-test"
      />
      <h1>Herramienta para verificar números aleatorios</h1>
      <article>
        <div>
          <h2>Pruebas para números aleatorios</h2>
          <a
            href="https://test-for-random-numbers.marcomadera.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Ver en vivo
          </a>
          <a
            href="https://github.com/MarcoMadera/Test-for-random-numbers"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Código
          </a>
          <p>
            Esta es una sencilla herramienta para verificar si los números
            insertados cumplen el comportamiento de los números aleatorios, se
            puede encontrar información detallada sobre la realización de este
            proyecto en el blog de{" "}
            <Link href="/blog/numeros-pseudo-aleatorios">
              <a>números pseudo aleatorios</a>
            </Link>{" "}
            dónde explico cómo determinar el comportamiento y puedes ver los
            resultados que obtuve al aplicarlo con Math.Random() de JavaScript.
          </p>
        </div>
        <div>
          <a
            href="https://test-for-random-numbers.marcomadera.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <picture>
              <source
                srcSet={
                  "https://res.cloudinary.com/marcomadera/image/upload/c_scale,h_540,w_960/v1595276090/Potfolio/chiSqrt/chiSqrtCover_mngxy7.png"
                }
                media="(max-width: 876px)"
              />
              <img
                loading="lazy"
                src={
                  "https://res.cloudinary.com/marcomadera/image/upload/c_scale,w_550/v1595276090/Potfolio/chiSqrt/chiSqrtCover_mngxy7.png"
                }
                alt="Reporte Diario"
              />
            </picture>
          </a>
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
        }
        h1 {
          margin-top: 0;
          text-align: center;
        }
        p {
          line-height: 1.6;
          text-align: justify;
        }
        article {
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin-top: 40px;
          margin-bottom: 40px;
          align-items: center;
        }
        article > div:nth-of-type(2) {
          padding: 40px;
        }
        div:nth-of-type(1) {
          padding: 40px;
        }
        img {
          width: 100%;
          clip-path: inset(0% 0% 0% 0% round 10px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08),
            0 10px 10px -5px rgba(0, 0, 0, 0.03);
        }
        div:nth-of-type(2) a {
          transition: ease 0.3s;
          display: flex;
        }
        div:nth-of-type(2) a:hover,
        div:nth-of-type(2) a:focus {
          position: static;
          transform: scale(1.1);
        }

        a {
          color: ${colors.primary};
        }
        a:hover {
          text-decoration: underline;
          color: ${colors.secondary};
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
