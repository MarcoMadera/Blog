import styles from "./Newsletter.module.css";
import Seo from "../../components/Seo";
import { useState } from "react";
const NewsletterPage = () => {
  const [email, setEmail] = useState({
    value: "",
    error: false,
    submitted: false,
  });

  const handleChange = (event) => {
    const res = event.target.value;
    setEmail({ value: res, error: false, submitted: false });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmail({
      error: !emailRegex.test(email.value),
      submitted: true,
    });
  };

  const emailRegex = RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  let outline = { outline: "unset" };
  if (email.error && email.submitted) {
    outline = { border: "1px solid red" };
  }
  return (
    <main className={styles.container}>
      <Seo title="Newsletter" url="https://marcomadera.com/newsletter" />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Newsletter</h1>
        <p>
          <strong>Quiero saber tu opinión,</strong> cuando recibas los artículos
          puedes responder directamente al email o dejar un comentario en el
          enlace del artículo, quiero saber si te ha gustado, lo has odiado o si
          te ha sido indiferente.
        </p>
        <p>
          Uso el servicio de{" "}
          <a
            href="https://buttondown.email"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            ButtonDown
          </a>{" "}
          para enviarte los artículos más recientes, no usaré tu email para otro
          objetivo, no te enviaré nada de spam.
        </p>
        <form
          action="https://buttondown.email/api/emails/embed-subscribe/MarcoMadera"
          method="post"
          target="popupwindow"
          onSubmit={handleSubmit}
          className={styles.form}
          noValidate
        >
          <input
            type="email"
            name="email"
            id="bd-email"
            placeholder="Correo electrónico*"
            onChange={handleChange}
            style={outline}
            className={styles.input}
          ></input>
          <input type="hidden" value="1" name="embed"></input>
          <input
            type="submit"
            className="btn btn-primary"
            value="Subscribete"
          ></input>
          {email.error && email.submitted && (
            <p>Por favor inserta un correo válido</p>
          )}
          {!email.error && email.submitted && (
            <p>Recibirás un correo de confirmación</p>
          )}
        </form>
      </div>
    </main>
  );
};

export default NewsletterPage;
