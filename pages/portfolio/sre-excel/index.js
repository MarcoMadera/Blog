import Seo from "../../../components/Seo";
import { colors } from "../../../styles/theme";
const sre = () => {
  return (
    <main id="main">
      <Seo
        title="Portafolio - SRE Excel"
        url="https://marcomadera.com/sre-excel"
      />
      <h1>Registro de trámites en Excel</h1>
      <article>
        <section>
          <h2>Navegador</h2>
          <p>
            El funcionamiento es que con ayuda de un bookmarlet, se recolecta la
            información necesaria, y finalizar la jornada se puede acceder a la
            página del reporte para mirar los reporte en el navegador, éste se
            puede imprimir o descargar para después vaciarlo en excel de forma
            sencilla.
          </p>
        </section>
        <div>
          <img
            loading="lazy"
            src="https://res.cloudinary.com/marcomadera/image/upload/v1595275322/Potfolio/sreExcel/Reporte_Diario_db5g11.png"
            alt="Navegador"
          />
        </div>
      </article>
      <article>
        <section className="changeOrder">
          <h2>Vista Excel</h2>
          <p>
            Esta es la vista general del dashboard, aquí es donde el usuario
            convive, todo se hace en está hoja, registrar los trámites, generar
            gráficas, generar el reporte, ver el progreso, eficiencia y
            comparaciones.
          </p>
        </section>
        <div>
          <img
            loading="lazy"
            src="https://res.cloudinary.com/marcomadera/image/upload/v1595275323/Potfolio/sreExcel/Data_splifz.png"
            alt="Vista Excel"
          />
        </div>
      </article>
      <article>
        <section>
          <h2>Proceso de registro</h2>
          <p>
            El registro se puede hacer manual, seleccionar la oficina, fecha y
            vaciar los datos o también se puede pegar y que se llene
            rápidamente.
          </p>
        </section>
        <div>
          <img
            loading="lazy"
            src="https://res.cloudinary.com/marcomadera/image/upload/v1595275323/Potfolio/sreExcel/SRE_Registro_fbjsqg.png"
            alt="Registro"
          />
        </div>
      </article>
      <article>
        <section className="changeOrder">
          <h2>Almacenamiento de datos</h2>
          <p>
            Los datos van a una hoja aparte que no es accesible al usuario para
            evitar modificaciones al momento de compartir el archivo, usualmente
            está oculta y con contraseña.
          </p>
        </section>
        <div>
          <img
            loading="lazy"
            src="https://res.cloudinary.com/marcomadera/image/upload/v1595275321/Potfolio/sreExcel/SRE_Datos_rznxtt.png"
            alt="Datos"
          />
        </div>
      </article>
      <article>
        <section>
          <h2>Generar gráfica</h2>
          <p>
            Generar gráficas tiene múltiples opciones, la interfaz ofrece una
            vista prevía que cambia conforme se seleccionan las opciones.
          </p>
        </section>
        <div>
          <img
            loading="lazy"
            src="https://res.cloudinary.com/marcomadera/image/upload/v1595275324/Potfolio/sreExcel/SRE_Gen_Graph_iz4vgw.png"
            alt="Generar Grafica"
          />
        </div>
      </article>
      <article>
        <section className="changeOrder">
          <h2>Gráfica generada</h2>
          <p>
            La gráfica se puede generar en una hoja nueva, libro nuevo, archivo
            PDF y/o imagen PNG, si se genera en hoja nueva se puede modificar
            los estilos a preferencia y después exportarla a PDF o imagen PNG
            con atajos <kbd>ctrl</kbd> + <kbd>p</kbd> o <kbd>ctrl</kbd> +{" "}
            <kbd>g</kbd> respectivamente.
          </p>
        </section>
        <div>
          <img
            loading="lazy"
            src="https://res.cloudinary.com/marcomadera/image/upload/v1595275323/Potfolio/sreExcel/SRE_Graph_Generada_gg2do4.png"
            alt="Grafica generada"
          />
        </div>
      </article>
      <article>
        <section>
          <h2>Generar reporte</h2>
          <p>
            El proceso es similar, se selecciona el rango de fechas y las
            opciones necesarias, se puede confirgurar el tipo de archivo PDF o
            nueva hoja y orientación de la hoja.{" "}
          </p>
        </section>
        <div>
          <img
            loading="lazy"
            src="https://res.cloudinary.com/marcomadera/image/upload/v1595275324/Potfolio/sreExcel/SRE_Gen_Reporte_yvv11c.png"
            alt="Generar Reporte"
          />
        </div>
      </article>
      <article>
        <section className="changeOrder">
          <h2>Resultado al generar reporte PDF</h2>
          <p>
            Al igual que la gráfica, el reporte se puede personalizar al
            exportarlo a una nueva hoja en lugar de directamente a PDF que tiene
            un estilo por defecto.
          </p>
        </section>
        <div>
          <img
            loading="lazy"
            src="https://res.cloudinary.com/marcomadera/image/upload/v1595275324/Potfolio/sreExcel/SRE_Reporte_PDF_yvvswb.png"
            alt="Reporte PDF"
          />
        </div>
      </article>
      <article>
        <section>
          <h2>Programación</h2>
          <p>
            El desarrollo del archivo se ha realizado con VBA (Visual Basic for
            Applications) y Excel 2016.
          </p>
        </section>
        <div>
          <img
            loading="lazy"
            src="https://res.cloudinary.com/marcomadera/image/upload/v1595275322/Potfolio/sreExcel/SRE_Programacion_aosbtb.png"
            alt="VBA Programacion"
          />
        </div>
      </article>
      <style global jsx>{`
        .changeOrder {
          order: 2;
        }
        @media screen and (max-width: 876px) {
          .changeOrder {
            order: unset;
          }
        }
      `}</style>
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
        section a {
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
        article > div {
          padding: 40px;
        }
        section {
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
          article > div,
          article > section {
            padding: 0px;
          }
        }
      `}</style>
    </main>
  );
};

export default sre;
