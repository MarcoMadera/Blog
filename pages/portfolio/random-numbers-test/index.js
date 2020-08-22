import Link from "next/link";
import Seo from "../../../components/Seo";
const Random = () => {
  return (
    <main id="main">
      <Seo
        title="Portafolio - Números Pseudo Aleatorios"
        url="https://marcomadera.com/random-numbers-test"
      />
      <h1>Pruebas para números aleatorios</h1>
      <p>
        Herramienta para verificar números aleatorios, se puede encontrar
        información detallada sobre la realización de este programa en el blog
        de{" "}
        <Link href="/blog/numeros-pseudo-aleatorios">
          <a>números pseudo aleatorios</a>
        </Link>
        , y una muestra al final del post, pero igual lo puedes probar en la
        siguiente este{" "}
        <a
          href="https://test-for-random-numbers.marcomadera.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          enlace.
        </a>
      </p>
      <img
        src="https://res.cloudinary.com/marcomadera/image/upload/v1595276090/Potfolio/chiSqrt/chiSqrtCover_mngxy7.png"
        alt="Reporte Diario"
      />
      <style jsx>{`
        main {
          padding: 0 30px;
        }
        img {
          width: 100%;
        }
        a {
          color: #e74c3c;
        }
        a:hover {
          color: #e74c3ccb;
          text-decoration: underline;
        }
      `}</style>
    </main>
  );
};

export default Random;
