import Seo from "components/Seo";
import ActionButton from "components/ActionButton";
import { H1, H2, Img } from "components/tags";
import { PropsWithChildren, ReactElement } from "react";
import useAnalytics from "hooks/useAnalytics";
import Markdown from "components/Markdown";

interface ArticleProps {
  img: string;
  title: string;
  blurDataURL: string;
  fullWidth: number;
  fullHeight: number;
  href: string;
  content: string;
}

function Article({
  img,
  title,
  blurDataURL,
  fullWidth,
  fullHeight,
  href,
  content,
}: PropsWithChildren<ArticleProps>): ReactElement {
  return (
    <article>
      <div>
        <Img
          src={img}
          alt={title}
          width={500}
          height={280}
          blurDataURL={blurDataURL}
          fullImage={{
            img: {
              height: fullHeight,
              width: fullWidth,
              src: img,
            },
            base64: blurDataURL,
          }}
        />
      </div>
      <div>
        <H2>{title}</H2>
        <Markdown source={content} type="portfolio-post" />
        <section>
          <ActionButton type="link" href={href}>
            Detalles
          </ActionButton>
        </section>
      </div>
      <style jsx>{`
        article {
          display: grid;
          align-items: center;
          max-width: 1568px;
          padding: 64px;
          grid-template-columns: repeat(12, 1fr);
          position: relative;
          margin: 0px auto 30px;
        }
        article:nth-child(2n + 1) > div:nth-child(1) {
          grid-area: 1 / 1 / 1 / 6;
          display: grid;
        }
        article:nth-child(2n + 1) > div:nth-child(2) {
          grid-column: 7 / 13;
          display: grid;
        }
        article:nth-child(2n) > div:nth-child(2) {
          grid-area: 1 / 1 / 1 / 6;
          display: grid;
        }
        article:nth-child(2n) > div:nth-child(1) {
          grid-column: 7 / 13;
          display: grid;
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
            padding: 0;
          }
        }
      `}</style>
    </article>
  );
}

const portfolioPostData = [
  {
    title: "Bot chat de Facebook",
    img: "https://res.cloudinary.com/marcomadera/image/upload/Potfolio/FacebookChatBot/FacebookChatBot_iomibw.png",
    blurDataURL:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAvUlEQVQImWP4///ft88/v358c/PmtWPHjx09euTdx7dv7r7/8OzT////Gf7////zx7enTx7fuHnj6vXrV65e/fDp/e/ff37++AWS/vv339+/fz5///b40eMff19saDgRzjAzm2H+k8uvIdJ/////v2L+7IKEoJk5us3uGi1RwZWh7gc2LwJJ//n9+////5n6CoYMDPH6jKkmIoUhrlGuRnu3zEbontvZUBDqPaGhIsLf1Y6BwZGJYebUDqA0AO3HgIoUl/yoAAAAAElFTkSuQmCC",
    fullWidth: 400,
    fullHeight: 222,
    href: "/portafolio/facebook-bot",
    content:
      "Chat bot de Facebook para la página de Facebook del hotel posada del desierto. Utiliza inteligencia artificial de procesamiento natural de lenguaje para responder a dudas comunes y no tan comunes sobre el hotel y servicios que ofrece.",
  },
  {
    title: "Maquetación frontend",
    img: "https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,h_222,w_400/Potfolio/challenges/1_h7zddv.jpg",
    blurDataURL:
      "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAGAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAJBAAAQMDAgcBAAAAAAAAAAAAAQIDBQAGEQQhBxMUIjFBUWH/xAAVAQEBAAAAAAAAAAAAAAAAAAABA//EABgRAAMBAQAAAAAAAAAAAAAAAAABESEC/9oADAMBAAIRAxEAPwCzwYVbN0QslLQ1rMxTka+oob611ZcHKBIUv5v4wR+Vpib50wSA7ptYHMdwS8CAfeDjcUpVO8wEqqf/2Q==",
    fullWidth: 1650,
    fullHeight: 1172,
    href: "/portafolio/retos-frontend",
    content:
      "Esta es una serie de retos que he ido realizando para pasar el rato. [Frontend Mentor](https://www.frontendmentor.io/), donde el objetivo es mejorar las habilidades de código con proyectos reales. Los retos son de la sección gratis, no incluyen el archivo de diseño, por lo que son realizados principalmente a ojo de la imagen proporcionada.",
  },
  {
    title: "Rindu, limpiador de spotify playlists",
    img: "https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,h_222,w_400/Potfolio/Rindu/home_lv3792.png",
    blurDataURL:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAECAIAAAA4WjmaAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAh0lEQVQImQF8AIP/ALuZF9irAHBOIDMbRycOLEAeQzQROE0tT31qejMZNABlPgCmgQB7SwAlAz8eAB5AHUhKJE8+HkNJOEUmDyoAybRjjX5BcVQ0QS9VWUBdeF1zKR0ir3Gi5Yjf6pnhAP/7///3//Pn+f3y+v/7/2VHXxoDGJFbidKNxcmFvpXsMm7qoL5JAAAAAElFTkSuQmCC",
    fullWidth: 4992,
    fullHeight: 2316,
    href: "/portafolio/rindu",
    content:
      "Ya sea que tengas un bot para crear playlists y agregue canciones repetidas, o por algún error se guardaron como tracks nulos, [Rindu](https://rindu.marcomadera.com) remueve esos tracks duplicados y nulos de tus playlists dejando uno de cada tipo.",
  },
  {
    title: "Tests para números aleatorios",
    img: "https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,h_222,w_400/Potfolio/chiSqrt/chiSqrtCover_mngxy7.png",
    blurDataURL:
      "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAGAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAYH/8QAIBAAAgIBAwUAAAAAAAAAAAAAAgMABAUBBhESIjFBUf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDZcngUZ3f6bRUKrreIFRqtOcYmrq5LsEdOPvnX3LSIgf/Z",
    fullWidth: 1365,
    fullHeight: 666,
    href: "/portafolio/test-de-numeros-aleatorios",
    content:
      "Es una herramienta que verifica estadísticamente si los números de una lista se comportan de manera aleatoria. Se puede encontrar más información detallada sobre la realización de esta aplicación en el [post de números pseudo aleatorios](/blog/numeros-pseudo-aleatorios 'Blog: Números Pseudo Aleatorios'), y/o probarlo en la siguiente página de [test para números aleatorios](https://random-numbers-test.marcomadera.com).",
  },
  {
    title: "Registro de trámites en Excel",
    img: "https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,h_222,w_400/Potfolio/sreExcel/Data_splifz.png",
    blurDataURL:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAxUlEQVQImQG6AEX/AMjHwqSQkvn49+rn4eHd19vW0Ovq5eTe27KglfX19gBnV1ZSQT9WRURdTktbTUvCvrvt7evs6+vPx8Tl5OQA29ratainvrKyx8DAiXZ06+jpzMXFsqOjxLa2+Pj4AK2bmCUAAFM1L4FqZSoDAO7u7s3Hx5qDg62Vlf///wDu7Ozi3Nzj3tzu6+rYzc21o6O7qanIu7nFt7Xn4uIA8fPy8/b19vf39fT09ff38fHx8fHx7Ovr9vX16urqLm2FcP5vKbgAAAAASUVORK5CYII=",
    fullWidth: 1664,
    fullHeight: 736,
    href: "/portafolio/sre-excel",
    content:
      "**Dashboard** funcional en Excel programado con **visual basic for applications** para dar seguimiento a los trámites realizados.",
  },
];

export default function Portfolio(): ReactElement {
  useAnalytics("page-portafolio");

  return (
    <main id="main">
      <Seo title="Portafolio 💼 | Marco Madera" />
      <H1>Portafolio</H1>
      {portfolioPostData.map((article) => {
        return <Article key={article.title} {...article} />;
      })}
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
