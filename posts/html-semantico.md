---
title: Etiquetas de HTML Semántico
description: HTML Semántico es el uso etiquetas, atributos y valores coherentes al contenido y estructura para que tengan un mayor significado.
date: 2020-09-08
cover: v1599325340/Blog/5/abbc-ebeeb-cbba_vm8uju.png
author: Marco Madera
tags:
  - HTML
  - A11Y
  - Web
---

Esta semana estuvo rondando por mi cabeza un comentario que leí en twitter. No sé si lo entendí del todo bien, trataba sobre crear páginas web que sean leídas por humanos, no para robots. No pude encontrar la referencia, pero estoy  seguro que ya lo había leído en pasadas ocasiones. ¿Considerando los siguientes títulos esto aplica?

<div style="display: block;
    font-size: 1.5em;
    margin-top: 0.83em;
    margin-bottom: 0.83em;
    margin-left: 0px;
    margin-right: 0px;
    font-weight: bold;">¿Esto es un título?</div>

<h2>¿Esto es un título?</h2>

Esto luce exactamente igual, pero cómo sabemos si un robot lo lee igual?
Algo sencillo de hacer es abrir el lector de pantalla con <kbd>Cmd</kbd> + <kbd>F5</kbd> en Mac o con <kbd>ctrl</kbd> + <kbd>win</kbd> + <kbd>enter</kbd> en Windows. Escuchar como lo lee y encuentra la diferencia.

## ¿Qué es HTML Semántico?

<dfn><abbr title="Hyper Text Markup Language">HTML</abbr> Semántico</dfn> es el **uso de etiquetas, atributos y valores coherentes al contenido y estructura** de nuestras páginas. Se mejora la lectura de los elementos y se le agrega un significado semántico. El uso de estas etiquetas permiten a los procesadores de HTML usar nuestro contenido en otros contextos.

Que Mengano quiere agregar un borde a las secciones de una página para distinguirlas mejor, podría hacerlo fácilmente. Un uso más común es con los motores de búsqueda, recolectan la estructura de los sitios para posicionar mejor los que cumplan los estándares.

-------

## Ventajas

- Es importante para el SEO, los motores de búsqueda pueden encontrar la información más relevante para poder posicionar mejor el sitio.
- Es usado para mejorar la [accesibilidad web](https://marcomadera.com/blog/accesibilidad-web/#html-semantico)
- Es fácil de entender sin esfuerzo desde la estructura al contenido, no me imagino lo horrible tener que encontrar elementos entre divs y tablas, en la web de hace años.

-------

## Estructura

Los elementos de estructura son de los más importantes para el SEO, definen con está construida nuestra página y como acceden a la información los agentes terceros.

<style>.section{display:grid;grid-template:50px 70px 300px 70px/1fr 2fr;gap:15px 15px;height:fit-content;border-radius:10px}.header{background:#eddfa9;grid-area:2/1/3/3;border-radius:10px}.nav{background:#edcfa9;grid-area:1/1/2/3;border-radius:10px}.aside{grid-area:3/1/4/2;background:#e89f71;border-radius:10px}.main{grid-area:3/2/4/3;background:#d57149;min-height:auto;position:relative;border-radius:10px}.footer{grid-area:4/1/5/3;background:#d18f5c;border-radius:10px}.article{padding:10px;margin:10px;background:#d5d149;border-radius:10px}.article_header{display:block!important;background:#eddfa9;margin-bottom:10px;padding:10px;border-radius:10px}.article_p{margin:0}.article_section{background:#daa149;margin-bottom:10px;padding:10px;border-radius:10px}.article_title{margin:0}.article_footer{background:#d18f5c;padding:10px;border-radius:10px}.main_section{background:#dfa149;position:absolute;bottom:0;width:calc(100% - 20px);margin:10px;padding:10px;border-radius:10px}</style><section class="section"><nav class="nav"><p>< Nav ></p></nav><header class="header"><p>< Header ></p></header><aside class="aside"><p>< Aside ></p></aside><main class="main"><article class="article"><header class="article_header"><p class="article_p">< Header ></p></header><section class="article_section"><p class="article_title">< Section ></p><p class="article_p">Texto</p></section><footer class="article_footer">&copy; < Footer ></footer></article><section class="main_section"><h3 class="article_title">< Section ></h3><p class="article_p">Texto</p></section></main><footer class="footer">< Footer ></footer></section>

```html
<body>
  <nav><nav>
  <header></header>
  <aside></aside>
  <main>
    <article>
      <header></header>
      <section>
        <h2></h2>
        <p></p>
      </section>
      <footer></footer>
    </article>
    <section>
        <h2></h2>
        <p></p>
    </section>
  </main>
  <footer></footer>
</body>

<!-- No necesariamente tiene que seguir esta estructura -->
```

### main

Esta etiqueta señala al contenido principal de la página. Solo puede existir una etiqueta de este tipo visible por página.

### section

Representa a un contenido genérico en un documento donde no es similar a otro elemento.

### nav

Es la etiqueta diseñada para identificar los enlaces de navegación. Puede haber varías secciones de navegación en una página, no todos los enlaces necesitan de ir dentro de una etiqueta nav.

### article

Se usa esta etiqueta cuando hay contenido repetitivo e independiente, puede tener también header footer y section.

### aside

Esta es una etiqueta que designa un área en la cual hay información suplementaria al contenido principal.

### header

Agrupa la introducción de la página.

### footer

El pie de página suele ser usado para añadir información extra sobre la página, el autor, copyright, avisos legales navegación, etc.

-------

### Títulos de cabecera

Estos van desde el rango h1 a h6, donde el h1 es el más importante. Deben de ir en orden descendente en cada secuencia. Usualmente el user-agent de los navegadores estilan a la etiqueta `<h1>` como el más grande de tamaño.

### address

Como su nombre lo dice, se usa para información de contacto.

<address>Escrito por <a href="mailto:ejemplo@ejemplo.com">Nombre</a>.<br>Visitanos en:<br>Ejemplo.com<br>Dirección<br></address>

```html
<address>
Escrito por <a href="mailto:ejemplo@ejemplo.com">Nombre</a>.<br>
Visitanos en:<br>
Ejemplo.com<br>
Dirección<br>
</address>
```

## Modificadores de texto

### Énfasis

`<em>` es la etiqueta semántica para mostrar énfasis, muestra su contenido en cursiva `<i>`.

<em>Esto es énfasis</em>

```html
<p>
  <em>Esto es énfasis</em>
</p>
```

<i>Esto es cursivo</i>

```html
<p>
  <i>Esto es cursivo</i>
</p>
```

### Marcado

<mark>Esto es una parte marcada porque es relevante.</mark>

```html
<p>
  <mark>Esto es una parte marcada porque es relevante</mark>
</p>
```

### Negrita

`<strong>` es la etiqueta semántica para mostrar importancia en el texto, los navegadores lo muestran en negrita.

<strong>Esto está en negritra porque es importante.</strong>

```html
<p>
  <strong>Esto está en negritra porque es importante.</strong>
</p>
```

<b>Esto está en negritra pero no es importante.</b>

```html
<p>
  <b>Esto está en negritra pero no es importante.</b>
</p>
```

-------

## Saltos

### wbr

Esta etiqueta sirve para indicar dónde está bien que suceda un salto de línea. Permite separar de manera correcta palabras largas o enlaces sin que el contenido se desajuste.

¿que-<wbr>pasaría-<wbr>si-<wbr>no-<wbr>quisieramos-<wbr>usar-<wbr>espacios-<wbr>entre-<wbr>palabras-<wbr>y-<wbr>no-<wbr>queremos-<wbr>que-<wbr>nuestra-<wbr>aplicación-<wbr>tenga-<wbr>overflow-<wbr>al-<wbr>verla-<wbr>en-<wbr>un-<wbr>celular-<wbr>o-<wbr>si-<wbr>tenemos-<wbr>una-<wbr>url-<wbr>como-<wbr>esta:<wbr>http://<wbr>marco<wbr>madera<wbr>.com

```html
<p>¿que-<wbr>pasaría-<wbr>si-<wbr>no-<wbr>quisieramos-<wbr>usar-<wbr>espacios-<wbr>entre-<wbr>palabras-<wbr>y-<wbr>no-<wbr>queremos-<wbr>que-<wbr>nuestra-<wbr>aplicación-<wbr>tenga-<wbr>overflow-<wbr>al-<wbr>verla-<wbr>en-<wbr>un-<wbr>celular-<wbr>o-<wbr>si-<wbr>tenemos-<wbr>una-<wbr>url-<wbr>como-<wbr>esta:<wbr>http://<wbr>marco<wbr>madera<wbr>.com
```

### hr

Representa una regla horizontal, un salto de tema en una sección.

Texto
<hr />
Texto

```html
<p>Texto</p>
<hr />
<p>Texto</p>
```

-------

## Acotaciones

### blockquote

> Bloque acotado

```html
<blockquote>Bloque acotado</blockquote>
```

### q

<q cite="https://example.com">Cuota</q>

```html
<q cite="https://example.com">Cuota.</q>
```

### cite

<q>Cita de texto</q> <cite>— Nombre del autor</cite>

```html
<q>Cita de texto</q> <cite>— Nombre del autor</cite>
```

-------

## Abreviaciones y Definiciones

Las abreviaciones se pueden plasmar en html con la etiqueta `<abbr>` llevan el titulo de la abreviación.
Las definiciones se usan con la etiqueta `<dfn>`, se usan para direccionar a la definición a través de un atributo que puede ser id.

### Abreviación

Esto es una <abbr title="abreviación">abbr</abbr>.

```html
<p>Esto es una <abbr title="abreviación">abbr</abbr>.</p>
```

### Definición

<dfn>HTML Semántico</dfn> es el uso de <abbr title="Hyper Text Markup Language">HTML</abbr>, pero con etiquetas.

```html
<p>
  <dfn>HTML Semántico</dfn> es el uso de
  <abbr title="Hyper Text Markup Language">HTML</abbr>, pero con etiquetas.
</p>
```

### Diálogos

Recibe un atributo open, si no está indicado, no es mostrado.

<dialog open><p>Esto es un cuadro de diálogo</p></dialog>

&nbsp;

&nbsp;

&nbsp;

```html
<dialog open>
  <p>Esto es un cuadro de diálogo</p>
</dialog>
```

### Detalles

Al igual que los diálogos recibe un atributo open para que pueda estar por defecto abierto.

<details><summary>Elemento</summary><p>Contenido del elemento</p></details>

```html
<details>
  <summary>Elemento</summary>
  <p>Contenido del elemento</p>
</details>
```

-------

## Imágenes

Hay diferentes etiquetas para representar elementos visuales en nuestras páginas web con distintos usos en ellas están:

- img
- figure
- picture

### Img

Es la etiqueta más comúnmente utilizada para mostrar imágenes.

![Imagen](https://picsum.photos/100 "Imagen")

```html
<img
  src="https://picsum.photos/100"
  alt="Imagen"
/>
```

### Figure

Figure es una etiqueta de flujo de contenido. Puede ser imagen, video, diagrama, código, una cita, etc. Puede estar acompañado por la etiqueta figcaption que es la leyenda del contenido.

<figure><img src="https://picsum.photos/200" alt="Figura" title="Figura"><figcaption>Imagen Aleatoria</figcaption></figure>

```html
<figure>
  <img src="https://picsum.photos/200" alt="Figura">
  <figcaption>Imagen Aleatoria</figcaption>
</figure>
```

### Picture

La etiqueta `<picture>` es para elementos visuales, puede contener varias etiquetas `<sources>` con condiciones, la primera que cumpla será la que va a ser mostrada. La etiqueta `<source>` puede tener el atributo de cualquier media query. Se pueden mostrar imágenes especiales para modo oscuro o mostrar diferentes imágenes dependiendo del ancho del viewport.

<picture><source srcSet="https://picsum.photos/100" media="(max-width: 500px)" /><source srcSet="https://picsum.photos/200" media="(max-width: 876px)" /><img src="https://picsum.photos/300" alt="Imagen Adaptable" title="Imagen Adaptable" /></picture>

```html
<picture>
  <source srcSet="https://picsum.photos/100" media="(max-width: 500px)" />
  <source srcSet="https://picsum.photos/200" media="(max-width: 876px)" />
  <img
    src="https://picsum.photos/300"
    alt="Imagen Adaptable"
  />
</picture>
```

-------

## Formularios de entrada

Hay diversos tipos de entrada, button, checkbox, date, email, password, range, text, entre otros, la mayoría se pueden tan fácil como lo siguiente.

### Color

Recibe un atributo de nombre value con el valor inicial del color que debe de ser mostrado el elemento.

<input type="color" value="#b50000" readonly={true}>

```html
<input type="color" value="#b50000">
```

### Números

Este formulario es especifico para números se puede definir un rango mínimo y máximo.

<input type="number" min="1" max="5" />

```html
<input type="number" min="1" max="5" />
```

-------

## Barras

Las barras utilizadas en html son de tipo meter que mide a una escala conocida y progress que representa el progreso de una acción.

### meter

La etiqueta meter es utilizada como indicador de una escala conocida, así que cuando el indicador está en un punto específico, puede variar los colores.

<meter min="0" max="100" value="30" low="40" high="70" optimum="100">30 puntos</meter>

```html
<meter min="0" max="100" value="30" low="40" high="70" optimum="100">30 puntos</meter>
```

<meter min="0" max="100" value="60" low="40" high="70" optimum="100">60 puntos</meter>

```html
<meter min="0" max="100" value="60" low="40" high="70" optimum="100">60 puntos</meter>
```

<meter min="0" max="100" value="90" low="40" high="70" optimum="100">90 puntos</meter>

```html
<meter min="0" max="100" value="90" low="40" high="70" optimum="100">90 puntos</meter>
```

### progress

La barra de progreso es utilizada para mostrar el avance de una tarea. Existen dos valores indeterminada y determinada.

Determinada:

<progress value="66" max="100">Determinate</progress>

Indeterminada:

<progress>Indeterminada</progress>

```html
<p>Determinada:</p>

<progress value="66" max="100">Determinada</progress>

<p>Indeterminada:</p>

<progress>Indeterminada</progress>
```

### Select

La etiqueta `<select>` nos da la oportunidad de hacer listas despegables que pueden contener la etiqueta `<optgroup>` para agrupar entre opciones.

<select name="elementos">
  <optgroup label="Grupo 1">
    <option value="elemento1">Elemento1</option>
    <option value="elemento2">Elemento2</option>
  </optgroup>
  <optgroup label="Grupo 2">
    <option value="elemento3">Elemento3</option>
    <option value="elemento4">Elemento4</option>
  </optgroup>
</select>

```html
<select name="elementos">
  <optgroup label="Grupo 1">
    <option value="elemento1">Elemento1</option>
    <option value="elemento2">Elemento2</option>
  </optgroup>
  <optgroup label="Grupo 2">
    <option value="elemento3">Elemento3</option>
    <option value="elemento4">Elemento4</option>
  </optgroup>
</select>
```

-------

## Listas

En las listas el orden puede importar representado por `<ol>` o no representado por `<ul>`, debe de tener como hijo al menos un elemento de lista `<li>`.

### Lista ordenada

Se utiliza para tareas con un orden especifico.

1. Objeto1
2. Objeto2
3. Objeto3
4. Objeto4

```html
<p>Lista ordenada</p>
<ol>
 <li>objeto1</li>
 <li>objeto2</li>
 <li>objeto3</li>
 <li>objeto4</li>
</ol>
```

### Lista sin orden

En estas listas el orden no es importante.

- Objeto1
- Objeto2
- Objeto3
- Objeto4

```html
<p>Lista sin orden</p>
<ul>
 <li>objeto1</li>
 <li>objeto2</li>
 <li>objeto3</li>
 <li>objeto4</li>
</ul>
```

### Listas anidadas

Otra formar de visualizar las listar es anidandolas, llevando la información cada vez más profundo.

- Objeto 1
  - Objeto 2
      1. Objeto 3
      2. Objeto 4
  - Objeto 5
- Objeto 6
  - Objeto 7

```html
<ul>
  <li>Objeto 1
    <ul>
      <li>Objeto 2
        <ol>
          <li>Objeto 3</li>
          <li>Objeto 4</li>
        </ol>
      </li>
      <li>Objeto 5</li>
    </ul>
  </li>
  <li>Objeto 6
    <ul>
      <li>Objeto 7</li>
    </ul>
  </li>
</ul>
```

### Lista con checkbox

En las listas se pueden combinar diferentes elementos como puede ser un checbox para marcar de completada la tarea.

- [ ] pendiente1
- [x] pendiente2

```html
<ul>
  <li>
    <input type="checkbox" readonly>pendiente1
  </li>
  <li>
    <input type="checkbox" readonly checked>pendiente2
  </li>
</ul>
```

-------

## Tablas

Las tablas en HTML es un área que abarcan etiquetas de filas columnas celdas y encabezados.

<style>col{background-color:#e0ece4;}col[span="1"]{background-color:#ebecf1;}col[span="2"]{background-color:#f1f3de;}td[colspan="2"] {background-color:#e0ece4;}</style>

<table><caption>Precio de cosas</caption><colgroup><col span="0" ><col span="1" ><col span="2" ></colgroup><thead><tr><th>Nombre</th><th>Precio</th><th>IVA</th></tr></thead><tbody><tr><td>Elemento 1</td><td>100</td><td>12</td></tr><tr><td>Elemento 2</td><td>200</td><td>24</td></tr></tbody><tfoot><tr><td>Total</td><td colspan="2" >$336</td></tr></tfoot></table>

```html
<table>
  <caption>Precio de cosas</caption>
  <colgroup>
    <col span="0" style="background-color:#e0ece4">
    <col span="1" style="background-color:#ebecf1">
    <col span="2" style="background-color:#f1f3de">
  </colgroup>
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Precio</th>
      <th>IVA</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Elemento 1</td>
      <td>100</td>
      <td>12</td>
    </tr>
    <tr>
      <td>Elemento 2</td>
      <td>200</td>
      <td>24</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Total</td>
      <td colspan="2" style="background-color:#e0ece4">$336</td>
    </tr>
  </tfoot>
</table>
```

-------

## Conclusión

La web no debe de ser hecha solo para humanos. Que las computadoras entiendan lo que estamos plasmando es importante. Comunican el significado a las [tecnologías asistivas](https://marcomadera.com/blog/accesibilidad-web#tecnologias-asistivas "Tecnologías asistivas") y hacen llegar a más personas a través del SEO.

Hemos cubierto varias etiquetas de HTML semántico. Escribir con ellas es mucho más legible y limpio que con solo `divs`. Se deben de usar de manera apropiada siguiendo las recomendaciones y los estándares de la web.

Quedan más etiquetas que no fueron mencionadas, dedica un tiempo para conocer sus usos y posibilidades.
