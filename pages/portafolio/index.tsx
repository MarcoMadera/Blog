import Seo from "components/Seo";
import ActionButton from "components/ActionButton";
import { H1, H2, P, A, Img, ALink } from "components/tags";
import { PropsWithChildren, ReactElement } from "react";
import useAnalitycs from "hooks/useAnalitycs";

interface ArticleProps {
  img: string;
  title: string;
  blurDataURL: string;
  fullWidth: number;
  fullHeight: number;
}

function Article({
  img,
  title,
  blurDataURL,
  children,
  fullWidth,
  fullHeight,
}: PropsWithChildren<ArticleProps>): ReactElement {
  return (
    <article>
      <Img
        src={img}
        alt={title}
        width={400}
        height={222}
        blurDataURL={blurDataURL}
        fullImage={{
          img: { height: fullHeight, width: fullWidth, src: img },
          base64: blurDataURL,
        }}
      />
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
        div {
          padding-left: 30px;
        }
        article:nth-of-type(2n + 2) div {
          padding-left: 0;
          padding-right: 30px;
          grid-area: 1 / 1 / 1 / 2;
        }
        article:hover :global(.actionButton) {
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
        @media print, screen and (min-width: 0px) and (max-width: 876px) {
          article {
            display: block;
          }
          div {
            padding: 0;
          }
        }
      `}</style>
    </article>
  );
}

export default function Portfolio(): ReactElement {
  useAnalitycs("page-portafolio");

  return (
    <main id="main">
      <Seo title="Portafolio 💼 | Marco Madera" />
      <H1>Portafolio</H1>
      <Article
        title="Bot chat de facebook"
        img="https://res.cloudinary.com/marcomadera/image/upload/v1626903927/Potfolio/FacebookChatBot/FacebookChatBot_iomibw.png"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAvUlEQVQImWP4///ft88/v358c/PmtWPHjx09euTdx7dv7r7/8OzT////Gf7////zx7enTx7fuHnj6vXrV65e/fDp/e/ff37++AWS/vv339+/fz5///b40eMff19saDgRzjAzm2H+k8uvIdJ/////v2L+7IKEoJk5us3uGi1RwZWh7gc2LwJJ//n9+////5n6CoYMDPH6jKkmIoUhrlGuRnu3zEbontvZUBDqPaGhIsLf1Y6BwZGJYebUDqA0AO3HgIoUl/yoAAAAAElFTkSuQmCC"
        fullWidth={400}
        fullHeight={222}
      >
        <P>
          Chat bot de facebook para la página de facebook del hotel posada del
          desierto. Utiliza inteligencia artificial de procesamiento natural de
          lenguaje para responder a dudas comunes y no tan comunes sobre el
          hotel y servicios que ofrece.
        </P>
        <ActionButton type="link" href="/portafolio/facebook-bot">
          Detalles
        </ActionButton>
      </Article>
      <Article
        title="Maquetación frontend"
        img="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,h_222,w_400/v1610994328/Potfolio/challenges/1_h7zddv.jpg"
        blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAGAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAJBAAAQMDAgcBAAAAAAAAAAAAAQIDBQAGEQQhBxMUIjFBUWH/xAAVAQEBAAAAAAAAAAAAAAAAAAABA//EABgRAAMBAQAAAAAAAAAAAAAAAAABESEC/9oADAMBAAIRAxEAPwCzwYVbN0QslLQ1rMxTka+oob611ZcHKBIUv5v4wR+Vpib50wSA7ptYHMdwS8CAfeDjcUpVO8wEqqf/2Q=="
        fullWidth={1650}
        fullHeight={1172}
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
        <ActionButton type="link" href="/portafolio/retos-frontend">
          Detalles
        </ActionButton>
      </Article>
      <Article
        title="Rindu, limpiador de spotify playlists"
        img="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,h_222,w_400/v1618517767/Potfolio/Rindu/spotify-playlists-cleaner.vercel.app__sj4ozo.png"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAxUlEQVQImQG6AEX/AEwiVGA7ZTwXRD0YRC0HNT8SR0IVS0IVS0ARSUIVSwA1JTw3NzU+Pj4fIR8DAANIMVBLMFJHLk5KMlJKMlIAQUBHRUZHMDAxLCwtNDQ1QT5HSkRMUEpTRUFJVlVgAFloWks8OaqhnJyNjTs2MUdXS6Hessf/2lVxXG2DcQCCn3fzwZfg2NHjyLXIpn6GtYeFtIaCsYKKuYuTxJMAjr+Gfn5WPkkyREosgYpjquiqsvOvsvOvsfOsq+uow9ZH6nwZ8fIAAAAASUVORK5CYII="
        fullWidth={1366}
        fullHeight={799}
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
        <ActionButton type="link" href="/portafolio/rindu">
          Detalles
        </ActionButton>
      </Article>
      <Article
        title="Tests para números aleatorios"
        img="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,h_222,w_400/v1595276090/Potfolio/chiSqrt/chiSqrtCover_mngxy7.png"
        blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAGAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAYH/8QAIBAAAgIBAwUAAAAAAAAAAAAAAgMABAUBBhESIjFBUf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDZcngUZ3f6bRUKrreIFRqtOcYmrq5LsEdOPvnX3LSIgf/Z"
        fullWidth={1365}
        fullHeight={666}
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
        <ActionButton type="link" href="/portafolio/test-de-numeros-aleatorios">
          Detalles
        </ActionButton>
      </Article>
      <Article
        title="Registro de trámites en Excel"
        img="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,h_222,w_400/v1595275323/Potfolio/sreExcel/Data_splifz.png"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAxUlEQVQImQG6AEX/AMjHwqSQkvn49+rn4eHd19vW0Ovq5eTe27KglfX19gBnV1ZSQT9WRURdTktbTUvCvrvt7evs6+vPx8Tl5OQA29ratainvrKyx8DAiXZ06+jpzMXFsqOjxLa2+Pj4AK2bmCUAAFM1L4FqZSoDAO7u7s3Hx5qDg62Vlf///wDu7Ozi3Nzj3tzu6+rYzc21o6O7qanIu7nFt7Xn4uIA8fPy8/b19vf39fT09ff38fHx8fHx7Ovr9vX16urqLm2FcP5vKbgAAAAASUVORK5CYII="
        fullWidth={1664}
        fullHeight={736}
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
        <ActionButton type="link" href="/portafolio/sre-excel">
          Detalles
        </ActionButton>
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
}
