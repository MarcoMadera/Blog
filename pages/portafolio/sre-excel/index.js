import Seo from "../../../components/Seo";
import { colors } from "../../../styles/theme";
import PropTypes from "prop-types";

const Article = ({ title, img, children }) => {
  return (
    <>
      <article>
        <div>
          <h2>{title}</h2>
          {children}
        </div>
        <div>
          <img loading="lazy" src={img} alt={title} />
        </div>
        <style global jsx>{`
          main article:nth-child(2n + 3) div:nth-of-type(1) {
            order: 2;
          }
          @media screen and (max-width: 876px) {
            main article:nth-child(2n + 3) div:nth-of-type(1) {
              order: unset;
            }
          }
        `}</style>
        <style jsx>{`
          div:nth-of-type(1) a {
            margin-right: 20px;
          }
          article {
            display: grid;
            grid-template-columns: 1fr 1fr;
            margin-top: 40px;
            margin-bottom: 40px;
            justify-content: center;
            align-items: center;
          }
          article > div:nth-of-type(2) {
            padding: 40px;
          }
          div:nth-of-type(1) {
            padding: 40px;
          }
          img {
            width: 100%;
            transition: ease 0.3s;
            clip-path: inset(0% 0% 0% 0% round 10px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08),
              0 10px 10px -5px rgba(0, 0, 0, 0.03);
          }
          img:hover {
            position: static;
            transform: scale(1.1);
          }

          a {
            color: ${colors.primary};
          }
          a:hover {
            text-decoration: underline;
            color: ${colors.secondary};
          }
          @media screen and (max-width: 876px) {
            article {
              grid-template-columns: auto;
            }
            article {
              margin-top: 0px;
              margin-bottom: 20px;
            }
            article > div:nth-of-type(2),
            article > div:nth-of-type(1) {
              padding: 0px;
            }
          }
        `}</style>
      </article>
    </>
  );
};

const sre = () => {
  return (
    <main id="main">
      <Seo
        title="Portafolio - SRE Excel"
        url="https://marcomadera.com/sre-excel"
      />
      <h1>Registro de trámites en Excel</h1>
      <Article
        title="Navegador"
        img="https://res.cloudinary.com/marcomadera/image/upload/v1595275322/Potfolio/sreExcel/Reporte_Diario_db5g11.png"
      >
        <p>
          El funcionamiento es que con ayuda de un bookmarlet, se recolecta la
          información necesaria, y finalizar la jornada se puede acceder a la
          página del reporte para mirar los reporte en el navegador, éste se
          puede imprimir o descargar para después vaciarlo en excel de forma
          sencilla.
        </p>
      </Article>
      <Article
        title="Vista Excel"
        img="https://res.cloudinary.com/marcomadera/image/upload/v1595275323/Potfolio/sreExcel/Data_splifz.png"
      >
        <p>
          Esta es la vista general del dashboard, aquí es donde el usuario
          convive, todo se hace en está hoja, registrar los trámites, generar
          gráficas, generar el reporte, ver el progreso, eficiencia y
          comparaciones.
        </p>
      </Article>
      <Article
        title="Proceso de registro"
        img="https://res.cloudinary.com/marcomadera/image/upload/v1595275323/Potfolio/sreExcel/SRE_Registro_fbjsqg.png"
      >
        <p>
          El registro se puede hacer manual, seleccionar la oficina, fecha y
          vaciar los datos o también se puede pegar y que se llene rápidamente.
        </p>
      </Article>
      <Article
        title="Almacenamiento de datos"
        img="https://res.cloudinary.com/marcomadera/image/upload/v1595275321/Potfolio/sreExcel/SRE_Datos_rznxtt.png"
      >
        <p>
          Los datos van a una hoja aparte que no es accesible al usuario para
          evitar modificaciones al momento de compartir el archivo, usualmente
          está oculta y con contraseña.
        </p>
      </Article>
      <Article
        title="Generar gráfica"
        img="https://res.cloudinary.com/marcomadera/image/upload/v1595275324/Potfolio/sreExcel/SRE_Gen_Graph_iz4vgw.png"
      >
        <p>
          Generar gráficas tiene múltiples opciones, la interfaz ofrece una
          vista prevía que cambia conforme se seleccionan las opciones.
        </p>
      </Article>
      <Article
        title="Gráfica generada"
        img="https://res.cloudinary.com/marcomadera/image/upload/v1595275323/Potfolio/sreExcel/SRE_Graph_Generada_gg2do4.png"
      >
        <p>
          La gráfica se puede generar en una hoja nueva, libro nuevo, archivo
          PDF y/o imagen PNG, si se genera en hoja nueva se puede modificar los
          estilos a preferencia y después exportarla a PDF o imagen PNG con
          atajos <kbd>ctrl</kbd> + <kbd>p</kbd> o <kbd>ctrl</kbd> + <kbd>g</kbd>{" "}
          respectivamente.
        </p>
      </Article>
      <Article
        title="Generar reporte"
        img="https://res.cloudinary.com/marcomadera/image/upload/v1595275324/Potfolio/sreExcel/SRE_Gen_Reporte_yvv11c.png"
      >
        <p>
          El proceso es similar, se selecciona el rango de fechas y las opciones
          necesarias, se puede confirgurar el tipo de archivo PDF o nueva hoja y
          orientación de la hoja.{" "}
        </p>
      </Article>
      <Article
        title="Resultado al generar reporte PDF"
        img="https://res.cloudinary.com/marcomadera/image/upload/v1595275324/Potfolio/sreExcel/SRE_Reporte_PDF_yvvswb.png"
      >
        <p>
          Al igual que la gráfica, el reporte se puede personalizar al
          exportarlo a una nueva hoja en lugar de directamente a PDF que tiene
          un estilo por defecto.
        </p>
      </Article>
      <Article
        title="Programación"
        img="https://res.cloudinary.com/marcomadera/image/upload/v1595275322/Potfolio/sreExcel/SRE_Programacion_aosbtb.png"
      >
        <p>
          El desarrollo del archivo se ha realizado con VBA (Visual Basic for
          Applications) y Excel 2016.
        </p>
      </Article>
      <style jsx>{`
        main {
          margin: 0px auto 40px auto;
          padding: 0 20px;
          max-width: 1300px;
        }
        h1 {
          margin-top: 0;
          text-align: center;
        }
        p {
          line-height: 1.6;
        }
      `}</style>
    </main>
  );
};

Article.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  children: PropTypes.node,
};

export default sre;
