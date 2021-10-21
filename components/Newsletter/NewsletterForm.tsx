import { FormEvent, ReactElement, ReactNode, useRef, useState } from "react";
import { colors } from "styles/theme";
import { Input } from "components/tags";
import useDarkMode from "hooks/useDarkMode";
import ActionButton from "components/ActionButton";
import useNotification from "hooks/useNotification";
import { useRouter } from "next/router";
import { subscribeToNewsletter } from "utils/subscribeToNewsletter";

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(false);

    const { type, message } = await subscribeToNewsletter(email);

    addNotification({
      variant: type,
      message,
      displayTime: type === "success" ? 15000 : 10000,
    });

    if (type === "success") {
      router.push("/newsletter/suscription");
    }

    if (type === "error") {
      setError(true);
    }
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
