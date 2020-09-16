import Seo from "../../components/Seo";
import { useState } from "react";
import { colors } from "../../styles/theme";
const NewsletterPage = () => {
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
    if (email.error === true) {
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
      <Seo title="Newsletter" url="https://marcomadera.com/newsletter" />
      <div>
        <label htmlFor="bd-email">
          <h1>Newsletter</h1>
        </label>

        <p>
          <strong>Quiero saber tu opinión,</strong> cuando recibas los artículos
          puedes responder directamente al correo electrónico o dejar un
          comentario en el enlace del artículo, quiero saber si te ha gustado,
          lo has odiado o si te ha sido indiferente.
        </p>
        <p>
          Uso el servicio de{" "}
          <a
            href="https://buttondown.email"
            target="_blank"
            rel="noopener noreferrer"
          >
            ButtonDown
          </a>{" "}
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
          <input
            type="email"
            name="email"
            id="bd-email"
            placeholder="Correo electrónico*"
            onChange={handleChange}
            style={outline}
          ></input>
          <input type="hidden" value="1" name="embed"></input>
          <button className="btn btn-primary">Suscríbete</button>
          {email.error && email.submitted && (
            <p>Por favor inserta un correo válido</p>
          )}
          {!email.error && email.submitted && (
            <p>Recibirás un correo de confirmación</p>
          )}
        </form>
      </div>
      <style jsx>{`
        p {
          text-align: center;
          line-height: 1.6;
        }

        div {
          text-align: center;
        }

        h1 {
          text-align: center;
        }
        a {
          color: ${colors.primary};
        }
        a:hover {
          text-decoration: underline;
          color: ${colors.secondary};
        }

        input {
          margin: 0 auto 40px auto;
          width: 100%;
          display: block;
          border-radius: 4px;
          border: 1px solid ${colors.gray};
          padding: 10px 15px;
        }
        input:focus {
          border: 1px solid transparent;
          box-shadow: 1px 0 6px 2px ${colors.secondary};
        }
        button {
          width: 100%;
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
  );
};

export default NewsletterPage;
