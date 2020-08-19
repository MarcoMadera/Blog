import { useState } from "react";
import styles from "./styles/Newsletter.module.css";
const Newsletter = () => {
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
    <>
      <form
        action="https://buttondown.email/api/emails/embed-subscribe/MarcoMadera"
        method="post"
        target="popupwindow"
        onSubmit={handleSubmit}
        className={styles.form}
        noValidate
      >
        <label className={styles.label} htmlFor="bd-email">
          ¡Subscribete al Newsletter!
        </label>
        <p className={styles.paragraph}>
          Recibirás actualizaciones del blog con temas de programación
        </p>
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
    </>
  );
};
export default Newsletter;
