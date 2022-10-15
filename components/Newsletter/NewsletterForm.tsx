import { FormEvent, ReactElement, ReactNode, useRef, useState } from "react";
import { colors } from "styles/theme";
import { Input } from "components/tags";
import useDarkMode from "hooks/useDarkMode";
import ActionButton from "components/ActionButton";
import useNotification from "hooks/useNotification";
import { useRouter } from "next/router";
import { subscribeToNewsletter } from "utils/subscribeToNewsletter";
import useAnalytics from "hooks/useAnalytics";
import { HitType } from "types/analytics";

export default function NewsletterForm({
  children,
}: {
  children?: ReactNode[];
}): ReactElement {
  const router = useRouter();
  const { darkMode } = useDarkMode();
  const { addNotification } = useNotification();
  const { trackWithGoogleAnalytics } = useAnalytics();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(false);

    const { type, message } = await subscribeToNewsletter(email, name);
    trackWithGoogleAnalytics(HitType.EVENT, {
      eventCategory: "Form",
      eventAction: `Submit ${type}`,
      eventLabel: "Newsletter",
      eventValue: "1",
    });

    addNotification({
      variant: type,
      message,
      displayTime: type === "success" ? 15000 : 10000,
    });

    if (type === "success") {
      router.push("/newsletter/subscription");
    }

    if (type === "error") {
      setError(true);
    }
  };

  return (
    <form
      ref={formRef}
      id="newsletter-form"
      className="bd-email"
      onSubmit={handleSubmit}
      noValidate
    >
      {children}
      <label htmlFor="newsletterForm-name">
        Nombre
        <Input
          type="name"
          name="name"
          id="newsletterForm-name"
          aria-label="Nombre"
          placeholder="Nombre (opcional)"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </label>
      <label htmlFor="newsletterForm-email">
        Email*
        <Input
          type="email"
          name="email"
          id="newsletterForm-email"
          autoComplete="email"
          aria-label="Correo electrónico para el newsletter"
          placeholder="Correo electrónico (requerido)"
          onChange={(e) => {
            setError(false);
            setEmail(e.target.value);
          }}
        />
      </label>
      <ActionButton>Suscribirte</ActionButton>
      <style jsx>{`
        form :global(input) {
          border: 1px solid ${darkMode ? "#cccccc4d" : "#ccc"};
          background: ${darkMode ? "#1e242d" : "#f9f9f9"};
          margin-top: 0.5em;
        }
        form :global(#newsletterForm-email) {
          border: 1px solid ${error ? "red" : darkMode ? "#cccccc4d" : "#ccc"};
        }
        form :global(input:focus) {
          border: 1px solid
            ${darkMode ? colors.dark_secondary : colors.secondary};
        }
        form :global(input:hover) {
          border: 1px solid ${darkMode ? "#ffffff4d" : "#7b7b7b"};
        }
        form label {
          display: block;
          text-align: left;
        }
        form {
          max-width: 700px;
          margin: auto;
        }
      `}</style>
    </form>
  );
}
