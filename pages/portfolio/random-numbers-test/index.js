import Link from "next/link";
import Seo from "../../../components/Seo";
const Random = () => {
  return (
    <main id="main">
      <Seo
        title="Portafolio - Números Pseudo Aleatorios"
        url="https://marcomadera.com/random-numbers-test"
      />
      <h1>Herramienta para verificar números aleatorios</h1>
      <article>
        <section>
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
            </Link>
            donde explico cómo determinar el comportamiento y puedes ver los
            resultados que obtuve al aplicarlo con Math.Random() de JavaScript.
          </p>
        </section>
        <div>
          <a
            href="https://test-for-random-numbers.marcomadera.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://res.cloudinary.com/marcomadera/image/upload/v1595276090/Potfolio/chiSqrt/chiSqrtCover_mngxy7.png"
              alt="Reporte Diario"
            />
          </a>
        </div>
      </article>
      <style jsx>{`
        main {
          margin: 0 auto;
          padding: 0 20px;
          max-width: 1300px;
        }
        h1 {
          text-align: center;
        }
        section a {
          margin-right: 20px;
        }
        article {
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin-top: 40px;
          margin-bottom: 40px;
          align-items: center;
        }
        article > div {
          padding: 40px;
        }
        section {
          padding: 40px;
        }
        img {
          width: 100%;
          transition: ease 0.3s;
          border-radius: 10px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08),
            0 10px 10px -5px rgba(0, 0, 0, 0.03);
        }
        img:hover {
          position: static;
          transform: scale(1.1);
        }

        a {
          color: #da0000;
        }
        a:hover {
          text-decoration: underline;
          color: #e74c3ccb;
        }
        @media screen and (max-width: 876px) {
          article {
            grid-template-columns: auto;
          }
          article {
            margin-top: 0px;
            margin-bottom: 20px;
          }
          article > div,
          article > section {
            padding: 0px;
          }
          article > section a {
            margin-bottom: 10px;
          }
        }
      `}</style>
    </main>
  );
};

export default Random;
