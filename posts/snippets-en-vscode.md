---
title: "Snippets en Visual Studio Code"
description: Los snippets son fragmentos reutilizables de código personalizado que puedes llamar con un atajo de teclado o con prefijos.
date: 2021-03-08
cover: https://res.cloudinary.com/marcomadera/image/upload/Blog/Code%20Snippets%20en%20VSCode/sonja-prein-Gg01DgNAZHg-unsplash_qjjk8b.jpg
coverAlt: Un primer plano de una persona tomando una foto con las manos.
author: Marco Madera
tags:
  - VSCode
  - Personalización
---

Al empezar a usar <abbr title="Visual Studio Code">VSCode</abbr> me enteré de los _snippets_ y cree algunos muy buenos, pero por alguna razón no los uso mucho. Recordar los prefijos muy cortos que puse no me ayudó de mucho y creo que ese fue mi punto débil.

## ¿Qué son los snippets?

Los _snippets_ en Visual Studio Code[^1] son **fragmentos de código reutilizables** que puedes llamar con un atajo de teclado o con prefijos mientras escribes en el editor.

[^1]: Visual Studio Code [Snippets in Visual Studio Code](https://code.visualstudio.com/docs/editor/userdefinedsnippets)

<videogif title="Snippet general" src="https://res.cloudinary.com/marcomadera/video/upload/c_scale,w_650/Blog/Code%20Snippets%20en%20VSCode/generalSnippet_peoxlp.mp4"></videogif>

<abbr title="Visual Studio Code">VSCode</abbr> te sugiere ayuda con _IntelliSense_ al estar escribiendo. Entre ellas se encuentran los _snippets_ que se identifican por un cuadrado, el prefijo utilizado y el título del _snippet_.

## Scope en los snippets

Gracias al _scope_ de los _snippets_ es que <abbr title="Visual Studio Code">VSCode</abbr> sugiere los _snippets_ que puedas usar en el archivo basado en el lenguaje y/o proyecto.

- **Scope global**: Es útil porque se pueden **usar todos los snippets que definas independietemente del proyecto y del lenguaje** que usemos.\

- **Scope de lenguaje**: Estos son **snippets basados en el lenguaje** que usemos, este lenguaje se puede cambiar con <kbd>ctrl</kbd>+<kbd>k</kbd> seguido de la tecla <kbd>m</kbd>.
- **Scope de proyecto**: Solo **se pueden usar en un proyecto específico**. Es útil porque se puede compartir con el proyecto.

<note type="important">

- Para **definir el scope global** se dirige a las opciones con <kbd>ctrl</kbd>+<kbd>shift</kbd>+<kbd>p</kbd> y buscar _`preferences: Configure User Snippets > new global snippets file`_, te pedirá un nombre del archivo global y creará el archivo `json` donde se puede empezar a crear los _snippets_.
- Para **definir el scope del lenguaje** en opciones _`preferences: Configure User Snippets`_ se busca el lenguaje deseado y abrirá el archivo donde se pueden empezar a crearlos.
- Para **definir el scope por proyecto** en opciones `preferences: Configure User Snippets > New Snippets file for "project name"` te pedirá el nombre del archivo y crea una carpeta si no existe llamada `.vscode` donde se encuentra el archivo que tenemos que editar.

</note>

## Crear snippets propios

Una vez elegido el _scope_ y ya dentro de nuestro archivo podemos crear nuestro primer _snippet_.

```json twoslash
{
  "Comment": {
    "prefix": "c",
    "body": "$LINE_COMMENT $0 $LINE_COMMENT",
    "description": "set a comment"
  }
}
```

<note type="info" title="Notas">

El primer _key_ es el nombre del _snippet_ y dentro de este va un objeto con 3 elementos:

- **Prefix**: Es el prefijo con el que llamaremos al _snippet_. Algunas personas le ponen algo al inicio para reconocer los _snippets_ propios, como por ejemplo `_c`.
- **Body**: Es el código a usar.
- **Description**: Es la descripción de ayuda que aparecerá al darle en más detalles como se vio al inicio (opcional).

</note>

El anterior _snippet_ es el ya visto en la primera sección, expliquemos que pasa en el body: Primero tenemos a `$LINE_COMMENT`, esto es una **variable predefinida por visual studio code**. La sintaxis de estas variables empieza por el símbolo `$`, .

<note type="tip">Gracias a que la variable `$LINE_COMMENT` nos ayuda a poner comentarios sin tener que preocuparnos por el lenguaje, hace que este _snippet_ sea perfecto para el _scope_ global.</note>

El símbolo `$0` es muy importante. **`$0` indica la posición en donde va a acabar nuestro cursor** al seguir pulsando <kbd>tab</kbd>. Si este valor es mayor a 0 irá de manera ascendente hasta llegar al final 0.

|    Orden en body    | $1  | $0  | $3  | $2  |
| :-----------------: | :-: | :-: | :-: | :-: |
| Posición del cursor |  1  |  4  |  3  |  2  |

### Variables predefinidas y variables con opciones

Para darle un nombre predeterminado a una variable se le agrega `:nombre` después del número de variable. Y para crear una variable con opciones, al igual seguido del número separamos las opciones por coma y las envolvemos dentro de los símbolos `||`.

En el siguiente ejemplo tenemos dos variables predefinidas y una opcional.

- **Variables predefinidas**: `${1:document}` y `${0:element}`.
- **Variable opcional**: `${2|querySelector, getElementById, getElementsByClassName, getElementsByTagName|}`.

```json twoslash
{
  "Get Dom Node": {
    "prefix": "getDom",
    "body": "${1:document}.${2|querySelector,getElementById,getElementsByClassName,getElementsByTagName|}(\"${0:element}\");"
  }
}
```

<videogif title="Snippet de opciones" src="https://res.cloudinary.com/marcomadera/video/upload/c_scale,w_650/Blog/Code%20Snippets%20en%20VSCode/snippe-GetDom_u0ywz8.mp4"></videogif>

### Múltiples líneas

Por ahora hemos visto _snippets_ de una sola línea, pero el **body también puede ser un `array` de multiples cadenas de texto**, donde cada cadena de texto sería un salto de línea y lo podemos indentar con `\t`, si es el caso que queramos usar todo en una sola línea podemos usar el salto de línea de `\n`.

```json twoslash
{
  "Default Component": {
    "prefix": "dc",
    "body": [
      "const ${TM_FILENAME_BASE} = ($1) => {",
      "\treturn (",
      "\t\t${0:// body...}",
      "\t);",
      "};",
      "",
      "export default ${TM_FILENAME_BASE};",
      ""
    ],
    "description": "Arrow function default Component, takes the file name"
  }
}
```

<videogif title="Snippet de transformación" src="https://res.cloudinary.com/marcomadera/video/upload/f_auto,c_limit,w_650,q_100/Blog/Code%20Snippets%20en%20VSCode/2021-03-04_23-25-01_fqurrx.mp4"></videogif>

### Transformaciones

El siguiente ejemplo contiene un caso común si estás familiarizado con React, crea un fragmento que envuelve al texto con variable predefinida del texto seleccionado.

```json twoslash
{
  "Fragment (Wrapper)": {
    "prefix": "frag",
    "body": "<>\n\t${TM_SELECTED_TEXT}$0\n</>",
    "description": "Wrap the selected content in a fragment"
  }
}
```

Podemos **transformar las variables**, ya que aceptan expresiones regulares. En el siguiente ejemplo transforma un _arrow function_ a una _verbose function_, los pasos para realizarlo son los siguientes:

1. Escribe primero la primera línea `export default function`.
2. Toma el nombre del archivo con la variable `TM_FILENAME_BASE`.
3. Pega el texto seleccionado. Este contiene la expresión regular que hace _match_ con la primera y última línea y las remplaza por un espacio vacío.

En la parte final es donde se remplaza lo que hace _match_ de regex en `//gm` `/<texto a remplazar>/gm` y `g` es el contexto global de regex y la `m` que tomará en cuenta que contenga múltiples líneas para poder seleccionar ambas.

```json twoslash
{
  "Export default function (Wrapper)": {
    "prefix": "df",
    "body": [
      "export default function ${TM_FILENAME_BASE}() {${TM_SELECTED_TEXT/^(?:(?<![\f\n\r])(?:.*))(?=[\f\n\r])|^.*(?![\f\n\r])$//gm}"
    ],
    "description": "Wrap a component and transform it in a function component"
  }
}
```

El fragmento y la transformación se verían de la siguiente manera:

<videogif title="Snippet de opciones" src="https://res.cloudinary.com/marcomadera/video/upload/c_scale,w_650/Blog/Code%20Snippets%20en%20VSCode/defaultFunctionFragment_uevits.mp4"></videogif>

## Llamar a los snippets

Ya hemos visto una forma de llamar a los _snippets_ que es con los prefijos que definimos, pero hay otras formas.

En las opciones <kbd>ctrl</kbd>+<kbd>shift</kbd>+<kbd>p</kbd> buscamos _`insert snippet`_ y nos dará una lista con los _snippets_ que podemos usar.

Otra opción que podemos usar con los _snippets_ que más usamos a diario es con **atajos de teclado**. Es una forma un poco más rápida, pero con la desventaja de tener menos opciones a la mano y que sean difícil de olvidar si tenemos muchos.

Estos atajos los podemos definir en el archivo `keybindings.json`, lo podemos encontrar usando el atajo <kbd>ctrl</kbd>+<kbd>p</kbd> y escribiendo en la barra de búsqueda _keybindings_. En este archivo podemos definir igual un _snippet_ de la siguiente forma:

```json twoslash
{
  "key": "ctrl+;",
  "command": "editor.action.insertSnippet",
  "when": "editorTextFocus",
  "args": {
    "snippet": "console.log($0);"
  }
}
```

También podemos referenciar nuestros _snippets_ ya creados de la siguiente forma:

```json twoslash
{
  "key": "ctrl+'",
  "command": "editor.action.insertSnippet",
  "when": "editorTextFocus",
  "args": {
    "langId": "javascriptreact",
    "name": "Default Component"
  }
}
```

## Conclusión

Los _snippets_ nos pueden acelerar a la hora de codear, pueden ser texto simple o código dinámico incluyendo opciones y valores predefinidos. Son de ayuda, ya que de esta forma no necesitamos recordar la sintaxis exacta de una porción de código, la guardamos en un _snippet_ y la reutilizamos.
