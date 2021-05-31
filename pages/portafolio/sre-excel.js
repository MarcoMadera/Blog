import Seo from "components/Seo";
import PropTypes from "prop-types";
import { H1, H2, Img, P, Kbd, Ul, Li, Abbr } from "components/tags";
import { Excel, JavascriptSquare, Html5, Css, Vba } from "components/icons";
import { useEffect } from "react";

function Article({ title, img, children }) {
  useEffect(() => {
    fetch("/api/views/portafolio-sre", {
      method: "POST",
    });
  }, []);
  return (
    <>
      <article>
        <div>
          <H2>{title}</H2>
          {children}
        </div>
        <div>
          <Img src={img} alt={title} />
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
          @media print, screen and (max-width: 876px) {
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
}

export default function sreExcel() {
  return (
    <main id="main">
      <Seo title="Portafolio 💼 | SRE Excel" />
      <H1>Registro de trámites en Excel</H1>
      <Article
        title="Página web"
        img="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550,h_309/v1595275322/Potfolio/sreExcel/Reporte_Diario_db5g11.png"
      >
        <P>
          El funcionamiento es que con ayuda de un <em>bookmarlet</em>, se
          recolecta la información necesaria. Al finalizar la jornada, se puede
          acceder desde la página web donde se podrá imprimir o descargar los
          datos para después vaciarlos a Excel de forma sencilla.
        </P>
        <Html5 width={50} height={50} />
        <Css width={50} height={50} />
        <JavascriptSquare width={50} height={50} />
      </Article>
      <Article
        title="Vista Excel"
        img="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550,h_297/v1595275323/Potfolio/sreExcel/Data_splifz.png"
      >
        <P>
          Esta es la vista general del <em>dashboard</em>, aquí es donde el
          usuario convive. Todas las funciones se pueden acceder desde esta
          hoja:
          <Ul>
            <Li>Registrar los trámites.</Li>
            <Li>Generar gráficas.</Li>
            <Li>Generar el reporte.</Li>
            <Li>Visualizar el progreso y eficiencia.</Li>
            <Li>Hacer comparaciones.</Li>
          </Ul>
        </P>
        <Excel width={50} height={50} />
      </Article>
      <Article
        title="Proceso de registro"
        img="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550,h_297/v1595275323/Potfolio/sreExcel/SRE_Registro_fbjsqg.png"
      >
        <P>
          El registro se puede hacer manual: se selecciona la oficina, la fecha
          que por defecto será el día actual omitiendo los días no hábiles y sin
          poder acceder a días futuros y se vacían los datos en los campos
          especificados. Se tiene la opción de no reporte y un espacio
          obligatorio para explicar el motivo.
        </P>
        <P>
          La otra forma es registro es pegar directamente lo descargado de la
          página y se llenará rápidamente.
        </P>
      </Article>
      <Article
        title="Almacenamiento de datos"
        img="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550,h_298/v1595275321/Potfolio/sreExcel/SRE_Datos_rznxtt.png"
      >
        <P>
          Los datos van a una hoja aparte que no es accesible al usuario para
          evitar modificaciones al momento de compartir el archivo. Usualmente
          está oculta y con contraseña.
        </P>
      </Article>
      <Article
        title="Generar gráficas"
        img="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550,h_298/v1595275324/Potfolio/sreExcel/SRE_Gen_Graph_iz4vgw.png"
      >
        <P>
          Generar gráficas tiene múltiples opciones intuitivas. La interfaz
          ofrece una vista prevía que cambia en tiempo real conforme se incluyen
          campos.
        </P>
      </Article>
      <Article
        title="Gráfica generada"
        img="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550,h_296/v1595275323/Potfolio/sreExcel/SRE_Graph_Generada_gg2do4.png"
      >
        <P>
          La gráfica se puede generar en una hoja nueva, libro nuevo, archivo
          PDF y/o imagen PNG, si se genera en hoja nueva se puede modificar los
          estilos a preferencia y después exportarla a PDF o imagen PNG con
          atajos <Kbd>ctrl</Kbd> + <Kbd>p</Kbd> o <Kbd>ctrl</Kbd> + <Kbd>g</Kbd>{" "}
          respectivamente.
        </P>
      </Article>
      <Article
        title="Generar reporte"
        img="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550,h_296/v1595275324/Potfolio/sreExcel/SRE_Gen_Reporte_yvv11c.png"
      >
        <P>
          El proceso es similar al generar gráficas. Se selecciona el rango de
          fechas a tomar en cuenta y los demás campos necesarios. Como opciones
          adicionales se puede configurar el tipo de archivo; en PDF o en una
          nueva hoja de Excel y la orientación de la hoja; vertical u
          horizontal.{" "}
        </P>
      </Article>
      <Article
        title="Resultado al generar reporte PDF"
        img="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550,h_309/v1595275324/Potfolio/sreExcel/SRE_Reporte_PDF_yvvswb.png"
      >
        <P>
          Al igual que al generar una gráfica, el reporte se puede personalizar
          al momento de exportarlo a una nueva hoja de Excel para después
          exportarla con <Kbd>ctrl</Kbd> + <Kbd>p</Kbd>. Al escoger el tipo de
          PDF directamente tomará el estilo por defecto mostrado.
        </P>
      </Article>
      <Article
        title="Programación"
        img="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550,h_297/v1595275322/Potfolio/sreExcel/SRE_Programacion_aosbtb.png"
      >
        <P>
          El desarrollo del archivo se ha realizado con{" "}
          <Abbr
            title="Visual Basic for
          Applications"
          >
            VBA
          </Abbr>{" "}
          (<em>Visual Basic for Applications</em>) y Excel 2016.
        </P>
        <Vba width={50} height={50} />
      </Article>
      <style jsx>{`
        main {
          margin: 0px auto 40px auto;
          padding: 0 20px;
          max-width: 1300px;
        }
        :global(h1) {
          margin-bottom: 0.67em;
          text-align: center;
        }
      `}</style>
    </main>
  );
}

Article.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  children: PropTypes.node,
};
