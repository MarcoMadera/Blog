import ActionButton from "./ActionButton";
import { colors } from "../styles/theme";
import { Input } from "./tags";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import useDarkMode from "../hooks/useDarkMode";
import useNotification from "../hooks/useNotification";
import { useRouter } from "next/router";

function Label({ children }) {
  return <label htmlFor="bd-email">{children}</label>;
}

function P({ children }) {
  return <p>{children}</p>;
}

export default function Newsletter() {
  const router = useRouter();
  const { darkMode } = useDarkMode();
  const { addNotification } = useNotification();
  const formRef = useRef(null);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const isValidEmail = RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValidEmail.test(email)) {
      addNotification({
        variant: "error",
        message: "Por favor inserta un correo electrónico válido",
      });
      return;
    }
    setError(false);
    const data = new FormData(formRef.current);
    fetch("https://buttondown.email/api/emails/embed-subscribe/MarcoMadera", {
      method: "POST",
      body: data,
    })
      .then((res) => {
        if (res.status === 400) {
          addNotification({
            variant: "error",
            message: "Por favor inserta un correo electrónico válido",
          });
          throw Error(res.statusText);
        }
        if (!res.ok) {
          addNotification({
            variant: "error",
            message: "Algo salió mal",
          });
          throw Error(res.statusText);
        }
      })
      .then(() => {
        setError(false);
        addNotification({
          variant: "info",
          message:
            "Revisa tu bandeja de entrada, recibirás un correo electrónico de confirmación",
        });
        router.push("/newsletter/suscription");
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <form
      action="https://buttondown.email/api/emails/embed-subscribe/MarcoMadera"
      method="post"
      target="_blank"
      ref={formRef}
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
        onChange={(e) => {
          setError(false);
          setEmail(e.target.value);
        }}
      />
      <ActionButton>Suscríbete</ActionButton>
      <style jsx>{`
        form {
          border: 3px solid ${darkMode ? colors.dark_primary : colors.primary};
        }
        form :global(input) {
          border: 1px solid ${error ? "red" : darkMode ? "#cccccc4d" : "#ccc"};
        }
        form :global(input:focus) {
          border: 1px solid
            ${darkMode ? colors.dark_secondary : colors.secondary};
        }
        form :global(input:hover) {
          border: 1px solid ${darkMode ? "#ffffff4d" : "#7b7b7b"};
        }
      `}</style>
      <style jsx>{`
        form {
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
          margin-bottom: 30px;
          outline: unset;
          padding: 6px 8px;
          width: 100%;
        }
        form :global(button) {
          width: 100%;
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
