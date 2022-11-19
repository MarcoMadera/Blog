---
title: "Tipos y objetos en JavaScript"
description: En JavaScript tenemos varios tipos de datos; booleanos, numéricos, los de texto o string, el null que indica que una variable.
date: 2021-01-27
cover: https://res.cloudinary.com/marcomadera/image/upload/Blog/tipos-y-objetos-en-javascript/brandable-box-yW9jdBmE1BY-unsplash_krdahy.jpg
coverAlt: Una caja sobre una mesa y libros en el fondo.
author: Marco Madera
tags:
  - JavaScript
---

En JavaScript tenemos varios tipos de datos; _booleanos_, numéricos, los de texto o _string_, el null que indica que una variable no tiene un valor, _undefined_ que indica que una variable está declarada en memoria, pero su valor aún no ha sido definido y el _symbol_, el cual fue introducido en la definición de ECMAScript 6. A partir de aquí todo lo demás son objetos, como son los arreglos o _arrays_, las fechas o incluso objetos que tú mismo declares.

## Diferencias entre valores primitivos y objetos

1. Los valores primitivos son inmutables.
2. No se pueden declarar propiedades a valores primitivos.
3. Los objetos se manejan por referencias por lo que dos objetos diferentes que tengan los mismos valores no serán iguales.

Para entender esto veamos el siguiente ejemplo:

```javascript
let str = "yay";
console.log(str[0]); // "y"
console.log(str.length); // 3

str[0] = "p";
console.log(str);
```

Analizando el código anterior ¿Cuál será el segundo resultado de la consola? De una el resultado sigue siendo `"yay"`, pero ¿Por qué pasa esto?

Primero tenemos que entender que los _strings_ son valores primitivos y como se ha mencionado los valores primitivos son inmutables, o sea que no se pueden modificar. Cuando se intenta acceder a una propiedad de un valor primitivo como en el caso de `str[0]`, **JavaScript envuelve el valor en un objeto**.

Lo anterior puede resultar un poco confuso, pero veamos cómo sería el código enfocándonos cuando JavaScript envuelve los valores primitivos en un nuevo objeto para que tenga sentido la acción que le damos a realizar.

```javascript {"addedLines": [4,5,8], "removedLines": [2,3,7], "highlight": []}
let str = "yay";
console.log(str[0]); // "y"
console.log(str.length); // 3
console.log(new String(str)[0]); // "y"
console.log(new String(str).length); // 3

str[0] = "p";
new String(str)[0] = "p";
console.log(str);
```

<note type="success" title="Pasos">

1. Se define una variable `str` de valor primitivo _string_.
2. Se intenta acceder al _key_ 0 de la variable `str`, como no es posible declarar propiedades a valores primitivos JavaScript lo envuelve en un objeto de tipo _string_, se accede al valor y lo imprime dando resultado `y`.
3. Hace lo mismo del paso anterior, pero accede a la propiedad `length`.
4. Se crea otro objeto de la variable `str` donde la key 0 es igual a `p`. Es como escribir 1+1 en medio de una ejecución.
5. Imprime la variable str que es igual a `yay`.

</note>

Cuando comparamos objetos, estos se comparan por referencia. ¿Esto qué significa? Cada objeto, a pesar de que puedan lucir similares o iguales, ellos son diferentes, cada uno tiene su propia identidad. A la hora de comparar dos objetos vamos a obtener un valor negativo, ya que ellos no son iguales. A diferencia los valores primitivos, los cuales ellos no tienen su propia identidad, vamos a obtener un resultado positivo.

Una forma simple de ver que los objetos tienen identificador propio está en palabra _new_, lo veo como algo que cada vez que se invoca es algo nuevo distinto a lo demás y algo simple de comprobar de una manera más visual es comparando los datos.

```javascript
10 === 10; // true
"ave" === "ave"; // true
// new Object() es equivalente a {}
{} === {}; // false
[] === []; // false
```

¿Qué significa que los objetos se comparan por referencia? Tomemos el siguiente ejemplo:

```javascript
let obj = {};
let dos = obj;
let obj2 = {};
obj === dos; // true
obj === obj2; // false
```

El resultado al comparar `obj` y dos es _true_ porque en este caso sí es el mismo objeto porque apunta a la misma dirección de la memoria y `obj` con `obj2` es _false_ porque ya no son el mismo objeto.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 264.5 249.5" width="100%" height="250"><path d="M13.025 19.584c37.787-4.246 77.393-.904 102.93-1.912m-102.283.942c26.923-.09 54.455 1.033 103.299-1.012m-.77-1.07c.802 16.112.205 32.668-1.31 48.372m.676-47.588c-.015 16.232 1.366 31.827.582 47.286m-.404-.224c-39.08 1.17-76.427-1.996-103.187 2.434m104.52-2.397c-27.546.982-53.602 1.116-103.946-.1m-1.34-1.233c1.025-8.57.37-20.481 1.027-46.268m1.057 47.829c.077-14.43-.419-31.846-1.114-46.428M204.987 13.023c6.074-2.693 15.596-4.339 22.194-2.289 6.597 2.05 13.577 8.723 17.39 14.589 3.811 5.866 6.374 13.883 5.481 20.607-.892 6.724-5.409 15.241-10.838 19.736-5.428 4.495-14.538 7.161-21.733 7.233-7.196.071-15.794-2.713-21.44-6.805-5.646-4.093-11.1-11.2-12.436-17.748-1.336-6.548 1.037-15.423 4.42-21.538 3.383-6.116 12.865-12.441 15.88-15.154 3.013-2.712 1.441-1.01 2.204-1.122.763-.111 2.244-.198 2.373.456m9.92-1.357c6.87.352 15.779 5.27 20.901 9.704 5.123 4.435 9.203 10.317 9.835 16.904.632 6.587-2.458 16.636-6.045 22.618-3.586 5.983-8.722 11.39-15.473 13.277-6.752 1.886-18.547.679-25.037-1.96-6.491-2.64-10.953-7.869-13.908-13.875s-5.044-15.586-3.823-22.163c1.221-6.576 5.545-13.415 11.15-17.298 5.607-3.884 18.768-4.962 22.486-6.002 3.719-1.04-.278-.087-.174-.238.104-.15.953-.863.798-.664" stroke="#364fc7" fill="none"/><text x="22.5" y="32" font-family="cursive, Segoe UI Emoji" font-size="28" fill="#0b7285" text-anchor="middle" style="white-space:pre" transform="translate(41 18)">Obj</text><text x="15" y="32" font-family="cursive, Segoe UI Emoji" font-size="28" fill="#2b8a3e" text-anchor="middle" style="white-space:pre" transform="translate(203.5 19.5)">{}</text><path d="M9.177 102.613c42.523-1.39 80.814-1.37 104.49.546m-103.55-.024c34.62.754 69.173.644 102.592 1.293m-.446-2.778c-1.21 13.225.445 20.472 2.396 46.91m-2.08-44.613c.563 12.24.278 25.664-.514 46.36m-.04-1.117c-28.583 2.756-62.721.907-100.546-.048m101.226.603c-40.825.929-81.235 1.344-102.992 1.55m-.916-1.269c2.534-12.334 2.891-22.89 1.122-47.973m-.878 48.16c1.673-10.859 1.359-21.325 1.9-47.276" stroke="#364fc7" fill="none"/><text x="23.5" y="32" font-family="cursive, Segoe UI Emoji" font-size="28" fill="#0b7285" text-anchor="middle" style="white-space:pre" transform="translate(38 105)">dos</text><path d="M113.12 126.66c6.946-.014 29.641 4.147 42.442.786 12.8-3.361 25.85-11.79 34.362-20.951 8.512-9.161 14.087-28.452 16.712-34.014m-91.515 52.955c6.848-.428 27.674 3.625 40.05.121 12.377-3.504 26.102-12.438 34.21-21.145 8.107-8.708 11.953-25.96 14.438-31.1M117.322 40.54c11.143-.011 55.188.002 66.107.11m-67.135-1.396c10.974.186 55.245 2.19 66.15 2.75" stroke="#087f5b" fill="none"/><path d="M178.692 37.785c-.026 1.214 1.353 4.661 1.716 5.695.363 1.034.253 1.42.46.507.207-.913.905-4.726.78-5.983-.124-1.256-1.257-1.235-1.528-1.556m.349.704c-.197 1.443-.416 6.757-.532 7.592-.117.835-.506-1.555-.167-2.582.34-1.026 2.335-2.641 2.203-3.577-.133-.936-2.345-1.974-2.998-2.037M202.219 73.984c.947.46 4.986 2.623 5.79 2.401.802-.222.252-3.333-.971-3.734-1.224-.4-5.548 1.119-6.371 1.329m.47-1.05c.76.645 5.375 5.05 6.19 4.67.815-.38-.156-6.528-1.298-6.95-1.142-.42-4.705 3.822-5.553 4.423" stroke="#087f5b" fill="none"/><path d="M205.138 71.75c-.201.009-1.316-.51-1.544-.13-.227.382.425 1.853.18 2.414-.246.56-1.416 1.058-1.652.952-.237-.107-.527-1.239.233-1.591.76-.352 3.58-.74 4.324-.522.744.217.18 2.272.14 1.827-.039-.444-.637-4.4-.375-4.496.262-.095 2.44 3.457 1.946 3.926-.493.468-4.235-.754-4.904-1.113-.668-.36.848-.782.893-1.042m-.364-1.402c-.378.218-1.176 1.674-1.32 2.386-.143.712.543 1.364.456 1.885-.088.52-.678 1.38-.98 1.238-.304-.142-1.754-1.37-.839-2.09.915-.719 5.366-2.181 6.328-2.226.962-.045-.7 2.343-.555 1.956.144-.386 1.406-4.213 1.42-4.276.013-.064-.539 3.285-1.34 3.893-.8.61-3.038-.175-3.463-.24-.425-.066.598.24.914-.152M180.49 38.192c.1.858 1.787 4.466 1.453 5.563-.334 1.098-2.888 1.426-3.46 1.02-.571-.404-.661-2.47.03-3.449.69-.98 3.567-2.078 4.113-2.429m-.466 1.485c-.005 1.076-.19 4.373-.933 4.782-.741.41-3.195-1.809-3.518-2.323-.323-.515.909-.164 1.582-.765s2.388-2.213 2.456-2.842" stroke="#087f5b" fill="none"/><path d="M11.987 189.18c32.44-1.536 69.977-.848 101.794 1.694m-103.294-.638c39.67-.558 79.518-.936 103.429-.206m1.745-1.568c-1.317 14.078-1.206 29.508.063 48.489m-1.256-47.324c-.715 13.547-.224 28.5-1.306 47.772m-.985-.413c-20.677.498-46.304-2.237-100.975.54m103.12-1.481c-39.419-.067-76.862.99-103.546 1.357m.941-1.43c-2.282-7.41.568-19.918-2.464-45.816m2.165 46.217c-1.419-11.605.425-23.76-.69-47.147" stroke="#364fc7" fill="none"/><text x="30" y="32" font-family="cursive, Segoe UI Emoji" font-size="28" fill="#0b7285" text-anchor="middle" style="white-space:pre" transform="translate(32.5 188)">obj2</text><path d="M217.62 176.33c6.582-1.337 14.768 1.66 20.58 5.336 5.813 3.675 12.056 10.32 14.296 16.715s1.696 15.598-.857 21.656c-2.553 6.057-8.478 11.39-14.459 14.689-5.98 3.298-14.682 6.287-21.426 5.102-6.744-1.185-14.45-6.93-19.038-12.21-4.588-5.281-8.363-12.716-8.488-19.472-.125-6.757 3.05-15.971 7.737-21.067s16.272-7.663 20.383-9.508c4.111-1.844 2.813-1.492 4.285-1.56 1.473-.069 4.452.704 4.548 1.15m-16.383.787c6.178-2.501 16.06-2.7 23.067-.184 7.007 2.516 15.39 9.488 18.971 15.283 3.582 5.795 3.66 13.26 2.518 19.486-1.14 6.225-4.04 13.292-9.364 17.868-5.323 4.575-15.304 9.153-22.576 9.585-7.272.431-15.726-2.725-21.054-6.997-5.33-4.271-9.675-11.975-10.918-18.63-1.243-6.656.306-15.476 3.458-21.303 3.153-5.827 12.667-11.356 15.456-13.658 2.79-2.303.77.106 1.279-.159.509-.264 1.552-1.645 1.776-1.43" stroke="#364fc7" fill="none"/><text x="15" y="32" font-family="cursive, Segoe UI Emoji" font-size="28" fill="#2b8a3e" text-anchor="middle" style="white-space:pre" transform="translate(206.5 186)">{}</text><path d="M114.905 212.57c12.144.038 60.483.377 72.256.24m-73.502-1.512c12.061-.259 60.521-.457 72.9-.187" stroke="#087f5b" fill="none"/><path d="M187.165 211.917c-.048-.772-1.244-3.877-.947-4.09.297-.213 2.378 2.1 2.731 2.813.353.711-.534.429-.614 1.458-.08 1.029.625 4.092.135 4.717-.491.625-2.719-.21-3.08-.968-.362-.757.909-2.994.91-3.575m-.244-1.444c-.232-.71-1.24-1.713-.934-2.08.306-.365 2.297-.778 2.772-.115.475.663.14 2.595.076 4.095-.064 1.5-.17 4.572-.462 4.905-.292.333-1.177-1.812-1.289-2.906-.111-1.094.414-3.238.62-3.658" stroke="#087f5b" fill="none"/></svg>

En caso de que queramos comparar el contenido de _arrays_ u objetos es posible que lo que queramos usar sean los valores primitivos de _tuples_ o _records_, valores que son primitivos que se añaden recientemente al lenguaje.

```javascript
#[] === #[]; // true
#{} === #{}; // true
```

## Coerción de Datos

La coerción sucede cuando tenemos que **convertir un valor de un tipo de dato a otro tipo de dato**. La coerción puede suceder en ciertos escenarios automáticamente debido a que JavaScript es un lenguaje débilmente tipado, por ejemplo:

```javascript
true + 5; // 6
```

Aquí estamos sumando el valor booleano true con el número 5 y estamos recibiendo un resultado de 6. ¿Por qué sucede esto? Bueno, sucede porque JavaScript está convirtiendo el valor `true` a 1 para darle sentido a esta operación. En este caso, `true` nos retorna un 1. Al sumarse recibimos un 6.

```javascript
["abc"] + "abc"; // abcabc
```

Aquí estamos sumando un arreglo el cual tiene un elemento de una cadena de texto que es `abc` con una cadena de texto sin el arreglo, de esta suma recibimos un `abcabc`. JavaScript convierte el arreglo a un _string_ automáticamente y al sumar ambas cadenas de texto se concatenan.

La **coerción numérica**, generalmente sucede cuando tú intentas hacer alguna operación matemática, por ejemplo, en este caso:

```javascript
50 / "5"; // 10
```

Aquí estamos dividiendo un número 50 entre un _string_ que tiene un valor de 5. JavaScript convierte el _string_ 5 a un número. Por lo tanto, recibimos un 10.

La **coerción de _strings_** generalmente sucede cuando se utiliza el operador de suma y alguno de los dos valores es un _string_. JavaScript asume se está intentando concatenar _strings_, entonces trata de convertir el otro elemento en _string_ y los une, como puedes ver aquí.

```javascript
54 + "abc"; // "54abc"
54 + ""; // "54"
```

La **coerción de booleanos** sucede cuando se intenta, comparar o hacer alguna operación lógica.

```javascript
0 || 5; // 5
```

Aquí tenemos un operador _OR_, básicamente está diciendo o 0 o 5, y estamos recibiendo 5. El 0 está siendo convertido a un valor `false` y 5 está siendo convertido a un valor `true`. El operador _OR_ siempre se va a inclinar por el valor `true` y por eso recibimos un 5.

## Igualdad de Valores

En JavaScript existen los siguientes tipos de igualdad:

| Igualdad    | Representación           |
| ----------- | ------------------------ |
| Abstracta   | a == b (doble igual)     |
| Estricta    | a === b (triple iguales) |
| Mismo valor | Object.is(a, b)          |

La **igualdad abstracta** es confusa porque al igual que lo vimos en la [coerción de datos](#coercion-de-datos "Coerción de datos") JavaScript convierte los valores a un tipo que tenga sentido.

```javascript
["abc"] == "abc"; // true
```

Para tener una idea más clara de todos los resultados dependiendo de la operación puedes ver la siguiente tabla:

![Tabla de igualdad de JavaScript](https://res.cloudinary.com/marcomadera/image/upload/f_auto,c_scale,w_500,h_481,dpr_auto/Blog/tipos-y-objetos-en-javascript/Coercion_dzxmpj.png "Tabla de igualdad de JavaScript")
<captione>Tabla de igualdad de JavaScript[^equality-table]</captione>

[^equality-table]: Dorey [Equality in JavaScript](https://dorey.github.io/JavaScript-Equality-Table/)

Es difícil aprenderse la tabla anterior por lo que hacer este tipo de igualdades puede causar algunos errores en nuestro programa o algunos comportamientos inesperados si olvidamos un dato. ¿Cómo la evitamos?. Lo recomendable es que se use el operador de **igualdad estricta**. Este operador evita que los valores se conviertan al compararlo uno con el otro.

```javascript
["abc"] === "abc"; // false
```

Puedes ver que ya obtenemos un valor `false`, ya que este _array_ no está siendo convertido en un _string_.

La **igualdad del mismo valor con** `Object.is()` es muy similar a la igualdad estricta, con dos casos especiales, _Not a Number_ y la igualdad de cero y cero con signo negativo.

```javascript
NaN === NaN; // false
Object.is(NaN, NaN); // true
-0 === 0; // true
Object.is(-0, 0); // false
0 === -0; // true
Object.is(0, -0); // false
```

## Prototipos

En JavaScript todos los objetos tienen un prototipo. Lo podemos ver en la consola como `__proto__`, aquí podemos ver todas las funciones y argumentos que se pueden usar y al final de la lista puede que veamos de nuevo a `__proto__` hasta llegar al `__proto__: Object` porque todos los objetos de JavaScript heredan de este objeto creando la cadena de prototipos.

![Prototipo](https://res.cloudinary.com/marcomadera/image/upload/f_auto,c_scale,w_260,h_176,dpr_auto/Blog/tipos-y-objetos-en-javascript/proto_uvgdvt.png)

Ventajas de los prototipos:

- Todas las funciones o propiedades que declaremos dentro del prototipo van a ser heredadas por todas las instancias de esta clase.
- Todas las instancias de esta clase van a apuntar al mismo prototipo por lo que podemos tener un sinfín de números de instancias, pero solamente un prototipo. Entonces no vamos a sobrecargar la memoria de la computadora.

Para crear una clase se utiliza un objeto función donde se pueden agregan las propiedades y se declaran los métodos utilizando `prototype` en lugar de como se vio en la consola `__proto__`. Con esto ya se pueden llamar instancias de la clase.

```javascript  {"addedLines": [], "removedLines": [], "highlight": [28]}
function Persona(edad) {}
//Declarar métodos
Persona.prototype = {
  permisos: function permisos() {
    console.log(
      `tengo ${this.edad} y ${this.edad < 18 ? "no" : "sí"} puedo votar`
    );
  },
};
Persona.prototype.constructor = Persona;

function Estudiante(nombre, edad) {
  Persona.call(this);
  this.nombre = nombre;
  this.edad = edad;
}
//Declarar métodos
Estudiante.prototype = Object.create(Persona.prototype, {
  decirNombre: {
    value: function decirNombre() {
      console.log("Mi nombre es", this.nombre);
    },
  },
});
Estudiante.prototype.constructor = Estudiante;

// Crear instancias de la clase
let estudiante = new Estudiante("Juanito", 17);
estudiante.decirNombre();
estudiante.permisos();
```

Desde la especificación de ECMAScript 6 se introdujo la sintaxis de las clases. Es una transformación de la sintaxis de prototipos para hacer más cómoda la declaración de clases, _syntactic sugar_ para prototipos.

```javascript {"addedLines": [], "removedLines": [], "highlight": [23]}
class Persona {
  //Declarar métodos
  permisos() {
    console.log(
      `tengo ${this.edad} y ${this.edad < 18 ? "no" : "sí"} puedo votar`
    );
  }
}

class Estudiante extends Persona {
  constructor(nombre, edad) {
    super();
    this.nombre = nombre;
    this.edad = edad;
  }
  //Declarar métodos
  decirNombre() {
    console.log("Mi nombre es:", this.nombre);
  }
}

// Crear instancias de la clase
let estudiante = new Estudiante("Marco", 17);
estudiante.decirNombre();
estudiante.permisos();
```

Se puede observar las similitudes a los prototipos, se declara la clase, dentro tiene el método constructor donde recibe las propiedades y se declaran los métodos. Ahora al ver la estructura del objeto vemos lo siguiente donde la izquierda es creada en forma de prototipo y la derecha en forma de clase.

![Prototipos vs Classes](https://res.cloudinary.com/marcomadera/image/upload/f_auto,c_scale,w_630,h_267,dpr_auto/Blog/tipos-y-objetos-en-javascript/Proto-vs-Classes_xdvwjy.png)

Se puede observar que la diferencia es que en el constructor una es de tipo función y la otra dice `class`, pero al ver el tipo se puede ver que por detrás la clase es una función.

## Conclusión

Hemos visto el comportamiento de los tipos primitivos y las características de los objetos de JavaScript. Los objetos están por todas partes y los revisamos por encima sin tocar métodos y otros detalles. También vimos la forma tradicional de crear clases y la que fue implementada con ES6.
