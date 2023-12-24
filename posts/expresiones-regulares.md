---
title: "Como usar expresiones regulares con JavaScript"
description: Las expresiones regulares son patrones que definimos para filtrar en una cadena de caracteres.
date: 2021-09-04
cover: https://res.cloudinary.com/marcomadera/image/upload/Blog/expresiones-regulares/craig-chitima-vEbpWVRwPZE-unsplash_fnzthz.jpg
coverAlt: Una persona bailando haciendo una parada de manos en el aire en un campo.
author: Marco Madera
tags:
  - JavaScript
---

La mayor parte de mi vida he evitado las cosas complicadas sin siquiera intentarlas de verdad. Simplemente supongo que son complicadas porque así se ven... **complicadas**.

En una ocasión tuve que usar expresiones regulares para resolver algo muy sencillo. Tardé horas averiguando la mejor forma de hacerlo. Al final lo logré, estaba feliz porque había aprendido algo nuevo y todo funcionaba correctamente, así que hice _deploy_ de la aplicación.

Una semana después un amigo me avisó que la aplicación no le funcionaba en Safari. Y pues claro yo no sabía cuál podría ser la raíz del problema porque en una semana ya había hecho muchos cambios. Para ponerla en corto era que yo había caído en el error de la compatibilidad, porque Safari no soportaba el _look behind_[^1] `<=` y _look ahead_ `=>` de las expresiones regulares, algo que sí soportaban Google Chrome y Firefox.

[^1]: A la fecha de publicar este post, Safari no soporta la expresión regular `<=` y `=>` (`look behind` y `look ahead`). Can I use <cite>[Lookbehind in JS regular expressions](https://caniuse.com/js-regexp-lookbehind)</cite>

Después de esta experiencia ya no quería usar más expresiones regulares, porque es difícil de entender el significado de algo asi (`/^(.){5}\w?[a-Z|A-Z|0-9]$/ig`), sin experiencia puede parecer abrumador y luego le agregamos una carga más al tener que estar atento qué navegador soporta que cosa.

Lo tenía claro las expresiones regulares no son para mí, ni para muchos, ya que pueden llegar a ser un dolor de cabeza...

<tweet id="1405731639569764359"></tweet>

Pero de vez en cuando te encuentras con un problema que crees que se puede resolver con expresiones regulares y no que se puede hacer e incluso te preguntas si se puede resolver sin expresiones regulares o no. Al final, las expresiones pueden parecer caracteres absurdos, pero lo tienen, pueden ser muy complejas, pero no son difíciles de entender.

## ¿Qué son las expresiones regulares?

Las expresiones regulares[^2] son patrones que definimos para filtrar en una cadena de caracteres. Son útiles para seleccionar parte de la información que necesitamos, descartando lo que sobra. ¿A que se parece a un buscador normal tipo <kbd>CTRL</kbd>+<kbd>F</kbd>, cierto?

[^2]: MDN Web Docs & MDN contributors <cite>[Regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)</cite>

<videogif src="https://res.cloudinary.com/marcomadera/video/upload/Blog/expresiones-regulares/E-TKDVoXEAA4Rfp_adpqde.mp4"></videogif>

Se diferencia del <kbd>CTRL</kbd>+<kbd>F</kbd> en que busca textos precisos y te arroja el match. Con expresiones regulares es más complejo porque busca por patrones, como por ejemplo, buscar todas las palabras que estén entre dos espacios, palabras que comienzan con mayúscula, encontrar la primera palabra de cada línea, etc.

<colors purple blue green></color>

## Sintaxis de expresiones regulares

Lucen algo así `/#\d+\s+.*/g`, `/contenido/flags`, esto JavaScript lo entenderá como una expresión regular, pero por detrás, lo que en realidad hace es que lo envuelve en un objeto RegExp, como se explicó en el blog [Tipos y objetos en JavaScript](https://marcomadera.com/blog/tipos-y-objetos-en-javascript); gracias a esto podemos acceder a las propiedades y métodos como _flags_, _ignoreCase_, `exec()`, `test()`, etc.

```javascript twoslash
const reg1 = /#\d+\s+.*/g;
//    ^?
const reg2 = new RegExp(/#\d+\s+.*/, "g");
//    ^?
// @annotate: right { "arrowRot": "190deg 8px 46px", "flipped": false, "textDegree": "-3deg", "top": "1rem" } - Lo mismo, pero con el constructor
```

<captione text="Forma de la expresión regular"></captione>

### Flags

Los _flags_, se sitúan al final de una expresión regular `/contenido/flags`. Los _flags_ permiten darle características a nuestras búsquedas y pueden ser usadas en cualquier orden.

- `g`: Coincidencia global: comprueba en toda la cadena, en lugar de detenerse cuando encuentra la primera coincidencia.
- `i`: Ignora si es mayúscula o minúscula.
- `m`: Búsqueda en multilínea

### Grupos y Rangos

Dentro del contenido, podemos encontrar los siguientes grupos y rangos de caracteres de expresión.

- `[]`: Toma en cuenta los caracteres dentro de los _brackets_ <code>/<span class="purple">[</span>a<span class="purple">]</span>/g</code> aplicado: <span class="green">"<span class="purple">a</span>e<span class="purple">a</span>"</span>
- `[^]`: Toma en cuenta los caracteres que no están dentro de los _brackets_ después del símbolo `^`, <code>/<span class="purple">[^</span>a<span class="purple">]</span>/g</code> aplicado: <span class="green">"a<span class="purple">e</span>a"</span>
- `( )`: Recuerda lo que está dentro del paréntesis, captura al grupo para después usarlos con <code><span class="purple">$</span>n</code> en algún método de _string_ donde `n` es el índice del grupo empezando por 1. También se puede declarar un nombre a cada grupo <code><span class="purple">(?<</span>nombre<span class="purple">>)</span></code> para identificarlos en la propiedad _groups_ de _RegExp_
- `|`: Uno u otro <code>/<span class="purple">true</span><span class="blue">\|</span><span class="purple">false</span>/g</code> aplicado: <span class="green">"<span class="purple">true</span> es verdadero y <span class="purple">false</span> es falso"</span>

### Clases de caracteres predefinidas

Para facilitarnos las cosas tenemos clases ya predefinidas y construidas que distinguen tipos.

- `.`: Toma cualquier carácter, no toma nuevas líneas a excepción de que se use el _flag_ `s`. Si por ejemplo queremos usar un punto, pero no representar una clase, lo tendremos que escapar con el _backslash_ `\` seguido de la clase `\.`.
- `\d`: Encuentra todos los dígitos de 0 a 9, es equivalente a [0-9].
- `\D`: Encuentra todo lo que no es un dígito.
- `\w`: Carácter alfanumérico es equivalente a [a-zA-Z0-9_].
- `\W`: No es un carácter alfanumérico.
- `\s`: Espacios de cualquier tipo. (espacio, _tab_, nueva línea).
- `\S`: No es un espacio, _tab_ o nueva línea.

La siguientes expresiones son equivalentes: <code>/<span class="purple">[0-9]</span>+<span class="blue">[a-t]</span>\*/g</code> y <code>/<span class="purple">\d</span>+<span class="blue">[a-t]</span>\*/g</code> aplicado: <span class="green">"
<span class="purple">967</span><span class="blue">toma</span><span class="purple">769</span><span class="blue">c</span>uanto <span class="purple">234</span> texto"
</span>

<videogif src="https://res.cloudinary.com/marcomadera/video/upload/Blog/expresiones-regulares/E-ahf3fVkAIw5_P_mhm6gx.mp4"></videogif>

---

### Cuantificadores

Seguimos con los cuantificadores indican el número de caracteres o expresiones que deben coincidir.

- `{ }`: Hace match al número exacto entre corchetes <code>/a<span class="purple">{3}</span>/</code> aplica a <span class="green">"<span class="purple">aaa</span>"</span> pero no a <span class="green">"aaaa"</span>
- `{ , }`: Hace match el número de veces en el rango separado por comas (mínimo, máximo), el máximo tiene que ser siempre mayor y si no está presente significa a todos.
- `*`: 0 o más, es equivalente a `{0,}`
- `+`: 1 o más, es equivalente a `{1,}`
- `?`: 0 o uno, es equivalente a `{0,1}`

---

### Limitadores

Terminamos con los limitadores que indican el comienzo y el final de líneas y palabras, y otros patrones que indican de alguna manera que el reconocimiento es posible.

- `\b`: Indica un límite de palabra, por ejemplo si tenemos oraciones que terminan en espacio para no tomarlo podemos agregar este límite, <code><span>/[\s\w]\*<span class="purple">\b</span>/g</span></code>, aplicado: <span class="green">"<mark style="background: #aa5dff; color:#000000">no termines con espacios</mark> "</span>, de esta forma no toma el espacio final.
- `\B`: Indica lo que no es un límite de palabra.
- `^`: Indica el inicio de una cadena de texto, puedes limitar que una cadena empieza con una palabra <code>/<span class="purple">^caso:.\*</span>/ig</code>aplicado selecciona <span class="green">"<span class="purple">caso: 43</span>"</span>, pero no <span class="green">"casa: 43"</span>
- `$`: Final de una cadena de texto, puedes limitar a cadenas que terminen con <code>/.\*<span class="purple">\\.$</span>/ig</code>, aplicado selecciona <span class="green">"<span class="purple">Fin.</span>"</span>, pero no <span class="green">"Fin"</span>

<note type="tip" inline>Utiliza una herramienta para hacer test de tus expresiones regulares como [regextester](https://www.regextester.com/)</note>

## Métodos para expresiones regulares

Las expresiones regulares se utilizan con los métodos `test()`, `exec()`, `match()`, `replace()`, `search()` y `split()`.

### Test y search

- **`Test:`** es una propiedad de las expresiones regulares que busca una ocurrencia, si la hay devuelve `true` de lo contrario `false`.
- **`Search:`** es una propiedad de los _strings_ que busca la primera ocurrencia y devuelve el índice, si no la hay devuelve -1.

```javascript twoslash
// @errors: 1109
"aaaaa".search(/aa/) // => 0
"sddaaaaa".search(/aa/) // => 3
"sddaaaaa".search(/aad/) // => -1

/a/.test("asxsxa") // => true
/e/.test("asxsxa") // => false
```

### Replace, ReplaceAll y Split

- **`Replace:`** es un método de los _strings_ que toma una expresión regular para una ocurrencia que será remplazada por el segundo parámetro de este método que puede ser una función o un _string_ que puede incluir patrones de remplazo `$` según los elementos capturados (entre paréntesis).
- **`ReplaceAll:`** Es igual a `replace` solo que está es de todas las ocurrencias, es una propiedad de los strings que permite ejecutarlas. Este método devuelve un _array_ con las coincidencias en el índice 0 y los demás índices son las partes que se encuentran entre paréntesis.
- **`Split:`** Utiliza una expresión regular para dividir el _string_ en cada ocurrencia.

```ts twoslash {4}
// @target: esnext
let tweetText =
  "@NovallSwift “If you have a problem and decide to fix it using regex, now you have two problems” — @dlpasco, circa 2013";

tweetText.replaceAll(/@(\w+)/g, "<a href='twitter.com/$1'>@$1</a>");

//<a href='twitter.com/NovallSwift'>@NovallSwift</a> “If you have a problem and decide to fix it using regex, now you have two problems” — <a href='twitter.com/dlpasco'>@dlpasco</a>, circa 2013
```

### Match, Exec y MatchAll

- **`Match:`** es una propiedad de los _strings_ que permite hacer uso de expresiones regulares. Este método devuelve un _array_ con todas las coincidencias en el _string_.
- **`Exec:`** es una propiedad de las expresiones regulares que permite ejecutarlas. Este método devuelve un _array_ con las coincidencias en el índice 0 y los demás indices son las partes que se encuentran entre paréntesis.
- **`MatchAll:`** Este método devuelve un _iterador_ con las coincidencias de una expresión regular incluidos los grupos de captura.

Me encontré el siguiente tweet con información valiosa. Quiero usarla con otra presentación, por lo que tengo que extraer sus partes. Suponiendo que el contenido del _string_ a manipular es desde la palabra _Hot_ hasta [@taylorswift13](https://twitter.com/taylorswift13).

<tweet id="1433186979630526469"></tweet>

```ts twoslash {12}
// @target: esnext
const string = `Hot 100’s top 10 this week in 2008:
#1 Disturbia @rihanna
#2 Crush @DavidArchie
#3 Forever @chrisbrown
#4 I Kissed A Girl @katyperry
#5 Viva La Vida @coldplay
#6 Paper Planes @MIAuniverse
#7 Dangerous @KardinalO
#8 Take A Bow
#9 Closer @NeYoCompound
#10 Change @taylorswift13`;

// ---cut---
const hits = string.match(/#\d+\s+.*/g);

const hitsData = hits?.map((hit) => {
  const regularExp =
    /#(?<number>\d+)\s+(?<songTitle>[\s\w]*\b)\s?(?<username>@\w+)?/gi;

  // Diferentes formas de obtener los datos
  // const [match, number, songTitle, username] = regularExp.exec(hit);
  // const [match, number, songTitle, username] = [...hit.matchAll(regularExp)][0];
  // const {number, songTitle, username} = [...hit.matchAll(regularExp)][0].groups;

  return regularExp?.exec(hit)?.groups;
});
```

<note type="danger" inline>El uso del método `exec()` con el _flag_ global recordará el `lastIndex` en la expresión regular, por lo que al usarla de nuevo se pueden obtener resultados inesperados. La razón de por qué funciona con este ejemplo es porque la constante `regularExp` se crea cada vez que un hit es manejado por `map`, lo que crea un problema de performance. Si se define `regularExp` fuera para que no se cree de nuevo es conveniente usar `matchAll` dentro de la función al mapear hits.</note>

<note type="tip" inline title="Ejercicio">Modifica el código para que se pueda usar `exec()` y `matchAll()` para obtener los hits del string.</note>

<note type="success" title="Explicación de la expresión regular">

1. Lo que significa `/#\d+\s+.*/g` es todo lo que contenga # seguido de uno o más dígitos, seguido por uno o más espacios y después por cualquier carácter excepto nueva línea. Esto retornará un _array_ con todos los elementos.
2. Ya teniendo el _array_ de hits se mapea para obtener la información de cada uno, para ello creamos nuestra expresión dónde queremos capturar los grupos que deseamos extraer `/#(?<number>\d+)\s+(?<songTitle>[\s\w]*\b)\s?(?<username>@\w+)?/gi`, esta significa:
   1. En la expresión que empieza con # captura uno o más dígitos `\d+` que le siguen, en el grupo llamado _number_.
   2. Seguido de uno o más espacios `\s+`, captura en el grupo _songTitle_ ya sean espacios o alfanuméricos tantas veces como se presenten, `[\s\w]*`, pero que terminen en el límite de palabra `\b`.
   3. Luego puede haber o no haber un espacio `\s?` captura en el grupo _username_ el símbolo @ seguido de uno o más alfanuméricos `\w+`, pero hacemos este grupo username opcional agregando `?` al final del grupo.
3. Después podemos extraer los datos capturados con `exec()` o con `matchAll()` y retornar nuestro objeto.

</note>

```json twoslash {38-41}
// Resultado
[
  {
    "number": "1",
    "songTitle": "Disturbia",
    "username": "@rihanna"
  },
  {
    "number": "2",
    "songTitle": "Crush",
    "username": "@DavidArchie"
  },
  {
    "number": "3",
    "songTitle": "Forever",
    "username": "@chrisbrown"
  },
  {
    "number": "4",
    "songTitle": "I Kissed A Girl",
    "username": "@katyperry"
  },
  {
    "number": "5",
    "songTitle": "Viva La Vida",
    "username": "@coldplay"
  },
  {
    "number": "6",
    "songTitle": "Paper Planes",
    "username": "@MIAuniverse"
  },
  {
    "number": "7",
    "songTitle": "Dangerous",
    "username": "@KardinalO"
  },
  {
    "number": "8",
    "songTitle": "Take A Bow"
  },
  {
    "number": "9",
    "songTitle": "Closer",
    "username": "@NeYoCompound"
  },
  {
    "number": "10",
    "songTitle": "Change",
    "username": "@taylorswift13"
  }
]
```

<videogif src="https://res.cloudinary.com/marcomadera/video/upload/Blog/expresiones-regulares/E-aiHBMUYAAapTN_i9fdh8.mp4" width="30" height="30"></videogif>

Ahora ya tenemos nuestra información bien separada y lista para usar de otra forma. Como era esperado el hit número 8 no tiene nombre de usuario.

## Conclusión

Las expresiones regulares son una herramienta muy útil para validar datos de formularios, pero también para extraer información de un string.

Aunque exista un amor/odio con las expresiones regulares, en algún momento nos viene bien su uso. Tienen muchos buenos usos porque puede hacer búsquedas complejas como validar entradas de usuario o hacer _highlight_ a un bloque de código aplicando clases. Hay que tener cuidado dónde y cómo las usamos porque pueden ser objetivo de ataques.
