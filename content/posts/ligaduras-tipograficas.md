---
title: Ligaduras tipográficas
description: Las ligaduras tipográficas son símbolos especiales que se producen por la unión de múltiples caracteres.
date: 2020-06-08
cover: https://res.cloudinary.com/marcomadera/image/upload/c_scale,h_100,w_100/v1595269475/Blog/2/LigadurasTipograficasLogo_b90rgi.png
cover760: https://res.cloudinary.com/marcomadera/image/upload/c_scale,w_760/v1595269475/Blog/2/LigadurasTipograficasLogo_b90rgi.png
author: Marco Madera
tag:
  - VSCode
  - Personalización
---

Las ligaduras tipográficas son símbolos especiales que se producen por la unión de múltiples caracteres.

En la música se aplica este concepto, las ligaduras son los símbolos que conectan las notas y hacen que se ejecuten como una sola nota prolongada, también ayudan en la legibilidad en el pentagrama.

![Ligadura musical 100px](https://res.cloudinary.com/marcomadera/image/upload/c_scale,w_167/v1595269483/Blog/2/2ed8a62bb1bd2f4eaeaaaa1be3be8e1e_bbofoo.jpg "Ligadura Musical")
&nbsp;

## Ligaduras estándar

Estas son ligaduras para mejorar la legibilidad del texto, entre las más comunes están las combinaciones 'ff' y 'fi', un ejemplo de esto está presente en el logotipo de microsoft office donde ligan ambas 'f' para evitar el espacio que quedaría de no hacerlo.

![Ligadura estandar](https://res.cloudinary.com/marcomadera/image/upload/v1595269485/Blog/2/VkW3Q2D_nenmzd.jpg "Ligadura estándar")

&nbsp;

## Ligaduras Discrecionales

Estás ligaduras son más estéticas, tienen el propósito de lucir bien, entrelazan los caracteres para que tengan un mejor diseño.

![Ligadura](https://res.cloudinary.com/marcomadera/image/upload/v1595269485/Blog/2/a9c32vc23bb56fdb4_apqjua.gif "Ligadura discrecional") &nbsp;

## Ligaduras históricas

![Notacion tironiana ajustar derecha 200px](https://res.cloudinary.com/marcomadera/image/upload/c_scale,w_210/v1595269484/Blog/2/2af6de62vb43bnnc4_ou6z52.jpg "Notas tironianas")
Las ligaduras históricas son las que ya no se usan comúnmente. Estas ligaduras fueron originalmente creadas para reducir el tiempo de escritura, cuando Cicerón recitaba sus discursos, su esclavo, Tirón, los escribía para dejar constancia documentada, para escribir rápido no despegaba la mano uniendo algunas letras dando paso a las notas tironianas, que fueron muy populares y por lo que después se le atribuyó la invención de la taquigrafía.

![Ampersand ajustar izquierda 50px](https://res.cloudinary.com/marcomadera/image/upload/c_scale,w_125/v1595269482/Blog/2/2b32bcc21v1b32vb_k6ikwo.png "Ampersand")
Una de las ligaduras más famosas y utilizados actualmente de este sistema es el ampersand, el símbolo formado por los caracteres 'e' y 't' que en español significa 'y'.

En el alfabeto árabe los caracteres no tienen una forma fija, sino que cada letra se escribe con variantes diferentes según su entorno lo que denota su envejecimiento al idioma arameo natabea. ![Ligaduras arabes 50px](https://res.cloudinary.com/marcomadera/image/upload/v1595269484/Blog/2/921mmn32n266n54n3b4_bheewg.gif "Ligaduras Arabes") &nbsp;

---

## Ligaduras en la programación

En programación se utilizan muchos operadores con caracteres separados que unidos tienen un significado, como por ejemplo '>=', mi mente por un instante tiene que procesar ambos caracteres por separado "mayor o igual" y si bien gran parte de la programación se trata de leer y entender el código, las ligaduras podrían ayudar a captarlo más rápido y hacer que nuestro código sea más agradable a la vista.

Algunas fuentes con ligaduras de programación gratuitas que puedes descargar:

- [Fira Code](https://github.com/tonsky/FiraCode)
- [MonoId](https://github.com/larsenwork/monoid)
- [Hasklig](https://github.com/i-tu/Hasklig)
- [Iosevka](https://github.com/be5invis/Iosevka)
  &nbsp;

Descarga e instala la fuente que desees como cualquier otra fuente.

## Habilita las ligaduras en tu editor

La gran mayoría de editores permiten el uso de ligaduras.  
Para activar las ligaduras en Visual Studio Code dirígete a (File > Preferences > User Settings) en la sección del editor de texto, fuentes y editar settings.json
![Vs Code Settings](https://res.cloudinary.com/marcomadera/image/upload/v1595269485/Blog/2/hZhhlKS_cdxsaq.jpg "Vs Code Settings")

En settings.json agrega lo siguiente en el caso de Fira Code.

```json
{
  "editor.fontFamily": "'Fira Code'",
  "editor.fontLigatures": true
}
```

Guardas los cambios y listo, eso es todo, ya puedes usar la fuente seleccionada, si no es el caso probablemente sea necesario reiniciar el editor.

![Ligaduras Vs Code](https://res.cloudinary.com/marcomadera/image/upload/v1595269490/Blog/2/iz550n2_m69hok.gif "Ligaduras Vs Code")

---

## Opinión

Las ligaduras no son un estándar en la programación, por lo que no todos las usarán, acostumbrarse a verlas puede que llegue a jugar en contra el ver el código de otras personas, a la inversa puede generar confusión ya que los lenguajes de programación son diferentes, si bien (<=) menor o igual puede escribirse en ese orden en un lenguaje, en otro puede escribirse de otra forma (=<), lo que no generaría una ligadura. Las ligaduras no son algo esencial como lo son en la música, ni te permiten escribir más rápido, en programación al final solo es visual, terminas escribiendo lo mismo, lo suyo está en probar y elegir si es para tí, anteriormente las use muy poco tiempo como para acostumbrarme y ahora les daré otra oportunidad.
