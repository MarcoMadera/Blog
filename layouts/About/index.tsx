import { Email } from "components/icons";
import TrackList from "./TrackList";
import { aboutStyles } from "./aboutStyles";
import Seo from "components/Seo";
import { A, ALink, H1, H2, P } from "components/tags";
import type { NowPlaying, SongData } from "types/spotify";
import { IChessData, ITVShowData, ReadingLog } from "types/about";
import { ReactElement, memo } from "react";
import useToolTip from "hooks/useToolTip";
import useAnalytics from "hooks/useAnalytics";
import { HitType } from "types/analytics";
import FlexUlList from "components/FlexUlList";
import { TvShow } from "./TvShow";
import Bullet from "components/icons/Bullet";
import ChessPerfCard from "components/ChessPerfCard";
import Flame from "components/icons/Flame";
import RapidChess from "components/icons/RapidChess";
import HyperBullet from "components/icons/HyperBullet";
import ClassicChess from "components/icons/ClassicChess";
import { ThingILike } from "./ThingILike";
import useDarkMode from "hooks/useDarkMode";
import { colors } from "styles/theme";
import { CurrentlyReading } from "./CurrentlyReading";

interface AboutLayoutProps {
  newNowPlaying: NowPlaying | null;
  topTracks: SongData[] | null;
  tvShows: ITVShowData[] | null;
  chess: IChessData | null;
  currentlyReading: ReadingLog | null;
}

const AboutLayout = ({
  newNowPlaying,
  topTracks,
  tvShows,
  chess,
  currentlyReading,
}: AboutLayoutProps): ReactElement => {
  const { getToolTipAttributes } = useToolTip();
  const { trackWithGoogleAnalytics } = useAnalytics();
  const { darkMode } = useDarkMode();

  function getLichessGameData(
    url?: string
  ): { id: string; playingAs: string } | null {
    if (!url) return null;
    return {
      id: url.split("/")[3],
      playingAs: url.split("/")[4],
    };
  }
  const chessBoardData = getLichessGameData(chess?.playing);

  return (
    <main id="main">
      <Seo title="Sobre mí | Marco Madera" />
      <div>
        <H1>Sobre mí</H1>
        <P>
          ¡Hola! Mi nombre es <span translate="no">Marco Madera</span> tengo 25
          años, y soy desarrollador trabajando en{" "}
          <A
            href="https://www.tcs.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TCS
          </A>{" "}
          y{" "}
          <A href="http://tr.com/" target="_blank" rel="noopener noreferrer">
            Thomson Reuters
          </A>
          . Cuando no estoy trabajando, me gusta moverle a algunos proyectos
          personales, como este blog.{" "}
        </P>
        <P>
          Estoy en constante proceso de aprendizaje sobre las nuevas tecnologías
          y me gusta estar informado de lo que pasa en la web, ver cursos, leer
          artículos y tutoriales. Trataré de compartir mis conocimientos en la
          sección de blog, misma que trataré como libreta personal para futuro
          con temas relacionados con la programación.
        </P>
        <H2>¿Cómo empecé a programar?</H2>
        <P>
          Es algo que vengo haciendo desde preparatoria, cuando descubrí que se
          podían hacer aplicaciones para Android, me eché un clavado en el mundo
          de Java sin saber ni siquiera de control de versiones ni de git. Logré
          hacer algunas aplicaciones básicas y aún sin estar satisfecho con los
          resultados decidí dar el siguiente paso.
        </P>
        <P>
          Por el 2013 empezaba a resonar sobre la realidad aumentada, lo que
          veía lo quería intentar así que me pasé a C#, con el cual quería hacer
          una cantidad de videojuegos, pero nunca tuve el conocimiento para
          hacer algo estable por todo el trabajo que conlleva y porque no sé
          nada de videojuegos; no los juego.
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
          <P>
            La música es mi mejor acompañante para cualquier situación,
            especialmente a la hora de escribir, simplemente hace la vida más
            agradable. Me gusta de todo tipo y aunque no me considero de buen
            gusto me gusta compartirla.
          </P>
          {newNowPlaying && topTracks ? (
            <TrackList newNowPlaying={newNowPlaying} topTracks={topTracks} />
          ) : null}
        </ThingILike>
        <ThingILike
          href="https://lichess.org/@/MarcoMadera"
          label="Página de Lichess.org"
          title="Ajedrez"
        >
          <P>
            Siempre que estoy estancado en algo, juego un poco de ajedrez bala,
            como mi método para tomar un descanso y despejarme un poco.
          </P>
          {!!chess?.perfs && (
            <FlexUlList>
              <ChessPerfCard
                icon={
                  <Bullet fill={darkMode ? colors.carbonGrey : colors.steel} />
                }
                title="BULLET"
                perf={chess.perfs.bullet}
                url={`${chess.url}/perf/bullet`}
              />
              <ChessPerfCard
                icon={
                  <HyperBullet
                    fill={darkMode ? colors.carbonGrey : colors.steel}
                  />
                }
                title="ULTRABULLET"
                perf={chess.perfs.ultraBullet}
                url={`${chess.url}/perf/ultraBullet`}
              />
              <ChessPerfCard
                icon={
                  <Flame fill={darkMode ? colors.carbonGrey : colors.steel} />
                }
                title="BLITZ"
                perf={chess.perfs.blitz}
                url={`${chess.url}/perf/blitz`}
              />
              <ChessPerfCard
                icon={
                  <RapidChess
                    fill={darkMode ? colors.carbonGrey : colors.steel}
                  />
                }
                title="RAPID"
                perf={chess.perfs.rapid}
                url={`${chess.url}/perf/rapid`}
              />
              <ChessPerfCard
                icon={
                  <ClassicChess
                    fill={darkMode ? colors.carbonGrey : colors.steel}
                  />
                }
                title="CLASSICAL"
                perf={chess.perfs.classical}
                url={`${chess.url}/perf/classical`}
              />
            </FlexUlList>
          )}
          {chess?.playing ? (
            <div>
              <P>
                Ahora mismo estoy jugando{" "}
                <A
                  href={chess?.playing}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  esta partida
                </A>
                :
              </P>
              <div className="chessBoard">
                <A
                  href={chess?.playing}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://lichess1.org/game/export/gif/${chessBoardData?.playingAs}/${chessBoardData?.id}.gif?theme=brown&piece=merida`}
                    alt="Chess board"
                    width={300}
                    height={350}
                  />
                </A>
              </div>
            </div>
          ) : null}
        </ThingILike>
        <ThingILike
          href="https://openlibrary.org/people/marcomadera"
          label="Página de OpenLibrary"
          title="Leer"
        >
          <P>
            Procuro dejar tiempo para leer artículos, blogs, hilos de Twitter y
            novelas, contenido de la web interesante, que pueda compartir en el{" "}
            <ALink href="/newsletter" title="Newsletter">
              Newsletter
            </ALink>
          </P>
          {currentlyReading ? (
            <CurrentlyReading entries={currentlyReading.reading_log_entries} />
          ) : null}
        </ThingILike>
        <ThingILike
          href="https://trakt.tv/users/marcomadera/progress"
          label="Página de TrackTV"
          title="Ver series"
        >
          <P>
            Es de esas cosas que dejo un tiempo y continúo por temporadas, me
            gustan las series de drama y no puedo con las de ficción ni
            superhéroes.
          </P>
          {!!tvShows && tvShows.length > 0 && (
            <>
              <h4>Series que estoy viendo</h4>
              <FlexUlList>
                {tvShows.map((tvShowData) => (
                  <TvShow
                    key={tvShowData.show.ids.trakt}
                    tvShowData={tvShowData}
                  />
                ))}
              </FlexUlList>
            </>
          )}
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
            className="email-button"
            onClick={(e) => {
              trackWithGoogleAnalytics(HitType.SOCIAL, {
                socialNetwork: "email",
                socialAction: "click",
                socialTarget: "mailto:me@marcomadera.com",
              });
              window.open(
                "mailto:me@marcomadera.com",
                "width=600,height=500,scrollbars=no,resizable=no"
              );
              e.stopPropagation();
            }}
            {...getToolTipAttributes("Enviar correo electrónico")}
          >
            <Email width="20" height="20" />
          </button>
        </P>
        <P>
          <A
            href="https://keybase.io/marcomadera"
            target="_blank"
            rel="noopener noreferrer"
          >
            keybase
          </A>
        </P>
        <P>
          <A
            href="https://keyoxide.org/1a61f15d4be29ae7d6d3195e66b0e22e61565130"
            target="_blank"
            rel="noopener noreferrer"
          >
            keyoxide
          </A>
        </P>
        <P>
          <A
            href="https://keys.openpgp.org/vks/v1/by-fingerprint/1A61F15D4BE29AE7D6D3195E66B0E22E61565130"
            target="_blank"
            rel="noopener noreferrer"
          >
            GPG 0x66B0E22E61565130
          </A>
        </P>
        <video
          autoPlay
          loop
          muted
          playsInline
          {...getToolTipAttributes("Perfecto")}
        >
          <source
            src="https://res.cloudinary.com/marcomadera/video/upload/about/18283-212312-32345_cptpwx.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <style jsx>{aboutStyles}</style>
    </main>
  );
};

export default memo(AboutLayout, (prevProps, nextProps) => {
  if (nextProps.newNowPlaying && nextProps.topTracks) {
    if (
      prevProps.newNowPlaying !== nextProps.newNowPlaying ||
      prevProps.topTracks !== nextProps.topTracks
    ) {
      return false;
    }
    return true;
  }
  return true;
});
