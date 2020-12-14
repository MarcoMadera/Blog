import { useState } from "react";
import { colors } from "../styles/theme";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "./Layout";
import ActionButton from "./ActionButton";
import { Input } from "./tags";
const Label = ({ children }) => <label htmlFor="bd-email">{children}</label>;
const P = ({ children }) => <p>{children}</p>;
const Newsletter = () => {
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

  const { darkMode } = useContext(ThemeContext);
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
          position: sticky;
          top: 10px;
          margin-top: 40px;
          width: 100%;
          height: fit-content;
          border: 3px solid ${darkMode ? colors.dark_primary : colors.primary};
          border-radius: 4px;
          padding: 20px;
          text-align: center;
          margin-bottom: 50px;
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
          outline: unset;
          border: 1px solid
            ${email.error && email.submitted ? "red" : colors.accents1};
          padding: 6px 8px;
          width: 100%;
          margin-bottom: 30px;
        }
        form :global(button) {
          width: 100%;
        }
        form :global(input:focus) {
          border: 1px solid
            ${darkMode ? colors.dark_secondary : colors.secondary};
        }
        @media print {
          form {
            display: none;
          }
        }
      `}</style>
    </form>
  );
};

Label.propTypes = {
  children: PropTypes.node,
};
P.propTypes = {
  children: PropTypes.node,
};

export default Newsletter;
