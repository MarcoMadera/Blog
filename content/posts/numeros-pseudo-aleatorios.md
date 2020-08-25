---
title: Números Pseudo Aleatorios
description: Los números pseudo-aleatorios son creados a partir de algoritmos matemáticos, por lo que no se puede decir que son realmente aleatorios.
date: 2020-05-20
cover: https://res.cloudinary.com/marcomadera/image/upload/c_scale,h_300,w_300/v1595270596/Blog/1/pseudoRandomNumbers_todtwy.jpg
cover100: https://res.cloudinary.com/marcomadera/image/upload/c_scale,h_100,w_100/v1595270596/Blog/1/pseudoRandomNumbers_todtwy.jpg
cover760: https://res.cloudinary.com/marcomadera/image/upload/c_scale,w_760/v1595270596/Blog/1/pseudoRandomNumbers_todtwy.jpg
author: Marco Madera
tag:
  - JavaScript
  - Estadística
---

Esta entrada es posible gracias a la aleatoriedad de Math.random() de JavaScript, que surge tras programar el paquete de node [random-messages-names](https://github.com/MarcoMadera/random-messages-names) el cual como su nombre lo dice retorna mensajes y nombres aleatorios. Tiene 1000 apellidos y 2788 nombres diferentes. Al estar probando me di cuenta que había veces que ocurrían rachas seguidas de nombres repetidos, 3 o 4 veces el mismo nombre, lo que me dio por comprobar si la aleatoriedad de Math.Random() es legítima a través de unas pruebas estadísticas.

Primero hay que saber qué es Math.Random(), la definición de la especificación estándar del lenguaje, ECMAScript 2015 dice:

> Devuelve un número con signo positivo, mayor o igual que 0 pero menor que 1, elegido aleatoriamente o pseudo aleatoriamente con una distribución aproximadamente uniforme en ese rango, utilizando un algoritmo o estrategia dependiente de la implementación. Esta función no toma argumentos. Cada función Math.random creada para ambientes de código distintos debe producir una secuencia distinta de valores a partir de llamadas sucesivas.

Dato importante que sacamos de está definición es que ECMAScript no provee el algoritmo ni la forma de implementarlo, depende del ambiente que utilizamos, en mi caso, utilizo NodeJs y Chrome para desarrollar, el cual ambos utilizan el motor V8 para correr JavaScript, por otro lado Firefox utiliza SpiderMonkey y Safari usa Nitro, y aunque los tres usen el algoritmo xorshift128 +, los resultados valdrán solo para V8 pues la implementación puede ser diferente, ya que éste se encarga de escoger la semilla que genera los números.

## ¿Qué son los números pseudo-aleatorios?

Los números pseudo-aleatorios son creados a partir de algoritmos matemáticos, por lo que no se puede decir que son realmente aleatorios, por eso el pseudo, algunos algoritmos hacen muy bien el trabajo de simular las propiedades de los números aleatorios y otros caen en el bucle de repetirse infinitamente.

Para que una secuencia de números sea catalogada como aleatoria, es necesario que tengan una distribución uniforme y que no tenga correlación, es decir, que tengan la misma probabilidad de ser elegido y que la elección de uno no dependa del otro.

![Gráfica uniforme](https://res.cloudinary.com/marcomadera/image/upload/v1597524703/Blog/1/bcbb-bbc-ddsb_okwxxu.png "Gráfica uniforme")

Una de las pruebas para determinar este comportamiento es la de chi-cuadrada (x2):

$$x^2 = \displaystyle\sum_{i=1}^n{(\omicron {\scriptscriptstyle i} - \epsilon {\scriptscriptstyle i})^2 \over \epsilon {\scriptscriptstyle i}}$$

Donde:

oi: datos obtenidos

ei: datos esperados

Primero formulamos nuestra hipótesis nula (h0) e hipótesis alternativa (h1).

<table><colgroup span="2"></colgroup><thead><tr><th colspan="2" scope="colgroup">Hipótesis</th></tr></thead><tbody><tr><td>H<sub>0</sub></td><td>Los datos son uniformes</td></tr><tr><td>H<sub>1</sub></td><td>Los datos no son uniformes</td></tr></tbody></table>

Sea 'n' el número de datos que vamos a evaluar, determinamos el número de intervalos que vamos a utilizar de la siguiente manera: √n, por ejemplo, si tenemos 100 números, nuestro intervalo va a ser de 10, si tenemos 200 será 15 redondeando hacia arriba.
Los datos obtenidos son los datos que vamos a evaluar. Como lo que estamos evaluando son números aleatorios, esperamos tener una distribución de tipo y = a donde a = `[0 , 1]`como en la gráfica mostrada anteriormente, entonces el número esperado de eventos en una categoría sería, el número de datos a evaluar sobre el número de intervalos, en caso de tener 100 números será 10 casos esperados en cada categoría, en caso de tener 200, 14.28, en caso de tener 300, 16.666.
Para determinar el valor del rango de cada categoría en nuestro caso sería uno sobre el número de intervalos que tenemos.
Para determinar las ocurrencias posicionamos nuestros números aleatorios a la categoría que pertenecen
Por ahora si tomamos como muestra esta lista de 300 números nuestro progreso sería el siguiente:

![Gráfica](https://res.cloudinary.com/marcomadera/image/upload/v1597524702/Blog/1/bcbc-abc-ddsb_msbomr.png "Gráfica")

Muestra generada a partir de Math.Random() en la consola de Google Chrome

Visualmente entre más recta es la línea, más uniforme es, por lo que a simple vista ya podemos intuir un resultado.

Para corroborar lo que vemos, necesitamos, el valor de chi-cuadrada(x2), los grados de libertad (K) y un nivel de confianza (α).

Al aplicar la formula: x2=28.92
Para calcular K = Número de intervalos - 1, en este caso K=17.
El nivel de confianza (α) que usaré es de 0.05, pero puede ser diferente ya que este es decidido por la persona encargada de la investigación, es el riesgo que se toma.
Esto lo podemos hacer de dos formas, en una tabla de probabilidades de chi-cuadrada con el área a la derecha, buscamos los grados de libertad de 17 y el valor que más se acerque a nuestro resultado, en esa fila en este caso está entre la columna 0.05 y 0.025, la cual esa va a ser nuestra probabilidad, que exactamente es: 0.03527, multiplicado por 100 es 3.527% de que nuestra hipótesis nula esté correcta, de que nuestros datos sigan una distribución uniforme, como 5% < 3.527% no se cumple, rechazamos nuestra hipótesis nula y aceptamos la hipótesis alternativa de que no son números uniformes como se mira a simple vista en la gráfica.

La otra forma de hacer esto es buscando directamente nuestro valor α en la columna correspondiente, vamos a la intersección k=17,α=0.05=27.587.
Si el resultado de nuestra x2 es menor que el resultado de la intersección se acepta la hipótesis nula de lo contrario se rechaza. Como 28.32666 < 27.587 no se cumple, se rechaza la hipótesis nula y se acepta la hipótesis alternativa.

## Prueba de independencia

Como lo mencione antes, obtuve rachas de 3 o 4 nombres seguidos, utilizaré la prueba de rachas ascendentes y descendentes para determinar el número esperado máximo y mínimo de rachas que pueden existir en una secuencia aleatoria, dependiendo de la longitud de los números evaluados.

Para aplicar esta prueba necesitamos de los siguientes estadísticos:

$$\mu R = {2n - 1 \over 3}$$

$$\sigma ^2 R = {16n - 29 \over 90}$$

$$Z = {R - \mu R \over \sigma R}$$

Donde:

R: El número esperado de rachas

n: El número de datos a evaluar

μR: La media de rachas que esperamos tener

σ2R: La varianza del número esperado de rachas

Z: Valor estándar de la distribución normal para la prueba.


Igual que antes establecemos primero nuestra hipótesis nula (h0) e hipótesis alternativa (h1).

<table><colgroup span="2"></colgroup><thead><tr><th colspan="2" scope="colgroup">Hipótesis</th></tr></thead><tbody><tr><td>H<sub>0</sub></td><td>Los datos son independientes</td></tr><tr><td>H<sub>1</sub></td><td>Los datos no son independientes</td></tr></tbody></table>

Clasificamos los números como bien el nombre lo indica, como racha ascendente o descendente. Ejemplo:
Dada la siguiente lista: 0.1, 0.2, 0.3, 0.4, 0.2, 0.3, 0.1, 0.2, 0.3.
Vemos que los primeros cuatro números tienen una racha ascendente, intercala 3 números y vuelve a ascender. Como lo siguiente: ↑ ↑ ↑ ↑ ↓ ↑ ↓ ↑ ↑
Tenemos lo siguiente:

| Racha | Longitud |
| ----- | -------- |
| 1     | 4        |
| 2     | 1        |
| 3     | 1        |
| 4     | 1        |
| 5     | 2        |

Transpuesta nuestra tabla de tal manera que ahora clasificamos según la longitud de la tabla:

<table><thead><tr><th>Longitud de Rachas</th><td>1</td><td>2</td><td>3</td><td>4</td><th>Total</th></tr></thead><tbody><tr><th>Número de Rachas</th><td>3</td><td>1</td><td>0</td><td>1</td><td>5</td></tr></tbody></table>

Si aplicamos lo que sabemos hasta ahora a la lista de nuestros 300 números iniciales, quedaría de la siguiente manera:

<table><thead><tr><th>Longitud de Rachas</th><td>1</td><td>2</td><td>3</td><td>4</td><th>Total</th></tr></thead><tbody><tr><th>Número de Rachas</th><td>116</td><td>55</td><td>19</td><td>4</td><td>194</td></tr></tbody></table>

Ahora que ya sabemos que son 194 rachas, tenemos lo necesario para calcular los tres estadísticos:

μR = 199.666 El número esperado de rachas

σ2R = 52.01 La varianza

Z = -0.108 El valor de la distribución normal


Para determinar la independencia, igualmente buscaríamos ahora en una tabla de distribución normal el valor α/2 seguiré usando 0.05, por lo que buscaré el valor de 0.025, si vamos a los valores de los laterales encontramos que la desviación normal es de 1.96, si nuestro valor α fuera 0.1 para tener una confianza del 90% la desviación normal sería de 1.65.

Para saber si aceptamos nuestra hipótesis nula evaluamos si el valor absoluto de nuestra Z es menor a la desviación normal de la tabla, de lo contrario se rechaza
|-0.108|<1.96 como esto es verdadero, se acepta nuestra hipótesis nula de que las rachas son independientes.

## Distribución de la longitud de las rachas

De forma adicional podemos calcular si la longitud de las rachas son adecuadas con la fórmula de chi-cuadrada utilizada anteriormente.

$$x^2 = \displaystyle\sum_{i=1}^n{(\omicron {\scriptscriptstyle i} - \epsilon {\scriptscriptstyle i})^2 \over \epsilon {\scriptscriptstyle i}}$$

Donde:

oi: datos obtenidos

ei: datos esperados

Lo que cambia es que ahora nuestros números esperados los calcularemos de con la siguiente ecuación.

$$\epsilon {\scriptscriptstyle i} = {2 \over (i+3)!}[n(i^2 + {3\scriptstyle i} + 1) - (i^3 + 3{\scriptstyle i^2} - i - 4)]$$

Así que retomando nuestros datos de rachas obtenidas tenemos 4 diferentes longitudes de rachas:

<table><thead><tr><th>Longitud de Rachas</th><td>1</td><td>2</td><td>3</td><td>4</td><th>Total</th></tr></thead><tbody><tr><th>Número de Rachas</th><td>116</td><td>55</td><td>19</td><td>4</td><td>194</td></tr></tbody></table>

$$\epsilon {\scriptscriptstyle 1} = {2 \over (1+3)!}[300(1^2 + {3\scriptstyle 1} + 1) - (1^3 + 3{\scriptstyle 1^2} - 1 - 4)] = 125.083$$

$$\epsilon {\scriptscriptstyle 2} = {2 \over (2+3)!}[300(2^2 + {3\scriptstyle 2} + 1) - (2^3 + 3{\scriptstyle 2^2} - 2 - 4)]= 59.766$$

$$\epsilon {\scriptscriptstyle 3} = {2 \over (3+3)!}[300(3^2 + {3\scriptstyle 3} + 1) - (3^3 + 3{\scriptstyle 3^2} - 3 - 4)]= 17.369$$

$$\epsilon {\scriptscriptstyle 4i} = {2 \over (4+3)!}[300(4^2 + {3\scriptstyle 4} + 1) - (4^3 + 3{\scriptstyle 4^2} - 4 - 4)]= 3.768$$

Lo cual son números similares a los obtenidos.

Existe la restricción de que los números observados y esperados no pueden ser menor que 5, por lo que e4 se le sumaría a e3 quedando de la siguiente manera:

<table><thead><tr><th>Observados</th><td>116</td><td>55</td><td>23</td></tr></thead><tbody><tr><th>Esperados</th><td>125.083</td><td>59.766</td><td>21.137</td></tr></tbody></table>

Con estos datos calculamos chi-cuadrada (X2) = 1.2038
k = 4-1 = 3
p=0.7521 (valor de la tabla de chi cuadrada)

De igual forma determinamos nuestra hipótesis de la misma forma donde si α < p(1.2038,3), aceptamos nuestra hipótesis nula de lo contrario aceptamos la hipótesis alternativa

Como 0.05 < 0.7521 se acepta la hipótesis nula de que existe independencia en las rachas

Esta muestra nos dio que los números no son uniformes pero sí independientes

---

## Resultados

### Test 1

En 100 pruebas de 100 números cada una, se obtuvieron los siguientes resultados:

<table><thead><tr><th>Número de pruebas correctas</th><td>1</td><td>2</td><td>3</td><th>Total</th></tr></thead><tbody><tr><th>Valores</th><td>11</td><td>21</td><td>68</td><td>100</td></tr></tbody></table>

De las 100 pruebas:
68 pruebas cumplieron con la uniformidad, independencia y longitud.
1 Pruebas que no cumplieron la uniformidad e independencia pero sí la longitud de rachas.
6 Pruebas que no cumplieron la uniformidad y longitud pero sí la independencia.
2 Pruebas que cumplieron la uniformidad y la longitud pero no la independencia.
18 Pruebas que cumplieron la uniformidad e independencia pero no la longitud de rachas.
1 Pruebas que no cumplieron la uniformidad pero sí la longitud y la independencia.
4 Pruebas que cumplieron la uniformidad pero no la independencia ni longitud de rachas.

### Test 2

En 100 pruebas de 3000 números cada una, se obtuvieron los siguientes resultados:

<table><thead><tr><th>Número de pruebas correctas</th><td>1</td><td>2</td><td>3</td><th>Total</th></tr></thead><tbody><tr><th>Valores</th><td>3</td><td>48</td><td>49</td><td>100</td></tr></tbody></table>

De las 100 pruebas:
49 pruebas cumplieron con la uniformidad, independencia y longitud.
0 Pruebas que no cumplieron la uniformidad e independencia pero sí la longitud de rachas.
2 Pruebas que no cumplieron la uniformidad y longitud pero sí la independencia.
2 Pruebas que cumplieron la uniformidad y la longitud pero no la independencia.
42 Pruebas que cumplieron la uniformidad e independencia pero no la longitud de rachas.
4 Pruebas que no cumplieron la uniformidad pero sí la longitud y la independencia.
1 Pruebas que cumplieron la uniformidad pero no la independencia ni longitud de rachas.

### Conclusión

Si recordamos, para que una secuencia de números sea catalogada como aleatoria, es necesario que tenga distribución uniforme y que sea independiente, por lo que podríamos decir que que los 18 números y 42 números, que no cumplieron la prueba de longitud de rachas, pero sí las de uniformidad e independencia, del test 1 y 2 respectivamente, también se comportan como números aleatorios.

Podríamos decir que para el test 1 de 100 pruebas de 100 números cada una, 86 son aleatorias y de esas 86, 18 no cumplen la longitud de rachas.

Para el test 2 de 100 pruebas de 3000 números cada una, 91 son aleatorias y de esas 91, 42 no cumplen la longitud de rachas.

En cuanto al problema inicial puedo decir que los números en la mayoría de los casos son legítimamente aleatorios, y que es normal que siga viendo nombres que ocurran en rachas seguidas.

---

## ¿Tus números son aleatorios?

Puedes probar [esta herramienta](https://test-for-random-numbers.marcomadera.vercel.app/) de abajo para evaluar tus números aleatorios. Ya que sabes los procedimientos de las pruebas de números aleatorios, te invito a contribuir en [este repositorio](https://github.com/MarcoMadera/Test-for-random-numbers) donde encontrarás el código que he estado escribiendo al mismo tiempo de escribir este post.

Introduce números que sean entre 0 y 1 separados por espacios, intenta tantos números quieras, entre más números mejor. El Alpha que tomará la prueba es de 0.05.
