import Seo from "components/Seo";
import { H1, Video } from "components/tags";
import { ReactElement } from "react";

export default function Unsubscription(): ReactElement {
  return (
    <main id="main">
      <Seo title="Te has desuscrito 😢 | Marco Madera" />
      <section>
        <H1>
          ¡Te has desuscrito del Newsletter!{" "}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            draggable="false"
            className="twemoji"
            alt="😢"
            src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f622.png"
            width="35"
            height="35"
          />
        </H1>
        <p>Ya no recibirás más emails por mi parte, gracias por leer.</p>
        <Video
          loop
          autoPlay
          playsInline
          muted
          src="https://res.cloudinary.com/marcomadera/video/upload/Newsletter/12912-323943-434566767_ashg4k.mp4"
          title="Adios vaquero"
        />
      </section>
      <style jsx>{`
        section {
          text-align: center;
        }
        main :global(.twemoji) {
          height: 1.1em;
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
  );
}
