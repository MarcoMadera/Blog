---
title: Map y WeakMap en JavaScript
description: Existen varias estructuras de datos que nos permiten almacenar información en JavasSript, una de ellas es el Map y el WeakMap.
date: 2022-02-28
cover: https://res.cloudinary.com/marcomadera/image/upload/v1646008638/Blog/Map-y-WeakMap/map_ibcrlr.jpg
author: Marco Madera
tags:
  - JavaScript
---

Usualmente cuando pienso en almacenar información en JavaScript pienso en hacerlo en objetos o en arrays. Actualmente existen otras estructuras de datos que nos permiten almacenar información en JavaScript, una de ellas es el `Map` y el `WeakMap`, que ponen en relación una clave con un valor, pero con diferencias importantes.

## Map

Los objetos `Map`[^1] son como un tipo de diccionarios en donde nosotros asociamos un _key_ o una llave con un valor. Los objetos `Map` se construyen utilizando el _keyword_ `new` y llamando a la clase `Map`. Una ventaja es que **con los `Map` podemos utilizar cualquier tipo de dato como _key_**.

[^1]: MDN Web Docs & MDN contributors <cite>[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)</cite>

```javascript
const map = new Map([["key", "value"], [1, "uno"], [true, "verdadero"]]);

console.log(map.get("key")); // value
console.log(map.get(1)); // uno
console.log(map.get(true)); // verdadero
```

## Métodos

Los objetos `Map` tienen una serie de métodos que nos permiten interactuar con el mismo. Aquí tenemos una lista de los métodos que podemos utilizar con los objetos `Map`.

### Set

Para asignar un _key_ a un valor utilizamos el método `set`.

```javascript
const map = new Map();

map.set("key", "value");
map.set(1, "uno");
map.set(true, "verdadero");
const simpleObject = {};
map.set(simpleObject, "objeto");

for ([key, value] of map) {
  console.log(key, value);
}
```

### Clear

Elimina todos los valores asociados al objeto `Map`.

```javascript
const map = new Map([["key", "value"], [1, "uno"], [true, "verdadero"]]);
console.log(map.get("key")); // value

map.clear();
console.log(map.get("key")); // undefined
```

### Delete

Elimina un valor asociado al objeto `Map`.

```javascript
const map = new Map([["key", "value"], [1, "uno"], [true, "verdadero"]]);
console.log(map.get("key")); // value
console.log(map.get(1)); // uno

map.delete("key");
console.log(map.get("key")); // undefined
console.log(map.get(1)); // uno
```

### Has

Devuelve `true` si el objeto map tiene un valor asociado al _key_ que se le pasa como parámetro. En caso contrario devuelve `false`.

```javascript
const map = new Map();
map.set(window, "hey");

map.has(window); // true
map.has("no");  // false
```

### forEach

Permite iterar sobre los valores asociados al objeto map. El método `forEach` recibe una función que recibe dos parámetros: el _key_ y el _value_. El método `forEach` no devuelve ningún valor.

```javascript
const map = new Map([["key", "value"], [1, "uno"], [true, "verdadero"]]);
map.forEach((value, key) => {
  console.log(key, value);
});
```

## WeakMap

El objeto `WeakMap`[^2] es similar al `Map`, que solo aceptan objetos como _key_ y que pueden ser recolectados por el garbage collector.

[^2]: MDN Web Docs & MDN contributors <cite>[WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)</cite>

### Garbage Collector

El garbage collector es un proceso que se ejecuta en el navegador que elimina los objetos que ya no están referenciados de la memoria, esto ayuda a no consumir recursos innecesarios y que no colapse la memoria.

### Caracteriscas de WeakMap

Son similares a los objetos `Map` pero con algunas diferencias esenciales:

- Solo se pueden asociar objetos como _key_.

  ```javascript
  const weakMap = new WeakMap([["key", "value"], [1, "uno"], [true, "verdadero"]]);
  ```

  <colors green lightblue red textcolor blue orange></colors>

  <pre><code data-lang="Console"><span class="red">Uncaught TypeError: Invalid value used as weak map key</span>
  <span class="red">    at WeakMap.set (&#60;anonymous&#62;)</span>
  <span class="red">    at new WeakMap (&#60;anonymous&#62;)</span>
  <span class="red">    at &#60;anonymous&#62;:1:17</span>
  </code></pre>

- No tiene el método `keys()` por lo que no podemos acceder a `values()`, `entries()`, `clear()` o la propiedad `size` `WeakMap` y tampoco es iterable.
- Los objetos asociados a un objeto `WeakMap` será recolectado por el garbage collector cuando ya no existan más referencias a ellos.

Ya que la consola de chrome es _lazy_, es probable que podamos ver actuar al garbage collector con el siguiente ejemplo.

```javascript
let obj = {};
let map = new Map([[obj, "value"]]);
console.log(map.get(obj));
obj = null;
console.log(map);

let obj2 = {};
let weakMap = new WeakMap([[obj2, "value2"]]);
console.log(weakMap.get(obj2));
obj2 = null;
console.log(weakMap);
```

![Garbage collector en weakMap](https://res.cloudinary.com/marcomadera/image/upload/f_auto,dpr_auto,c_scale,w_450/v1646004262/Blog/Map-y-WeakMap/wmgbc_bajlng.png)

<captione>Al convertir el objeto a `null`, weakMap perdio la única propiedad que tenía con referencia a ese objeto</captione>

## Diferencias entre Map y Object

- Los objetos solo permiten asociar como key los strings o symbol. Si pasamos otro valor JavaScript hará una [coerción de datos](https://marcomadera.com/blog/tipos-y-objetos-en-javascript#coercion-de-datos) para convertir el valor en un string.
- Podemos acceder al tamaño de un Map con el método `size`, algo que con los objetos no podemos hacer.
- La forma en la que podemos iterarlos es diferente.

  ```javascript
  // Map
  const map = new Map([["key", "value"], [1, "uno"], [true, "verdadero"]]);
  for (let [key, value] of map) {
    console.log(key, value);
  }

  // Objetos
  const obj = {"key": "value", "key2": "value2"};
  const keys = Object.keys(obj);
  keys.forEach(key => {
    console.log(key, obj[key]);
  });

  // o bien
  for (key in obj) {
    console.log(key, obj[key])
  }
  ```

- La forma de eliminar un valor de un Map es mediante el método `delete` y con los objetos mediante el operador delete.

```javascript
// Map
const map = new Map([["key", "value"], [1, "uno"], [true, "verdadero"]]);
console.log(map.size); // 3
map.delete("key");
console.log(map.size); // 2

// Object
const obj = {key: "value", 1: "uno", true: "verdadero"};
console.log(Object.keys(obj).length); // 3
delete obj.key;
console.log(Object.keys(obj).length); // 2
```

<note type="danger">El operador `delete` en varios escenarios puede cambiar la velocidad arbitrariamente, por lo que no es muy recomendable de usar cuando se requiere un buen rendimiento de la aplicación.</note>

<tweet id="1468129309030244360"></tweet>

## Conclusión

Las estructuras de datos `Map` y `WeakMap` son otra alternativa para almacenar datos en forma de clave-valor, que pueden servir para casos especiales, según las necesidades de nuestra aplicación. Existen también estructuras de datos `Set` y `WeakSet` que son similares a estas, por lo que le puedes echar un vistazo.
