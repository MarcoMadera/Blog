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
import MusicCard from "../../components/MusicCard";
import { colors } from "../../styles/theme";
import { useEffect, useState, useCallback } from "react";
import { numberBetween } from "../../utils/helpers";

const MusicHeader = ({ header, title, cover, artist, songUrl }) => {
  return (
    <div>
      <header>
        <h2>{header}</h2>
        <a
          href="https://open.spotify.com/user/12133024755"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Perfil de spotify"
        >
          <Spotify width="26" height="26" fill={colors.spotify} />
        </a>
      </header>
      <MusicCard
        title={title}
        cover={cover}
        artist={artist}
        songUrl={songUrl}
      />
      <hr />
      <style jsx>{`
        a {
          display: inline-flex;
          box-sizing: border-box;
        }
        header {
          display: flex;
          margin-top: 69px;
          margin-bottom: 16px;
          justify-content: space-between;
          align-items: center;
        }
        h2 {
          margin: 0;
          font-size: 1em;
        }
      `}</style>
    </div>
  );
};

const ThingILike = ({ title, href, children }) => {
  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Página de last.fm"
      >
        <h3>{title}</h3>
      </a>
      <p>{children}</p>
      <style global jsx>{`
        div p a {
          display: inline;
          color: ${colors.primary};
        }
        section p a:hover,
        section p a:focus {
          text-decoration: underline;
          color: ${colors.secondary};
        }
        section a:hover,
        section a:focus {
          text-decoration: underline;
        }
      `}</style>
      <style jsx>{`
        p {
          line-height: 1.6;
          text-align: justify;
        }
        h3 {
          margin: 0px;
          display: inline;
        }
      `}</style>
    </>
  );
};

const About = ({ nowPlaying = {}, topTracks = [], recentlyPlayed = {} }) => {
  const [newNowPlaying, setNewNowPlaying] = useState(
    Object.keys(nowPlaying).length > 0 ? nowPlaying : recentlyPlayed
  );

  const reqNowPlaying = useCallback(async () => {
    const nowPlaying = await fetch(
      "https://marcomadera.com/api/now-playing"
    ).then((res) => {
      if (res.status !== 200) return;
      return res.json();
    });
    const recentlyPlayed = await fetch(
      "https://marcomadera.com/api/recently-played"
    ).then((res) => {
      if (res.status !== 200) return;
      return res.json();
    });
    setNewNowPlaying(
      Object.keys(nowPlaying).length > 0 ? nowPlaying : recentlyPlayed
    );
  }, []);
  useEffect(() => {
    const updateNowPlaying = setInterval(
      () => reqNowPlaying(),
      numberBetween(60000, 90000)
    );
    return () => clearInterval(updateNowPlaying);
  }, [reqNowPlaying]);
  return (
    <main>
      <Seo title="Sobre mí" path="/about" />
      <aside>
        <Code width="50" height="50" />
        <Java width="50" height="50" />
        <AugmentedReallity width="50" height="50" />
        <CSharp width="50" height="50" />
        <JavaScript width="50" height="50" />
        <Music width="50" height="50" />
        <Chess width="50" height="50" />
        <Book width="50" height="50" />
        <Film width="50" height="50" />
      </aside>
      <section id="main">
        <div>
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
          <h2>¿Cómo empecé a programar?</h2>
          <p>
            Es algo que vengo haciendo desde preparatoria, cuando descubrí que
            se podían hacer aplicaciones para android, me eché un clavado en el
            mundo de Java sin saber ni siquiera de control de versiones ni de
            git. Logré hacer algunas aplicaciones básicas y aún sin estar
            satisfecho con los resultados decidí dar el siguiente paso. En ese
            entonces por el 2013 empezaba a resonar sobre la realidad aumentada,
            lo que veía lo quería intentar así que me pasé a C#, con el cúal
            obviamente también quería hacer una cantidad de videojuegos, pero
            nunca tuve el conocimiento para hacer algo estable por todo el
            trabajo que conlleva y porque no sé nada de videojuegos; no los
            juego. Después de estas étapas me empecé a interesar en Python con
            el próposito de hacer proyectos sobre ciencia de datos y web
            scraping, pero también me interesaba JavaScript, Python fue algo que
            pasó muy rápido, no me gustó del todo la sintáxis quedando como
            ganador JavaScript.
          </p>
          <h2>Cosas que me gustan</h2>
          <ThingILike
            title="La música"
            href="https://www.last.fm/user/MarcoMadera"
            label="Página de last.fm"
          >
            La música es mi mejor acompañante para cualquier situación,
            especialmente a la hora de escribir, simplemente hace la vida más
            agradable. Me gusta de todo tipo y aunque no me considero de buen
            gusto me gusta compartirla.
          </ThingILike>
          <ThingILike
            title="Ajedrez bala"
            href="https://lichess.org/@/MarcoMadera"
            label="Página de Lichess.org"
          >
            Siempre que estoy estancado en algo, juego un poco de ajedrez bala,
            como mi método para tomar un descanso y despejarme un poco.
          </ThingILike>
          <ThingILike
            title="Leer"
            href="https://ciberninjas.com/biblioteca-de-programacion-y-tecnologia/#-desarrollo-web"
            label="Lecturas de programación"
          >
            Procuro dejar tiempo para leer artículos, blogs, hilos de twitter y
            novelas, contenido de la web interesante, que pueda compartir en el{" "}
            <Link href="/newsletter">
              <a>Newsletter</a>
            </Link>
          </ThingILike>
          <ThingILike
            title="Ver series"
            href="https://trakt.tv/users/marcomadera/progress"
            label="Página de TrackTV"
          >
            Es de esas cosas que dejo un tiempo y continúo por temporadas, me
            gustan las series de drama y no puedo con las de ficción ni super
            heroes.
          </ThingILike>
        </div>
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
          <video autoPlay loop muted playsInline>
            <source
              src="https://res.cloudinary.com/marcomadera/video/upload/v1602516508/about/18283-212312-32345_cptpwx.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </section>
      <aside>
        {Object.keys(newNowPlaying).length > 0 && (
          <MusicHeader
            header={
              newNowPlaying.listening ? "Escuchando ahora" : "Último escuchado"
            }
            title={newNowPlaying.title}
            cover={newNowPlaying.cover}
            artist={newNowPlaying.artist}
            songUrl={newNowPlaying.songUrl}
          />
        )}
        {topTracks.length > 0 && (
          <>
            <h2>Mi top 10 de canciones</h2>
            {topTracks.map(({ title, artist, songUrl, cover }) => (
              <MusicCard
                key={songUrl}
                title={title}
                cover={cover}
                artist={artist}
                songUrl={songUrl}
              />
            ))}
          </>
        )}
      </aside>
      <style global jsx>{`
        main > aside:nth-of-type(1) > svg {
          display: block;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 60px;
        }
        main > aside:nth-of-type(1) > svg:hover {
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
        main > aside:nth-of-type(1) > svg:nth-of-type(5) {
          margin-bottom: 120px;
        }
        @media screen and (min-width: 1024px) and (max-width: 1050px) {
          main > aside:nth-of-type(1) > svg {
            margin-bottom: 90px;
          }
          main > aside:nth-of-type(1) > svg:nth-of-type(5) {
            margin-bottom: 230px;
          }
        }
        @media screen and (min-width: 1050px) and (max-width: 1070px) {
          main > aside:nth-of-type(1) > svg {
            margin-bottom: 95px;
          }
          main > aside:nth-of-type(1) > svg:nth-of-type(5) {
            margin-bottom: 170px;
          }
        }
        @media screen and (min-width: 1070px) and (max-width: 1120px) {
          main > aside:nth-of-type(1) > svg {
            margin-bottom: 70px;
          }
          main > aside:nth-of-type(1) > svg:nth-of-type(5) {
            margin-bottom: 240px;
          }
        }
        @media screen and (min-width: 1120px) and (max-width: 1165px) {
          main > aside:nth-of-type(1) > svg {
            margin-bottom: 60px;
          }
          main > aside:nth-of-type(1) > svg:nth-of-type(5) {
            margin-bottom: 220px;
          }
        }
        @media screen and (min-width: 1165px) and (max-width: 1220px) {
          main > aside:nth-of-type(1) > svg {
            margin-bottom: 60px;
          }
          main > aside:nth-of-type(1) > svg:nth-of-type(5) {
            margin-bottom: 190px;
          }
        }
        @media screen and (min-width: 1220px) and (max-width: 1280px) {
          main > aside:nth-of-type(1) > svg {
            margin-bottom: 60px;
          }
          main > aside:nth-of-type(1) > svg:nth-of-type(5) {
            margin-bottom: 150px;
          }
        }
        @media print, screen and (min-width: 0px) and (max-width: 1024px) {
          main > aside:nth-of-type(1) > svg {
            display: inline-flex !important;
            margin-bottom: 0 !important;
            margin-left: 5px !important;
            flex-wrap: wrap !important;
          }
          main > aside:nth-of-type(1) {
            order: 3;
            margin: 0 auto;
            text-align: center;
          }
          main > section {
            order: 1;
          }
          main > aside:nth-of-type(2) {
            order: 2;
          }
        }
      `}</style>
      <style jsx>{`
        main > aside:nth-of-type(1) {
          padding-top: 75px;
        }
        p {
          text-align: justify;
          line-height: 1.6;
        }
        button {
          border: none;
          background: unset;
          cursor: pointer;
          padding: 0;
          display: inline-flex;
          vertical-align: bottom;
        }
        video {
          display: block;
          margin: 30px auto 0 auto;
        }
        aside:nth-of-type(2) {
          padding: 0 5px;
          box-sizing: border-box;
        }
        h1 {
          font-size: 2em;
          text-align: center;
          margin: 0 0 1em 0;
        }
        aside h2 {
          margin: 1em 0;
          font-size: 1em;
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
  let nowPlaying;
  let topTracks;
  let recentlyPlayed;
  Promise.all([
    (nowPlaying = await fetch("https://marcomadera.com/api/now-playing").then(
      (res) => {
        if (res.status !== 200) return;
        return res.json();
      }
    )),
    (topTracks = await fetch("https://marcomadera.com/api/top-tracks").then(
      (res) => {
        if (res.status !== 200) return;
        return res.json();
      }
    )),
    (recentlyPlayed = await fetch(
      "https://marcomadera.com/api/recently-played"
    ).then((res) => {
      if (res.status !== 200) return;
      return res.json();
    })),
  ]);
  return {
    props: { nowPlaying, topTracks, recentlyPlayed },
  };
}

About.propTypes = {
  nowPlaying: PropTypes.object,
  topTracks: PropTypes.array,
  recentlyPlayed: PropTypes.object,
};

MusicHeader.propTypes = {
  header: PropTypes.string,
  title: PropTypes.string,
  cover: PropTypes.string,
  artist: PropTypes.string,
  songUrl: PropTypes.string,
};

ThingILike.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default About;
