import Seo from "components/Seo";
import { H1, H2, Img, P, Kbd, Ul, Li, Abbr } from "components/tags";
import { Excel, JavascriptSquare, Html5, Css, Vba } from "components/icons";
import { PropsWithChildren, ReactElement } from "react";
import useAnalytics from "hooks/useAnalytics";

interface ArticleProps {
  title: string;
  img: string;
  blurDataURL: string;
  fullHeight: number;
  fullWidth: number;
}

function Article({
  title,
  img,
  children,
  blurDataURL,
  fullHeight,
  fullWidth,
}: PropsWithChildren<ArticleProps>): ReactElement {
  return (
    <>
      <article>
        <div>
          <H2>{title}</H2>
          {children}
        </div>
        <div>
          <Img
            src={img}
            alt={title}
            blurDataURL={blurDataURL}
            fullImage={{
              img: { height: fullHeight, width: fullWidth, src: img },
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

export default function SreExcel(): ReactElement {
  useAnalytics("portafolio-sre");

  return (
    <main id="main">
      <Seo title="Portafolio 💼 | SRE Excel" />
      <H1>Registro de trámites en Excel</H1>
      <Article
        title="Página web"
        img="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550,h_309/v1595275322/Potfolio/sreExcel/Reporte_Diario_db5g11.png"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAnklEQVQImWNYu2KJu4P9wkWL5s2dW1FRkZCU4O/vv2rVyhcvXty4cYPh////wSHBmpqauTm5xUVFYWFhKioqNjY2DAwM9fUNDN+/f/f09LSxsSksLMzKyoqJiVGQlw8LC+vt7b1//z5It7+/n42NdVZWVmFhYVhYmIK8fExMzH8wAEk7OTmamZllZmZmZWVFRUdJSUqGhYV9//4dKA0ArTpIVDzJ5cEAAAAASUVORK5CYII="
        fullWidth={1366}
        fullHeight={768}
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
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAApklEQVQImQGbAGT/AH93ckw5OIV5eHluanJnYKihmtHQys3Ixo99ddnW0wB2bW1kWlpTRUZmXV1XTE2yra3RzMzW1dXPzs/Y2NgAyMLAQygjaE5KnI6LIQAA3t3craenalRTcVdX9/j4AK+npEo0L11IQ41/fV9HQqOXlayioqiamqSUlN3Y2ADu7+/6/v79///29/ft7e28tLS5rq68tLS6sLDW09MiElq34LOD+gAAAABJRU5ErkJggg=="
        fullWidth={1364}
        fullHeight={736}
      >
        <P>
          Esta es la vista general del <em>dashboard</em>, aquí es donde el
          usuario convive. Todas las funciones se pueden acceder desde esta
          hoja:
        </P>
        <Ul>
          <Li>Registrar los trámites.</Li>
          <Li>Generar gráficas.</Li>
          <Li>Generar el reporte.</Li>
          <Li>Visualizar el progreso y eficiencia.</Li>
          <Li>Hacer comparaciones.</Li>
        </Ul>
        <Excel width={50} height={50} />
      </Article>
      <Article
        title="Proceso de registro"
        img="https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,w_550,h_297/v1595275323/Potfolio/sreExcel/SRE_Registro_fbjsqg.png"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAApklEQVQImQGbAGT/AGZeWiMREWddWmlfW3x0bpuVjr69uMC7uXJiWtDNzABXT09EPDwrICBVTk+NiIi2tLS+vr7Ly8rGxsbQ0NAAu7SzHQAAMRsXsaqq6uzs9Pb2wMDAPioqUjo69vb2AJ2UlCQRCzUiHoJ3d9jY2JuPj4uBgZWHh5OEhNXS0gDq7Oz6/v79///q7OzIx8aZkJCdlJSnnp6nnp7LyMi30lZ/m9mXeAAAAABJRU5ErkJggg=="
        fullWidth={1366}
        fullHeight={738}
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
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAApklEQVQImQGbAGT/AAwNAIKEc5OUhY6PgY6PgYOFeF9gVEJDOJSVh5WWhwA5OizR0rnr7dTj5cvj5cvR07q7vKV6e2fo6M78/uMAHyAgnZ+ftre3r6+wr6+wnp+fjo+QV1hZtre3v8DBAAAAA3d4epSVmIyOj4aHin+AgmBgYzU2OY+Qk5eYmwBOT1DO0NLo6uvp6+7p6+7a293S0tWUlZj3+/z+//9Yv1o/ZOULzgAAAABJRU5ErkJggg=="
        fullWidth={1364}
        fullHeight={738}
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
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAApklEQVQImQGbAGT/AGRbVyQTEmhdXHFpZJmUj5qUjbCuqsK9vXJhWdDNzABWTk5BODgwJCMwKyxUVFV2dnaNjY3Ly8vDwsPQ0NAAubKyHQAAOyUhfHd3hISFm5mZnp+fRjIyTTY29fb2AJqRkCIIADQiHlVNTZOVlYGAgIOBgZCCgox8fNTPzwDq7Oz6/v79///Oz8+5ubm2trarqqqon5+on5/Ozc2T5U+iurYp9wAAAABJRU5ErkJggg=="
        fullWidth={1364}
        fullHeight={738}
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
        blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAFAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEG/8QAHxAAAgEEAwEBAAAAAAAAAAAAAQIDAAQFERIUMQbR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANb89l8rfMs9vlLmzsIZTB0Y4oGUhWB3yMfLZ89qTZYLK69dTpiNkj8pSg//2Q=="
        fullWidth={1366}
        fullHeight={736}
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
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAApklEQVQImQGbAGT/AGhfWycXFmxgX3VrZod/eqKdl8XCvsS+vXZkXdLQzgBbUlJGPT0wJCRJRERvbGx8e3yRkZHNzc3IyMjS0tIAvba1HQAAPCUhfnl3gIGBfX5/h4mJRjIyVT099/j4AKObmSYUDz4rJ3dvbZWVllZNTV1UVJiKipWGhtfV1QDn6en4/v78///n6enKycmdlJSelpWpoaGroqLOy8sKc1BL05TXEQAAAABJRU5ErkJggg=="
        fullWidth={1366}
        fullHeight={736}
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
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAo0lEQVQImRXJwQ+BUBwA4Lc5cHJC0mpjU46hZmPL+PNZWkmzxlY9mV8qLVbai8x3/VCt3hSEkbJcL5SVKMmiJE9nc3E84Yc8Qg1EsX1L01L7mLnuG3uFf8kxrsIgDoDmBqhFsztVtbYbsO0Eu0/fD8+nT5o6ntfuMqjT40zDcAz9dfVJHJIkyu9QlQRuQDHcvw970zH0DKB8RN8kLsKgIgXAv38PlF3tTSALewAAAABJRU5ErkJggg=="
        fullWidth={1366}
        fullHeight={738}
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
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAjUlEQVQImWNgYGSztLLx9Q1oaWndtGnjgQMHs4oqfaOSfaOSPUPjGMzMzHx9A+bPX3jnzp0fP37+B4O///5BEAMTC1tyanp9fePatesOHjj86tXrjx8/QdCPHz8YpKSk6urqe3ombti48fjxE2CJjwjpAwcOrF69ur6+ceLEiVu2bLl69RrE/P///wOlAXh+Zt4tmic3AAAAAElFTkSuQmCC"
        fullWidth={1366}
        fullHeight={738}
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
