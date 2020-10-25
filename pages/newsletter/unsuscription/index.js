import Seo from "../../../components/Seo";

const unsuscription = () => {
  return (
    <>
      <main id="main">
        <Seo
          title="Te has desuscrito :("
          url="https://marcomadera.com/newsletter/unsuscription"
        />
        <section>
          <h1>
            ¡Te has desuscrito del Newsletter!{" "}
            <span role="img" aria-label="emoji cara triste">
              😢
            </span>
          </h1>
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

export default unsuscription;
