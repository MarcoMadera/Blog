import styles from "../Portfolio.module.css";
import Link from "next/link";
import Seo from "../../../components/Seo";
const Random = () => {
  return (
    <main className={styles.container} id="main">
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
          <a className={styles.link}>números pseudo aleatorios</a>
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
        className={styles.image}
        src="https://res.cloudinary.com/marcomadera/image/upload/v1595276090/Potfolio/chiSqrt/chiSqrtCover_mngxy7.png"
        alt="Reporte Diario"
      />
    </main>
  );
};

export default Random;
