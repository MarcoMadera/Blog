import Seo from "../../components/Seo";
import { H1, H2, H3, A, Ul, Li, P, Table, Th, Td } from "../../components/tags";
import useCookies from "../../hooks/useCookies";
import { colors } from "../../styles/theme";
import useDarkMode from "../../hooks/useDarkMode";
import { useEffect } from "react";

export default function Cookies() {
  const { darkMode } = useDarkMode();
  const { acceptedcookies, toggleAceptedCookies } = useCookies();
  const handleClick = () => {
    toggleAceptedCookies();
  };
  useEffect(() => {
    fetch("/api/views/page-cookies", {
      method: "POST",
    });
  }, []);

  return (
    <main id="main">
      <Seo title={`Política de cookies ${acceptedcookies ? "🔓" : "🔒"}`} />
      <H1>Política de cookies</H1>
      <div>
        <span>
          Clic para {acceptedcookies ? "deshabilitar" : "permitir"} cookies:
        </span>
        <label
          aria-label={`${
            acceptedcookies ? "deshabilitar" : "permitir"
          } cookies`}
        >
          <input
            type="checkbox"
            onClick={handleClick}
            defaultChecked={!acceptedcookies}
          />
        </label>
      </div>
      <H2>¿Qué son las cookies?</H2>
      <P>
        Una cookie es un fichero que se descarga en su ordenador al acceder a
        determinadas páginas web. Las cookies permiten a una página web, entre
        otras cosas, almacenar y recuperar información sobre los hábitos de
        navegación de un usuario o de su equipo y, dependiendo de la información
        que contengan y de la forma en que utilice su equipo, pueden utilizarse
        para reconocer al usuario.
      </P>
      <H2>Tipos de cookies</H2>
      <H3>Necesarias</H3>
      <P>
        Las cookies necesarias ayudan a hacer una página web utilizable
        activando funciones básicas como la navegación en la página y el acceso
        a áreas seguras de la página web. La página web no puede funcionar
        adecuadamente sin estas cookies.
      </P>
      <H3>Preferenciales</H3>
      <P>
        Las cookies de preferencias permiten a la página web recordar
        información que cambia la forma en que la página se comporta o el
        aspecto que tiene, como su idioma preferido o la región en la que usted
        se encuentra.
      </P>
      <H3>Estadística</H3>
      <P>
        Las cookies estadísticas ayudan a los propietarios de páginas web a
        comprender cómo interactúan los visitantes con las páginas web reuniendo
        y proporcionando información de forma anónima.
      </P>
      <H3>Marketing</H3>
      <P>
        Las cookies de marketing se utilizan para rastrear a los visitantes en
        las páginas web. La intención es mostrar anuncios relevantes y
        atractivos para el usuario individual, y por lo tanto, más valiosos para
        los editores y terceros anunciantes.
      </P>
      <H3>No clasificados</H3>
      <P>
        Las cookies no clasificadas son cookies para las que todavía estamos en
        proceso de clasificar, junto con los proveedores de cookies
        individuales.
      </P>
      <H2>¿Qué tipos de cookies utiliza esta página web?</H2>
      <H3>Necesarias</H3>
      <P>
        Las cookies necesarias ayudan a hacer una página web utilizable
        activando funciones básicas como la navegación en la página y el acceso
        a áreas seguras de la página web. La página web no puede funcionar
        adecuadamente sin estas cookies.
      </P>
      <H3>Estadística</H3>
      <P>
        Son aquéllas que bien tratadas por nosotros o por terceros, nos permiten
        cuantificar el número de usuarios y así realizar la medición y análisis
        estadístico de la utilización que hacen los usuarios del servicio
        ofertado. Para ello se analiza su navegación en nuestra página web con
        el fin de mejorar la oferta de productos o servicios que le ofrecemos.
      </P>
      <P>La información que se obtiene con este tipo de cookies son:</P>
      <Ul>
        <Li>Número de páginas visitadas.</Li>
        <Li>Lugar desde donde la dirección IP accede.</Li>
        <Li>Número de usuarios que acceden.</Li>
        <Li>Reincidencia de las visitas.</Li>
        <Li>El tiempo de visita.</Li>
        <Li>El navegador que se utiliza.</Li>
        <Li>
          El operador o tipo de dipositivo desde el que se realiza la visita.
        </Li>
      </Ul>
      <P>
        La información se recopila de forma anónima y se elaboran informes de
        tendencias del Sitio Web sin identificar a usuarios individuales.
      </P>
      <P>
        A continuación le informamos detalladamente de las cookies que pueden
        instalarse desde nuestro sitio web. En función de su navegación podrán
        instalarse todas o sólo algunas de ellas.
      </P>
      <Table>
        <thead>
          <tr>
            <Th>Nombre</Th>
            <Th>Categoria</Th>
            <Th>Descripción</Th>
            <Th>Propiedad</Th>
            <Th>Duración</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>_ga</Td>
            <Td>Estadística</Td>
            <Td>
              Se activa al aceptar el uso de cookies y se usa para distinguir
              usuarios y sesiones.
            </Td>
            <Td>Propia</Td>
            <Td>1 año</Td>
          </tr>
        </tbody>
      </Table>
      <H2>Cómo desactivar las Cookies</H2>
      <P>
        Puede usted permitir, bloquear o eliminar las cookies instaladas en su
        equipo mediante la configuración de las opciones del navegador instalado
        en su ordenador.
      </P>
      <P>
        A continuación puede acceder a la configuración de los navegadores webs
        más frecuentes para aceptar, instalar o desactivar las cookies:
      </P>
      <Ul>
        <Li>
          <A
            href="http://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-que-los-sitios-we"
            target="_blank"
            rel="noreferrer noopener"
          >
            Firefox
          </A>
        </Li>
        <Li>
          <A
            href="http://support.apple.com/kb/HT1677?viewlocale=es_ES"
            target="_blank"
            rel="noreferrer noopener"
          >
            Safari
          </A>
        </Li>
        <Li>
          <A
            href="https://support.google.com/chrome/answer/95647?hl=es"
            target="_blank"
            rel="noreferrer noopener"
          >
            Google Chrome
          </A>
        </Li>
      </Ul>
      <style jsx>{`
        label {
          background-color: ${darkMode
            ? colors.dark_accents2
            : colors.accents2};
        }
        label:before {
          background-image: ${!acceptedcookies
            ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M256 0c-82.436.094-149.239 66.898-149.333 149.333v96c0 5.891 4.776 10.667 10.667 10.667S128 251.224 128 245.333h21.333c0 5.891 4.776 10.667 10.667 10.667s10.667-4.776 10.667-10.667v-96C170.667 102.205 208.872 64 256 64s85.333 38.205 85.333 85.333v53.333c0 5.891 4.776 10.667 10.667 10.667h42.667c5.891 0 10.667-4.776 10.667-10.667v-53.333C405.239 66.898 338.436.094 256 0z' fill='%23455a64'/%3E%3Cpath d='M394.667 234.667H117.333c-17.673 0-32 14.327-32 32v192c0 29.455 23.878 53.333 53.333 53.333h234.667c29.455 0 53.333-23.878 53.333-53.333v-192c.001-17.673-14.326-32-31.999-32z' fill='%23ffc107'/%3E%3Cpath d='M284.8 372.693a42.089 42.089 0 0013.867-31.36c0-23.564-19.103-42.667-42.667-42.667s-42.667 19.103-42.667 42.667a42.089 42.089 0 0013.867 31.36l-13.312 39.936c-1.862 5.589 1.16 11.629 6.749 13.491 1.084.361 2.22.546 3.363.547h64c5.891-.004 10.663-4.784 10.659-10.675a10.652 10.652 0 00-.547-3.363L284.8 372.693z' fill='%23455a64'/%3E%3C/svg%3E\")"
            : "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cpath style='fill:%23455A64;' d='M256,0c-82.436,0.094-149.239,66.898-149.333,149.333v96c0,5.891,4.776,10.667,10.667,10.667 S128,251.224,128,245.333h21.333c0,5.891,4.776,10.667,10.667,10.667c5.891,0,10.667-4.776,10.667-10.667v-96 C170.667,102.205,208.872,64,256,64s85.333,38.205,85.333 c5.891,0,10.667-4.776,10.667-10.667v-53.333C405.239,66.898,338.436,0.094,256,0z'/%3E%3Cpath style='fill:%23FFC107;' d='M394.667,234.667H117.333c-17.673,0-32,14.327-32,32v192c0,29.455,23.878,53.333,53.333,53.333 h234.667c29.455,0,53.333-23.878,53.333-53.333v-192C426.667,248.994,412.34,234.667,394.667,234.667z'/%3E%3Cpath style='fill:%23455A64;' d='M284.8,372.693c8.864-8.011,13.905-19.412,13.867-31.36c0-23.564-19.103-42.667-42.667-42.667 s-42.667,19.103-42.667,42.667c-0.038,11.948,5.003,23.349,13.867,31.36l-13.312,39.936c-1.862,5.589,1.16,11.629,6.749,13.491 c1.084,0.361,2.22,0.546,3.363,0.547h64c5.891-0.004,10.663-4.784,10.659-10.675c-0.001-1.143-0.185-2.278-0.547-3.363 L284.8,372.693z'/%3E%3C/svg%3E\")"};
          transform: translateX(${!acceptedcookies ? "31px" : "0"});
          background-color: ${darkMode ? colors.accents2 : "transparent"};
        }
      `}</style>
      <style jsx>{`
        span {
          margin: 0;
          text-align: end;
        }
        div {
          display: grid;
          grid-template-columns: 1fr auto;
          grid-gap: 20px;
        }
        input {
          clip: rect(0, 0, 0, 0);
          width: 0;
          height: 0;
          padding: 0;
          position: absolute;
          width: 100%;
          height: 100%;
          margin: 0;
          top: 0;
          left: 0;
        }
        label {
          display: inline-block;
          position: relative;
          width: 55px;
          height: 24px;
          border: 1px solid #cccccc4d;
          border-radius: 50px;
          padding: 0 1px;
          cursor: pointer;
        }
        label:focus-within,
        label:active {
          outline-style: dashed;
          outline-width: 2px;
          outline-color: #b50000;
        }
        label:before {
          position: absolute;
          display: block;
          content: "";
          background-position: center center;
          background-size: 80% 80%;
          background-repeat: no-repeat;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          cursor: pointer;
          transition: 300ms;
          will-change: auto;
          user-select: none;
          top: 1px;
        }
        main :global(h1) {
          text-align: center;
          margin: 0 0 1rem 0;
        }
        main {
          text-align: center;
          margin: 0 auto 1rem auto;
          padding: 0 0 50px 0;
          text-align: justify;
        }
        @media screen and (max-width: 425px) {
          main {
            margin: 15px;
          }
        }
        @media screen and (min-width: 425px) and (max-width: 620px) {
          main {
            margin: 0 30px 1rem 30px;
            max-width: 510px;
          }
        }
        @media screen and (min-width: 620px) and (max-width: 768px) {
          main {
            max-width: 510px;
          }
        }
        @media screen and (min-width: 768px) {
          main {
            margin: 0 auto 1rem auto;
            max-width: 640px;
          }
        }

        @media screen and (min-width: 1024px) {
          main {
            max-width: 760px;
          }
        }
      `}</style>
    </main>
  );
}
