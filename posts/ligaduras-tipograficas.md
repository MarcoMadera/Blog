---
title: Ligaduras tipográficas - Tipos y Usos
description: Las ligaduras tipográficas son símbolos especiales que se producen por la unión de múltiples caracteres.
date: 2020-06-08
cover: v1595269475/Blog/2/LigadurasTipograficasLogo_b90rgi.png
author: Marco Madera
tags:
  - VSCode
  - Personalización
---

Las ligaduras tipográficas son **símbolos especiales** que se producen por la unión de múltiples caracteres.

En la **música** se aplica este concepto, las ligaduras son los símbolos que conectan las notas y hacen que se ejecuten como una sola nota prolongada, también ayudan en la legibilidad en el pentagrama.

![Ligadura musical](https://res.cloudinary.com/marcomadera/image/upload/c_scale,w_167/v1595269483/Blog/2/2ed8a62bb1bd2f4eaeaaaa1be3be8e1e_bbofoo.jpg "Ligadura Musical")
&nbsp;

## Ligaduras estándar

Estas son ligaduras para **mejorar la legibilidad del texto**, entre las más comunes están las combinaciones 'ff' y 'fi', un ejemplo de esto está presente en el logotipo de microsoft office donde ligan ambas 'f' para evitar el espacio que quedaría de no hacerlo.

![Ligadura estandar](https://res.cloudinary.com/marcomadera/image/upload/v1595269485/Blog/2/VkW3Q2D_nenmzd.jpg "Ligadura estándar")

&nbsp;

## Ligaduras discrecionales

Estás ligaduras son más estéticas, tienen el propósito de **lucir bien**, entrelazan los caracteres para que tengan un mejor diseño.

<videogif title="Ligaduras Discrecionales" src="https://res.cloudinary.com/marcomadera/video/upload/v1602518475/Blog/2/349239-238283-3923943_lqpsmm.mp4"/>

## Ligaduras históricas

![Notacion tironiana a la derecha](https://res.cloudinary.com/marcomadera/image/upload/c_scale,w_200/v1595269484/Blog/2/2af6de62vb43bnnc4_ou6z52.jpg "Notas tironianas")
Las ligaduras históricas son las que ya no se usan comúnmente. Estas ligaduras fueron originalmente **creadas para reducir el tiempo de escritura**. Cuando Cicerón recitaba sus discursos, su esclavo, Tirón, los escribía para dejar constancia documentada. Para escribir rápido no despegaba la mano uniendo algunas letras dando paso a las notas tironianas. Fueron muy populares, por lo que después se le atribuyó la invención de la taquigrafía.

![Ampersand a la izquierda](https://res.cloudinary.com/marcomadera/image/upload/c_scale,w_125/v1595269482/Blog/2/2b32bcc21v1b32vb_k6ikwo.png "Ampersand")
Una de las ligaduras más famosas y utilizadas actualmente de este sistema es el ampersand, el símbolo formado por los caracteres 'e' y 't' que en español significa 'y'.

En el alfabeto árabe los caracteres no tienen una forma fija. Cada letra se escribe con variantes diferentes según su entorno lo que denota su envejecimiento al idioma arameo nabatea.
<videogif title="Ligaduras Arabes" src="https://res.cloudinary.com/marcomadera/video/upload/v1602518470/Blog/2/239485-283184-288328_tvtslu.mp4"/>

---

## Ligaduras en la programación

En programación se utilizan muchos operadores con caracteres separados que unidos tienen un significado. Lo simbolos `>=`, mi mente por un instante tiene que procesar ambos caracteres por separado "mayor o igual". Si bien gran parte de la programación se trata de leer y entender el código, las ligaduras podrían ayudar a captarlo más rápido y hacer que nuestro código sea más agradable a la vista.

Algunas fuentes con ligaduras de programación gratuitas que puedes descargar:

- [Fira Code](https://github.com/tonsky/FiraCode "Repositorio de Fira Code")
- [MonoId](https://github.com/larsenwork/monoid "Repositorio de MonoID")
- [Hasklig](https://github.com/i-tu/Hasklig "Repositorio de Hasklig")
- [Iosevka](https://github.com/be5invis/Iosevka "Repositorio de Iosevka")
  &nbsp;

Descarga e instala la fuente que desees como cualquier otra fuente.

## Habilita las ligaduras en tu editor

La gran mayoría de editores permiten el uso de ligaduras.  
Para activar las ligaduras en Visual Studio Code dirígete a `File > Preferences > User Settings` en la sección del editor de texto, fuentes y editar settings.json
![Vs Code Settings](https://res.cloudinary.com/marcomadera/image/upload/v1595269485/Blog/2/hZhhlKS_cdxsaq.jpg "Vs Code Settings")

En settings.json agrega lo siguiente en el caso de Fira Code.

```json
{
  "editor.fontFamily": "Fira Code",
  "editor.fontLigatures": true,
}
```

Guarda los cambios y listo, eso es todo, ya puedes usar la fuente seleccionada, si no es el caso probablemente sea necesario reiniciar el editor.

<videogif title="Ligaduras VSCode" src="https://res.cloudinary.com/marcomadera/video/upload/v1602518458/Blog/2/129384-438538-4342382_enackk.mp4"/>

---

## Conclusión

Las ligaduras no son un estándar en la programación. No todos las usarán, acostumbrarse a verlas puede que llegue hasta jugar en contra el ver el código de otras personas. Puede generar confusión ya que los lenguajes de programación son diferentes, si bien `<=` menor o igual puede escribirse en ese orden en un lenguaje, en otro puede escribirse de otra forma `=<`. En algunos lenguajes algo puede generar una ligadura y otra cosa no.

Las ligaduras no son algo esencial como lo son en la música, ni te permiten escribir más rápido. En programación al final solo es visual, terminas escribiendo lo mismo. Lo suyo está en probar y elegir si es para ti, anteriormente las use muy poco tiempo como para acostumbrarme y ahora les daré otra oportunidad.