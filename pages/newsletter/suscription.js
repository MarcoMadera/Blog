import Seo from "../../components/Seo";
import { H1 } from "../../components/tags";

const suscription = () => {
  return (
    <>
      <main id="main">
        <Seo title="Suscripción exitosa! 🎉| Marco Madera" />
        <section>
          <H1>
            ¡Ya casi estás suscrito al Newsletter!{" "}
            <span role="img" aria-label="emoji de celebración">
              🎉
            </span>
          </H1>
          <p>
            Te envié un correo de confirmación, da clic en él y completarás el
            proceso.
          </p>
          <video
            loop
            autoPlay
            playsInline
            muted
            src="https://res.cloudinary.com/marcomadera/video/upload/v1602532672/Newsletter/312o32-3123192-434923432_pv6toa.mp4"
            title="Aplausos"
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
            min-height: calc(100vh - 160px);
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

export default suscription;
