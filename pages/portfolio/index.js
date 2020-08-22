import Link from "next/link";
import Seo from "../../components/Seo";
const Portfolio = () => {
  return (
    <main>
      <Seo title="Portafolio" url="https://marcomadera.com/portfolio" />
      <h1>Portafolio</h1>
      <article>
        <img
          src="https://res.cloudinary.com/marcomadera/image/upload/v1597699966/Potfolio/challenges/challenges_ejazkx.png"
          alt="challenges cover"
        />
        <section>
          <h1>Retos frontend</h1>
          <p>
            Esta es una serie de retos que he ido realizando para pasar el rato
            de la página de{" "}
            <a
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
            <a className={"btn btn-primary"}>Detalles</a>
          </Link>
        </section>
      </article>
      <article className={"right"}>
        <img
          src="https://res.cloudinary.com/marcomadera/image/upload/v1595276090/Potfolio/chiSqrt/chiSqrtCover_mngxy7.png"
          alt="test for random numbers cover"
        />
        <section>
          <h1>Tests para números aleatorios</h1>
          <p>
            Herramienta para verificar números aleatorios, se puede encontrar
            información detallada sobre la realización de este programa en el{" "}
            <Link href="/blog/numeros-pseudo-aleatorios">
              <a>blog de números pseudo aleatorios</a>
            </Link>
            , y una muestra al final del post, pero igual lo puedes probar en la
            siguiente este{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://test-for-random-numbers.marcomadera.vercel.app/"
            >
              enlace
            </a>
            .
          </p>
          <Link href="/portfolio/random-numbers-test">
            <a className={"btn btn-primary"}>Detalles</a>
          </Link>
        </section>
      </article>
      <article>
        <img
          src="https://res.cloudinary.com/marcomadera/image/upload/v1595275323/Potfolio/sreExcel/Data_splifz.png"
          alt="sre-excel cover"
        />
        <section>
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
            <a className="btn btn-primary">Detalles</a>
          </Link>
        </section>
      </article>
      <style global jsx>{`
        .right {
          flex-direction: row-reverse;
        }
      `}</style>
      <style jsx>{`
        main {
          padding: 0 30px;
        }
        article {
          display: flex;
          align-items: center;
          margin-bottom: 40px;
          transition: ease 0.4s;
        }
        article:hover a {
          animation: heartbeat 1.5s ease-in-out 1s 2 both;
        }
        @keyframes heartbeat {
          from {
            transform: scale(1);
            transform-origin: center center;
            animation-timing-function: ease-out;
          }
          10% {
            transform: scale(0.91);
            animation-timing-function: ease-in;
          }
          17% {
            transform: scale(0.98);
            animation-timing-function: ease-out;
          }
          33% {
            transform: scale(0.87);
            animation-timing-function: ease-in;
          }
          45% {
            transform: scale(1);
            animation-timing-function: ease-out;
          }
        }

        img {
          width: 400px;
          height: 222px;
          border-radius: 10px;
          transition: ease 0.3s;
        }

        section {
          padding: 30px;
        }

        a {
          color: #e74c3c;
        }
        a:hover {
          text-decoration: underline;
          color: #e74c3ccb;
        }

        img:hover {
          position: static;
          transform: scale(1.1);
        }
        @media screen and (min-width: 0px) and (max-width: 876px){
          article{
            display block;
          }
          img{
            width: 100%;
            height: 250px;
          }
          section{
            padding: 0;
          }
        }
      `}</style>
    </main>
  );
};

export default Portfolio;
