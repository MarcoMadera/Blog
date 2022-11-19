---
title: Como usar intersection observer
description: Intersection observer es una API que permite detectar cuando un elemento entra en una zona visible.
date: 2022-02-14
cover: https://res.cloudinary.com/marcomadera/image/upload/Blog/intersection-observer/camera_k4t8ps.jpg
coverAlt: Una cámara de seguridad pintada sobre una superficie blanca.
author: Marco Madera
tags:
  - JavaScript
---

Algunas veces necesitamos saber en qué parte se encuentra un elemento en la pantalla para poder hacer algo. Por ejemplo, hace tiempo, creando un clon de Spotify para experimentar me tope con el siguiente caso de uso peculiar:

<videogif src="https://res.cloudinary.com/marcomadera/video/upload/Blog/intersection-observer/Pinned_header_k_rfvlbg.mp4" title="Spotify sticky table header"></videogif>

En este caso, el elemento que modificaría es la barra de titulo, album y fecha añadida. Si bien es una barra que se vuelve sticky al topar con el header de la página, pero ¿Cómo podría detectar cuando se vuelve sticky para cambiar el aspecto?

Estuve pensando cuál sería la mejor solución, lo cual tenía dos en mente: usar _scroll listener_[^1] o usar intersection observer. En este caso, decidí usar _intersection observer_[^2].

[^1]: (2022). Scroll Event - Web APIs | MDN. [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll_event).

[^2]: Uso de intersection observer para detectar barra de playlist fijada - [online] Available at: [Github: Marco Madera - spotify-playlists-cleaner](https://github.com/MarcoMadera/spotify-playlists-cleaner/blob/906c48d5fa097f3d6bc8ceeafa74fe208b0488a7/components/forPlaylistsPage/Titles.tsx#L24)

## ¿Qué es intersection observer?

Es una API que permite detectar cuando un elemento entra en una zona visible. Esto es muy útil para detectar cuando un elemento entra en la pantalla, o cuando un elemento sale de la pantalla.

_Intersection observer_ proporciona una forma de observar de forma asíncrona los cambios en la intersección de un elemento objetivo con un elemento ascendiente o con el viewport de un documento de nivel superior[^3].

[^3]: (2022). Intersection Observer API - Web APIs | MDN. [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

Un ejemplo de uso es cuando un elemento se encuentra en la pantalla, pero no se ve por completo en la pantalla, entonces se debe hacer un scroll hasta que se ve completamente y cuando se detecta en pantalla, se ejecuta una acción.

## ¿Cómo usarlo?

Para usar el intersection observer, primero debemos crear una instacia del mismo y pasarle como primer parametro un callback que se ejecutará cuando el elemento objetivo entre en la pantalla y se le puede pasar un segundo parametro opcional que es la configuración.

```js {"addedLines": [], "removedLines": [], "highlight": [16]}
function callback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log('Elemento visible');
      observer.unobserve(entry.target);
    }
  });
}

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};

const observer = new IntersectionObserver(callback, options);

observer.observe(document.querySelector('.observable'));
```

### Métodos

Para poder observar el elemento, debemos usar el método `observe` y le pasamos la referencia del elemento que queremos observar.

```typescript
observer.observe(targetElement as Element);
```

Para detener la observación del elemento, debemos usar el método `unobserve` y le pasamos la referencia del elemento que queremos detener la observación.

```typescript
observer.unobserve(targetElement as Element);
```

Para obtener la información de la observación, debemos usar el método `takeRecords`, esto nos devolverá un array con todos los elementos que han entrado en la zona visible.

```typescript
const records = observer.takeRecords();
```

Para dejar de observar todos los elementos, debemos usar el método `disconnect`. Esta acción es necesaria para evitar fugas de memoria, asi que asegúrate que no queden observadores sin desconectar.

```typescript
observer.disconnect();
```

### _Callback_ de la función de intersección

- `entries`: Array de objetos que contienen información sobre la intersección.
- `observer`: Referencia al observer que ha lanzado la intersección.
- `intersectionRect`: Rectángulo que contiene la intersección.
- `intersectionRatio`: Ratio de intersección.
- `boundingClientRect`: Rectángulo que contiene el elemento.
- `rootBounds`: Rectángulo que contiene el elemento.
- `target`: Elemento que ha lanzado la intersección.

### Opciones de configuración

- `rootMargin`: `0px 0px 0px 0px` el margen que se usará para la intersección.
- `root`: `null` por defecto (document) (el elemento que queremos observar)
- `threshold`: `null` por defecto (0) (0 - 1) Este se usa para especificar el porcentaje de intersección que debe haber para que se detecte una intersección y llamé el callback. Puede ser un número, un array de números o null.

## Scroll listener vs Intersection observer

La gran diferencia entre usar scroll listener y intersection observer es que el _scroll listener_ se ejecuta cada vez que se hace scroll, se dispara a una velocidad alta, mientras que el _intersection observer_ solo se ejecuta cuando un elemento entra en la pantalla, por lo que la diferencia es el costo de computación, creando un problema de rendimiento.[^4]

[^4]: (2019). Aggelos Arvanitakis - Scroll listener vs Intersection Observers: a performance comparison by @AggArvanitakis [itnext.io](https://itnext.io/1v1-scroll-listener-vs-intersection-observers-469a26ab9eb6).

<tweet id="1492930143475548161"></tweet>

## Posibles casos de uso

Algunos casos de uso son:

- Pausar la reproducción de un vídeo cuando no está visible en pantalla.
- Crear una ventana fija donde se muestra el vídeo cuando se hace scroll.
- Hacer lazy loading de imágenes.
- Hacer una animación de entrada de un elemento cuando entra en la pantalla.
- Un posible caso que estoy probando es detectar en qué parte del post se está leyendo y hacerlo visible en la tabla de contenido.\
  <videogif src="https://res.cloudinary.com/marcomadera/video/upload/Blog/intersection-observer/Intersection-observer-TOC_yhhqig.mp4" title="Cambiar el avance de la tabla de contenido"></videogif>
- Otro caso relacionado podría ser detectar cuando el lector pasa por todos los títulos y marcar el post como leído.

## Ejemplo de lazy loading con intersection observer

Para detectar que un elemento se acerca al viewport con una distancia de 500px, debemos especificar una zona de intersección de 500px de arriba y abajo.

```typescript {"addedLines": [], "removedLines": [], "highlight": [8]}
const cachedRef = ref.current;
const observer = new IntersectionObserver(
  ([e]) => {
    console.log("realiza una llamada porque el elemento está 500px cerca del viewport");
    this.disconnect();
  },
  {
    rootMargin: "0px 0px 500px 0px",
  }
);

observer.observe(cachedRef as Element);

return function () {
  observer.disconect(cachedRef as Element);
};
```

Esto se puede usar para hacer `fetch` de una datos cuando el usuario está cerca del elemento que los muestra y asi evitar que se carguen datos innecesarios. Por ejemplo, si tenemos una lista de productos que se muestra en la pantalla, y cada producto tiene una imagen que se carga en el _viewport_, podemos hacer un fetch de los datos cuando el usuario está cerca del elemento que muestra la imagen.

Para saber que un elemento ha hecho intersección con el _viewport_, debemos usar el método `takeRecords` y le pasamos la referencia del elemento que queremos obtener la información.

## Conclusión

El uso de _Intersection Observer_ es muy útil para detectar cuando un elemento está cerca del viewport. Es increíblemente fácil de usar, lo cual es una gran ventaja y también puede usarse para ayudar a mejorar el rendimiento en las páginas web.
