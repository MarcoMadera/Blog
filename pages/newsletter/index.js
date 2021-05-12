import Seo from "../../components/Seo";
import { useRef, useState } from "react";
import { colors } from "../../styles/theme";
import { H1, Input, A } from "../../components/tags";
import useDarkMode from "../../hooks/useDarkMode";
import ActionButton from "../../components/ActionButton";
import useNotification from "../../hooks/useNotification";
import { useRouter } from "next/router";

const NewsletterPage = () => {
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
    <main id="main">
      <Seo title="Newsletter 📬 | Marco Madera" />
      <div>
        <label htmlFor="bd-email">
          <H1>Newsletter</H1>
        </label>
        <p>
          <strong>Quiero saber tu opinión,</strong> cuando recibas los artículos
          puedes responder directamente al correo electrónico o dejar un
          comentario en el enlace del artículo, quiero saber si te ha gustado,
          lo has odiado o si te ha sido indiferente.
        </p>
        <p>
          Uso el servicio de{" "}
          <A
            href="https://buttondown.email"
            target="_blank"
            rel="noopener noreferrer"
          >
            ButtonDown
          </A>{" "}
          para enviarte los artículos más recientes, no usaré tu correo
          electrónico para otro objetivo, no te enviaré nada de spam.
        </p>
        <form
          action="https://buttondown.email/api/emails/embed-subscribe/MarcoMadera"
          method="post"
          target="_blank"
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
        >
          <Input
            type="email"
            name="email"
            id="bd-email"
            placeholder="Correo electrónico*"
            onChange={(e) => {
              setError(false);
              setEmail(e.target.value);
            }}
          ></Input>
          <ActionButton>Suscríbete</ActionButton>
        </form>
      </div>
      <style jsx>{`
        main :global(input) {
          border: 1px solid ${error ? "red" : darkMode ? "#cccccc4d" : "#ccc"};
        }
        main :global(input:hover) {
          border: 1px solid ${darkMode ? "#ffffff4d" : "#7b7b7b"};
        }
        main :global(input:focus) {
          border: 1px solid
            ${darkMode ? colors.dark_secondary : colors.secondary};
        }
        main :global(input) {
          border: 1px solid
            ${email.error && email.submitted
              ? "red"
              : darkMode
              ? "#cccccc4d"
              : "#ccc"};
        }
      `}</style>
      <style jsx>{`
        div {
          text-align: center;
        }
        p {
          line-height: 1.6;
        }
        main :global(h1) {
          margin-bottom: 0.67em;
        }
        form {
          margin-bottom: 20px;
        }
        main :global(input) {
          margin: 0 auto 40px auto;
          width: 100%;
          display: block;
          border-radius: 4px;
          padding: 10px 15px;
        }

        main :global(button) {
          width: 100%;
        }
        main {
          margin: 0 30px;
          min-height: calc(100vh - 257px);
        }
        @media screen and (min-width: 500px) {
          main {
            padding: 0 30px;
            margin: 0 auto;
            max-width: 820px;
          }
        }
      `}</style>
    </main>
  );
};

export default NewsletterPage;
