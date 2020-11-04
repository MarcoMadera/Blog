import { useState } from "react";
import { colors } from "../styles/theme";
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

  let outline = { outline: "unset" };
  if (email.error && email.submitted) {
    outline = { border: "1px solid red" };
  }

  return (
    <form
      action="https://buttondown.email/api/emails/embed-subscribe/MarcoMadera"
      method="post"
      target="_blank"
      onSubmit={handleSubmit}
      noValidate
    >
      <label htmlFor="bd-email">¡Suscríbete al Newsletter!</label>
      <p>Recibirás actualizaciones del blog con temas de programación</p>
      <input
        type="email"
        name="email"
        id="bd-email"
        placeholder="Correo electrónico*"
        onChange={handleChange}
        style={outline}
      ></input>
      <button className="btn btn-primary">Suscríbete</button>
      {(email.error || email.value === "") && email.submitted ? (
        <p>Por favor inserta un correo válido</p>
      ) : (
        !email.error &&
        email.submitted && <p>Recibirás un correo de confirmación</p>
      )}
      <style jsx>{`
        form {
          position: sticky;
          top: 10px;
          margin-top: 40px;
          width: 100%;
          height: fit-content;
          border: 3px solid ${colors.primary};
          border-radius: 4px;
          padding: 20px;
          text-align: center;
          margin-bottom: 50px;
          background: ${colors.white};
        }

        label {
          font-size: 18px;
          font-weight: 600;
          margin: 30px 0;
        }

        p {
          font-size: 15px;
          text-align: center;
        }

        input {
          border-radius: 4px;
          outline: none;
          border: 1px solid ${colors.gray};
          padding: 6px 8px;
          width: 100%;
          margin-bottom: 30px;
        }
        button {
          width: 100%;
        }
        input:focus {
          border: 1px solid ${colors.secondary};
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
export default Newsletter;
