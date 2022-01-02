import Seo from "components/Seo";
import { ReactElement } from "react";
import { H1, A } from "components/tags";
import useAnalytics from "hooks/useAnalytics";
import NewsletterForm from "components/Newsletter/NewsletterForm";

export default function NewsletterPage(): ReactElement {
  useAnalytics("page-newsletter");

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
        <NewsletterForm />
      </div>
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
        main :global(form) {
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
}
