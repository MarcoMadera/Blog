import Seo from "../../components/Seo";
import { useState } from "react";
import { colors } from "../../styles/theme";
import { H1, Input, A } from "../../components/tags";
import useDarkMode from "../../hooks/useDarkMode";
import ActionButton from "../../components/ActionButton";
const NewsletterPage = () => {
  const { darkMode } = useDarkMode();
  const [email, setEmail] = useState({
    value: "",
    error: false,
    submitted: false,
  });

  const handleChange = (event) => {
    const res = event.target.value;
    setEmail({
      value: res,
      error: !emailRegex.test(res),
      submitted: false,
    });
  };

  const handleSubmit = (event) => {
    setEmail({
      ...email,
      submitted: true,
    });
    if (email.error === true || email.value === "") {
      event.preventDefault();
    }
  };

  const emailRegex = RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  let outline = { outline: "unset" };
  if (email.error && email.submitted) {
    outline = { border: "1px solid red" };
  }
  return (
    <main id="main">
      <Seo title="Newsletter 📬 | Marco Madera" />
      <div>
        <label htmlFor="bd-email">
          <H1>Newsletter</H1>
        </label>
        <p>
          <strong>Quiero saber tu opinión,</strong> cuando recibas los artículos
          puedes responder directamente al correo electrónico o dejar un
          comentario en el enlace del artículo, quiero saber si te ha gustado,
          lo has odiado o si te ha sido indiferente.
        </p>
        <p>
          Uso el servicio de{" "}
          <A
            href="https://buttondown.email"
            target="_blank"
            rel="noopener noreferrer"
          >
            ButtonDown
          </A>{" "}
          para enviarte los artículos más recientes, no usaré tu correo
          electrónico para otro objetivo, no te enviaré nada de spam.
        </p>
        <form
          action="https://buttondown.email/api/emails/embed-subscribe/MarcoMadera"
          method="post"
          target="_blank"
          onSubmit={handleSubmit}
          noValidate
        >
          <Input
            type="email"
            name="email"
            id="bd-email"
            placeholder="Correo electrónico*"
            onChange={handleChange}
            style={outline}
          ></Input>
          <ActionButton>Suscríbete</ActionButton>
          {(email.error || email.value === "") && email.submitted ? (
            <p>Por favor inserta un correo válido</p>
          ) : (
            !email.error &&
            email.submitted && <p>Recibirás un correo de confirmación</p>
          )}
        </form>
      </div>
      <style jsx>{`
        div {
          text-align: center;
        }
        p {
          line-height: 1.6;
        }
        main :global(h1) {
          margin-bottom: 0.67em;
        }
        main :global(input) {
          margin: 0 auto 40px auto;
          width: 100%;
          display: block;
          border-radius: 4px;
          border: 1px solid ${colors.accents1};
          padding: 10px 15px;
        }
        main :global(input:focus) {
          border: 1px solid
            ${darkMode ? colors.dark_secondary : colors.secondary};
        }
        main :global(button) {
          width: 100%;
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
  );
};

export default NewsletterPage;
