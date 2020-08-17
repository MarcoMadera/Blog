import Link from "next/link";
import styles from "./Portfolio.module.css";
import Seo from "../../components/Seo";
const Portfolio = () => {
  return (
    <main className={styles.main}>
      <Seo title="Portafolio" url="https://marcomadera.com/portfolio" />
      <h1 className={styles.title}>Portafolio</h1>
      <article className={styles.article}>
        <img
          className={styles.img}
          src="https://res.cloudinary.com/marcomadera/image/upload/v1597699966/Potfolio/challenges/challenges_ejazkx.png"
          alt="challenges cover"
        />
        <section className={styles.section}>
          <h1>Challenges</h1>
          <p>
            Esta es una serie de retos que he ido realizando para pasar el rato
            de la página de{" "}
            <a
              className={styles.link}
              href="https://www.frontendmentor.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Frontend Mentor
            </a>{" "}
            donde el objetivo es mejorar las habilidades de código con proyectos
            reales. Los retos son de la sección gratis, no incluyen el archivo
            de diseño solo la imagen, por lo que son realizados principalmente a
            ojo.
          </p>
          <Link href="/portfolio/challenges">
            <a className={`btn btn-primary ${styles.button}`}>Detalles</a>
          </Link>
        </section>
      </article>
      <article className={`${styles.article} ${styles.rightarticle}`}>
        <img
          className={styles.img}
          src="https://res.cloudinary.com/marcomadera/image/upload/v1595276090/Potfolio/chiSqrt/chiSqrtCover_mngxy7.png"
          alt="test for random numbers cover"
        />
        <section className={styles.section}>
          <h1>Tests para números aleatorios</h1>
          <p>
            Herramienta para verificar números aleatorios, se puede encontrar
            información detallada sobre la realización de este programa en el{" "}
            <Link href="/blog/numeros-pseudo-aleatorios">
              <a className={styles.link}>blog de números pseudo aleatorios</a>
            </Link>
            , y una muestra al final del post, pero igual lo puedes probar en la
            siguiente este{" "}
            <a
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
              href="https://test-for-random-numbers.marcomadera.vercel.app/"
            >
              enlace
            </a>
            .
          </p>
          <Link href="/portfolio/random-numbers-test">
            <a className={`btn btn-primary ${styles.button}`}>Detalles</a>
          </Link>
        </section>
      </article>
      <article className={styles.article}>
        <img
          className={styles.img}
          src="https://res.cloudinary.com/marcomadera/image/upload/v1595275323/Potfolio/sreExcel/Data_splifz.png"
          alt="sre-excel cover"
        />
        <section className={styles.section}>
          <h1>Registro de trámites en excel</h1>
          <p>
            Dashboard funcional en excel programado con visual basic for
            applications para dar seguimiento a los trámites realizados, con la
            obtención automática a través de un bookmarklet en el navegador, se
            descarga la información y se lleva al registro de excel, evitando la
            tarea de transcribir y evitando los posibles errores llevandolo
            directamente a el almacenamiento de la información.
          </p>
          <Link href="/portfolio/sre-excel">
            <a className={`btn btn-primary ${styles.button}`}>Detalles</a>
          </Link>
        </section>
      </article>
    </main>
  );
};

export default Portfolio;
