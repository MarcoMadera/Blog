---
title: "CSS: Hoja de estilos en cascada"
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

CSS Puede darle estilos a cualquier etiqueta <abbr title="HyperText Markup Language">HTML</abbr> a través de los selectores.
Existen tres formas de usar los estilos, a través de la etiqueta style, en línea a través del atributo style, y en una hoja externa.

Para darle **estilos en línea** a un elemento se le añade el atributo `style` y se le agrega el valor con las declaraciones deseadas. Este tipo de estilo tiene mayor prioridad sobre otras reglas de CSS para ser aplicadas.

```html
<p style="color: #fff; width: max-content; padding: 5px 10px; margin: auto; border-radius: 10px; background: radial-gradient(ellipse at center, rgba(240,47,23,0.7) 0%, rgba(240,47,23,1) 100%);">
En Línea
</p>
```

<p style="color: #fff; width: max-content;padding: 5px 10px; margin: auto; border-radius: 10px; background: radial-gradient(ellipse at center, rgba(240,47,23,0.7) 0%, rgba(240,47,23,1) 100%);">
En Línea
</p>

En HTML existe una estiqueta destinada para los **estilos internos**. Se pueden agregar estilos directamente usando la etiqueta de HTML `<style>`. Debería de usarse dentro de la etiqueta `<head>`.

```html
<style>
body {
  margin: 0;
  padding: 0;
}
</style>
```

La manera que se aprovecha mejor es con **estilos externos**. Este tipo de estilo es el que tiene menor prioridad sobre otras reglas de CSS. Se hace un `<link>` a una hoja de estilos (.css) dentro de la etiqueta `<head>` de nuestro documento HTML. Al momento de cargar la página, inmediatamente llamará a la hoja de estilos externa y aplicará los estilos. Con esto le quitamos el peso del html de cargar con los estilos para tener un mejor tiempo de respuesta. Para hacer esto la etiqueta `<link>` debe de ir de la siguiente forma, donde href es la ubicación de la hoja de estilos.

```html
<link
  rel="stylesheet"
  href="./styles.css"
  type="text/css"
/>
```

## Selectores

Al usar CSS en una hoja externa o en la etiqueta `<style>` los selectores son necesarios para estilar elementos específicos. Estos indican a qué elementos se le tienen que aplicar los estilos.

El **selector universal** es un asterisco `*` selecciona cualquier tipo de etiqueta del documento HTML. Al igual que los demas selectores se puede combinar.

```css
* { ... }

div * span { ... }
```

Para **seleccionar etiquetas** simplemente se escribe el nombre de la etiqueta seguida de las declaraciones de css entre paréntesis.

```css
nav { ... }

nav[class="topNavbar"] { ... }
```

Si se quiere seleccionar por atributos se puede hacer con los **selectores de atributos**. Se distinguen por los corchetes `[]` que continene la especificación del selector.

```css
[lang="es-MX"] { ... }
```

Pueden ser tan especificos como se muestran en la siguiente tabla:

|  **Selector atributo** |                          **Selección**                          |
|:----------------------:|:---------------------------------------------------------------:|
|      `[atributo]`      |              Elemento que contenga cierto atributo              |
|  `[atributo="valor"]`  |           Elemento que el atributo sea igual al valor           |
|  `[atributo*="valor"]` |          Elemento que el atributo incluya cierto valor          |
|  `[atributo~="valor"]` |  Elemento que el atributo incluya el valor separado por espacio |
|  `[atributo^="valor"]` |        Elemento que el atributo empiece con cierto valor        |
| `[atributo\|="valor"]` | Elemento que el atributo empiece con el valor o valor (espacio) |
|  `[atributo$="valor"]` |        Elemento que el atributo termine con cierto valor        |

Las `id` en HTML son únicas, por consecuencia hace que en CSS también solo se pueda aplicar a un solo elemento único. Para **seleccionar atributos `id`** se usa el símbolo `#` antes del nombre de la `id`.

```css
#SomeId { ... }
```

Para **seleccionar atributos class** se usa el nombre de un atributo clase precediendo un punto `.` se seleccionarán todos los elementos que tienen el mismo atributo `class`. El siguiente ejemplo le aplica los estilos a todos los elementos con el mismo atributo `class`.

```css
.clase { ... }
```

### Combinaciones de selectores

Los selectores se pueden combinar para seleccionar elementos que tienen cierta relación siempre de forma descendente.

La manera para **compartir propiedades** es separando los selectores con comma `,`. Esto ayuda a no repetirse y tener un código más limpio.

```css
nav.topNavbar, a[href=*"example.com"], #someId { ... }
```

Para ser más selectivos podemos especificar **etiquetas, class o id's unidos** de un punto `.`. Para el siguiente ejemplo, selecciona todas las etiquetas `<nav>` que contengan el atributo `class` topNavbar y el `id` someId.

```css
nav#someId.topNavbar { ... }

nav.topNavb#someId { ... }
```

Otra forma de especificar elementos es a través de la **selección por jerarquía**. Se hace separando los elementos a tener en cuenta por espacios. Para el siguiente ejemplo, selecciona todos los elementos que contengan el atributo `class` topNavbar y que tenga un ancestro de etiqueta `<nav>`, no tiene que ser directamente el padre.

```css
nav .topNavbar { ... }
```

Ahora si se quiere hacer una **selección de elementos con ancestro directo** tenemos el signo `>`. En el siguiente ejemplo seleccionamos todos los elementos con el atributo `class` topNavbar que el padre sea una etiqueta `<nav>`.

```css
nav > .topNavbar { ... }
```

Otra tipo de selector es **seleccionar elementos del mismo nivel**. Con el signo `~` podemos seleccionar elementos del mismo nivel siguientes al elemento. El siguiente ejemplo selecciona a todos los elementos del mismo nivel que sigue inmediatamente con el atributo `class` topNavbar.

```css
nav ~ .topNavbar { ... }
```

Para **seleccionar el primer elemento del mismo nivel** tenemos el signo `+`. El siguiente ejemplo selecciona al primer elemento del mismo nivel que sigue inmediatamente con el atributo `class` topNavbar.

```css
nav + .topNavbar { ... }
```

## Declaraciones

Las declaraciones son los estilos que sobrescribirán los estilos por defecto que le da el navegador, es todo lo que está dentro del paréntesis separado por punto y comma `;`. Están compuestas por el nombre de la propiedad y el valor.

```css
div {
  margin-top: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
}
```

Las **declaraciones abreviadas** son estilos que nos permiten tener varias declaraciones en una misma línea. Se emplea una propiedad general y se escriben los valores separados por espacio. Ahorra tiempo y se mira más legible.

El anterior margen se puede reducir a lo siguiente usando una declaración abreviada. El valor sigue el patrón de las manecillas del reloj (top right bottom left):

```css
div {
  margin: 10px 10px 10px 10px;
}
```

También existen los **valores abreviados**. Si solo se incluyen dos valores, se toma como el primer valor a `margin-top` y `margin-bottom` y el segundo valor `margin-right` y `margin-left`. En caso de incluirse 3 valores, se toman de forma de las manecillas del reloj y el segundo valor sería para `margin-left`.

```css
div {
  margin: 10px;
}

div {
  margin: 10px 20px;
}

div {
  margin: 10px 20px 30px;
}
```

### Propiedades personalizadas

Las propiedades personalizadas son como las **variables** en otros lenguajes. Almacena valores, distinguen entre mayúsculas y minúsculas y pueden actualizar los valores a través de la cascada.

Para crear una propiedad customizada se utiliza como prefijo el doble guion `--`. Tienen nombre de la propiedad y el valor que se le da. Para usar la propiedad se hace a través de la función `var`.

```css
.topNavbar {
  --color-verde: #1DB954;
  --color-gris: #ccc;
  background: var(--color-gris);
  color: var(--color-verde);
}
```

Para usar las propiedades en un scope global del documento se pueden definir las propiedades en la pseudo-clase `:root`.

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

## Herencia y cascada

Los elementos de CSS tienen la característica de que se pueden **heredar propiedades desde los ancestros hasta el elemento actual**. Esto modifica el valor que la propiedad tiene por defecto. Propiedades como `font` y `color` ocurren de forma automática. Otras propiedades es necesario decirle que herede las propiedades con valores especiales.

- El valor **`initial`** establece el valor por defecto.
- El valor **`inherit`** hereda el valor desde el ancestro.
- El valor **`unset`** hereda el valor desde el ancestro y no existe establece el valor por defecto.

```css
div {
  border: initial;
  border: inherit;
  border: unset;  
}
```

CSS como en su nombre lo indica **hoja de estilos en cascada**, como una cascada de arriba hacia abajo. Nos indica que la última propiedad definida va a prevalecer. El **orden** es una parte importante para CSS. En el siguiente ejemplo el color del párrafo quedará en negro.

```css
p {
  color: white;
}

p {
  color: black;
}
```

En una propiedad abreviada debe de ir antes de una propiedad única. Si se hace del revés, la declaración abreviada sobrescribirá la propiedad única a la que el navegador entienda por defecto, pues la propiedad abreviadad contiene los demás valores dados por el defecto.

Mal:

```css
p {
  font-style: italic;
  font: 20px Arial;
}
```

Bien:

```css
p {
  font: 20px Arial;
  font-style: italic;
}
```

El lugar dónde está ubicado nuestros estilos da **importancia** a que se apliquen. También existe un valor dedicado a ello `!important`. Este valor hará que se aplique el estilo independientemente del orden que se aplique. En el siguiente ejemplo el color del párrafo quedará en blanco.

```css
p {
  color: white !important;
}

p {
  color: black;
}
```

La **especificidad** es el último que entra en juego en la cascada. Si en un elemento existe aún duda sobre que elemento estilar, se mide con este factor. Para el siguiente párrafo el color será blanco.

```html
<p class="blanco"></p>
```

```css
p.blanco {
  color: white;
}

p {
  color: black;
}
```

## Funciones

CSS al igual que otros lenguajes cuenta con funciones. A diferencia de otros lenguajes, en CSS no podemos crear nuevas funciones.

Tenemos **funciones generales**, estas son las más usadas comúnmente como las de asignar propiedades personalizadas, aplicar colores, hacer cálculos sobre unidades del DOM entre otras.

```css
{
  color: var(--color-white);
  color: rgba(123,123,123,0.2);
  width: calc(100vw - 80px);
  background: radial-gradient(ellipse at center, rgba(240,47,23,0.7) 0%, rgba(240,47,23,1) 100%);
  background-image: url("src/image.jpg");
}
```

También podemos usar **funciones de selectores** para iterar entre elementos. El siguiente ejemplo aplica estilos diferentes cada 3 elementos de item.

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

Las **funciones de dimensiones** se aplican a los elementos definidos por vectores.

```css
.dimension {
  transform: scale(2);
  transform: translate(-50%, -50%);
  transform: perspective(50em) rotateY(50deg)
}
```

Las **funciones de filtro** definen efectos visuales, generalmente en imágenes o vídeos.

```css
img {
  filter: brightness(110%);
  filter: contrast(120%);
  filter: grayscale(90%);
}
```

Tenemos **funciones de grids**. Estas funciones nos ayudan a estructurar nuestro contenido con grids.

```css
.grid {
  grid-template-columns: fit-content(250px) 1fr;
  grid-template-columns: minmax(10px, 100px) 1fr minmax(min-content, 300px);
  grid-template-columns: repeat(6, 40px 80px);
}
```

## Reglas at

Son declaraciones que comienzan con el símbolo arroba `@`,

`@import` nos permite incluir una hoja de estilos externa, con esto podemos vover a usar nuestros estilos y poder agregar más estilos. El siguiente código importará la fuente Monserrat si se encuentra en un dispositivo de impresión.

```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap') print;
```

`@keyframes`  — Describe la configuración de pasos intermedios en una secuencia de animación CSS.

`@media` se usa para aplicar estilos para diferentes tipos de medios

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

Una forma de mirar los elementos a la hora de darle estilos es de forma de cajas. La mayoría de elementos se pueden estilar de esta forma pues tienen dentro el contenido, el relleno que las asegura, el borde de la caja y el margen que las separa de otras cajas.

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
- `Padding` - El relleno es un espacio entre el contenido y el borde.
- `Border` - El borde es lo que rodea al relleno y el contenido.
- `Margin` - El margen es un espacio desde el borde hacia el exterior.

### Diferencia entre Padding y Margin

El `padding` y el `margin` **son separadores**. El `margin` siempre es invisible y **separa al exterior** de nuestro elemento con respecto al borde. El `padding` puede ser visible al asignarle un background al elemento, **separa al interior** de nuestro elemento con respecto al borde.

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

En la primera caja el borde es el que delimita el color del `background`. El `padding` toma el color del `background` dando una separación de 30 pixeles a partir del borde hacia el interior.

En la segunda caja el margen no se pinta con el `background`. Hace una separación del borde hacia el exterior de 30 pixeles.

## Animaciones

Las animaciones en css requieren de la regla `keyframes` seguida del nombre de la animación. Los selectores se pueden representar con porcentajes de 0% a 100% o con las palabras `from` y `to` que sería lo mismo que 0% y 100%.

Esta animación puede ser llamada asignándola a un elemento con la propiedad `animation-name` y con `animation-duration`.

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

CSS no se interpreta igual en todos los navegadores, un decorador de texto puede que no luzca de la misma forma en Firefox que en Chrome. Aplicar ciertos trucos para que todos luzca igual en todos los navegadores puede que sea una tarea tediosa. Es importante saber el mercado de usuarios al que va dirigido la página que creamos para saber en que navegadores enfocarnos.

CSS es un lenguaje vivo, en el cual se sigue trabajando en nuevas características. Algunos navegadores deciden implementar estas nuevas características, las cuales podemos utilizar con **prefijos** que solo el navegador conoce. La ventaja de CSS es que si un navegador no conoce una propiedad o valor la ignorará e irá a la siguiente cosa que entienda.
Los siguientes prefijos son los más comunes:

| **Prefijo** |       **Navegadores**       |
|:-----------:|:---------------------------:|
|   -webkit-  |        Chrome, Safari       |
|    -moz-    |           Firefox           |
|     -o-     |            Opera            |
|     -ms-    | Microsoft Internet Explorer |

[Can I Use](https://caniuse.com "Can I Use") es una web que nos permite saber si un navegador soporta ciertas características la cual vale la pena explorar. Podemos ver rápidamente el soporte completo, nulo, parcial o con prefijos para una propiedad.

Soporte para la propiedad `hyphens` en distintos navegadores:

<iframe src="https://caniuse.bitsofco.de/embed/index.html?feat=css-hyphens&periods=future_1,current,past_1,past_2&accessible-colours=false&image-base=none" title="Can I Use Hyphens" frameborder="0" width="100%" height="450"></iframe>

## Conclusión

Hemos visto una vista muy general sobre lo que es CSS, aprender este lenguaje es lo básico para darle vida a sitios web. Conocer el alcance que puede tener CSS por si solo es una gran ventaja. Hay muchas cosas que debemos de tener en cuenta para crear productos y este lenguaje cada vez las facilita más. Investiga acerca de las nuevas características y pon a prueba tu creatividad.
