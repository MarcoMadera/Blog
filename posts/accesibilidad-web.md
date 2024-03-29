---
title: La accesibilidad en la web
description: Las pautas de accesibilidad para el contenido para la web son recomendaciones para crear contenido web más accesible.
date: 2020-07-20
cover: https://res.cloudinary.com/marcomadera/image/upload/Blog/3/SGY0LIfTKZ4-laptop_lidleh.jpg
coverAlt: Una laptop sobre una mesa.
author: Marco Madera
tags:
  - A11Y
  - Web
  - HTML
  - CSS
  - JavaScript
---

Según el Informe mundial sobre la discapacidad[^1] publicado en el año 2011 estima que **más de mil millones de personas viven con algún tipo de discapacidad**. Alrededor del 15% de la población mundial.

[^1]: Organización mundial de la salud (2011) [Informe mundial sobre la discapacidad](https://www.who.int/disabilities/world_report/2011/accessible_es.pdf)

La accesibilidad web es la práctica continua de asegurarnos que todo lo que creamos para la web se puede usar, interpretar y operar por una variedad de personas en una variedad de situaciones.

Web Content Accessibility Guidelines (WCAG[^2]) creadas por W3C son recomendaciones para crear contenido web más accesible, las cuales también han sido ratificadas por la ISO, como estándar ISO/IEC 40500:2012.

[^2]: <cite>[Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)</cite>

## ¿Por qué implementar accesibilidad en la web?

Una declaración de accesibilidad **demuestra compromiso** y proporciona detalles a los usuarios con discapacidades sobre las implementaciones que pueden usar y mejorar su experiencia en el sitio web.

- Puede aumentar el SEO de nuestro sitio web
- Para incluir a personas en situaciones de discapacidad.
- Para mejorar la usabilidad de nuestros proyectos.
- Porque en algunos países es la ley.

## Principios WCAG

1. [Perceptible](https://www.w3.org/TR/WCAG21/#perceivable "Perceptible"): Crear alternativas textuales para todo contenido no textual. Facilitar a los usuarios ver y oír el contenido, poder **presentar el contenido de diferentes formas** sin perder información o estructura.

2. [Operable](https://www.w3.org/TR/WCAG21/#operable "Operable"): Que toda la **funcionalidad** esté disponible desde el teclado. Que sea navegable, dar el tiempo suficiente para leer en elementos dinámicos y dar opciones de tiempo.

3. [Comprensible](https://www.w3.org/TR/WCAG21/#understandable "Comprensible"): Ser legible, tamaños y contrastes de textos adecuados, hacer la página predecible, tener **instrucciones claras**.

4. [Robusto](https://www.w3.org/TR/WCAG21/#robust "Robusto"): Mantener **compatibilidad** con las aplicaciones de usuario actuales y futuras, navegadores y dispositivos, incluyendo las tecnologías asistivas y tener un buen performance.

Los criterios de WCAG comprende 3 niveles de conformidad:

- A el nivel más bajo.
- AA requiere cumplir los criterios del nivel A y AA
- AAA el nivel más alto requiere cumplir los criterios del nivel AA y AAA.

## Tecnologías asistivas

Las tecnologías asistivas sirven de **ayuda para las personas con dificultades**. Ayudan a realizar tareas regulares con el objetivo de mejorar su calidad de vida y su integración. Algunas de estas tecnologías son:

- Lectores de pantalla
- Extensiones que manipulan el CSS
- Lupa de pantalla
- Control de voz
- Varilla bucal

## HTML Semántico

Un buen HTML resuelve muchos aspectos de la accesibilidad con el uso correcto de etiquetas y atributos. Usar [HTML semántico](https://marcomadera.com/blog/html-semantico "Blog HTML Semántico") ayudará al navegador a **incluir significado** en el árbol de accesibilidad. Así los lectores de pantalla pueden entender el rol, propiedades y estado que tiene esa parte de nuestro código.

![Chrome Accesibility](https://res.cloudinary.com/marcomadera/image/upload/f_auto,c_scale,w_705,h_296,dpr_auto/Blog/3/Accesibilidad1_pqz4vx.png "Chrome Accesibility")

### No recomendado:

```html
<body>
  <div></div>
  <div></div>
  <div></div>
</body>
```

### Recomendado:

```html
<body>
  <header></header>
  <main></main>
  <footer></footer>
</body>
```

## Imágenes

Usar el atributo `alt` en las imágenes le ayuda a los lectores de pantalla al momento de encontrarse con alguna imagen. Los que hace es leer el contenido de este atributo que será presentada al usuario como una **descripción**. También se mostrará este texto si es dado caso que la imagen no se encuentre disponible.

```html {"addedLines": [], "removedLines": [], "highlight": [3]}
<img
  src="img src"
  alt="texto mostrar en caso que no esté disponible la imagen"
/>
```

<note type="info" inline>Otro aprovechamiento de accesibilidad con las imágenes puede ser tal y como se usa en este sitio web, al darle clic a una imagen se muestra una de mayor tamaño.</note>

### Uso de scope en tablas

El uso del _scope_ ayuda a los lectores de pantalla a seguir el **orden correcto**.

```html {"addedLines": [], "removedLines": [], "highlight": [7,8,12,17]}
<table border="1">
  <caption>
    Contact Information
  </caption>
  <tr>
    <td></td>
    <th scope="col">Name</th>
    <th scope="col">City</th>
  </tr>
  <tr>
    <td>1.</td>
    <th scope="row">Joel Garner</th>
    <td>Pittsburgh</td>
  </tr>
  <tr>
    <td>2.</td>
    <th scope="row">Clive Lloyd</th>
    <td>Baltimore</td>
  </tr>
</table>
```

### Roles apropiados

Los siguientes elementos tienen la apariencia de botón pero con roles diferentes:

<style>#anchor{margin-right:20px;}.blog3__container{position:relative}.share-box div:nth-of-type(5) span:nth-of-type(2) span:nth-of-type(1){display:block;width:1px;height:3px;background:#3ace3a;transform:rotate(-45deg) translate(-2px,7px)}.share-box div:nth-of-type(5) span:nth-of-type(2) span:nth-of-type(2){display:block;width:1px;height:8px;border-radius:0;background:#3ace3a;transform:rotate(35deg) translate(5px,-4px)}.share-box{position:absolute;width:fit-content;height:fit-content;background-color:#fff;border-radius:6px;top:-135px;visibility:hidden;padding:10px;box-shadow:0 0 8px 0 rgba(0,0,0,.3)}.share-box div{font-size:13px;align-items:center}.share-box div:nth-of-type(1){display:grid;grid-template-columns:1fr auto;margin-bottom:15px}.share-box div:nth-of-type(2){display:grid;grid-template-columns:1fr 1fr;margin-bottom:8px}.share-box div:nth-of-type(3){display:grid;grid-template-columns:1fr auto;margin-bottom:6px}.share-box div:nth-of-type(4){display:grid;grid-template-columns:1fr auto;margin-bottom:6px}.share-box div:nth-of-type(5){display:grid;grid-template-columns:1fr auto}.share-box div span{line-height:1;margin:0;padding:0;width:fit-content;font-family:consolas;color:#b3b3b3}.share-box div:nth-of-type(1) span:nth-of-type(1){color:#881280;font-size:13px}.share-box div:nth-of-type(1) span:nth-of-type(2){font-size:13px}.share-box div:nth-of-type(2) span:nth-of-type(1){color:#6c7278;font-size:11px}.share-box div:nth-of-type(2) span:nth-of-type(2){display:block;width:100%;height:1px;background:#ddd}.share-box div:nth-of-type(3) span:nth-of-type(2){color:#6c7278}.share-box div:nth-of-type(4) span:nth-of-type(2){color:#6c7278}.share-box div:nth-of-type(5) span:nth-of-type(2){width:14px;height:14px;border-radius:50%;border:1px solid #3ace3a}.triangle-down{width:0;height:0;border-left:10px solid transparent;border-right:10px solid transparent;border-top:10px solid #fff;position:absolute;bottom:-11px;left:20%}#butons:hover+.share-box{visibility:visible;left:106.5px}#anchor:hover+.share-box{visibility:visible}</style><div class="blog3__container"><actionanchor href="#anchor" id="anchor" >ancla</actionanchor><div class="share-box"><div><span>anchor</span><span>104.25 x 38</span></div><div><span>ACCESIBILITY</span><span></span></div><div><span>Name</span><span>ancla</span></div><div><span>Role</span><span>link</span></div><div><span>Keyboard-focusable</span><span><span></span><span></span></span></div><div class="triangle-down"></div></div><actionbutton id="butons">botón</actionbutton><div class="share-box"><div><span>button</span><span>106.5 x 38</span></div><div><span>ACCESIBILITY</span><span></span></div><div><span>Name</span><span>botón</span></div><div><span>Role</span><span>button</span></div><div><span>Keyboard-focusable</span><span><span></span><span></span></span></div><div class="triangle-down"></div></div></div>

Hay que **definir los roles de acuerdo a la función que realizarán**. En este caso el primer "botón" tiene la funcionalidad de enlazar a otra página por lo que debería ser implementado como hipervínculo para que tome el rol de link.

### Atributos Aria

Estos atributos se pueden añadir a cualquier etiqueta HTML para **comunicar cambios especiales al DOM** de nuestra aplicación. Roles propiedades y estados. Siempre es preferible usar un elemento HTML semántico correcto si es que existe en lugar de usar ARIA (accesible rich internet applications[^aria]).

[^aria]: [W3C Web Accessibility Initiative](https://www.w3.org/WAI/standards-guidelines/aria/)

- Roles: Define el tipo general del objeto. Comunican a los navegadores cuáles son las interacciones que debería esperar y cómo se va a usar este objeto en nuestro proyecto. Se usan en situaciones muy específicas, es mejor depender del HTML semántico para comunicar los roles. Atributo: `role`.

- Propiedades: Comunican atributos que son esenciales para el comportamiento o significado de un elemento, pero que suelen comunicar visualmente. Atributo: `aria-label`.

- Estado: Comunican estados y cambios de estados en elementos que se suelen comunicar visualmente `aria-hidden="true"` para que el lector de pantalla solo lea los elementos visibles en el estado actual de la página.

### Estilos

Para tener más empatía con las personas con discapacidades visuales podemos emular a través de las dev tools de Google Chrome a través de las siguientes opciones:

<code lang="en">Customize and control DevTools > More tools > Rendering > Emulate deficiencies</code>

![Emular visión](https://res.cloudinary.com/marcomadera/image/upload/f_auto,c_scale,w_705,h_310,dpr_auto/Blog/3/Accesibilidad2_duoax2.png "Emular visión")

### Color y contraste

Podemos utilizar las herramientas de Google Chrome DevTools para ver el contraste con el background y ver si cumplen con las especificaciones AA y AAA.

![Herramienta de contraste](https://res.cloudinary.com/marcomadera/image/upload/f_auto,c_scale,w_360,h_383,dpr_auto/Blog/3/Accesibilidad3_uybwkk.png "Herramienta de contraste")

### Focus

El enfoque da una guía visual al usuario sobre los elementos interactivos. Si un usuario solo navega con el teclado, <kbd>tab</kbd> para avanzar y <kbd>shift</kbd>+<kbd>tab</kbd> para retroceder, es importante que todos los elementos interactivos tengan un enfoque para guiar al usuario.

<style>#inputToFocus:focus{box-shadow:0 0 5px #da0000;}</style><label><input type="text" id="inputToFocus" size="25" placeholder="Selecciona aquí para enfocarme"/></label>

En este caso tal como sucede en todos los elementos interactivos de este sitio web se rodea el elemento con un delineado para dar a entender que se está seleccionando este elemento.

### Skip Links

Es una técnica[^skip-link] que permite **navegar directamente al contenido principal**. El primer elemento de la página sería este enlace. Con esto se logra que con cada cambio de página al navegar con el teclado no tener que pasar de nuevo por contenido repetitivo.

[^skip-link]: W3C - Adding a link at the top of each page that goes directly to the main content area - [Techniques for WCAG 2.1](https://www.w3.org/WAI/WCAG21/Techniques/general/G1)

```html {"addedLines": [], "removedLines": [], "highlight": [15]}
<style>
  .skip-link {
    display: block;
    line-height: 0;
    height: 0;
    width: 0;
  }

  .skip-link:focus,
  .skip-link:active {
    height: auto;
    width: auto;
  }
</style>
<a href="#main" className="skip-link">Saltar al contenido</a>
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>
<main id="main"></main>
```

---

### Tabindex

Es un atributo que **indica si un elemento puede ser enfocado**, y si participa en la navegación secuencial del teclado. Acepta tres valores:

Valor negativo(-1): El elemento debe ser enfocado, pero no debe de ser accesible a través de la navegación, puede ser usado en carruseles donde elementos no son visibles.

Valor positivo (>0): Debe poder ser enfocado y su orden relativo es definido por el valor del atributo.

Valor de 0: Debe ser enfocado y ser accesible a través de la navegación secuencial del teclado, sigue el orden de la estructura del HTML.

---

## Añadir acciones con el teclado

Podemos añadir acciones con el teclado escuchando las teclas. [Guía de códigos](http://keycode.info/ "Guía de códigos")

Existen teclas intuitivas como por ejemplo al entrar en modales y salir con la tecla <kbd>esc</kbd>. Esto añade una característica más a nuestro sitio.

```typescript twoslash
function togglePlay() {}
function mute() {}
// ---cut---
const listenKeys = (e: KeyboardEvent) => {
  switch (e.keyCode) {
    case 32:
      togglePlay();
      break;
    case 77:
      mute();
      break;
    default:
      break;
  }
};

document.body.addEventListener("keyup", (e) => listenKeys(e));
```

<note type="danger" inline>El uso de KeyboardEvent.keyCode está deprecado[^keyboard] y puede dejar de funcionar en un futuro, usar KeyboardEvent.key en su lugar</note>

[^keyboard]: MDN Web Docs & MDN contributors <cite>[KeyboardEvent.keyCode](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode)</cite>

## Test de accesibilidad

Los test de accesibilidad ayudan a resolver problemas comunes. Se pueden hacer a través de _devtools_ con _lighthouse_ o a través de otras plataformas.

- [Axe core](https://github.com/dequelabs/axe-core "Axe core")

- [Lighthouse](https://github.com/GoogleChrome/lighthouse "Lighthouse")

- [Cypress axe](https://github.com/avanslaars/cypress-axe "Cypress axe")

---

## Conclusiones

La accesibilidad mejora la calidad de nuestro sitio web y la experiencia de los usuarios. Es importante tener en mente la accesibilidad a la hora de estar desarrollando un sitio web para asegurarnos que todos puedan tener acceso al contenido.
