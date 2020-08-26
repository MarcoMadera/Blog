import { useState } from "react";
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
    <form
      action="https://buttondown.email/api/emails/embed-subscribe/MarcoMadera"
      method="post"
      target="popupwindow"
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
      <input type="hidden" value="1" name="embed"></input>
      <input
        type="submit"
        className="btn btn-primary"
        value="Suscríbete"
      ></input>
      {email.error && email.submitted && (
        <p>Por favor inserta un correo válido</p>
      )}
      {!email.error && email.submitted && (
        <p>Recibirás un correo de confirmación</p>
      )}
      <style jsx>{`
        form {
          position: sticky;
          top: 10px;
          margin-top: 40px;
          width: 100%;
          height: fit-content;
          border: 3px solid #e74c3c;
          padding: 20px;
          text-align: center;
          margin-bottom: 50px;
          background: white;
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
          border-radius: 28px;
          outline: none;
          border: 1px solid black;
          padding: 5px 15px;
          width: calc(100% - 15px);
          margin-bottom: 30px;
        }

        input:focus {
          border: 1px solid #e74c3c;
          box-shadow: 1px 0 6px 2px #e74d3c57;
        }
      `}</style>
    </form>
  );
};
export default Newsletter;
