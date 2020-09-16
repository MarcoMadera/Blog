import Challenge from "../../../components/Challenge";
import Seo from "../../../components/Seo";
const challenges = () => {
  return (
    <main id="main">
      <Seo
        title="Portafolio - Challenges"
        url="https://marcomadera.com/challenges"
      />
      <h1>Desafios frontend</h1>
      <Challenge
        title="REST Countries API with color theme switcher"
        level="Avanzado"
        liveDemo="https://countries.marcomadera.vercel.app/"
        challengePage="https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca"
        repo="https://github.com/MarcoMadera/REST-Countries-API-with-color-theme-switcher"
        challengeImg="https://res.cloudinary.com/marcomadera/image/upload/v1597007828/Potfolio/challenges/abbcd-bsde-bbvb_ax6hja.jpg"
        todoList={[
          "Ver todos los paises de la API en la página principal",
          "Buscar por un país usando un campo de entrada",
          "Filtrar los paises por region",
          "Hacer clic en un país para ver información detallada en una página separada",
          "Hacer clic en los paises fronterizos en la página de detalles",
          "Alternar el tema entre modo claro y oscuro (opcional)",
        ]}
      />
      <Challenge
        title="Rock Paper Scissors / Lizard Spock"
        level="Avanzado"
        liveDemo="http://rock-paper-scissors.marcomadera.vercel.app/"
        challengePage="https://www.frontendmentor.io/challenges/rock-paper-scissors-game-pTgwgvgH"
        repo="https://github.com/MarcoMadera/Rock-Paper-Scissors-Lizard-Spock"
        challengeImg="https://res.cloudinary.com/marcomadera/image/upload/v1596519017/Potfolio/challenges/bccd-hs23c-fdfns_lhan01.jpg"
        todoList={[
          "Ver el diseño óptimo para el sitio dependiendo del tamaño de la pantalla 1366px y 375px",
          "Jugar a piedra papel o tijeras contra la computadora",
          "Mantener el estado del score despu'es de refrescar el navegador",
          "Bonus",
          [
            "Jugar a piedra papel tijeras lagartija o spock contra la computadora (opcional)",
          ],
        ]}
        change={true}
      />
      <Challenge
        title="Chat App CSS Illustration"
        level="Intermedio"
        liveDemo="https://chat-app-css-illustration.marcomadera.vercel.app/"
        challengePage="https://www.frontendmentor.io/challenges/chat-app-css-illustration-O5auMkFqY"
        repo="https://github.com/MarcoMadera/chat-app-css-illustration"
        challengeImg="https://res.cloudinary.com/marcomadera/image/upload/v1595280865/Potfolio/challenges/e3refv80-b4vfd8-11ea-8aa5-1dcvf2d3e79a_q5s13z.jpg"
        todoList={[
          "Ver el diseño óptimo para el sitio dependiendo del tamaño de la pantalla 1440px y 375px",
          "Ver los estados para todos los elementos interactivos",
          "Ver la interfaz del chat animada en la entrada inicial (opcional)",
        ]}
      />
      <Challenge
        title="Manage landing page"
        level="Intermedio"
        liveDemo="https://manage-landing-page.marcomadera.vercel.app/"
        challengePage="https://www.frontendmentor.io/challenges/manage-landing-page-SLXqC6P5"
        repo="https://github.com/MarcoMadera/manage-landing-page"
        challengeImg="https://res.cloudinary.com/marcomadera/image/upload/v1595276265/Potfolio/challenges/ba06b000-be6b-11ea-8d49-fb31622b8b52_xiksfy.jpg"
        todoList={[
          "Ver el diseño óptimo para el sitio dependiendo del tamaño de la pantalla 1440px y 375px",
          "Ver los estados para todos los elementos interactivos",
          "Ver todos los testimonios en un slider horizontal",
          "Recibir un mensaje de error se envíe el formulario del newsletter si:",
          [
            "La entrada esta vacía",
            "La dirección de email no esta formateada correctamente",
          ],
        ]}
        change={true}
      />
      <Challenge
        title="Easybank landing page"
        level="Intermedio"
        liveDemo="https://easy-bank-landing-page.marcomadera.vercel.app/"
        challengePage="https://www.frontendmentor.io/challenges/easybank-landing-page-WaUhkoDN"
        repo="https://github.com/MarcoMadera/easy-bank-landing-page"
        challengeImg="https://res.cloudinary.com/marcomadera/image/upload/v1595276298/Potfolio/challenges/6e876a00-b972-11ea-9783-c54128c626c3_ho5tq4.jpg"
        todoList={[
          "Ver el diseño óptimo para el sitio dependiendo del tamaño de la pantalla 1440px y 375px",
          "Ver los estados para todos los elementos interactivos",
        ]}
      />
      <Challenge
        title="Job listings with filtering"
        level="Intermedio"
        liveDemo="https://job-listings-with-filtering.marcomadera.vercel.app/"
        challengePage="https://www.frontendmentor.io/challenges/job-listings-with-filtering-ivstIPCt"
        repo="https://github.com/MarcoMadera/Job-listings-with-filtering"
        challengeImg="https://res.cloudinary.com/marcomadera/image/upload/v1595276324/Potfolio/challenges/ebec7980-b6e9-11ea-8760-3077406d08e6_mrjaid.jpg"
        todoList={[
          "Ver el diseño óptimo para el sitio dependiendo del tamaño de la pantalla 1440px y 375px",
          "Ver los estados para todos los elementos interactivos",
          "Filtrar la lista de ofertas basado en las categorías seleccionadas",
        ]}
        change={true}
      />
      <Challenge
        title="Clipboard Landing Page"
        level="Junior"
        liveDemo="https://clipboard-landing-page.marcomadera.vercel.app/"
        challengePage="https://www.frontendmentor.io/challenges/clipboard-landing-page-5cc9bccd6c4c91111378ecb9"
        repo="https://github.com/MarcoMadera/clipboard-landing-page"
        challengeImg="https://res.cloudinary.com/marcomadera/image/upload/v1595276230/Potfolio/challenges/63db5980-b4c8-11ea-8aa5-1583b2d3e79a_xxhse4.jpg"
        todoList={[
          "Ver el diseño óptimo para el sitio dependiendo del tamaño de la pantalla 1440px y 375px",
          "Ver los estados para todos los elementos interactivos",
        ]}
      />
      <Challenge
        title="Social Media Dashboard"
        level="Junior"
        liveDemo="https://social-media-dashboard.marcomadera.vercel.app/"
        challengePage="https://www.frontendmentor.io/challenges/social-media-dashboard-with-theme-switcher-6oY8ozp_H"
        repo="https://github.com/MarcoMadera/social-media-dashboard"
        challengeImg="https://res.cloudinary.com/marcomadera/image/upload/v1595276348/Potfolio/challenges/4b2b4200-b316-11ea-97ab-b223698314a4_vvyaif.png"
        todoList={[
          "Ver el diseño óptimo para el sitio dependiendo del tamaño de la pantalla 1440px y 375px",
          "Ver los estados para todos los elementos interactivos",
          "Cambiar el tema de color a preferencia",
        ]}
        change={true}
      />
      <style jsx>{`
        main {
          margin: 0px auto 40px auto;
          padding: 0 20px;
          max-width: 1300px;
        }
        h1 {
          text-align: center;
        }
        p {
          line-height: 1.6;
        }
      `}</style>
    </main>
  );
};

export default challenges;
