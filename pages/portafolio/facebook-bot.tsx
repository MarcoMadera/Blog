import { H1, H2, P } from "components/tags";
import { Nodejs } from "components/icons";
import Seo from "components/Seo";
import { ReactElement } from "react";
import Script from "next/script";
import useAnalitycs from "hooks/useAnalitycs";

export default function TestRandomNumbers(): ReactElement {
  useAnalitycs("facebook-bot");

  return (
    <main id="main">
      <Seo title="Portafolio 💼 | Chat Bot de Facebook" />
      <H1>Chat Bot de Facebook</H1>
      <article>
        <div>
          <H2>Intención</H2>
          <P>
            Crear un chat bot de facebook para la página del hotel posada del
            desierto. Utilizando inteligencia artificial de procesamiento
            natural de lenguaje para responder a dudas comunes y no tan comunes
            sobre el hotel y servicios que ofrece.
          </P>
          <H2>Funcionamiento</H2>
          <P>
            Creado con nodejs y wit.ai, facebook envia el mensaje al endpoint
            webhook, el cual procesa el mensaje enviandolo al servicio de wit.ai
            y con base a los resultados del porcentaje de confianza de la
            intención del mensaje se escoge un payload para actuar.
          </P>
          <Nodejs width={50} height={50} />
        </div>
        <div
          style={{
            width: "308px",
            height: "667px",
            overflow: "hidden",
            justifySelf: "center",
          }}
        >
          <div
            style={{
              width: "308px",
              height: "667px",
              transformOrigin: "0 0",
              background: "#000",
              padding: "7px 6px 11px",
              borderRadius: "33px",
              boxShadow: "inset 0 0 0 2px #555",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                color: "#333",
              }}
            >
              <iframe
                src="https://player.vimeo.com/video/577478001?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                width="100%"
                height="100%"
                allowFullScreen
                title="Facebook Chat Bot"
                style={{ borderRadius: "28px 28px 23px 23px" }}
              ></iframe>
            </div>
          </div>
        </div>
        <Script src="https://player.vimeo.com/api/player.js"></Script>
      </article>
      <style jsx>{`
        article {
          align-items: flex-start;
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin-bottom: 40px;
          margin-top: 40px;
        }
        div :global(a) {
          margin: 20px 20px 0 0;
        }
        main {
          margin: 0 auto;
          max-width: 1300px;
          min-height: calc(100vh - 257px);
          padding: 0 20px;
        }
        main :global(h1) {
          text-align: center;
        }
        main :global(p) {
          text-align: justify;
        }
        @media print, screen and (max-width: 876px) {
          article {
            grid-template-columns: auto;
            margin-bottom: 20px;
            margin-top: 0px;
          }
          article > div:nth-of-type(1),
          article > div:nth-of-type(2) {
            padding: 0px;
          }
          article > div:nth-of-type(1) a {
            margin-bottom: 10px;
          }
        }
      `}</style>
    </main>
  );
}
