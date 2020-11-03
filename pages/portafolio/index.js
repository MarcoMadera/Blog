import Link from "next/link";
import Seo from "../../components/Seo";
import { colors } from "../../styles/theme";
const Portfolio = () => {
  return (
    <main id="main">
      <Seo title="Portafolio" url="https://marcomadera.com/portafolio" />
      <h1>Portafolio</h1>
      <article>
        <picture>
          <source
            srcSet={
              "https://res.cloudinary.com/marcomadera/image/upload/c_scale,h_534,w_960/v1597699966/Potfolio/challenges/challenges_ejazkx.png"
            }
            media="(max-width: 876px)"
          />
          <img
            src="https://res.cloudinary.com/marcomadera/image/upload/c_scale,h_222,w_400/v1597699966/Potfolio/challenges/challenges_ejazkx.png"
            alt="challenges cover"
            width={400}
            height={222}
          />
        </picture>
        <div>
          <h2>Retos frontend</h2>
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
            de diseño, solo la imagen, por lo que son realizados principalmente
            a ojo.
          </p>
          <Link href="/portafolio/retos">
            <a className={"btn btn-primary"}>Detalles</a>
          </Link>
        </div>
      </article>
      <article>
        <picture>
          <source
            srcSet={
              "https://res.cloudinary.com/marcomadera/image/upload/c_scale,h_534,w_960/v1595276090/Potfolio/chiSqrt/chiSqrtCover_mngxy7.png"
            }
            media="(max-width: 876px)"
          />
          <img
            src="https://res.cloudinary.com/marcomadera/image/upload/c_scale,h_222,w_400/v1595276090/Potfolio/chiSqrt/chiSqrtCover_mngxy7.png"
            alt="test for random numbers cover"
            width={400}
            height={222}
          />
        </picture>
        <div>
          <h2>Tests para números aleatorios</h2>
          <p>
            Herramienta para verificar números aleatorios, se puede encontrar
            información detallada sobre la realización de esta aplicacion en el{" "}
            <Link href="/blog/numeros-pseudo-aleatorios">
              <a>blog de números pseudo aleatorios</a>
            </Link>
            , y/o probarlo en la siguiente página de{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://test-for-random-numbers.marcomadera.vercel.app/"
            >
              test para numeros aleatorios
            </a>
            .
          </p>
          <Link href="/portafolio/random-numbers-test">
            <a className={"btn btn-primary"}>Detalles</a>
          </Link>
        </div>
      </article>
      <article>
        <picture>
          <source
            srcSet={
              "https://res.cloudinary.com/marcomadera/image/upload/c_scale,h_534,w_960/v1595275323/Potfolio/sreExcel/Data_splifz.png"
            }
            media="(max-width: 876px)"
          />
          <img
            src="https://res.cloudinary.com/marcomadera/image/upload/c_scale,h_222,w_400/v1595275323/Potfolio/sreExcel/Data_splifz.png"
            alt="sre-excel cover"
            width={400}
            height={222}
          />
        </picture>
        <div>
          <h2>Registro de trámites en excel</h2>
          <p>
            Dashboard funcional en excel programado con visual basic for
            applications para dar seguimiento a trámites realizados, se obtiene
            la información automáticamente a través de un bookmarklet en el
            navegador, se descarga la información y se lleva al registro de
            excel. Con esto se evita la tarea de transcribir, asi se evitan
            posibles errores llevando la información directamente a el
            almacenamiento.
          </p>
          <Link href="/portafolio/sre-excel">
            <a className="btn btn-primary">Detalles</a>
          </Link>
        </div>
      </article>
      <style jsx>{`
        p {
          line-height: 1.6;
        }
        h1{
          margin-top: 0;
          text-align: center;
        }
        main {
          padding: 0 20px;
          margin: 0 auto;
          max-width: 1300px;
        }
        article {
          display: grid;
          align-items: center;
          margin-bottom: 40px;
          transition: ease 0.4s;
        }
        article:nth-of-type(2n+1) {
          grid-template-columns: 400px 1fr;
        }
        article:nth-of-type(2n+2) {
          grid-template-columns: 1fr 400px;
        }
        article:nth-of-type(2n+2) div{
          grid-area: 1 / 1 / 1 / 2;
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
          clip-path: inset(0% 0% 0% 0% round 10px);
          transition: ease 0.3s;
        }
        div {
          padding: 30px;
        }
        a {
          color: ${colors.primary};
        }
        a:hover {
          text-decoration: underline;
          color: ${colors.secondary};
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
            display: block;
            margin: 0 auto;
            max-width: 400px;
            width: 100%;
            height: auto;
          }
          div{
            padding: 0;
          }
        }
      `}</style>
    </main>
  );
};

export default Portfolio;
