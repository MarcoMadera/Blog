import Seo from "../../../components/Seo";

const suscription = () => {
  return (
    <>
      <main>
        <Seo
          title="Suscripción exitosa!"
          url="https://marcomadera.com/newsletter/suscription"
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
          <img
            src="https://res.cloudinary.com/marcomadera/image/upload/v1599619814/Newsletter/bec38a05d56ac6ae2d9dec2f482ebff9_sregtv.gif"
            alt="Aplausos"
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
