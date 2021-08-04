import { H1, H2, Ul, Li, P, Img } from "components/tags";
import ActionAnchor from "components/ActionAnchor";
import Seo from "components/Seo";
import { Css, Html5, ReactIcon, Svelte } from "components/icons";
import { PropsWithChildren, ReactElement, useEffect } from "react";

interface ChallengeProps {
  title: string;
  liveDemo: string;
  challengePage: string;
  repo: string;
  challengeImg: string;
  level: string;
  blurDataURL: string;
  fullHeight: number;
  fullWidth: number;
}

function Challenge({
  title,
  liveDemo,
  challengePage,
  repo,
  challengeImg,
  children,
  level,
  blurDataURL,
  fullHeight,
  fullWidth,
}: PropsWithChildren<ChallengeProps>): ReactElement {
  return (
    <article>
      <div>
        <H2>{title}</H2>
        <ActionAnchor href={liveDemo}>Ver en vivo</ActionAnchor>
        <ActionAnchor href={challengePage}>Página del reto</ActionAnchor>
        <ActionAnchor href={repo}>Código</ActionAnchor>
        <P>
          <strong>Nivel en Frontend Mentor: {level}</strong>
        </P>
        <span>Reto:</span>
        {children}
      </div>
      <div>
        <Img
          src={challengeImg}
          alt={title}
          blurDataURL={blurDataURL}
          fullImage={{
            img: { height: fullHeight, width: fullWidth, src: challengeImg },
            base64: blurDataURL,
          }}
        />
      </div>
      <style global jsx>{`
        main article:nth-child(2n + 3) div:nth-of-type(1) {
          order: 2;
        }
        @media print, screen and (max-width: 876px) {
          main article:nth-child(2n + 3) div:nth-of-type(1) {
            order: unset;
          }
        }
      `}</style>
      <style jsx>{`
        div :global(a) {
          margin: 20px 20px 0 0;
        }
        article {
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin-bottom: 40px;
          align-items: center;
        }
        article > div {
          padding: 40px;
        }
        @media print, screen and (max-width: 876px) {
          article {
            grid-template-columns: auto;
          }
          article {
            margin-top: 0px;
            margin-bottom: 20px;
          }
          article > div,
          article > div:nth-of-type(1) {
            padding: 0px;
          }
        }
      `}</style>
    </article>
  );
}

export default function Challenges(): ReactElement {
  useEffect(() => {
    fetch("/api/views/portafolio-retos-frontend", {
      method: "POST",
    });
  }, []);

  return (
    <main id="main">
      <Seo title="Portafolio 💼 | Retos Frontend" />
      <H1>Retos frontend</H1>
      <Challenge
        title="REST Countries API with color theme switcher"
        level="Avanzado"
        liveDemo="https://countries.marcomadera.vercel.app/"
        challengePage="https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca"
        repo="https://github.com/MarcoMadera/REST-Countries-API-with-color-theme-switcher"
        challengeImg="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550,h_391/v1597007828/Potfolio/challenges/abbcd-bsde-bbvb_ax6hja.jpg"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5ElEQVQImQHZACb/ACxATT9UYys+TBMmMw4kMhsmORgjNx4qOic4Qys8SQARFyATAAISFyJpa4KAbXwtXUZGe1EdQ0gyQlQgLjcAalE3/8ZzkGhB/9Xx/8vbbbJynvGUTHhyYHGaHD1SAC9ESUhnaSY1PjlFVSIxPyRDTyFHUh4zQi09UQAXJwAAAhNjQTkiUEloaWlJYm5fJS6PJjAhJSKRtqnEyNIABw8ZpHtsM2lbu5+TeH6Bkz1H2khKLzQrzPXl/P//ACY3Qi9DUhsoOC5FVhcpPStCTytEUyIzQS89TQ4eK4JlRCk9HFBlAAAAAElFTkSuQmCC"
        fullWidth={1440}
        fullHeight={1024}
      >
        <Ul>
          <Li>Ver todos los países de la API en la página principal.</Li>
          <Li>Buscar por país usando un campo de entrada de texto.</Li>
          <Li>Filtrar los países por región.</Li>
          <Li>
            Hacer clic en un país para ver más información en una página
            separada.
          </Li>
          <Li>Hacer clic en los países fronterizos en la página de detalles</Li>
          <Li>Alternar el tema entre modo claro y oscuro (opcional)</Li>
        </Ul>
        <ReactIcon width={50} height={50} />
      </Challenge>
      <Challenge
        title="Rock Paper Scissors / Lizard Spock"
        level="Avanzado"
        liveDemo="http://rock-paper-scissors.marcomadera.vercel.app/"
        challengePage="https://www.frontendmentor.io/challenges/rock-paper-scissors-game-pTgwgvgH"
        repo="https://github.com/MarcoMadera/Rock-Paper-Scissors-Lizard-Spock"
        challengeImg="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550,h_403/v1596519017/Potfolio/challenges/bccd-hs23c-fdfns_lhan01.jpg"
        blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAHAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEH/8QAIhAAAQMEAQUBAAAAAAAAAAAAAQIDBQAEBhExBxIhIiNR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgT/xAAXEQEBAQEAAAAAAAAAAAAAAAABAgAR/9oADAMBAAIRAxEAPwC5XDZRg2YRzjE89JNi5TIqDrrqEqSXVfEjvO0pHP7sDXitAjuoGS3MfavuxNoHHWkrUEL9QSATrauKUqmnsimMyb//2Q=="
        fullWidth={900}
        fullHeight={660}
      >
        <Ul>
          <Li>
            Ver el diseño óptimo para el sitio para escritorio (1366px) y móvil
            (375px).
          </Li>
          <Li>Jugar a piedra papel o tijeras contra la computadora.</Li>
          <Li>Mantener la puntuación después de refrescar la página.</Li>
          <Li>
            Bonus
            <Ul depth={1}>
              <Li>
                Jugar a piedra, papel, tijeras, lagartija o <em>spock</em>{" "}
                contra la computadora (opcional).
              </Li>
            </Ul>
          </Li>
        </Ul>
        <ReactIcon width={50} height={50} />
      </Challenge>
      <Challenge
        title="Chat App CSS Illustration"
        level="Intermedio"
        liveDemo="https://chat-app-css-illustration.marcomadera.vercel.app/"
        challengePage="https://www.frontendmentor.io/challenges/chat-app-css-illustration-O5auMkFqY"
        repo="https://github.com/MarcoMadera/chat-app-css-illustration"
        challengeImg="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550,h_403/v1595280865/Potfolio/challenges/e3refv80-b4vfd8-11ea-8aa5-1dcvf2d3e79a_q5s13z.jpg"
        blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAHAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAYH/8QAIRAAAQQBAwUAAAAAAAAAAAAAAQACAwUhBAYRByIxMlH/xAAVAQEBAAAAAAAAAAAAAAAAAAABA//EABkRAAMBAQEAAAAAAAAAAAAAAAECAwARMf/aAAwDAQACEQMRAD8A2DpdSXe36+xi3PZjXTz6t80REjpgyM+re8AjA8DGVXue0uJHPBPxEVKUNWLt6csxY9O//9k="
        fullWidth={900}
        fullHeight={660}
      >
        <Ul>
          <Li>
            Ver el diseño óptimo para el sitio para escritorio (1440px) y móvil
            (375px).
          </Li>
          <Li>Ver los estados para todos los elementos interactivos.</Li>
          <Li>
            Ver la interfaz del chat animada en la entrada inicial (opcional).
          </Li>
        </Ul>
        <Html5 width={50} height={50} />
        <Css width={50} height={50} />
      </Challenge>
      <Challenge
        title="Manage landing page"
        level="Intermedio"
        liveDemo="https://manage-landing-page.marcomadera.vercel.app/"
        challengePage="https://www.frontendmentor.io/challenges/manage-landing-page-SLXqC6P5"
        repo="https://github.com/MarcoMadera/manage-landing-page"
        challengeImg="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550,h_403/v1595276265/Potfolio/challenges/ba06b000-be6b-11ea-8d49-fb31622b8b52_xiksfy.jpg"
        blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAHAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAQI/8QAHhAAAQQDAQEBAAAAAAAAAAAAAQIDBAUAESESURP/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABcRAQEBAQAAAAAAAAAAAAAAAAEAEUH/2gAMAwEAAhEDEQA/ANAX0mfXUj02ngOW05sJKIKZCGA7tQBHtXBoBR78+5JEsbSRFZflU640hxCVuMGS2v8ANRGyn0OHR5scOsYwFV5l/9k="
        fullWidth={900}
        fullHeight={660}
      >
        <Ul>
          <Li>
            Ver el diseño óptimo para el sitio para escritorio (1440px) y móvil
            (375px).
          </Li>
          <Li>Ver los estados para todos los elementos interactivos.</Li>
          <Li>
            Ver todos los testimonios en un <em>slider</em> horizontal.
          </Li>
          <Li>
            Recibir un mensaje de error cuando se envíe el formulario del
            newsletter si:
            <Ul depth={1}>
              <Li>La entrada esta vacía.</Li>
              <Li>
                La dirección de correo electrónico no está formateada
                correctamente.
              </Li>
            </Ul>
          </Li>
        </Ul>
        <ReactIcon width={50} height={50} />
      </Challenge>
      <Challenge
        title="Easybank landing page"
        level="Intermedio"
        liveDemo="https://easy-bank-landing-page.marcomadera.vercel.app/"
        challengePage="https://www.frontendmentor.io/challenges/easybank-landing-page-WaUhkoDN"
        repo="https://github.com/MarcoMadera/easy-bank-landing-page"
        challengeImg="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550,h_403/v1595276298/Potfolio/challenges/6e876a00-b972-11ea-9783-c54128c626c3_ho5tq4.jpg"
        blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAHAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAQQCAQQDAAAAAAAAAAAAAQIDBAUAERIGEyEiFTFx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAv/EABoRAAICAwAAAAAAAAAAAAAAAAABAhEhQfD/2gAMAwEAAhEDEQA/ANM6ssR8wxPqbGZJl13dYkUrRIalgjSgoKKEckc+Wyo7A15ypVtVyqyIT08qOSyg9lDbIS36j1ACyAB9eCf3GMV4BFK32kf/2Q=="
        fullWidth={900}
        fullHeight={660}
      >
        <Ul>
          <Li>
            Ver el diseño óptimo para el sitio para escritorio (1440px) y móvil
            (375px).
          </Li>
          <Li>Ver los estados para todos los elementos interactivos.</Li>
        </Ul>
        <ReactIcon width={50} height={50} />
      </Challenge>
      <Challenge
        title="Job listings with filtering"
        level="Intermedio"
        liveDemo="https://job-listings-with-filtering.marcomadera.vercel.app/"
        challengePage="https://www.frontendmentor.io/challenges/job-listings-with-filtering-ivstIPCt"
        repo="https://github.com/MarcoMadera/Job-listings-with-filtering"
        challengeImg="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550,h_382/v1595276324/Potfolio/challenges/ebec7980-b6e9-11ea-8760-3077406d08e6_mrjaid.jpg"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAo0lEQVQImWNgkJRgEBMBkeraDIL8DOKiDOaWDCbmDHJyDLJyDKuOHW+bNGn64sWLN2268/jx20+f7j1//vTNmztPn688fIThz79/wZFRi5evvH7n7pevX////3/59u1nr159/PL17dfvDM8+fNp28uTRcxeePH368cuXbz9+giQ+fHz9/v39N28Y7r95c+Px4zvPX9578+bO85fICCqNBxGQBgBQYp9nOUC8gwAAAABJRU5ErkJggg=="
        fullWidth={1440}
        fullHeight={1000}
      >
        <Ul>
          <Li>
            Ver el diseño óptimo para el sitio para escritorio (1440px) y móvil
            (375px).
          </Li>
          <Li>Ver los estados para todos los elementos interactivos.</Li>
          <Li>
            Filtrar la lista de ofertas basada en las categorías seleccionadas.
          </Li>
        </Ul>
        <ReactIcon width={50} height={50} />
      </Challenge>
      <Challenge
        title="LoopStudios Landing Page"
        level="Junior"
        liveDemo="https://loopstudios-landing-page.marcomadera.vercel.app/"
        challengePage="https://www.frontendmentor.io/challenges/loopstudios-landing-page-N88J5Onjw"
        repo="https://github.com/MarcoMadera/Loopstudios-Landing-Page"
        challengeImg="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550,h_403/v1610993095/Potfolio/challenges/desktop-preview_zqqulr.jpg"
        blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAHAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAYH/8QAHRAAAgIDAQEBAAAAAAAAAAAAAQIDBAAFEQYScf/EABQBAQAAAAAAAAAAAAAAAAAAAAL/xAAYEQADAQEAAAAAAAAAAAAAAAAAAQIhMf/aAAwDAQACEQMRAD8AqNn5qHS3tvtqe62EmypXRPWitWDZiAYgFijx/KsCxC/PecB7mqaj0dKbU0pLVlnsPAjSMsRALFR0gfuMY7pvorp09P/Z"
        fullWidth={2160}
        fullHeight={1584}
      >
        <Ul>
          <Li>
            Ver el diseño óptimo para el sitio para escritorio (1440px) y móvil
            (375px).
          </Li>
          <Li>Ver los estados para todos los elementos interactivos.</Li>
        </Ul>
        <Svelte width={50} height={50} />
      </Challenge>
      <Challenge
        title="Clipboard Landing Page"
        level="Junior"
        liveDemo="https://clipboard-landing-page.marcomadera.vercel.app/"
        challengePage="https://www.frontendmentor.io/challenges/clipboard-landing-page-5cc9bccd6c4c91111378ecb9"
        repo="https://github.com/MarcoMadera/clipboard-landing-page"
        challengeImg="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550,h_403/v1595276230/Potfolio/challenges/63db5980-b4c8-11ea-8aa5-1583b2d3e79a_xxhse4.jpg"
        blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAHAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAHxAAAgICAgMBAAAAAAAAAAAAAQMCBAAFESEGEhMi/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAAAESH/2gAMAwEAAhEDEQA/ANqbZr7Tb3fH72ydTuLim8oaxjUu+AmO5z49eyQDGJ7Byw1K2NnPg/ok9SIGMYqTH//Z"
        fullWidth={900}
        fullHeight={660}
      >
        <Ul>
          <Li>
            Ver el diseño óptimo para el sitio para escritorio (1440px) y móvil
            (375px).
          </Li>
          <Li>Ver los estados para todos los elementos interactivos.</Li>
        </Ul>
        <ReactIcon width={50} height={50} />
      </Challenge>
      <Challenge
        title="Social Media Dashboard"
        level="Junior"
        liveDemo="https://social-media-dashboard.marcomadera.vercel.app/"
        challengePage="https://www.frontendmentor.io/challenges/social-media-dashboard-with-theme-switcher-6oY8ozp_H"
        repo="https://github.com/MarcoMadera/social-media-dashboard"
        challengeImg="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550,h_268/v1595276348/Potfolio/challenges/4b2b4200-b316-11ea-97ab-b223698314a4_vvyaif.png"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAApklEQVQImQGbAGT/ABkcLdTc+7vC3E9YcT5IYEtLX09NZC0nPF5ddiUsPAAAABV4gqJtdZSNlLSfpsqqr8v5/f9lZoTExecLDR4AEBMejJKpa3GIODtROTxTRktgQEVbQEVbR1BlEBMgABcZJYmOrF9lg251kD5DYJiduVZdd4iNql9lgBUZJQAQEyBeZH5GTGZwdZBLU2xkaoI8PVZ/hJ5PTmoRFCLDCTrS9G5EWwAAAABJRU5ErkJggg=="
        fullWidth={1365}
        fullHeight={665}
      >
        <Ul>
          <Li>
            Ver el diseño óptimo para el sitio para escritorio (1440px) y móvil
            (375px).
          </Li>
          <Li>Ver los estados para todos los elementos interactivos.</Li>
          <Li>Poder cambiar el tema de color a claro u oscuro.</Li>
        </Ul>
        <ReactIcon width={50} height={50} />
      </Challenge>
      <style jsx>{`
        main {
          margin: 0px auto 40px auto;
          padding: 0 20px;
          max-width: 1300px;
        }
        :global(h1) {
          text-align: center;
        }
      `}</style>
    </main>
  );
}
