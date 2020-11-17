import Seo from "../../../components/Seo";

const suscription = () => {
  return (
    <>
      <main id="main">
        <Seo
          title="Suscripción exitosa! 🎉| Marco Madera"
          path="/newsletter/suscription"
        />
        <section>
          <h1>
            ¡Ya casi estás suscrito al Newsletter!{" "}
            <span role="img" aria-label="emoji de celebración">
              🎉
            </span>
          </h1>
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
          p {
            text-align: center;
          }

          section {
            text-align: center;
          }

          h1 {
            margin-top: 0;
            text-align: center;
          }
          main {
            margin: 0 30px;
          }
          @media screen and (min-width: 0px) and (max-width: 500px) {
            main {
              margin: 0 30px;
            }
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
