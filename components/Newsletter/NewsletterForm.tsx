import { FormEvent, ReactElement, ReactNode, useRef, useState } from "react";
import { colors } from "styles/theme";
import { Input } from "components/tags";
import useDarkMode from "hooks/useDarkMode";
import ActionButton from "components/ActionButton";
import useNotification from "hooks/useNotification";
import { useRouter } from "next/router";

export default function NewsletterForm({
  children,
}: {
  children?: ReactNode[];
}): ReactElement {
  const router = useRouter();
  const { darkMode } = useDarkMode();
  const { addNotification } = useNotification();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
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
          displayTime: 15000,
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
    <form ref={formRef} className="bd-email" onSubmit={handleSubmit} noValidate>
      {children}
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
        form :global(input) {
          border: 1px solid ${error ? "red" : darkMode ? "#cccccc4d" : "#ccc"};
          background: ${darkMode ? "#1e242d" : "#f9f9f9"};
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
