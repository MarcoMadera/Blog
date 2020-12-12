import Seo from "../../components/Seo";
import ActionLink from "../../components/ActionLink";
import { H1, H2, P, A, Img, ALink } from "../../components/tags";
const Portfolio = () => {
  return (
    <main id="main">
      <Seo title="Portafolio 💼 | Marco Madera" />
      <H1>Portafolio</H1>
      <article>
        <Img
          src="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,h_222,w_400/v1597699966/Potfolio/challenges/challenges_ejazkx.png"
          alt="Portada de retos frontend"
          width={400}
          height={222}
        />
        <div>
          <H2>Retos frontend</H2>
          <P>
            Esta es una serie de retos que he ido realizando para pasar el rato
            de la página de{" "}
            <A
              href="https://www.frontendmentor.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Frontend Mentor
            </A>{" "}
            donde el objetivo es mejorar las habilidades de código con proyectos
            reales. Los retos son de la sección gratis, no incluyen el archivo
            de diseño, solo la imagen, por lo que son realizados principalmente
            a ojo.
          </P>
          <ActionLink href="/portafolio/retos">Detalles</ActionLink>
        </div>
      </article>
      <article>
        <Img
          src="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,h_222,w_400/v1595276090/Potfolio/chiSqrt/chiSqrtCover_mngxy7.png"
          alt="Portada de test for random numbers"
          width={400}
          height={222}
        />
        <div>
          <H2>Tests para números aleatorios</H2>
          <P>
            Herramienta para verificar números aleatorios, se puede encontrar
            información detallada sobre la realización de esta aplicacion en el{" "}
            <ALink href="/blog/numeros-pseudo-aleatorios">
              blog de números pseudo aleatorios
            </ALink>
            , y/o probarlo en la siguiente página de{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://test-for-random-numbers.marcomadera.vercel.app/"
            >
              test para numeros aleatorios
            </a>
            .
          </P>
          <ActionLink href="/portafolio/random-numbers-test">
            Detalles
          </ActionLink>
        </div>
      </article>
      <article>
        <Img
          src="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,h_222,w_400/v1595275323/Potfolio/sreExcel/Data_splifz.png"
          alt="Portada de sre-excel"
          width={400}
          height={222}
        />
        <div>
          <H2>Registro de trámites en excel</H2>
          <P>
            Dashboard funcional en excel programado con visual basic for
            applications para dar seguimiento a trámites realizados, se obtiene
            la información automáticamente a través de un bookmarklet en el
            navegador, se descarga la información y se lleva al registro de
            excel. Con esto se evita la tarea de transcribir, asi se evitan
            posibles errores llevando la información directamente a el
            almacenamiento.
          </P>
          <ActionLink href="/portafolio/sre-excel">Detalles</ActionLink>
        </div>
      </article>
      <style jsx>{`
        main :global(h1){
          margin-bottom: 0.67em;
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
        article:hover :global(.actionLink) {
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
        div {
          padding: 30px;
        }
        @media print, screen and (min-width: 0px) and (max-width: 876px){
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
