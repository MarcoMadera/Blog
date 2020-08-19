---
title: Accesibilidad Web
description: Las pautas de accesibilidad para el contenido para la web son recomendaciones para crear contenido web más accesible.
date: 2020-07-20
cover: https://res.cloudinary.com/marcomadera/image/upload/c_scale,h_120,w_120/v1595294653/Blog/3/eb23bvc1b3748b34b-434b-4b343_t00lbk.jpg
cover760: https://res.cloudinary.com/marcomadera/image/upload/c_scale,w_760/v1595294653/Blog/3/eb23bvc1b3748b34b-434b-4b343_t00lbk.jpg
author: Marco Madera
---
Segun el [Informe mundial sobre la discapacidad](https://www.who.int/disabilities/world_report/2011/accessible_es.pdf) publicado en el año 2011 estima que más de mil millones de personas viven con algún tipo de discapacidad; alrededor del 15% de la población mundial.

La accesibilidad web es la práctica continua de asegurarnos que todo lo que creamos para la web se puede usar, interpretar y operar por una variedad de personas en una variedad de situaciones.
[Web Content Accessibility Guidelines](https://www.w3.org/TR/2008/REC-WCAG20-20081211/) creadas por W3C son recomendaciones para crear contenido web más accesible, las cuales también han sido ratificadas por la ISO, como estándar ISO/IEC 40500:2012.

&nbsp;

## ¿Por qué implementar accesibilidad?
Una declaración de accesibilidad demuestra compromiso y proporciona detalles a los usuarios con discapacidades sobre las implementaciones que pueden usar y mejorar su experiencia en el sitio web.

* Puede aumentar el SEO de nuestro sitio web
* Para incluir a personas en situaciones de discapacidad.
* Para mejorar la usabilidad de nuestros proyectos.
* Porque en algunos paises es la ley.

&nbsp;


## Principios WCAG

1. [Perceptible](https://www.w3.org/TR/WCAG21/#perceivable): Crear alternativas textuales para todo contenido no textual, facilitar a los usuarios ver y oír el contenido, poder presentar el contenido de diferentes formas sin perder información o estructura.

2. [Operable](https://www.w3.org/TR/WCAG21/#operable): Que toda la funcionalidad esté disponible desde el teclado, que sea navegable, dar el tiempo suficiente para leer en elementos dinamicos y dar opciones de tiempo.

3. [Comprensible](https://www.w3.org/TR/WCAG21/#understandable): Ser legible, tamaños contrastes de textos, hacer la página predecible, tener instrucciones claras.

4. [Robusto](https://www.w3.org/TR/WCAG21/#robust): Mantener compatibilidad con las aplicaciones de usuario actuales y futuras, navegadores y dispositivos, incluyendo las tecnologías asistivas y tener un buen performance.

Los criterios de WCAG comprenden 3 niveles de conformidad:
* A el nivel más bajo.
* AA requiere cumplir los criterios del nivel A y AA
* AAA el nivel más alto requiere cumplir los criterios del nivel AA y AAA.

&nbsp;

## Tecnologías asistivas
Las tecnologías asistivas sirven de ayuda para las personas con dificultades para realizar tareas regulares con el objetivo de mejorar su calidad de vida y su integración. Algunas de estas son:

- Lectores de pantalla
- Extensiones que manipulan el css
- Lupa de pantalla
- Control de voz
- Varilla bucal

&nbsp;&nbsp;

## HTML Semántico

Un buen HTML resuelve mucho de la accesibilidad con el uso correcto de tags y atributos. Usar HTML semántico ayudará al navegador a incluir significado en el árbol de accesibilidad para que los lectores de pantalla puedan entender el rol, propiedades y estado que tiene esa parte de nuestro código.

![Chrome Accesibility](https://res.cloudinary.com/marcomadera/image/upload/v1595398073/Blog/3/ebc46-f396nv-vbccd_hltpf5.png "Chrome Accesibility") 

### No recomendado:
```HTML
<body>
  <div></div>
  <div>
  </div>
  <div></div>
</body>
```
&nbsp;

### Recomendado:
```HTML
<body>
  <header></header>
  <main>
  </main>
  <footer></footer>
</body>
```
&nbsp;&nbsp;

### Uso de texto alternativo en imagenes
Esto le ayuda a los lectores de pantalla al momento de toparse con imagenes a leer la descripción.
```HTML
<img src ="img src" alt="description">
```

&nbsp;

### Uso de scope en tablas
El uso del scope ayuda a los lectores de pantalla a seguir el orden correcto.
```HTML
 <table border="1">
  <caption>Contact Information</caption>
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

&nbsp;


### Roles apropiados

Los siguientes elementos tienen la apariencia de botón pero con roles direfentes:

<style>
  .blog3__container{
    position: relative;
  }
  .share-box div:nth-of-type(5) span:nth-of-type(2) span:nth-of-type(1){
    display: block;
    width: 1px;
    height: 3px;
    background: green;
    transform: rotate(-45deg) translate(-2px, 7px);
  }
  .share-box div:nth-of-type(5) span:nth-of-type(2) span:nth-of-type(2){
    display: block;
    width: 1px;
    height: 8px;
    border-radius: 0;
    background: green;
    transform: rotate(35deg) translate(5px, -4px);
  }
  
  .share-box{
  position: absolute;
  width: fit-content;
  height: fit-content;
  background-color: #fff;
  border-radius: 6px;
  top: -135px;
  visibility: hidden;
  padding: 10px;
  box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.30);
  }

  .share-box div{
    font-size: 13px;
    align-items:center;
  }

  .share-box div:nth-of-type(1){
    display:grid;
    grid-template-columns: 1fr auto;
    margin-bottom: 15px;
  }
  .share-box div:nth-of-type(2){
    display:grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 8px;
  }
  .share-box div:nth-of-type(3){
    display:grid;
    grid-template-columns: 1fr auto;
    margin-bottom: 6px;
  }
  .share-box div:nth-of-type(4){
    display:grid;
    grid-template-columns: 1fr auto;
    margin-bottom: 6px;
  }
  .share-box div:nth-of-type(5){
    display:grid;
    grid-template-columns: 1fr auto;
  }

  .share-box div span{
    line-height:1;
    margin: 0;
    padding: 0;
    width: fit-content;
    font-family: consolas;
    color: rgb(179,179,179);
  }

  .share-box div:nth-of-type(1) span:nth-of-type(1){
    color: rgb(136,18,128);
    font-size: 13px;
  }
  .share-box div:nth-of-type(1) span:nth-of-type(2){
    font-size: 13px;
  }
  .share-box div:nth-of-type(2) span:nth-of-type(1){
    color: rgb(108,114,120);
    font-size: 11px;
  }
  .share-box div:nth-of-type(2) span:nth-of-type(2){
    display: block;
    width: 100%;
    height: 1px;
    background: rgb(221,221,221);
  }
  .share-box div:nth-of-type(3) span:nth-of-type(2){
    color: rgb(108,114,120);
  }
  .share-box div:nth-of-type(4) span:nth-of-type(2){
    color: rgb(108,114,120);
  }

  .share-box div:nth-of-type(5)>span:nth-of-type(2){
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid green;
  }

  .triangle-down{
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #fff;
    position: absolute;
    bottom: -11px;
    left: 20%;
  }

  #butons:hover + .share-box{
    visibility: visible;
    left: 106.5px;
  }
  #anchor:hover + .share-box{
    visibility: visible;
  }
</style>


<div class="blog3__container">
<a href="#anchor" class="btn btn-primary" id="anchor" >ancla</a><div class="share-box">
  <div>
  <span>anchor</span>
  <span>104.25 x 38</span>
  </div>
  <div>
  <span>ACCESIBILITY</span>
  <span></span>
  </div>
  <div>
  <span>Name</span>
  <span>ancla</span>
  </div>
  <div>
  <span>Role</span>
  <span>link</span>
  </div>
  <div>
  <span>Keyboard-focusable</span>
  <span><span></span><span></span></span>
  </div>
  <div class="triangle-down"></div>
</div>
<button type="button" class="btn btn-primary" id="butons">botón</button><div class="share-box">
  <div>
  <span>button</span>
  <span>106.5 x 38</span>
  </div>
  <div>
  <span>ACCESIBILITY</span>
  <span></span>
  </div>
  <div>
  <span>Name</span>
  <span>botón</span>
  </div>
  <div>
  <span>Role</span>
  <span>button</span>
  </div>
  <div>
  <span>Keyboard-focusable</span>
  <span><span></span><span></span></span>
  </div>
  <div class="triangle-down"></div>
</div>
</div>



Hay que definir los roles de acuerdo a la función que realizarán. En este caso el primer "botón" tiene la funcionalidad de link a otra página por lo que debería ser implementado como hipervínculo para que tome el rol de link.



### Atributos Aria
Estos atributos se pueden añadir a cualquier etiqueta HTML para comunicar cambios especiales al DOM de nuestra aplicación. Roles propiedades y estados. Siempre es preferible usar un elemento HTML semántico correcto si es que existe en lugar de usar ARIA.

- Roles: Define el tipo general del objeto .Comunican a los navegadores cuales son las interacciones que debería esperar y cómo se va a usar este objeto en nuestro proyecto. Se usan en situaciones muy especificas, es mejor depender del HTML semántico para comunicar los roles. Atributo: "role"
&nbsp;

- Propiedades: Comunican atributos que son esenciales para el comportamiento o significado de un elemento pero que suelen comunicar visualmente. Atributo: “aria-label”

- Estado: Comunican estados y cambios de estados en elementos que se suelen comunicar visualmente aria-hidden=“true” para que el lector de pantalla solo lea los elementos visibles en el estado actual de la página.

### Estilos
Para tener más empatía con las personas con discapacidades visuales podemos emular a través de las devtools de Google Chrome a través de las siguientes opciones: 

Customize and control DevTools > More tools > Rendering > Emulate vision deficiencies

![Emulate Vision](https://res.cloudinary.com/marcomadera/image/upload/v1595570280/Blog/3/b3dsba-fbdbf-dasb2_kidwp6.png "Emulate Vision")


### Color y contraste
Podemos utilizar las herramietas de Google Chrome DevTools para ver el contraste con el background y ver si cumplen con las especificaciones AA y AAA.

![Contrast tool](https://res.cloudinary.com/marcomadera/image/upload/v1595547652/Blog/3/ecds-ecevsb-dbdbe-cbvxz_hqjyvo.png "Contrast tool")

### Focus
El enfoque da una guia visual al usuario sobre los elementos interactivos. Si un usuario solo navega con el teclado (tab y shift+tab) es importante que todos los elementos interactivos tengan un enfoque para guiar al usuario.
<style>

  #inputToFocus:focus{
  box-shadow: 0 0 5px rgba(0, 123, 255, 1);
  padding: 3px 0px 3px 3px;
  margin: 5px 1px 3px 0px;
  outline: 1px solid rgba(0, 123, 255, 1);
  }
</style>
<input type="text" id="inputToFocus" size="25" placeholder="Seleccioname para enforcarme"/>

&nbsp;&nbsp;

### Skip Links
Es una <a href="https://www.w3.org/TR/WCAG20-TECHS/G1.html" target="_blank" rel="noopener  noreferrer">técnica</a> que permite navegar directamente al contenido principal, donde el primer elemento de la página sería este enlace. Con esto se logra que con cada cambio de página al navegar con el teclado no tener que pasar de nuevo por contenido repetitivo.

```HTML
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
Es un atributo que indica si un elemento puede ser enfocado, y si participa en la navegación secuencial del teclado, acepta tres valores:

Valor negativo(-1): El elemento debe ser enfocado, pero no debe de ser accesible a través de la navegación, puede ser usado en carousels donde elementos no son visibles.

Valor positivo (>0): Debe poder ser enfocado y su orden relativo es definido por el valor del atributo.

Valor de 0: Debe ser enfocado y ser accesible a través de la navegación secuencial del teclado, sigue el orden de la estructura del HTML.

----

## Añadir acciones con el teclado
Podemos añadir acciones con el teclado escuchando las teclas. <a href="http://keycode.info/" target="_blank" rel="noopener noreferrer">Guia de códigos</a>

Existen teclas intuitivas como por ejemplo al entrar en modales y salir con la tecla ESC, lo que añade una característica más a nuestro sitio.

```javascript
const listenKeys= (e) => {
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
}

document.body.addEventListener("keyup", e=> listenKeys(e));
```

&nbsp;

## Test de accesibilidad
Los test de accesibilidad ayudan a resolver problemas comunes, se pueden hacer a través de devtools con lighthouse o a través de otras plataformas.

- [Axe core](https://github.com/dequelabs/axe-core)

- [Lighthouse](https://github.com/GoogleChrome/lighthouse)

- [Cypress axe](https://github.com/avanslaars/cypress-axe)


----

## Conclusiones
La accesibilidad mejora la calidad de nuestro sitio web y la experiencia de los usuarios, es importante tener en mente la accesibilidad a la hora de estar desarrollando un sitio  web para asegurarnos que todos puedan tener acceso al contenido.

