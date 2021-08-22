import ActionButton from "./ActionButton";
import { colors } from "styles/theme";
import { Input } from "./tags";
import { useRef, useState, ReactElement, FormEvent, ReactNode } from "react";
import useDarkMode from "hooks/useDarkMode";
import useNotification from "hooks/useNotification";
import { useRouter } from "next/router";

function Label({ children }: { children: ReactNode }) {
  return <label htmlFor="bd-email">{children}</label>;
}

function P({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}

export default function NewsletterCard(): ReactElement {
  const router = useRouter();
  const { darkMode } = useDarkMode();
  const { addNotification } = useNotification();
  const formRef = useRef(null);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const isValidEmail = RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      <Label>¡Suscríbete al Newsletter!</Label>
      <P>Recibirás actualizaciones del blog con temas de programación</P>
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
        form :global(label) {
          color: ${darkMode ? colors.dark_textColor : colors.titleColor};
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
