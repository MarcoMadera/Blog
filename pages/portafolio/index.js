import Seo from "components/Seo";
import ActionLink from "components/ActionLink";
import { H1, H2, P, A, Img, ALink } from "components/tags";
import PropTypes from "prop-types";
import { useEffect } from "react";

const Article = ({ img, title, children }) => {
  return (
    <article>
      <Img src={img} alt={title} width={400} height={222} />
      <div>
        <H2>{title}</H2>
        {children}
      </div>
      <style jsx>{`
        article {
          display: grid;
          align-items: center;
          margin-bottom: 40px;
        }
        article:nth-of-type(2n + 1) {
          grid-template-columns: 400px 1fr;
        }
        article:nth-of-type(2n + 2) {
          grid-template-columns: 1fr 400px;
        }
        div{
          padding-left: 30px;
        }
        article:nth-of-type(2n + 2) div {
          padding-left: 0;
          padding-right: 30px;
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
        @media print, screen and (min-width: 0px) and (max-width: 876px){
          article{
            display block;
          }
          div{
            padding: 0;
          }
        }
      `}</style>
    </article>
  );
};

const Portfolio = () => {
  useEffect(() => {
    fetch("/api/views/page-portafolio", {
      method: "POST",
    });
  }, []);
  return (
    <main id="main">
      <Seo title="Portafolio 💼 | Marco Madera" />
      <H1>Portafolio</H1>
      <Article
        title="Maquetación frontend"
        img="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,h_222,w_400/v1610994328/Potfolio/challenges/1_h7zddv.jpg"
      >
        <P>
          Esta es una serie de retos que he ido realizando para pasar el rato.
          La mayoría son de la página de{" "}
          <A
            href="https://www.frontendmentor.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Frontend Mentor
          </A>
          , donde el objetivo es mejorar las habilidades de código con proyectos
          reales. Los retos son de la sección gratis, no incluyen el archivo de
          diseño, por lo que son realizados principalmente a ojo de la imagen
          proporcionada.
        </P>
        <ActionLink href="/portafolio/retos-frontend">Detalles</ActionLink>
      </Article>
      <Article
        title="Rindu, limpiador de spotify playlists"
        img="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,h_222,w_400/v1618517767/Potfolio/Rindu/spotify-playlists-cleaner.vercel.app__sj4ozo.png"
      >
        <P>
          Ya sea que tengas un bot para crear playlists y agregue canciones
          repetidas, o por algún error se guardaron como tracks nulos,{" "}
          <A
            href="https://spotify-playlists-cleaner.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rindu
          </A>{" "}
          remueve esos tracks duplicados y nulos de tus playlists dejando uno de
          cada tipo.
        </P>
        <ActionLink href="/portafolio/rindu">Detalles</ActionLink>
      </Article>
      <Article
        title="Tests para números aleatorios"
        img="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,h_222,w_400/v1595276090/Potfolio/chiSqrt/chiSqrtCover_mngxy7.png"
      >
        <P>
          Es una herramienta que verifica estadísticamente si los números de una
          lista se comportan de manera aleatoria. Se puede encontrar más
          información detallada sobre la realización de esta aplicación en el{" "}
          <ALink
            href="/blog/numeros-pseudo-aleatorios"
            title="Blog: Números Pseudo Aleatorios"
          >
            post de números pseudo aleatorios
          </ALink>
          , y/o probarlo en la siguiente página de{" "}
          <A
            target="_blank"
            rel="noopener noreferrer"
            href="https://test-for-random-numbers.marcomadera.vercel.app/"
          >
            test para números aleatorios
          </A>
          .
        </P>
        <ActionLink href="/portafolio/test-de-numeros-aleatorios">
          Detalles
        </ActionLink>
      </Article>
      <Article
        title="Registro de trámites en Excel"
        img="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,h_222,w_400/v1595275323/Potfolio/sreExcel/Data_splifz.png"
      >
        <H2></H2>
        <P>
          <em>Dashboard</em> funcional en Excel programado con{" "}
          <em>visual basic for applications</em> para dar seguimiento a los
          trámites realizados. Se obtiene la información automáticamente a
          través de un <em>bookmarklet</em>, un <em>bookmark</em> que contiene
          comandos de JavaScript en el navegador. Se descarga la información y
          se lleva al registro de Excel evitando la tarea de transcribir el
          contenido y posibles errores de transcripción al llevar la información
          directamente al archivo final.
        </P>
        <ActionLink href="/portafolio/sre-excel">Detalles</ActionLink>
      </Article>
      <style jsx>{`
        main :global(h1) {
          margin-bottom: 0.67em;
          text-align: center;
        }
        main {
          padding: 0 20px;
          margin: 0 auto;
          max-width: 1300px;
          min-height: calc(100vh - 257px);
        }
        div {
          padding: 30px;
        }
      `}</style>
    </main>
  );
};

Article.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Portfolio;
