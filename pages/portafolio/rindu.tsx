import ActionButton from "components/ActionButton";
import { Ul, Li, H1, H2, Img, P, H3 } from "components/tags";
import Seo from "components/Seo";
import { ReactElement } from "react";
import useAnalytics from "hooks/useAnalytics";

export default function TestRandomNumbers(): ReactElement {
  useAnalytics("portafolio-rindu");

  return (
    <main id="main">
      <Seo title="Portafolio 💼 | Rindu" />
      <H1>Rindu</H1>
      <article className="first">
        <div>
          <H2>Rindu Limpia tus playlists</H2>
          <ActionButton type="anchor" href="https://rindu.marcomadera.com/">
            Ver en vivo
          </ActionButton>
          <ActionButton
            type="anchor"
            href="https://github.com/MarcoMadera/spotify-playlists-cleaner"
          >
            Código
          </ActionButton>
          <H3>En qué casos te ayuda Rindu:</H3>
          <Ul>
            <Li>
              Si tu playlist tiene tracks duplicados:
              <P>
                Ya sea si tienes un bot que añade tracks y te ha estado
                añadiendo repetidos, Rindu elimina esos tracks que están de más
                y deja solo uno.
              </P>
            </Li>
            <Li>
              Si tienes canciones invisibles:
              <P>
                El proceso de agregar canciones por cualquier método puede
                fallar, por lo que queda un espacio guardado sin datos. Esto lo
                identificas si el total de canciones de una playlist no
                concuerda con el último número de la lista. En Spotify versión
                web esto puede causar una duplicación visual de un track.
              </P>
            </Li>
          </Ul>
        </div>
      </article>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        src="https://res.cloudinary.com/marcomadera/video/upload/Potfolio/Rindu/Rindu_demo_jwtyvl.mp4"
        controls
      />
      <article>
        <div>
          <H2>Problema</H2>
          <P>
            Tengo playlists que actualizo constantemente, una en particular casi
            llega al límite que son 10 000, así que tenía que hacer algo al
            respecto. Al revisar la playlist me di cuenta que agregaba canciones
            duplicadas y que había canciones corruptas, datos nulos, que
            contaban como espacio en la playlist.
          </P>
        </div>
        <div>
          <Img
            src={
              "https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550,h_268/Potfolio/Rindu/open.spotify.com_playlist_6aXLDB6mvgUK8jthLNhMxt_2_tly0yt.png"
            }
            alt="Playlist casi llena"
            blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAFAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAgEAACAAYCAwAAAAAAAAAAAAABAgADBAUREgYxISJB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJtzyssdjn0CSbJN1ahkO4l1zJs5X2Y5U9k5wOonZv1Xk6khfg2PiEID/9k="
            fullImage={{
              img: {
                height: 510,
                width: 1018,
                src: "https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550,h_268/Potfolio/Rindu/open.spotify.com_playlist_6aXLDB6mvgUK8jthLNhMxt_2_tly0yt.png",
              },
              base64:
                "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAFAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAgEAACAAYCAwAAAAAAAAAAAAABAgADBAUREgYxISJB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJtzyssdjn0CSbJN1ahkO4l1zJs5X2Y5U9k5wOonZv1Xk6khfg2PiEID/9k=",
            }}
          />
        </div>
      </article>
      <article>
        <div>
          <H2>Solución</H2>
          <P>
            La solución es sencilla eliminar las canciones duplicadas pero para
            hacer más rápido el proceso entra Rindu. Con este limpiador, pude
            liberar 3 157 canciones duplicadas y nulas que no hubiera podido
            hacer tan rápido de otra forma.
          </P>
        </div>
        <div>
          <Img
            src={
              "https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550,h_268/Potfolio/Rindu/open.spotify.com_playlist_6aXLDB6mvgUK8jthLNhMxt_4_zz6gow.png"
            }
            alt="Playlist liberada"
            blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAFAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAgEAACAAYCAwAAAAAAAAAAAAABAgADBAUREgYxISJB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJtzyssdjn0CSbJN1ahkO4l1zJs5X2Y5U9k5wOonZv1Xk6khfg2PiEID/9k="
            fullImage={{
              img: {
                height: 510,
                width: 1018,
                src: "https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550,h_268/Potfolio/Rindu/open.spotify.com_playlist_6aXLDB6mvgUK8jthLNhMxt_4_zz6gow.png",
              },
              base64:
                "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAFAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAgEAACAAYCAwAAAAAAAAAAAAABAgADBAUREgYxISJB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJtzyssdjn0CSbJN1ahkO4l1zJs5X2Y5U9k5wOonZv1Xk6khfg2PiEID/9k=",
            }}
          />
        </div>
      </article>
      <style jsx>{`
        article {
          align-items: center;
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin-bottom: 40px;
        }
        main :global(h3) {
          margin-top: 10px;
        }
        video {
          width: 100%;
        }
        .first {
          grid-template-columns: 1fr;
          max-width: 800px;
        }
        main article:nth-child(2n + 3) div:nth-of-type(1) {
          order: 2;
        }
        @media print, screen and (max-width: 876px) {
          main article:nth-child(2n + 3) div:nth-of-type(1) {
            order: unset;
          }
        }
        article > div:nth-of-type(2) {
          padding: 40px;
        }
        div :global(a) {
          margin: 20px 20px 0 0;
        }
        div:nth-of-type(1) {
          padding: 40px;
        }
        main {
          margin: 0 auto;
          max-width: 1300px;
          min-height: calc(100vh - 257px);
          padding: 0 20px;
        }
        main :global(h1) {
          text-align: center;
        }
        @media print, screen and (max-width: 876px) {
          article {
            grid-template-columns: auto;
            margin-bottom: 20px;
            margin-top: 0px;
          }
          article > div:nth-of-type(1),
          article > div:nth-of-type(2) {
            padding: 0px;
          }
          article > div:nth-of-type(1) a {
            margin-bottom: 10px;
          }
        }
      `}</style>
    </main>
  );
}
