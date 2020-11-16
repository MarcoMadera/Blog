---
title: "CSS: Cascading Style Sheets"
description: CSS es el lenguaje que se usa para dar estilos a un documento escrito en lenguaje marcado.
date: 2020-10-20
cover: v1602894559/Blog/7/css_k23ypb.png
author: Marco Madera
tags:
  - CSS
  - Personalización
---

He visto sitios web impresionantes con una gran presentación, sitios que generan una buena experiencia como usuario y muchos solo lo logran con una buena apariencia. Siempre y cuando se quiera hacer una web más bonita, atractiva y presentable, aplicar estilos CSS es de lo primero a tomarse en cuenta.

## ¿Qué es CSS?

<abbr title="Cascading Style Sheets">CSS</abbr> es el <strong>lenguaje</strong> que se usa para dar <strong>estilos</strong> de manera selectiva a un documento escrito en lenguaje marcado. Son reglas que los navegadores interpretan con las cuales podemos controlar los elementos en aspecto, posición y más.

## Uso

CSS Puede darle estilos a cualquier etiqueta html a través de los selectores.
Existen tres formas de usar los estilos, a través de la etiqueta style, en línea a través del atributo style, y en una hoja externa.

### Estilos en línea (atributo style)

Para darle estilo a un elemento se le añade el atributo `style` y se le agrega el valor con las declaraciones deseadas.

```html
<p style="color: #fff; width: max-content; padding: 5px 10px; margin: auto; border-radius: 10px; background: radial-gradient(ellipse at center, rgba(240,47,23,0.7) 0%, rgba(240,47,23,1) 100%);">
En Línea
</p>
```

<p style="color: #fff; width: max-content;padding: 5px 10px; margin: auto; border-radius: 10px; background: radial-gradient(ellipse at center, rgba(240,47,23,0.7) 0%, rgba(240,47,23,1) 100%);">
En Línea
</p>

### Estilos en la etiqueta style

CSS se puede usar directamente desde la etiqueta de HTML `<style>`.

```html
<style>
body {
  margin: 0;
  padding: 0;
}
</style>
```

### Estilos en una hoja externa (.css)

La manera que se aprovecharía mejor sería hacer un `<link>` a una hoja de estilos (.css) dentro de la etiqueta `<head>` de nuestro documento HTML. Al momento de cargar la página, inmediatamente llamará a la hoja de estilos externa y aplicará los estilos. Con esto le quitamos el peso del html de cargar con los estilos para tener un mejor tiempo de respuesta. Para hacer esto la etiqueta `<link>` debe de ir de la siguiente forma, donde href es la ubicación de la hoja de estilos.

```html
<link
  rel="stylesheet"
  href="./styles.css"
  type="text/css"
/>
```

## Selectores

Al usar CSS en una hoja externa o en la etiqueta `<style>` los selectores son necesarios para estilar elementos específicos. Estos indican a qué elementos se le tienen que aplicar los estilos.

### Etiquetas

Para seleccionar etiquetas simplemente se escribe el nombre de la etiqueta, si se quiere especificar alguna etiqueta que contenga cierto atributo se puede hacer seguido con corchetes `[]`, así seleccionará todas las etiquetas del mismo nombre que tengan cierto atributo.

```css
nav { ... }

nav[class="topNavbar"] { ... }
```

### ID

Las id en HTML son únicas, por consecuencia hace que en CSS también solo se pueda aplicar a un solo elemento único, se seleccionan con el símbolo `#`.

```css
#SomeId { ... }
```

### Clases

Al usar el nombre de un atributo clase precediendo un punto "." se seleccionarán todos los elementos que tienen la misma clase. Esto aplica los mismo estilos a todos los elementos con la misma clase.

```css
.clase { ... }
```

### Combinaciones

Los selectores se pueden combinar para seleccionar elementos que tienen cierta relación siempre de forma descendente.

Las propiedades se pueden compartir separando por comma "," los selectores.

```css
nav.topNavbar, a[href=*"example.com"], #someId { ... }
```

Selecciona todas las etiquetas nav con clase topNavbar.

```css
nav.topNavbar { ... }
```

Selecciona todos los elementos de todos los subniveles con la clase topNavbar dentro de una etiqueta nav.

```css
nav .topNavbar { ... }
```

Selecciona todos los elementos de primer subnivel con la clase topNavbar dentro de una etiqueta nav.

```css
nav > .topNavbar { ... }
```

Selecciona al primer elemento del mismo nivel que sigue inmediatamente con la clase topNavbar.

```css
nav + .topNavbar { ... }
```

 Selecciona a todos los elementos del mismo nivel que sigue inmediatamente con la clase topNavbar.

```css
nav ~ .topNavbar { ... }
```

Selecciona a todos los elementos con etiqueta nav que incluye topNavbar en su atributo clase.

```css
nav[class*="topNavbar"] { ... }
```

## Declaraciones

Las declaraciones son las reglas que sobre escribirán los estilos por default que le da el navegador, es todo lo que está dentro del paréntesis.

Las propiedades son las que estan de lado izquierdo de los puntos y el valor al lado derecho de los dos punto.

```css
div {
  margin-top: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
}
```

Las **declaraciones abreviadas** nos permiten tener varias declaraciones en una misma línea. Se emplea un propiedad general y se escriben los valores juntos que deberían de llevar. Ahorra tiempo y se mira más legible.

El anterior margen se puede escribir de la siguiente manera usando una declaración abreviada:

```css
div {
  margin: 10px;
}
```

Si se quiere usar las cuatro propiedades de margen en una declaración abreviada se pueden usar, dando cada valor separado por espacio de manera que el sentido sería la misma a las manecillas del reloj (top right bottom left):

```css
div {
  margin: 10px 20px 30px 40px;
}
```

Si solo se incluyen dos valores, se toma como el primer valor a margin-top y margin-bottom y el segundo valor margin-right y margin-left.

En caso de incluirse 3 valores, se toman de forma de las manecillas del reloj y el segundo valor sería para margin-left.

### Propiedades customizadas

Para crear una propiedad customizada se utiliza como prefijo el doble guión -- y seguido del nombre de la propiedad y el valor que lleva. Para usar la propiedad se hace a través de la función "var".

```css
.topNavbar {
  --color-verde: #1DB954;
  --color-gris: #ccc;
  background: var(--color-gris);
  color: var(--color-verde);
}
```

Para usar las propiedades en un scope global del documento se pueden definir en la pseudo clase :root.

```css
:root{
  --color-verde: #1DB954;
  --color-gris: #ccc;
}

.topNavbar {
  background: var(--color-gris);
  color: var(--color-verde);
}

.bottomNavbar {
  background: var(--color-gris);
  color: var(--color-verde);
}
```

### Herencia de propiedades

CSS como su nombre lo indica, hoja de estilos en cascada, va en forma de cascada, de arriba hacia abajo. Una propiedad abreviada debe de ir antes de una propiedad única. Si se hace del revés, la declaración abreviada sobrescribirá la propiedad única a la que el navegador entienda por defecto.

Mal:

```css
p{
  font-style: italic;
  font: 20px Arial;
}
```

Bien:

```css
p{
  font: 20px Arial;
  font-style: italic;
}
```

## Funciones

CSS al igual que otros lenguajes cuenta con funciones. A diferencia de otros lenguajes, en CSS no podemos crear nuevas funciones.

### Funciones básicas

En estas son las más usadas comúnmente como las de asignar propiedades customizadas, aplicar colores, hacer calculos sobre unidades del DOM entre otras.

```css
{
  color: var(--color-white);
  color: rgba(123,123,123,0.2);
  width: calc(100vw - 80px);
  background: radial-gradient(ellipse at center, rgba(240,47,23,0.7) 0%, rgba(240,47,23,1) 100%);
  background-image: url("src/image.jpg");
}
```

### Funciones de selectores

En los selectores también podemos usar funciones para iterar entre elementos. El siguiente ejemplo aplica estilos diferentes cada 3 elementos de item.

```css
.item:nth-of-type(3n + 1) {
  grid-row-end: span 3;
}
.item:nth-of-type(3n + 2) {
  grid-row-end: span 2;
}
.item:nth-of-type(3n + 3) {
  grid-row-end: span 1;
}
```

### Funciones de dimensiones

Las funciones de dimensiones se aplican a los elementos definidos por vectores.

```css
.dimension {
  transform: scale(2);
  transform: translate(-50%, -50%);
  transform: perspective(50em) rotateY(50deg)
}
```

### Funciones filtro

Las funciones de filtro definen efectos visuales, generalmente en imagenes o vídeos.

```css
img {
  filter: brightness(110%);
  filter: contrast(120%);
  filter: grayscale(90%);
}
```

### Funciones en grids

Estas funciones nos ayudan a estructurar nuestro contenido con grids.

```css
.grid {
  grid-template-columns: fit-content(250px) 1fr;
  grid-template-columns: minmax(10px, 100px) 1fr minmax(min-content, 300px);
  grid-template-columns: repeat(6, 40px 80px);
}
```

## Reglas at

Son declaraciones que comienzan con el símbolo arroba "@",

@import nos permite incluir una hoja de estilos externa, con esto podemos reusar nuestros estilos y poder agregar más fuentes como alternativa a la de HTML.

El siguiente código importará la fuente monserrat si se encuentra en un dispositivo de impresión.

```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap') print;
```

@keyframes  — Describe la configuración de pasos intermedios en una secuencia de animación CSS.

@media se usa para aplicar estilos para diferentes tipos de medios

```css
@media screen and (max-width: 1300px){
  nav{
    width: 100px;
  }
}

@keyframes nprogress-spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

## El modelo de caja

Una forma de mirar los elementos a la hora de darle estilos es de forma de cajas. La mayoria de elementos se pueden estilar de esta forma pues tienen dentro el contenido, el relleno que las asegura, el borde de la caja y el margen que las separa de otras cajas.

<style>.boxModel__margin{max-width:300px;height:200px;outline:dashed 1px #000;background:#ffca96;margin:auto;position:relative}.boxModel__border{max-width:240px;height:140px;outline:solid 1px #000;background:#ffdc91}.boxModel__padding{max-width:180px;height:80px;outline:solid 1px #000;background:#bfd081}.boxModel__content{max-width:120px;height:30px;outline:solid 1px #000;background:#7fb6c2;display:flex;justify-content:center;align-items:center;font-size:13px}.boxModel-center{position:absolute;top:0;bottom:0;left:0;right:0;margin:auto}.boxModel__margin span{font-size:13px;margin-left:10px}</style>
<div class="boxModel__margin">
<span>margin</span>
  <div class="boxModel__border boxModel-center">
  <span>border</span>
    <div class="boxModel__padding boxModel-center">
    <span>padding</span>
      <div class="boxModel__content boxModel-center">
        contenido
      </div>
    </div>
  </div>
</div>

- Contenido - Es el contenido de la caja donde el texto y las imágenes aparecen.
- Padding - El relleno es un espacio entre el contenido y el borde.
- Border - El borde es lo que rodea al relleno y el contenido.
- Margin - El margen es un espacio desde el borde hacia el exterior.

### Diferencia entre Padding y Margin

El padding y el margin son separadores. El margin siempre es invisible y separa al exterior de nuestro elemento con respecto al borde. El padding puede ser visible al asignarle un background al elemento, separa al interior de nuestro elemento con respecto al borde.

<style>.box{width:200px;height:100px;background:#99c;border:1px solid #000}.with-padding{padding:30px}.with-margin{margin:30px}</style>
<div style="display: flex;">
  <div class="box with-padding">Con relleno</div>
  <div class="box with-margin">Con margen</div>
</div>

```html
<div style="display: flex;">
  <div class="box with-padding"></div>
  <div class="box with-margin"></div>
</div>
```

```css
.box {
  width: 200px;
  height: 100px;
  background: #99c;
  border: 1px solid #000;
}
.with-padding{
  padding: 30px;
}
.with-margin{
  margin: 30px;
}
```

En la primera caja el borde es el que delimita el color del background. El padding toma el color del background dando una separación de 30 pixeles a partir del borde hacia el interior.

En la segunda caja el margen no se pinta con el background. Hace una separación del borde hacia el exterior de 30 pixeles.

## Animaciones

Las animaciones en css requieren de la regla keyframes seguida del nombre de la animación. Los selectores se pueden representar con porcentajes de 0% a 100% o con las palabras "from" y "to" que sería lo mismo que 0% y 100%.

Esta animación puede ser llamada asignandola a un elemento con la propiedad animation-name y con animation-duration.

```css
@keyframes desplazamiento {
  from {
    transform: translate(10px, 10px);
  }
  to {
    transform: translate(100px, 100px);
  }
}
```

Un ejemplo simple de uso de porcentajes sería el siguiente:

<style>.ballContainer{height:130px;position:relative;width:100%}.ballWrapper{position:absolute;width:100%;height:130px;animation:bounce 3s linear alternate infinite}.ballos{position:absolute;width:100%;height:130px;animation:traslate 3s linear alternate infinite}.ball{display:inline-flex;align-items:center;justify-content:center;width:50px;height:50px;color:#fff;background:#d32f2fe1;border-radius:50%;position:relative;animation:rotate 3s linear alternate infinite}.ball span{position:absolute;width:20px;height:4px;background-color:#fff;border-radius:2px;box-shadow:0 0 2px 0 #ccc}.ball span:nth-of-type(1){transform:rotate(45deg)}.ball span:nth-of-type(2){transform:rotate(-45deg)}@keyframes rotate{from{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes traslate{from{transform:translateX(0)}to{transform:translateX(calc(100% - 50px))}}@keyframes bounce{0%,100%,32%,66%{transform:translateY(0);animation-timing-function:ease-in}16%,50%,83%{transform:translateY(80px);animation-timing-function:ease-out}}</style>
<div class="ballContainer">
    <div class="ballWrapper">
    <div class="ballos">
        <span class="ball"><span></span><span></span></span>
    </div>
    </div>
</div>

```css
.ball {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: #d32f2fe1;
  border-radius: 50%;
  position: relative;
  animation: bounce 3s linear alternate infinite;
  left: 0;
  top: 0;
}
.ball:before, .ball:after {
  content: '';
  position: absolute;
  width: 20px;
  height: 4px;
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 0 2px 0 #ccc;
}

.ball:before {
  transform:rotate(45deg);
}
.ball:after {
  transform:rotate(-45deg);
}
@keyframes bounce {
  32%, 66% {
    top: 0px;
    animation-timing-function: ease-in;
  }
  16%, 50%, 83%{
    top: 80px;
    animation-timing-function: ease-out;
  }
  100% {
    transform: rotate(360deg);
    top: 0px;
    animation-timing-function: ease-out;
    left: calc(100% - 50px);
  }
}
```

## Compatibilidad

CSS no se renderiza igual en todos los navegadores, un decorador de texto puede que no luzca de la misma forma en Firefox que en Chrome. Aplicar ciertos trucos para que todos luzca igual en todos los navegadores puede que sea una tarea tediosa. Es importante saber el mercado de usuarios al que va dirigido la página que creamos para saber en que navegadores enfocarnos.

CSS es un lenguaje vivo, en el cual se sigue trabajando en nuevas características. Algunos navegadores deciden implementar estas nuevas características, las cuales podemos utilizar con **prefijos** que solo el navegador conoce. La ventaja de CSS es que si un navegador no conoce una propiedad o valor la ignorará e irá a la siguiente cosa que entienda.
Los siguientes prefijos son los mas comunes:

| **Prefijo** |       **Navegadores**       |
|:-----------:|:---------------------------:|
|   -webkit-  |        Chrome, Safari       |
|    -moz-    |           Firefox           |
|     -o-     |            Opera            |
|     -ms-    | Microsoft Internet Explorer |

[Can I Use](https://caniuse.com "Can I Use") es una web que nos permite saber si un navegador soporta ciertas características la cual vale la pena explorar. Podemos ver rápidamente el soporte completo, nulo, parcial o con prefijos para una propiedad.

Soporte para la propiedad "hyphens" en distintos navegadores:

<iframe src="https://caniuse.bitsofco.de/embed/index.html?feat=css-hyphens&periods=future_1,current,past_1,past_2&accessible-colours=false&image-base=none" title="Can I Use Hyphens" frameborder="0" width="100%" height="450"></iframe>

## Conclusión

Hemos visto una vista muy general sobre lo que es CSS, aprender este lenguaje es lo básico para darle vida a sitios web. Conocer el alcance que puede tener CSS por si solo es una gran ventaja. Hay muchas cosas que debemos de tener en cuenta para crear productos y este lenguaje cada vez las facilita más. Investiga acerca de las nuevas características y pon a prueba tu creatividad.
