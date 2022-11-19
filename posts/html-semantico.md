---
title: Etiquetas de HTML Semántico
description: HTML Semántico es el uso etiquetas, atributos y valores coherentes al contenido y estructura para que tengan un mayor significado.
date: 2020-09-08
cover: https://res.cloudinary.com/marcomadera/image/upload/Blog/5/florian-olivo-4hbJ-eymZ1o-unsplash_kzqo3d.jpg
coverAlt: Código HTML.
author: Marco Madera
tags:
  - HTML
  - A11Y
  - Web
---

Esta semana estuvo rondando por mi cabeza un comentario que leí en Twitter. No sé si lo entendí del todo bien, trataba sobre crear páginas web que sean leídas por humanos, no para robots. No pude encontrar la referencia, pero estoy seguro de que ya lo había leído en pasadas ocasiones. ¿Considerando los siguientes títulos esto aplica?

<div style="display: block;
    font-size: 2.2rem;
    margin-top: 1em;
    margin-bottom: .3rem;
    margin-left: 0px;
    margin-right: 0px;
    color: #de2323;
    letter-spacing: -.5px;
    font-weight: 400;">¿Esto es un título?</div>

<h2>¿Esto es un título?</h2>

Esto luce exactamente igual, pero ¿cómo sabemos si un robot lo lee igual?
Algo sencillo de hacer es abrir el lector de pantalla con <kbd>cmd</kbd> + <kbd>f5</kbd> en Mac o con <kbd>ctrl</kbd> + <kbd>win</kbd> + <kbd>enter</kbd> en Windows. Escuchar como lo lee y encuentra la diferencia.

## ¿Qué es HTML Semántico?

<dfn><abbr title="Hyper Text Markup Language">HTML</abbr> Semántico[^semantics]</dfn> es el **uso de etiquetas, atributos y valores coherentes** al contenido y estructura de nuestras páginas. Se mejora la lectura de los elementos y se le agrega un significado semántico. El uso de estas etiquetas permiten a los procesadores de HTML usar nuestro contenido en otros contextos.

[^semantics]: MDN Web Docs & MDN contributors <cite>[Semantics in HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html)</cite>

Que Mengano quiere agregar un borde a las secciones de una página para distinguirlas mejor, podría hacerlo fácilmente. Un uso más común es con los motores de búsqueda, recolectan la estructura de los sitios para posicionar mejor los que cumplan los estándares.

---

## Ventajas

- Es importante para el SEO, los motores de búsqueda pueden encontrar la información más relevante para poder posicionar mejor el sitio.
- Es usado para mejorar la [accesibilidad web](https://marcomadera.com/blog/accesibilidad-web/#html-semantico).
- Es fácil de entender sin esfuerzo desde la estructura al contenido[^all-tags], no me imagino lo horrible tener que encontrar elementos entre varios `div` y tablas, en la web de hace años.

[^all-tags]: Todas las etiquetas HTML [All the tags](https://allthetags.com/)

---

## Estructura

Los elementos de estructura son de los más importantes para el SEO, definen como está construida nuestra página y como acceden a la información los agentes terceros.

<style>.section *{padding:10px;}.section{color:#fff;text-align:center;display:grid;grid-template:50px 70px 300px 70px/1fr 2fr;gap:10px 10px;height:fit-content;border-radius:10px}.header{background:#2193b3;grid-area:2/1/3/3;border-radius:10px}.nav{background:#2ba149;grid-area:1/1/2/3;border-radius:10px}.aside{grid-area:3/1/4/2;background:#b9283b;border-radius:10px}.main{grid-area:3/2/4/3;background:#af462c;min-height:auto;position:relative;border-radius:10px}.footer{grid-area:4/1/5/3;background:#b8972b;border-radius:10px}.article{background:#ef9855;border-radius:10px}.article_header{display:block!important;background:#2193b3;margin-bottom:10px;border-radius:10px}.article_p{margin:0}.article_section{background:#a57020;margin-bottom:10px;border-radius:10px}.article_title{margin:0}.article_footer{background:#b8972b;border-radius:10px}.main_section{background:#a57020;position:absolute;bottom:10px;width:calc(100% - 20px);border-radius:10px}</style><section class="section"><nav class="nav">&#60;Nav&#62;</nav><header class="header">&#60;Header&#62;</header><aside class="aside">&#60;Aside></aside><main class="main">&#60;Main&#62;<article class="article">&#60;Article&#62;<header class="article_header">&#60;Header&#62;</header><section class="article_section">&#60;Section&#62;</section><footer class="article_footer">&#60;Footer&#62; &#169;</footer></article><section class="main_section">&#60;Section&#62;<br>Contenido</section></main><footer class="footer">&#60;Footer&#62;<br>&#169;</footer></section>

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

- Con la etiqueta `<nav>` se pueden identificar los **enlaces de navegación**. Puede haber varías secciones de navegación en una página y no todos los enlaces necesitan de ir dentro de una etiqueta `<nav>`.
- La etiqueta `<header>` agrupa la **introducción de la página**.
- `<aside>` es una etiqueta que designa un área en la cual hay **información suplementaria** al contenido principal.
- La etiqueta `<main>` señala al **contenido principal** de la página. Solo puede existir una etiqueta de este tipo visible por página.
- La etiqueta `<article>` se usa cuando hay **contenido repetitivo** e independiente, puede tener también header footer y section.
- La etiqueta `<section>` representa a un **contenido genérico** en un documento donde no es similar a otro elemento.
- El `<footer>` suele ser usado para añadir **información extra** sobre la página, el autor, copyright, avisos legales navegación, etc.

---

## Presentación de textos

El texto principal que debe de ser el más llamativo es el **título de cabecera**, hay de varios y van desde el rango `<h1>` a `<h6>`, donde el `<h1>` es el más importante. Deben de ir en orden descendente en cada secuencia. Usualmente el _user-agent_ de los navegadores estilan a la etiqueta `<h1>` como el más grande de tamaño y en negrita.

La etiqueta más común para mostrar texto es la de los **párrafos** con la etiqueta `<p>`. Existen etiquetas para modificar el texto y así darle personalidad como la de énfasis `<em>` para <em>realzar la entonación</em> de la frase. `<mark>` para resaltar <mark>información relevante</mark> o `<strong>` para mostrar **palabras o frases importantes**.

Para mostrar texto borrado se usa la etiqueta ~`<strike>`~ <ins>`<del>`</ins> y para insertar texto la etiqueta `<ins>`
La forma de usar las etiquetas anteriores es sencilla, solo poniendo el texto entre la etiqueta de la siguiente forma:

```html
<etiqueta>texto<etiqueta></etiqueta></etiqueta>
```

En <dfn><abbr title="Hyper Text Markup Language">HTML</abbr> Semántico</dfn> existen etiquetas para abreviar `<abbr>` y definir `<dfn>`. Las abreviaciones se pueden plasmar en html con la etiqueta `<abbr>` llevan de atributo `title` el título de la abreviación. Las definiciones se usan con la etiqueta `<dfn>`, se usan para direccionar a la definición a través de un atributo que puede ser `id`.

> Para hacer **acotaciones** tenemos la etiqueta `<blockquote>` para crear un bloque de contenido citado de otra fuente o la etiqueta `<q>` para hacer una <q cite="https://example.com">cita textual</q> la cual acepta el atributo `cite` el cual contendra la referencia de la cita.

```html
<dfn><abbr title="Hyper Text Markup Language">HTML</abbr> Semántico</dfn>

<blockquote>Bloque acotado</blockquote>
<q cite="https://example.com">cita textual</q>
```

Otra forma de mostrar información es con la etiqueta `<address>`. Como su nombre lo dice, se usa para **información de contacto**, se usa típicamente en el pie de página.

<address>Escrito por: <a href="mailto:ejemplo@ejemplo.com">Marco Antonio Madera</a><br>Vísitanos en: <a href="https://marcomadera.com">marcomadera.com</a><br>Dirección: Caborca Sonora, México</address>

```html
<address>
  Escrito por:
  <a href="mailto:ejemplo@ejemplo.com">Marco Antonio Madera</a>.<br />
  Vísitanos en: <a href="https://marcomadera.com">marcomadera.com</a><br />
  Dirección: Caborca Sonora, México
</address>
```

Para **separar el texto** tenemos varias etiquetas. La etiqueta `<br>` representa un salto de línea como es visto en el ejemplo anterior.La etiqueta `<wbr>` sirve para indicar en qué palabra está bien que suceda un salto de línea. Permite separar de manera correcta palabras largas o enlaces sin que el contenido se desajuste. Y la etiqueta `<hr>` representa una línea horizontal que separa bloques de texto.

¿qué-<wbr>pasaría-<wbr>si-<wbr>no-<wbr>quisiéramos-<wbr>usar-<wbr>espacios-<wbr>entre-<wbr>palabras-<wbr>o-<wbr>usar-<wbr>enlaces-<wbr>o-<wbr>extremadamente-<wbr>largos:<wbr>http://<wbr>marco<wbr>madera<wbr>.com<wbr>/blog<wbr>/html-<wbr>semantico

---

Lo de arriba 👆 es una regla horizontal

```html
¿qué-<wbr />pasaría-<wbr />si-<wbr />no-<wbr />quisiéramos-<wbr />usar-<wbr />espacios-<wbr />entre-<wbr />palabras-<wbr />o-<wbr />usar-<wbr />enlaces-<wbr />o-<wbr />extremadamente-<wbr />largos:<wbr />https://<wbr />marco<wbr />madera<wbr />.com<wbr />/blog<wbr />/html-<wbr />semántico

<hr />

<p>Lo de arriba 👆 es una regla horizontal</p>
```

## Elementos interactivos

Un elemento interactivo que tenemos son los **cuadros de diálogo** con la etiqueta `<dialog>`. Recibe un atributo `open` que hará visible el cuadro de diálogo, si este atributo no está indicado no es mostrado el contenido.

<dialog open={true}><p>Esto es un cuadro de diálogo</p></dialog>

&nbsp;

&nbsp;

&nbsp;

```html
<dialog open>
  <p>Esto es un cuadro de diálogo</p>
</dialog>
```

Otro elemento similar a son los **detalles** con la etiqueta `<details>`. De igual forma recibe un atributo `open` para que pueda estar visible por defecto. Este elemento lleva la etiqueta `<summary>`, que es el extracto que será mostrado en todo momento para identificar el contenido.

<details><summary>Elemento</summary><p>Contenido del elemento</p></details>

```html
<details>
  <summary>Elemento</summary>
  <p>Contenido del elemento</p>
</details>
```

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

---

## Imágenes

Hay diferentes etiquetas para representar elementos visuales en nuestras páginas web con distintos usos.
La etiqueta más utilizada para mostrar imágenes es `<img>` toma el atributo `src`, que es la fuente de la imagen y el atributo `alt`, que es la descripción de la imagen.

<image
  light="https://res.cloudinary.com/marcomadera/image/upload/Blog/5/122-100x100_t7cyli.jpg"
  dark="https://res.cloudinary.com/marcomadera/image/upload/Blog/5/122-100x100_t7cyli.jpg"
  alt="Imagen"
  width="100"
  height="100"
/>

```html
<img src="https://picsum.photos/100" alt="Imagen" width="100" height="100" />
```

`<Figure>` es una etiqueta de flujo de contenido. Puede ser imagen, video, diagrama, código, una cita, etc. Puede estar acompañado por la etiqueta `<figcaption>` que es la leyenda del contenido.

<img src="https://res.cloudinary.com/marcomadera/image/upload/w_200,h_200/Blog/5/386-200x200_no3ptr.jpg" alt="Figura" title="Figura" caption="Imagen Aleatoria">

```html
<figure>
  <img src="https://picsum.photos/200" alt="Figura" width="200" height="200" />
  <figcaption>Imagen Aleatoria</figcaption>
</figure>
```

La etiqueta `<picture>` es para **elementos visuales**, puede contener varias etiquetas `<sources>` con condiciones, la primera que cumpla será la que va a ser mostrada. La etiqueta `<source>` puede tener el atributo de cualquier _media query_. Se pueden mostrar imágenes especiales para modo oscuro o mostrar diferentes imágenes dependiendo del ancho del _viewport_.

<picture style="text-align:center;display:block;"><source srcSet="https://res.cloudinary.com/marcomadera/image/upload/Blog/5/510-100x100_nbahln.jpg" media="(max-width: 500px)" /><source srcSet="https://res.cloudinary.com/marcomadera/image/upload/w_200,h_200/Blog/5/1051-200x200_rok2jh.jpg" media="(max-width: 876px)" /><img style="border-radius:10px;" src="https://res.cloudinary.com/marcomadera/image/upload/w_300,h_300/Blog/5/71-300x300_ojopy4.jpg" alt="Imagen Adaptable" title="Imagen Adaptable" /></picture>

```html
<picture>
  <source srcset="https://picsum.photos/100" media="(max-width: 500px)" />
  <source srcset="https://picsum.photos/200" media="(max-width: 876px)" />
  <img src="https://picsum.photos/300" alt="Imagen Adaptable" />
</picture>
```

---

## Formularios de entrada

Los formularios de entrada se identifican con la etiqueta `<input>` y pueden estar dentro de la etiqueta `<form>`. El elemento `<input>` acepta el atributo `type` del cual hay diversos valores como: _button_, _checkbox_, _date_, _email_, _password_, _range_, _text_, entre otros, la mayoría se pueden plasmar tan fácil como los siguientes.

La etiqueta `<input>` de tipo _color_ recibe un atributo de nombre value con el valor inicial del color que debe de ser mostrado el elemento.

<input type="color">

```html
<input type="color" value="#b50000" />
```

La etiqueta `<input>` de tipo _number_ es específico para números. Se puede definir un rango mínimo y máximo.

<input type="number" min="1" max="5" />

```html
<input type="number" value="1" min="1" max="5" />
```

---

## Barras

Las barras utilizadas en HTML son de tipo _meter_ que mide a una escala conocida y _progress_ que representa el progreso de una acción.

La etiqueta `<meter>` es utilizada como indicador de una **escala conocida**, así que cuando el indicador está en un punto específico, puede variar los colores.

<meter min="0" max="100" value="30" low="40" high="70" optimum="100">30 puntos</meter>

```html
<meter min="0" max="100" value="30" low="40" high="70" optimum="100">
  30 puntos
</meter>
```

<meter min="0" max="100" value="60" low="40" high="70" optimum="100">60 puntos</meter>

```html
<meter min="0" max="100" value="60" low="40" high="70" optimum="100">
  60 puntos
</meter>
```

<meter min="0" max="100" value="90" low="40" high="70" optimum="100">90 puntos</meter>

```html
<meter min="0" max="100" value="90" low="40" high="70" optimum="100">
  90 puntos
</meter>
```

La **barra de progreso** es utilizada para mostrar el avance de una tarea. Existen dos valores: indeterminada y determinada.

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

---

## Listas

Las listas pueden ser creadas donde los elementos tengan una secuencia ordenada o desordenada. Sin el importar el tipo de lista debe de contener al menos una etiqueta `<li>` que es la que especifica el contenido.

Para **listas con un orden específico** usamos la etiqueta `<ol>` de _lista ordenada_ que encapsula los elementos de nuestra lista.

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

Las siguientes son **listas donde el orden no es importante**, usamos la etiqueta `<ul>` de _lista desordenada_ que encapsula los elementos de nuestra lista.

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

Otra forma de crear listas con estos elementos son las **listas anidadas**, llevando la información cada vez más profundo como en el siguiente ejemplo:

1. Objeto 1
   1. Objeto 2
   2. Objeto 3
      - Objeto 3
      - Objeto 4
   3. Objeto 5
2. Objeto 6
   1. Objeto 7

```html
<ol>
  <li>
    Objeto 1
    <ol>
      <li>Objeto 2</li>
      <li>
        Objeto 3
        <ul>
          <li>Objeto 3</li>
          <li>Objeto 4</li>
        </ul>
      </li>
      <li>Objeto 5</li>
    </ol>
  </li>
  <li>
    Objeto 6
    <ol>
      <li>Objeto 7</li>
    </ol>
  </li>
</ol>
```

También nos podemos poner más creativos y usar distintas combinaciones con diferentes elementos como puede ser un **checkbox** para marcar de completada la tarea.

- [ ] Pendiente1
- [x] Pendiente2

```html
<ul>
  <li><input type="checkbox" readonly />Pendiente1</li>
  <li><input type="checkbox" readonly checked />Pendiente2</li>
</ul>
```

---

## Tablas

Las tablas en HTML es un área que abarcan etiquetas de filas columnas celdas y encabezados.

<colors textcolor></colors>

<style>table{color: #fff;}col{background-color:#133163;}col[span="1"]{background-color:#293882;}col[span="2"]{background-color:#42461c;}td[colspan="2"] {background-color:#1c7f3d;}</style>

<table><caption class="textcolor">Precio de cosas</caption><colgroup><col span="0"><col span="1"><col span="2"></colgroup><thead><tr><th>Nombre</th><th>Precio</th><th>IVA</th></tr></thead><tbody><tr><td>Elemento 1</td><td>100</td><td>12</td></tr><tr><td>Elemento 2</td><td>200</td><td>24</td></tr></tbody><tfoot><tr><td>Total</td><td colspan="2">$336</td></tr></tfoot></table>

```html
<table>
  <caption>
    Precio de cosas
  </caption>
  <colgroup>
    <col span="0" style="background-color:#ff4e4a" />
    <col span="1" style="background-color:#293882" />
    <col span="2" style="background-color:#f1f3de" />
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
      <td colspan="2" style="background-color:#1c7f3d">$336</td>
    </tr>
  </tfoot>
</table>
```

---

## Conclusión

La web no debe de ser hecha solo para humanos. Que las computadoras entiendan lo que estamos plasmando es importante. Comunican el significado a las [tecnologías asistivas](https://marcomadera.com/blog/accesibilidad-web#tecnologias-asistivas "Tecnologías asistivas") y hacen llegar a más personas a través del SEO.

Hemos cubierto varias etiquetas de HTML semántico. Escribir con ellas es mucho más legible y limpio que con solo elementos `div`. Se deben de usar de manera apropiada siguiendo las recomendaciones y los estándares de la web.

Quedan más etiquetas que no fueron mencionadas, dedica un tiempo para conocer sus usos y posibilidades.
