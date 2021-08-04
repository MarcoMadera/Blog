import {
  AugmentedReallity,
  Book,
  Chess,
  Code,
  CSharp,
  Email,
  Film,
  Java,
  JavaScript,
  Music,
} from "components/icons";
import TrackList from "./TrackList";
import { aboutStyles } from "./aboutStyles";
import Seo from "components/Seo";
import { A, ALink, H1, H2, H3, P } from "components/tags";
import { NowPlaying, SongData } from "types/spotify";
import { PropsWithChildren, ReactElement } from "react";

interface AboutLayoutProps {
  newNowPlaying: NowPlaying;
  topTracks: SongData[];
}

interface ThingILikeProps {
  title: string;
  href: string;
  label: string;
}

function ThingILike({
  children,
  href,
  title,
  label,
}: PropsWithChildren<ThingILikeProps>) {
  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        <H3>{title}</H3>
      </a>
      <P>{children}</P>
      <style jsx>{`
        a {
          color: inherit;
          text-decoration: none;
        }
        a:focus,
        a:hover {
          color: inherit;
          text-decoration: underline;
        }
        a :global(h3) {
          display: inline;
        }
        a ~ :global(p) {
          margin-top: 0.8em;
        }
      `}</style>
    </>
  );
}

export default function AboutLayout({
  newNowPlaying,
  topTracks,
}: AboutLayoutProps): ReactElement {
  return (
    <main>
      <Seo title="Sobre mí | Marco Madera" />
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
          <H1>Sobre mí</H1>
          <P>
            ¡Hola! Mi nombre es <span translate="no">Marco Madera</span> tengo
            24 años, soy programador web frontend por afición y entusiasta de
            las tecnologías web que cada día me gustan más: JavaScript, Node.js,
            React, etc.
          </P>
          <P>
            Estoy en constante proceso de aprendizaje sobre las nuevas
            tecnologías y me gusta estar informado de lo que pasa en la web, ver
            cursos, leer artículos y tutoriales. Trataré de compartir mis
            conocimientos en la sección de blog, misma que trataré como libreta
            personal para futuro con temas relacionados con la programación.
          </P>
          <H2>¿Cómo empecé a programar?</H2>
          <P>
            Es algo que vengo haciendo desde preparatoria, cuando descubrí que
            se podían hacer aplicaciones para Android, me eché un clavado en el
            mundo de Java sin saber ni siquiera de control de versiones ni de
            git. Logré hacer algunas aplicaciones básicas y aún sin estar
            satisfecho con los resultados decidí dar el siguiente paso.
          </P>
          <P>
            Por el 2013 empezaba a resonar sobre la realidad aumentada, lo que
            veía lo quería intentar así que me pasé a C#, con el cual quería
            hacer una cantidad de videojuegos, pero nunca tuve el conocimiento
            para hacer algo estable por todo el trabajo que conlleva y porque no
            sé nada de videojuegos; no los juego.
          </P>
          <P>
            Después me empecé a interesar en Python con el propósito de hacer
            proyectos sobre ciencia de datos y web scraping, pero también me
            interesaba JavaScript, Python fue algo que pasó muy rápido, no me
            gustó del todo la sintaxis quedando como ganador JavaScript.
          </P>
          <H2>Cosas que me gustan</H2>
          <br></br>
          <ThingILike
            href="https://www.last.fm/user/MarcoMadera"
            label="Página de last.fm"
            title="La música"
          >
            La música es mi mejor acompañante para cualquier situación,
            especialmente a la hora de escribir, simplemente hace la vida más
            agradable. Me gusta de todo tipo y aunque no me considero de buen
            gusto me gusta compartirla.
          </ThingILike>
          <ThingILike
            href="https://lichess.org/@/MarcoMadera"
            label="Página de Lichess.org"
            title="Ajedrez bala"
          >
            Siempre que estoy estancado en algo, juego un poco de ajedrez bala,
            como mi método para tomar un descanso y despejarme un poco.
          </ThingILike>
          <ThingILike
            href="https://ciberninjas.com/biblioteca-de-programacion-y-tecnologia/#-desarrollo-web"
            label="Lecturas de programación"
            title="Leer"
          >
            Procuro dejar tiempo para leer artículos, blogs, hilos de Twitter y
            novelas, contenido de la web interesante, que pueda compartir en el{" "}
            <ALink href="/newsletter" title="Newsletter">
              Newsletter
            </ALink>
          </ThingILike>
          <ThingILike
            href="https://trakt.tv/users/marcomadera/progress"
            label="Página de TrackTV"
            title="Ver series"
          >
            Es de esas cosas que dejo un tiempo y continúo por temporadas, me
            gustan las series de drama y no puedo con las de ficción ni
            superhéroes.
          </ThingILike>
        </div>
        <div>
          <H2>¿Quieres contactar conmigo?</H2>
          <P>
            Puedes mandarme un mensaje por{" "}
            <A
              aria-label="Página de Twitter"
              href="https://twitter.com/madera_marco"
              rel="noopener noreferrer"
              target="_blank"
              title="Visita mi Twitter"
            >
              Twitter
            </A>
            , o mándame un correo dando clic al icono{" "}
            <button
              onClick={() => {
                window.open(
                  "mailto:me@marcomadera.com",
                  "width=600,height=500,scrollbars=no,resizable=no"
                );
                return false;
              }}
              title="Enviar correo electrónico"
            >
              <Email width="20" height="20" />
            </button>
          </P>
          <video autoPlay loop muted playsInline>
            <source
              src="https://res.cloudinary.com/marcomadera/video/upload/v1602516508/about/18283-212312-32345_cptpwx.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </section>
      <aside>
        <TrackList newNowPlaying={newNowPlaying} topTracks={topTracks} />
      </aside>
      <style jsx>{aboutStyles}</style>
    </main>
  );
}
