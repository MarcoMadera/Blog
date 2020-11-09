---
title: CSS
description: CSS es el lenguaje que se usa para dar estilos a un documento escrito en lenguaje marcado. Con él podemos controlar los elementos en aspecto, posición y más.
date: 2020-10-20
cover: v1602894559/Blog/7/css_k23ypb.png
author: Marco Madera
tags:
  - CSS
  - Personalización
---

He visto sitios web impresionantes con una gran presentación, sitios que generan una buena experiencia como usuario y muchos solo lo logran con una buena apariencia. Siempre y cuando se quiera hacer una web más bonita, atractiva y presentable, aplicar estilos CSS es de lo primero a tomarse en cuenta.

## ¿Qué es CSS?

<abbr title="Cascading Style Sheets">CSS</abbr> es el lenguaje que se usa para dar estilos a un documento escrito en lenguaje marcado. Con él podemos controlar los elementos en aspecto, posición y más.

## Uso

Existen tres formas de usar los estilos, a través de la etiqueta style, en línea, y en una hoja externa.

### Estilos en la etiqueta <style>

De igual forma se puede usar directamente en un elemento HTML con el atributo `style` de la siguiente forma:

```html
<p style="color: #fff; width: max-content; padding: 5px 10px; margin: auto; border-radius: 10px; background: radial-gradient(ellipse at center, rgba(240,47,23,0.7) 0%, rgba(240,47,23,1) 100%);">
En Línea
</p>
```

<p style="color: #fff; width: max-content;padding: 5px 10px; margin: auto; border-radius: 10px; background: radial-gradient(ellipse at center, rgba(240,47,23,0.7) 0%, rgba(240,47,23,1) 100%);">
En Línea
</p>

### Estilos en línea

CSS se puede usar directamente desde la etiqueta HTML `<style>`.

```html
<style>
body {
  margin: 0;
  padding: 0;
}
</style>
```

### Estilos en una hoja externa

La manera que se aprovecha mejor sería hacer un link a una hoja de estilos con extensión .css en una etiqueta `<link>` dentro de la etiqueta `<head>` de nuestro documento HTML de la siguiente manera, donde href es la ubicación de la hoja de estilos.

```html
<link
  rel="stylesheet"
  href="./styles.css"
/>
```

## Selectores

Al usar CSS en una hoja externa o en la etiqueta `<style>` los selectores son necesarios para estilar elementos específicos.

### Etiquetas

Para seleccionar etiquetas simplemente se escribe el nombre de la etiqueta, si se quiere especificar alguna etiqueta que contenga cierto atributo se puede hacer seguido con corchetes `[]`, así seleccionará todas las etiquetas del mismo nombre que tengan cierto atributo.

```css
nav { ... }

nav[class="topNavbar"] { ... }
```

### ID

Las id en HTML son únicas, se seleccionan con el símbolo `#`

```css
#SomeId {

}
```

### Clases

Al usar el nombre de una clase precediendo un punto "." se seleccionarán todos los elementos que tienen la misma clase.

```css
.clase {

}
```

### Combinaciones

Los selectores se pueden combinar para seleccionar elementos que tienen cierta relación siempre de forma descendente.

Las propiedades se pueden compartir separando por comma "," los selectores.

```css
nav.topNavbar, nav.bottomNavbar { ... }
```

Selecciona todas las etiquetas nav con clase topNavbar

```css
nav.topNavbar { ... }
```

Selecciona todos los elementos de todos los subniveles con la clase topNavbar dentro de una etiqueta nav

```css
nav .topNavbar { ... }
```

Selecciona todos los elementos de primer subnivel con la clase topNavbar dentro de una etiqueta nav

```css
nav > .topNavbar { ... }
```

Selecciona al primer elemento del mismo nivel que sigue inmediatamente con la clase topNavbar

```css
nav + .topNavbar { ... }
```

 Selecciona a todos los elementos del mismo nivel que sigue inmediatamente con la clase topNavbar

```css
nav ~ .topNavbar { ... }
```

Selecciona a todos los elementos con etiqueta nav que incluye topNavbar en su atributo clase

```css
nav[class*="topNavbar"] { ... }
```

## Propiedades

Las propiedades son las reglas que sobre escribirán los estilos por default que le da el navegador, es todo lo que está dentro del paréntesis.

```css
div {
  margin-top: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
}
```

Las propiedades abreviadas nos permiten tener varias propiedades en una misma línea, ahorra tiempo y se mira más legible.
El anterior margen se puede escribir de la siguiente manera con una propiedad abreviada:

```css
div {
  margin: 10px;
}
```

Si se quiere usar las cuatro propiedades de margen se pueden usar, de manera que el sentido sería la misma a las manecillas del reloj de la siguiente forma.

```css
div {
  margin: 10px 20px 30px 40px;
}
```

Lo que sería lo mismo a lo siguiente

```css
div {
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 30px;
  margin-left: 40px;
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

CSS como su nombre lo indica, hoja de estilos en cascada, va en forma de cascada, de arriba hacia abajo, por lo que una propiedad abreviada debe de ir antes de una propiedad unica para que sobreescriba los estilos por defecto, se pone por debajo para que se sobre escriban los estilos por defecto.

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

CSS al igual que otros lenguajes cuenta con funciones que son visuales y no podemos crear nuevas funciones.

### Funciones básicas

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

```css
.dimension {
  transform: scale(2);
  transform: translate(-50%, -50%);
  transform: perspective(50em) rotateY(50deg)
}
```

### Funciones filtro

```css
img {
  filter: brightness(110%);
  filter: contrast(120%);
  filter: grayscale(90%);
}
```

### Funciones en grids

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

Como podemos ver, el borde es el que delimita el color del background, por lo que el padding toma el color del background ya que como se vio en el modelo de caja está dentro del borde, y empuja 30 pixeles a partir del borde hacia dentro, al contrario el margen como está fuera del borde no se pinta con el background y hace un espacio del borde hacia afuera separando ambas cajas.

## Animaciones

Las animaciones en css requieren de la regla keyframes seguida del nombre de la animación, de propiedades se pueden utilizar porcentajes para ser más específicos en los pasos o las propiedades "from" y "to" que sería lo mismo que 0% y 100%.
Esta animación se le asigna a un elemento con la propiedad animation-name y con animation-duration se establece la duración de la animación.

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

<style>.ball{display:inline-flex;align-items:center;justify-content:center;width:50px;height:50px;color:#fff;background:#d32f2fe1;border-radius:50%;position:relative;animation:bounce 3s linear alternate infinite;left:0;top:0}.ball span{position:absolute;width:20px;height:4px;background-color:#fff;border-radius:2px;box-shadow:0 0 2px 0 #ccc}.ball span:nth-of-type(1){transform:rotate(45deg)}.ball span:nth-of-type(2){transform:rotate(-45deg)}@keyframes bounce{32%,66%{top:0;animation-timing-function:ease-in}16%,50%,83%{top:80px;animation-timing-function:ease-out}100%{transform:rotate(360deg);top:0;animation-timing-function:ease-out;left:calc(100% - 50px)}}</style>
<div style="height: 130px;">
  <span class="ball"><span></span><span></span></span>
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

CSS no se renderiza igual en todos los navegadores, un decorador de texto puede que no luzca de la misma forma en firefox que en chrome, aplicar ciertos trucos para que todos luzca igual en todos los navegadores puede que sea una tarea tediosa, por lo que también es importante saber el mercado de usuarios al que va dirigido la página que creamos y saber en que navegadores enforcarnos.

CSS es un lenguaje vivo, en el cual se sigue trabajando en nuevas características, algunos navegadores deciden implementar estas nuevas características, las cuales podemos utilizar con prefijos que solo el navegador conoce porque si un navegador no conoce una propiedad o valor la ignorará e irá a la siguiente cosa que entienda, los siguientes prefijos son los mas comunes:

| Prefijo  |          Navegadores        |
|----------|:---------------------------:|
| -webkit- | Chrome, Safari              |
| -moz-    | Firefox                     |
| -o-      | Opera                       |
| -ms-     | Microsoft Internet Explorer |

[Can I Use](https://caniuse.com) es una web que nos permite saber si un navegador soporta ciertas características la cual vale la pena explorar, podemos ver rápidamente el soporte completo, nulo, parcial o con prefijos para una propiedad.

Soporte para la propiedad "hyphens" en distintos navegadores:

<iframe src="https://caniuse.bitsofco.de/embed/index.html?feat=css-hyphens&periods=future_1,current,past_1,past_2&accessible-colours=false&image-base=none" title="Can I Use Hyphens" frameborder="0" width="100%" height="450"></iframe>

## Conclusión

Hemos visto una vista muy general sobre lo que es CSS, aprender este lenguaje es lo básico para desarrollar sitios web, hay muchas cosas que debemos de tener en cuenta y conocer el alcance que puede tener CSS por si solo con las características que vienen por defecto es una gran ventaja a la hora de crear productos.
