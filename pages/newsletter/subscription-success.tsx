import Seo from "components/Seo";
import { H1, Video } from "components/tags";
import { ReactElement } from "react";

export default function Subscription(): ReactElement {
  return (
    <>
      <main id="main">
        <Seo title="Suscripción exitosa! 🎉| Marco Madera" />
        <section>
          <H1>
            ¡Se ha confirmado tu suscripción al newsletter.!{" "}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              draggable="false"
              className="twemoji"
              alt="🎉"
              src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f389.png"
              width="35"
              height="35"
            />
          </H1>
          <p>¡Gracias por suscribirte!</p>
          <Video
            loop
            autoPlay
            playsInline
            muted
            src="https://res.cloudinary.com/marcomadera/video/upload/Newsletter/312o32-3123192-434923432_pv6toa.mp4"
            title="Aplausos"
          />
        </section>
        <style jsx>{`
          main :global(.twemoji) {
            height: 1.1em;
          }
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
}
