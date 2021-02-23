import Seo from "../../components/Seo";
import { H1 } from "../../components/tags";

const unsuscription = () => {
  return (
    <>
      <main id="main">
        <Seo title="Te has desuscrito 😢 | Marco Madera" />
        <section>
          <H1>
            ¡Te has desuscrito del Newsletter!{" "}
            <span role="img" aria-label="emoji cara triste">
              😢
            </span>
          </H1>
          <p>Ya no recibirás más emails por mi parte, gracias por leer.</p>
          <video
            loop
            autoPlay
            playsInline
            muted
            src="https://res.cloudinary.com/marcomadera/video/upload/v1602532720/Newsletter/12912-323943-434566767_ashg4k.mp4"
            title="Adios vaquero"
          />
        </section>
        <style jsx>{`
          section {
            text-align: center;
          }
          main :global(h1) {
            margin-bottom: 0.67em;
          }
          main {
            margin: 0 30px;
            min-height: calc(100vh - 257px);
          }
          @media screen and (min-width: 500px) {
            main {
              padding: 0 30px;
              margin: 0 auto;
              max-width: 820px;
            }
          }
        `}</style>
      </main>
    </>
  );
};

export default unsuscription;
