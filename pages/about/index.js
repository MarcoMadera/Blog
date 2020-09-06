import Seo from "../../components/Seo";
import PropTypes from "prop-types";
import Spotify from "../../components/icons/Spotify";
import Link from "next/link";
import Email from "../../components/icons/Email";
import Code from "../../components/icons/Code";
import AugmentedReallity from "../../components/icons/AugmentedReallity";
import Chess from "../../components/icons/Chess";
import Music from "../../components/icons/Music";
import Book from "../../components/icons/Book";
import Film from "../../components/icons/Film";
import Java from "../../components/icons/Java";
import CSharp from "../../components/icons/CSharp";
import JavaScript from "../../components/icons/JavaScript";
const About = ({ response = {}, tracks = {}, played = {} }) => {
  return (
    <main>
      <Seo title="Sobre mí" url="https://marcomadera.com/about" />
      <div>
        <Code width="50" height="50" />
        <Java width="50" height="50" />
        <AugmentedReallity width="50" height="50" />
        <CSharp width="50" height="50" />
        <JavaScript width="50" height="50" />
        <Music width="50" height="50" />
        <Chess width="50" height="50" />
        <Book width="50" height="50" />
        <Film width="50" height="50" />
      </div>
      <section>
        <section>
          <h1>Sobre mí</h1>
          <p>
            ¡Hola! Mi nombre es Marco Madera tengo 23 años, actualmente soy
            auxiliar administrativo en la secretaría de relaciones exteriores,
            programador web frontend por afición y entusiasta de las tecnología
            web que cada día me gustan más: JavaScript, Node.js, React, etc...
            Estoy en constante proceso de aprendizaje sobre las nuevas
            tecnologías y me gusta estar informado de lo que pasa en la web, ver
            cursos, leer artículos y tutoriales. Trataré de compartir mis
            conocimientos en la sección de blog, misma que trataré como libreta
            personal para futuro con temas relacionados a la programación.
          </p>
          <h2>¿Cómo empecé a escribir código?</h2>
          <p>
            Es algo que vengo haciendo desde preparatoria, cuando descubrí que
            se podían hacer aplicaciones para android me eché un clavado en el
            mundo de Java, sin saber ni siquiera de control de versiones ni de
            git. Logré hacer algunas aplicaciones básicas y aún sin estar
            satisfecho con los resultados decidí dar el siguiente paso. En ese
            entonces por el 2013 empezaba a resonar sobre la realidad aumentada,
            lo que veía lo quería intentar así que me pasé a C#, con el cúal
            obviamente también quería hacer una cantidad de videojuegos, pero
            nunca tuve el conocimiento para hacer algo realidad por todo el
            trabajo que conlleva y porque no sé nada de videojuegos, no los
            juego. Después de estas étapas me empecé a interesar en Python con
            el próposito de hacer proyectos sobre ciencia de datos y web
            scraping, pero también me interesaba JavaScript, Python fue algo que
            pasó muy rápido, no me gustó del todo la sintáxis quedando como
            ganador JavaScript.
          </p>
          <p></p>
          <h2>Cosas que me gustan</h2>
          <a
            href="https://www.last.fm/user/MarcoMadera"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Página de last.fm"
          >
            <h3>La música</h3>
          </a>
          <p>
            La música es mi mejor acompañante para cualquier situación,
            especialmente a la hora de escribir, simplemente hace la vida más
            agradable. Me gusta de todo tipo y aunque no me considero de buen
            gusto me gusta compartir.
          </p>
          <a
            href="https://lichess.org/@/MarcoMadera000"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Página de Lichess.org"
          >
            <h3>Ajedrez bala</h3>
          </a>
          <p>
            Siempre que estoy estancado en algo, juego un poco de ajedrez bala,
            como mi método para tomar un descanso y despejarme un poco.
          </p>
          <a
            href="https://ciberninjas.com/biblioteca-de-programacion-y-tecnologia/#-desarrollo-web"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Lecturas de programación"
          >
            <h3>Leer</h3>
          </a>
          <p>
            Procuro dejar tiempo para leer artículos, blogs, hilos de twitter y
            novelas, contenido de la web interesante, que pueda compartir en el{" "}
            <Link href="/newsletter">
              <a>Newsletter</a>
            </Link>
          </p>
          <strike>
            <a
              href="https://trakt.tv/users/marcomadera/progress"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Página de TrackTV"
            >
              <h3>Ver series</h3>
            </a>
          </strike>
          <p>
            Es de esas cosas que dejo un tiempo y continúo por temporadas, me
            gustan las series de drama y no puedo con las de ficción ni super
            heroes.
          </p>
        </section>
        <div>
          <h2>¿Quieres contactar conmigo?</h2>
          <p>
            Puedes mandarme un mensaje por{" "}
            <a
              href="https://twitter.com/madera_marco"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Página de Twitter"
            >
              Twitter
            </a>
            , o mándame un correo dando clic al icono{" "}
            <button
              title="Enviar correo electrónico"
              onClick={() => {
                window.open(
                  "mailto:me@marcomadera.com",
                  "width=600,height=500,scrollbars=no,resizable=no"
                );
                return false;
              }}
            >
              <Email width="20" height="20" />
            </button>
          </p>
          <img
            src="https://res.cloudinary.com/marcomadera/image/upload/c_scale,w_200/v1598594392/about/tIeCLkB8geYtW_tpgywi.gif"
            alt="Ok gif"
            width="200"
            height="158"
          />
        </div>
      </section>
      <aside>
        {Object.keys(response).length > 0 ? (
          <div>
            <header>
              <strong>
                <p>
                  {response.is_playing
                    ? "Escuchando ahora"
                    : "Último escuchado"}
                </p>
              </strong>
              <a
                href="https://open.spotify.com/user/12133024755"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Perfil de spotify"
              >
                <Spotify width="26" height="26" fill="#1DB954" />
              </a>
            </header>
            <a
              href={response.item.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ir a spotify"
            >
              <article>
                <img
                  src={response.item.album.images[1].url}
                  alt="album cover"
                  width="64"
                  height="64"
                />
                <div>
                  <strong>
                    <p>{response.item.name}</p>
                  </strong>
                  <p>{response.item.album.artists[0].name}</p>
                </div>
              </article>
            </a>
            <hr />
          </div>
        ) : (
          Object.keys(played).length > 0 && (
            <div>
              <header>
                <strong>
                  <p>Recién escuchado</p>
                </strong>
                <a
                  href="https://open.spotify.com/user/12133024755"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Perfil de spotify"
                >
                  <Spotify width="26" height="26" fill="#1DB954" />
                </a>
              </header>
              <a
                href={played.response.items[0].track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ir a spotify"
              >
                <article>
                  <img
                    src={played.response.items[0].track.album.images[1].url}
                    alt="album cover"
                    width="64"
                    height="64"
                  />
                  <div>
                    <strong>
                      <p>{played.response.items[0].track.name}</p>
                    </strong>
                    <p>
                      {played.response.items[0].track.album.artists[0].name}
                    </p>
                  </div>
                </article>
              </a>
              <hr />
            </div>
          )
        )}
        {Object.keys(tracks).length > 0 && (
          <>
            <strong>
              <p>Mi top 10 de canciones</p>
            </strong>
            {tracks.tracks.map(({ title, artist, songUrl, cover }) => (
              <a
                key={songUrl}
                href={songUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ir a spotify"
              >
                <article>
                  <img
                    src={cover}
                    alt="album cover"
                    width="64"
                    height="64"
                    loading="lazy"
                  />
                  <div>
                    <strong>
                      <p>{title}</p>
                    </strong>
                    <p>{artist}</p>
                  </div>
                </article>
              </a>
            ))}
          </>
        )}
      </aside>
      <style global jsx>{`
        main > div > svg {
          display: block;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 50px;
        }
        main > div > svg:hover {
          animation: rotate-center 250ms ease-in-out 2 alternate both;
        }
        @keyframes rotate-center {
          0% {
            transform: rotate(0);
          }
          50% {
            transform: rotate(-15deg);
          }
          100% {
            transform: rotate(15deg);
          }
        }
        main > div > svg:nth-of-type(5) {
          margin-bottom: 90px;
        }
        @media screen and (min-width: 1024px) and (max-width: 1050px) {
          main > div > svg {
            margin-bottom: 70px;
          }
          main > div > svg:nth-of-type(5) {
            margin-bottom: 230px;
          }
        }
        @media screen and (min-width: 1050px) and (max-width: 1120px) {
          main > div > svg {
            margin-bottom: 70px;
          }
          main > div > svg:nth-of-type(5) {
            margin-bottom: 140px;
          }
        }
        @media screen and (min-width: 1120px) and (max-width: 1220px) {
          main > div > svg {
            margin-bottom: 60px;
          }
          main > div > svg:nth-of-type(5) {
            margin-bottom: 110px;
          }
        }
        @media screen and (min-width: 1220px) and (max-width: 1280px) {
          main > div > svg {
            margin-bottom: 60px;
          }
          main > div > svg:nth-of-type(5) {
            margin-bottom: 90px;
          }
        }
        @media screen and (min-width: 0px) and (max-width: 1024px) {
          main > div > svg {
            display: inline-flex !important;
            margin-bottom: 0 !important;
            margin-left: 5px !important;
            flex-wrap: wrap !important;
          }
          main > div {
            order: 3;
            margin: 0 auto;
            text-align: center;
          }
          main > section {
            order: 1;
          }
          main > aside {
            order: 2;
          }
        }
      `}</style>
      <style jsx>{`
        main > div {
          padding-top: 75px;
        }
        button {
          border: none;
          background: unset;
          cursor: pointer;
          padding: 0;
          display: inline-flex;
          vertical-align: bottom;
        }
        div > img {
          display: block;
          margin: 30px auto 0 auto;
        }
        section p a {
          display: inline;
          color: #da0000;
        }
        section p a:hover {
          text-decoration: underline;
          color: #e74d3ce3;
        }
        section a:hover {
          text-decoration: underline;
        }
        h3 {
          margin: 0px;
        }
        a {
          display: table;
        }
        header {
          display: flex;
          margin-top: 69px;
          margin-bottom: 16px;
          justify-content: space-between;
          align-items: center;
        }
        aside div header a {
          display: inline-flex;
          box-sizing: border-box;
        }
        div p {
          margin: 0;
        }
        aside a {
          display: block;
        }
        article {
          display: flex;
          border-radius: 3px;
          border: 1px solid #ccc;
          margin-bottom: 10px;
          padding: 5px;
          align-items: center;
        }
        article div h4,
        article div p {
          margin: 0;
        }
        article img {
          margin-right: 5px;
        }
        article:hover {
          box-shadow: 0px 0px 4px 0px rgba(84, 84, 84, 0.15);
        }
        aside {
          padding: 0 5px;
          box-sizing: border-box;
        }
        h1 {
          font-size: 2em;
          text-align: center;
          margin-top: 0;
        }
        section p {
          text-align: justify;
        }
        div > p {
          line-break: anywhere;
        }
        main {
          display: grid;
          grid-template-columns: 240px minmax(0px, 710px) 240px;
          grid-gap: 2em;
          justify-content: center;
          padding: 0 20px;
          margin-bottom: 50px;
        }
        @media screen and (min-width: 0px) and (max-width: 876px) {
          main {
            grid-template-columns: auto;
          }
        }
        @media screen and (min-width: 876px) and (max-width: 1024px) {
          main {
            grid-template-columns: auto 240px;
          }
        }
      `}</style>
    </main>
  );
};

export async function getServerSideProps() {
  const playing = await fetch("https://marcomadera.com/api/now-playing").then(
    (res) => {
      if (res.status !== 200) return;
      return res.json();
    }
  );
  const tracks = await fetch("https://marcomadera.com/api/top-tracks").then(
    (res) => {
      if (res.status !== 200) return;
      return res.json();
    }
  );
  const played = await fetch(
    "https://marcomadera.com/api/recently-played"
  ).then((res) => {
    if (res.status !== 200) return;
    return res.json();
  });
  return {
    props: { ...playing, tracks, played },
  };
}

About.propTypes = {
  response: PropTypes.object,
  tracks: PropTypes.object,
  played: PropTypes.object,
};

export default About;
