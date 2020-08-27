import Seo from "../../components/Seo";
import PropTypes from "prop-types";
const About = ({ response = {}, tracks = {}, played = {} }) => {
  return (
    <main>
      <Seo title="Sobre mí" url="https://marcomadera.com/about" />
      <div></div>
      <section>
        <h1>Sobre mí</h1>
        <p>
          ¡Hola! Mi nombre es Marco Madera tengo 23 años, actualmente soy
          auxiliar administrativo en la secretaria de relaciones exteriores,
          programador web frontend por afición y entusiasta de las tecnología
          web que cada día me apasionan más: JavaScript, Node.js, React, etc...
          Estoy en constante proceso de aprendizaje sobre las nuevas tecnologías
          y me gusta estar informado de lo que pasa en la web, ver cursos, leer
          artículos y tutoriales. Trataré de compartir mis conocimientos en la
          sección de blog, misma que trataré como libreta personal para futuro
          con temas relacionados a la programación.
        </p>
      </section>
      <aside>
        {Object.keys(response).length > 0 ? (
          <div>
            <strong>
              <p>
                {response.is_playing ? "Escuchando ahora" : "Último escuchado"}
              </p>
            </strong>
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
                  <h4>{response.item.name}</h4>
                  <p>{response.item.album.artists[0].name}</p>
                </div>
              </article>
            </a>
            <hr />
          </div>
        ) : (
          Object.keys(played).length > 0 && (
            <div>
              <strong>
                <p>Reciente Escuchado</p>
              </strong>
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
                    <h4>{played.response.items[0].track.name}</h4>
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
                    <h4>{title}</h4>
                    <p>{artist}</p>
                  </div>
                </article>
              </a>
            ))}
          </>
        )}
      </aside>
      <style jsx>{`
        div p {
          margin-top: 69px;
        }
        a {
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
        p {
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
