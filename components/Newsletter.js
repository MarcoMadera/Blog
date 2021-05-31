import ActionButton from "./ActionButton";
import { colors } from "../styles/theme";
import { Input } from "./tags";
import { useRef, useState } from "react";
import useDarkMode from "../hooks/useDarkMode";
import useNotification from "../hooks/useNotification";
import { useRouter } from "next/router";
import styles from "./Newsletter.module.css";

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
    fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(({ error }) => {
        if (error) {
          setError(true);
          addNotification({
            variant: "error",
            message: error,
          });
          return;
        }
        addNotification({
          variant: "info",
          message:
            "Revisa tu bandeja de entrada, recibirás un correo electrónico de confirmación",
        });
        router.push("/newsletter/suscription");
      })
      .catch(() => {
        setError(true);
        addNotification({
          variant: "error",
          message: "Ha ocurrido un error",
        });
      });
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className={styles.form}
    >
      <label htmlFor="bd-email">¡Suscríbete al Newsletter!</label>
      <p>Recibirás actualizaciones del blog con temas de programación</p>
      <Input
        type="email"
        name="email"
        id="bd-email"
        autoComplete="email"
        aria-label="Correo electrónico para el newsletter"
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
    </form>
  );
}
