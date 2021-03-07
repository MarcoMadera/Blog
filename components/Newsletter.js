import ActionButton from "./ActionButton";
import { colors } from "../styles/theme";
import { Input } from "./tags";
import PropTypes from "prop-types";
import { useState } from "react";
import useDarkMode from "../hooks/useDarkMode";

function Label({ children }) {
  return <label htmlFor="bd-email">{children}</label>;
}

function P({ children }) {
  return <p>{children}</p>;
}

function Newsletter() {
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

  const { darkMode } = useDarkMode();
  return (
    <form
      action="https://buttondown.email/api/emails/embed-subscribe/MarcoMadera"
      method="post"
      target="_blank"
      onSubmit={handleSubmit}
      noValidate
    >
      <Label>¡Suscríbete al Newsletter!</Label>
      <P>Recibirás actualizaciones del blog con temas de programación</P>
      <Input
        type="email"
        name="email"
        id="bd-email"
        placeholder="Correo electrónico*"
        onChange={handleChange}
      />
      <ActionButton>Suscríbete</ActionButton>
      {(email.error || email.value === "") && email.submitted ? (
        <P>Por favor inserta un correo válido</P>
      ) : (
        !email.error &&
        email.submitted && <P>Recibirás un correo de confirmación</P>
      )}
      <style jsx>{`
        form {
          border: 3px solid ${darkMode ? colors.dark_primary : colors.primary};
          border-radius: 4px;
          height: fit-content;
          margin-bottom: 50px;
          margin-top: 40px;
          padding: 20px;
          position: sticky;
          text-align: center;
          top: 10px;
          width: 100%;
        }
        form :global(label) {
          font-size: 18px;
          font-weight: 600;
          margin: 30px 0;
        }
        form :global(p) {
          font-size: 15px;
          text-align: center;
          margin: 1em 0;
        }
        form :global(input) {
          border: 1px solid
            ${email.error && email.submitted
              ? "red"
              : darkMode
              ? "#cccccc4d"
              : "#ccc"};
          margin-bottom: 30px;
          outline: unset;
          padding: 6px 8px;
          width: 100%;
        }
        form :global(button) {
          width: 100%;
        }
        form :global(input:focus) {
          border: 1px solid
            ${darkMode ? colors.dark_secondary : colors.secondary};
        }
        form :global(input:hover) {
          border: 1px solid ${darkMode ? "#ffffff4d" : "#7b7b7b"};
        }
        @media print {
          form {
            display: none;
          }
        }
      `}</style>
    </form>
  );
}

Label.propTypes = {
  children: PropTypes.node,
};
P.propTypes = {
  children: PropTypes.node,
};

export default Newsletter;
