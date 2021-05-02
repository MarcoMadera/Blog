---
title: "Snippets en Visual Studio Code"
description: Los snippets son fragmentos reutilizables de código personalizado que puedes llamar con un atajo de teclado o con prefijos.
date: 2021-03-08
cover: https://res.cloudinary.com/marcomadera/image/upload/v1615174792/Blog/Code%20Snippets%20en%20VSCode/Vscode_Logo_kw0vrw.png
author: Marco Madera
tags:
  - VSCode
  - Personalización
---

Al empezar a usar <abbr title="Visual Studio Code">VSCode</abbr> me enteré de los *snippets* y cree algunos muy buenos, pero por alguna razón no los uso mucho. Recordar los prefijos muy cortos que puse no me ayudó de mucho y creo que ese fue mi punto débil.

## ¿Qué son los snippets?

Los *snippets* son **fragmentos reutilizables de código personalizado** que puedes llamar con un atajo de teclado o con prefijos mientras escribes en el editor.

<videogif title="Snippet general" src="https://res.cloudinary.com/marcomadera/video/upload/c_scale,w_650/v1615173210/Blog/Code%20Snippets%20en%20VSCode/generalSnippet_peoxlp.mp4"></videogif>

<abbr title="Visual Studio Code">VSCode</abbr> te sugiere ayuda con *IntelliSense* al estar escribiendo. Entre ellas se encuentran los *snippets* que se identifican por un cuadrado, el prefijo utilizado y el título del *snippet*.

## Scope en los snippets

Gracias al *scope* de los *snippets* es que <abbr title="Visual Studio Code">VSCode</abbr> sugiere los *snippets* que puedas usar en el archivo basado en el lenguaje y/o proyecto.

- **Scope global**: Es útil porque se pueden **usar todos los snippets que definas independietemente del proyecto y del lenguaje** que usemos. Para definirlo se dirije a abrir las opciones con <kbd>ctrl</kbd>+<kbd>shift</kbd>+<kbd>p</kbd> y buscar *`preferences: Configure User Snippets > new global snippets file`*, te pedira un nombre del archivo global y creará el archivo `json` donde se puede empezar a crear los *snippets*.
- **Scope de lenguaje**: Estos son **snippets basados en el lenguaje** que usemos, este lenguaje se puede cambiar con <kbd>ctrl</kbd>+<kbd>k</kbd> seguido de la tecla <kbd>m</kbd>. Al igual que *scope* global *`preferences: Configure User Snippets`* se busca el lenguaje deseado y abrirá el archivo donde se pueden empezar a crearlos.
- **Scope de proyecto**: Solo **se pueden usar en un proyecto específico**. Es útil porque se puede compartir con el proyecto. Al igual en las opciones se busca por `New Snippets file for "project name"` te pedirá el nombre del archivo y crea una carpeta si no existe llamada `.vscode` donde se encuentra el archivo que tenemos que editar.

## Crear snippets propios

Una vez elegido el *scope* y ya dentro de nuestro archivo podemos crear nuestro primer *snippet* donde el primer *key* es el nombre, dentro de este van 3 elementos:

- **Prefix**: Es el prefijo con el que llamaremos al *snippet*. Algunas personas le algo al inicio para identicarlos como por ejemplo `_c`, pero por gusto personal y facilidad no lo hago.
- **Body**: Es el código a usar.
- **Description**: (opcional) es la descripción de ayuda que aparecerá al darle en más detalles como se vio al inicio.

```json
{
  "Comment": {
    "prefix": "c",
    "body": "$LINE_COMMENT $0 $LINE_COMMENT",
    "description": "set a comment"
  },
}
```

El anterior *snippet* es el ya visto comentario, expliquemos que pasa en el body: Primero tenemos a `$LINE_COMMENT` esto es una **variable predefinida por visual studio code**, la sintaxis de variables empieza por el símbolo `$` esta variable nos ayuda a poner comentarios sin tener que preocuparnos por el lenguaje, ya que algunos ya están soportados. Lo que hace este *snippet* perfecto para que sea de *scope* global.

El símbolo `$0` es muy importante. **`$0` indica donde va a acabar siempre la posición cursor** al seguir pulsando <kbd>tab</kbd>. Si este valor es mayor a 0 irá de manera ascendente hasta llegar al final 0.

|   Orden en body   | $1 | $0 | $3 | $2 |
|:-----------------:|:--:|:--:|:--:|:--:|
|Posición del cursor| 1  | 4  | 3  | 2  |

### Variables predefinidas y variables con opciones

Para darle un nombre predeterminado a una variable se le agrega`:nombre` después del número de variable. Y para crear una variable con opciones, al igual seguido del número separamos las opciones por coma y las envolvemos dentro de los símbolos `||`.

En el siguiente ejemplo tenemos dos variables predefinidas y una opcional.

- **Variables predefinidas**: `${1:document}` y `${0:element}`.
- **Variable opcional**: `${2|querySelector, getElementById, getElementsByClassName, getElementsByTagName|}`.

```json
{
  "Get Dom Node": {
    "prefix": "getDom",
    "body": "${1:document}.${2|querySelector,getElementById,getElementsByClassName,getElementsByTagName|}(\"${0:element}\");"
  },
}
```

<videogif title="Snippet de opciones" src="https://res.cloudinary.com/marcomadera/video/upload/c_scale,w_650/v1615170791/Blog/Code%20Snippets%20en%20VSCode/snippe-GetDom_u0ywz8.mp4"></videogif>

### Múltiples líneas

Por ahora hemos visto *snippets* de una sola línea, pero el **body también puede ser un `array` de multiples cadenas de texto**, donde cada cadena de texto sería un salto de línea y podemos identarlo con `\t`, si es el caso que queramos usar todo en una sola línea podemos usar el salto de línea de `\n`.

```json
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
  },
}
```

<videogif title="Snippet de transformación" src="https://res.cloudinary.com/marcomadera/video/upload/f_auto,c_limit,w_650,q_100/v1614922303/Blog/Code%20Snippets%20en%20VSCode/2021-03-04_23-25-01_fqurrx.mp4"></videogif>

### Transformaciones

El siguiente ejemplo contiene un caso común si estás familiarizado con React, crea un fragmento que envuelve al texto con variable predefinida del texto seleccionado.

```json
{
  "Fragment (Wrapper)": {
    "prefix": "frag",
    "body": "<>\n\t${TM_SELECTED_TEXT}$0\n</>",
    "description": "Wrap the selected content in a fragment"
  },
}
```

Podemos **transformar las variables**, ya que aceptan expresiones regulares. En el siguiente ejemplo transforma un *arrow function* a una *verbose function*, los pasos para realizarlo son los siguientes:

1. Escribe primero la primera línea `export default function`.
2. Toma el nombre del archivo con la variable `TM_FILENAME_BASE`.
3. Pega el texto seleccionado. Este contiene la expresión regular que hace *match* con la primera y última línea y las remplaza por un espacio vacío.

En la parte final es donde se remplaza lo que hace *match* de regex en `//gm` `/<texto a remplazar>/gm` y `g` es el contexto global de regex y la `m` que tomará en cuenta que contenga múltiples líneas para poder seleccionar ambas.

```json
{
  "Export default function (Wrapper)": {
    "prefix": "df",
    "body": [
      "export default function ${TM_FILENAME_BASE}() {${TM_SELECTED_TEXT/^(?:(?<![\f\n\r])(?:.*))(?=[\f\n\r])|^.*(?![\f\n\r])$//gm}"
    ],
    "description": "Wrap a component and tranform it in a function component"
  },
}
```

El fragmento y la transformación se verían de la siguiente manera:

<videogif title="Snippet de opciones" src="https://res.cloudinary.com/marcomadera/video/upload/c_scale,w_650/v1615182704/Blog/Code%20Snippets%20en%20VSCode/defaultFunctionFragment_uevits.mp4"></videogif>

## Llamar a los snippets

Ya hemos visto una forma de llamar a los *snippets* que es con los prefijos que definimos, pero hay otras formas.

En las opciones <kbd>ctrl</kbd>+<kbd>shift</kbd>+<kbd>p</kbd> buscamos *`insert snippet`* y nos dará una lista con los *snippets* que podemos usar.

Otra opción que podemos usar con los *snippets* que más usamos a diario es con **atajos de teclado**. Es una forma un poco más rápida, pero con la desventaja de tener menos opciones a la mano y que sean difícil de olvidar si tenemos muchos.

Estos atajos los podemos definir en el archivo `keybindings.json`, lo podemos encontrar usando el atajo <kbd>ctrl</kbd>+<kbd>p</kbd> y escribiendo en la barra de búsqueda *keybindings*. En este archivo podemos definir igual un *snippet* de la siguiente forma:

```json
{
  "key": "ctrl+;",
  "command": "editor.action.insertSnippet",
  "when": "editorTextFocus",
  "args": {
    "snippet": "console.log($0);"
  }
}
```

También podemos referenciar nuestros *snippets* ya creados de la siguiente forma:

```json
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

Los *snippets* nos pueden acelerar a la hora de codear, pueden ser texto simple o código dinámico incluyendo opciones y valores predefinidos. Son de ayuda, ya que de esta forma no necesitamos recordar la sintaxis exacta de una porción de código, la guardamos en un *snippet* y la reutilizamos.
