---
title: Control de versiones de Git
description: El control de versiones es un sistema que guarda los cambios en el tiempo de uno o varios archivos.
date: 2020-12-31
cover: https://res.cloudinary.com/marcomadera/image/upload/v1608823033/Blog/Git/Git-logo_pr848f.png
author: Marco Madera
tags:
  - Terminal
---

En mis inicios programando siempre escuchaba algo sobre el control de versiones, era algo que veía un poco complicado y donde no me quería meter porque estaba más enfocado en aprender otras cosas. Lo simplificaba como en qué estado se encuentra mi proyecto y usar versión *alpha*, *beta*, v1.0.0... Lo que ahora veo como una etiqueta que no se altera. Esto me llevó a realizar cambios sin justificación y a perder mucho trabajo que no guardé.

<tweet id="1342099157398544385">

En algún momento al conocer Git me sentí igual que Flavio y por los recuerdos me dio a escribir sobre Git para no olvidar de que vale la pena saber más de unos comandos.

<colors red blue green yellow lightblue purple darkyellow>

## ¿Qué es el control de versiones de Git?

El control de versiones es un **sistema que guarda los cambios en el tiempo** de uno o varios archivos. Se pueden revertir estos cambios a un estado anterior, lo que significa que si tenemos un problema, podemos comparar los cambios en el tiempo, ver quién modificó algo que pudiera causar el problema y poder cambiar el estado actual a uno donde no se presente el problema.

Git es un sistema de control de versiones que **almacena la información como un flujo de *snapshots*** de un sistema de archivos. Cada vez que hay un cambio o se guarda el estado del proyecto, Git toma un imagen de todos los archivos y crea una referencia a ese momento. En un futuro cambio, si un archivo no se modifica Git no vuelve a almacenar el archivo, sino que usa la referencia al momento anterior.

Git contempla tres estados:

- `modified`: Cuando un archivo cambia pero no se ha enviado a la base de datos local de Git.
- `staged`:  Cuando se añade un archivo modificado para ser enviado en el siguiente `commit`.
- `commited`: Cuando los datos están almacenados en la base de datos local de Git.

## Configuración de git

Para usar Git lo primero que se debe de hacer es instalarlo, se obtiene desde la [página de descarga](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) siguiendo los pasos según el sistema operativo que tengas.

Una vez instalado podremos usar en nuestra consola el comando `git config --list` para ver la configuración de Git. Para modificar los datos para el entorno global usamos `git config --global <configuración> <valor>`.
Lo esencial a modificar tiene que ser el nombre y el email, que son las configuraciones que usan todos los `commits`.

<pre><code data-lang="CLI"><span class="purple">git</span> <span class="blue">config --global user.name </span></span><span class="green">"MarcoMadera"</span>
<span class="purple">git</span> <span class="blue">config --global user.email </span><span class="green">"example@email.com"</span>

<span class="purple">git</span> <span class="blue">config --list</span>
http.sslcainfo=C:/Program Files/Git/mingw64/ssl/certs/ca-bundle.crt
core.autocrlf=<span class="red">true</span>
core.fscache=<span class="red">true</span>
core.symlinks=<span class="red">false</span>
pull.rebase=<span class="red">false</span>
credential.helper=manager
core.editor=<span class="green">"C:\Users\marco\AppData\Local\Programs\Microsoft VS Code\Code.exe" </span><span class="blue">--wait</span>
user.name=MarcoMadera
user.email=example@email.com</code></pre>

## Uso básico

El flujo de trabajo en Git sigue el siguiente patrón:

1. Haces modificaciones en tu directorio de trabajo controlado.
2. Selecciona los cambios a añadir en el estado *staged* para ser enviados con el siguiente `commit`.
3. Haces un commit, el cual toma todos los archivos en estado *staged* y almacena la *snapshot* en la base de datos de Git.

Para tener un directorio nuevo de trabajo controlado, en la terminal se dirige a la ruta del proyecto para **inicializar el repositorio** con el comando `git init`. Esto creará el archivo `.git` en la raíz del proyecto, donde se guardará la información de cada *snapshot*.

<pre><code data-lang="CLI"><span class="purple">cd</span> <span class="blue">repositorios/gitpost/</span>
<span class="purple">git</span> <span class="blue">init</span>
Initialized empty Git repository in C:/Users/marco/repositorios/gitpost/.git/</code></pre>

Para no ir a ciegas comando tras comandos podemos **revisar el estado** con `git status`. Nos informará dónde estamos, sobre el estado de los archivos, si se han modificado, agregado o eliminado.

<pre><code data-lang="CLI"><span class="purple">git</span> <span class="blue">status</span>
On branch master
Your branch is up-to-date with <span class="green">'origin/master'</span>.
Untracked files:
  (use <span class="green">"git add &lt;file&gt;..."</span>. to include in what will be committed)
  <span class="red">README</span>
nothing added to commit but untracked files present (use <span class="green">"git add"</span> to track)</code></pre>

Para **agregar archivos al *staging area*** usamos `git add <archivo>`, `git add *` o `git add .` agrega todos los archivos en el *stage*, `git add *.<extensión>` agrega los archivos con la extensión especificada y `git add /<folder>` agrega todos los archivos dentro de la carpeta especificada.

Si nos equivocamos, para **eliminar archivos del *staging area*** sin borrarlo de nuestro directorio usamos `git rm --cached <archivo>`. El *flag* `--cached` hace que no se elimine de nuestro directorio, si no se agrega se eliminaría también de nuestro directorio de trabajo. Si olvidamos agregar el flag no está todo perdido, podemos recuperar el archivo con `git restore <archivo>`.

Para **Ignorar archivos** se crea un archivo `.gitignore` en la raíz del proyecto. Esto hace que todos los archivos que coincidan dentro de `.gitignore` no sean tomados en cuenta para ninguna acción con Git. Puedes revisar la [colección de archivos de .gitignore](https://github.com/github/gitignore) para ver ejemplos o usarlos en tus proyectos.

Ya teniendo todo lo que queramos para **guardar los archivos** usamos `git commit`. Esto abrirá el editor que definimos en la configuración para poner un mensaje descriptivo o igual lo podemos añadir en la consola con el *flag* `-m`. Para añadir archivos que ya habían estado en el *stage* usamos el *flag* `-am` que es la combinación de `-a --add` y `-m --message`.

<pre><code data-lang="CLI"><span class="purple">git</span> <span class="blue">commit -m</span> <span class="green">"&lt;mensaje descriptivo&gt;"</span>
<span class="purple">git</span> <span class="blue">commit -am</span> <span class="green">"&lt;mensaje descriptivo&gt;"</span></code></pre>

Mostrar el historial de commits del repositorio usamos `git log`, el resultado de este es un poco feo, por lo que se puede hacer más bonito con el *flag* `--pretty`. `git log` solo mostrará por defecto el historial por debajo de la rama.

<pre><code data-lang="CLI"><span class="purple">git</span> <span class="blue">log</span>
<span class="yellow">commit ed3946555db4597294bae2014cfe996b88268bef (<span class="lightblue">HEAD -></span> <span class="green">master</span>, <span class="red">origin/master</span>)</span>
Author: MarcoMadera &lt;example@email.com&gt;
Date:   Mon Jul 6 17:09:50 2020 -0500

    hola mundo

<span class="yellow">commit e150e0079854fa6a5996db6ee692fc1377a1f2ff</span>
Author: MarcoMadera &lt;example@email.com&gt;
Date:   Mon Jun 29 19:28:42 2020 -0500

    hello world

<span class="purple">git</span> <span class="blue">log --oneline</span>
<span class="yellow">65b5a12 (<span class="lightblue">HEAD -></span> <span class="green">master</span>, <span class="red">origin/master</span>)</span> hello world
<span class="yellow">fd14a30</span> hola mundo

<span class="purple">git</span> <span class="blue">log --pretty=format:</span> <span class="green">"%h | %cn | %cr | %s"</span>
<span class="yellow">65b5a12</span> | MarcoMadera | 10 minutes ago | hello world
<span class="yellow">fd14a30</span> | MarcoMadera | 11 minutes ago | hola mundo</code></pre>

Para **mostrar las diferencias entre un commit y otro** de un archivo lo hacemos con el comando `git diff`. `git diff` muestra la diferencia por defecto de lo que has puesto en el *staging area* y lo que vas a hacer commit. Muestra las líneas exactas que fueron añadidas o removidas. El comando puede ser selectivo usando el hash de cada commit a comparar.

Usar `git diff` no suele ser muy placentero de ver para archivos largos, se puede explorar el uso de `git difftool` para configurar una herramienta más gráfica para estos casos.

<pre><code data-lang="CLI"><span class="purple">git</span> <span class="blue">diff commitA commitB</span>

diff <span class="blue">--git</span> <span class="lightblue">a/index.js b/index.js</span>
index 5e1c309..ade1f58 100644
<span class="red">---</span> <span class="lightblue">a/index.js</span>
<span class="green">+++</span> <span class="lightblue">b/index.js</span>
@@ <span class="red">-</span>1 <span class="green">+</span>1 @@
<span class="red">-</span>Hello World
<span class="green">+</span>Hola Mundo

<span class="purple">git</span> <span class="blue">difftool commitA commitB</span>
Hello World       | Hola Mundo
~                 | ~</code></pre>

## El modelo de ramas

Se puede decir que Git tiene tres arboles donde se agrupan archivos. `HEAD` es el indicador del último *commit* realizado y de la rama actual. `Index` es el espacio donde se agregan/modifican/eliminan los archivos del antes mencionado *staging area* antes de realizar un commit. Finalmente está el directorio de trabajo manejado como el `working tree`

Al realizar el comando `git init` Git crea una rama por defecto que suele ser *master*. Esta no es una rama especial, es como cualquier otra con el detalle que es la inicial, la que Git crea por defecto. Nuestro proyecto puede seguir cualquier rama como principal en cualquier punto.

Cuando un *commit* es creado es mandado al `HEAD`, la rama actual, donde Git guarda la información de los cambios una única vez, lo demás son referencias con cambios, ya no se vuelve almacenar nada ya creado. Con esto Git permite crear copias de nuestro proyecto en un estado en formas de referencias y experimentar con ellas todo lo que queramos sin haber otro coste más que los nuevos cambios. Estos grupos de referencias en un estado son llamadas ramas que igual tendrá solamente un identificador propio.

<svg style="margin: 0 auto;" width="100%" height="476pt" viewBox="0.00 0.00 206.00 476.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g transform="scale(1 1) rotate(0) translate(4 472)">
<title>Representación de ramas</title>
<polygon fill="transparent" points="-4,5 -4,-472 203,-472 203,5 -4,5"></polygon><g><title>a1</title>
<ellipse fill="lightgrey" stroke="lightgrey" cx="27" cy="-450" rx="27" ry="18"></ellipse>
<text text-anchor="middle" x="27" y="-445.8" font-family="inherit" font-size="13.00">a1</text></g><g><title>a2</title>
<ellipse fill="lightgrey" stroke="lightgrey" cx="27" cy="-378" rx="27" ry="18"></ellipse>
<text text-anchor="middle" x="27" y="-373.8" font-family="inherit" font-size="13.00">a2</text></g><g><title>a1-&gt;a2</title>
<path fill="none" stroke="#9c27b0" d="M27,-431.697C27,-423.983 27,-414.712 27,-406.112"></path>
<polygon fill="#9c27b0" stroke="#9c27b0" points="30.5001,-406.104 27,-396.104 23.5001,-406.104 30.5001,-406.104"></polygon></g><g><title>a3</title>
<ellipse fill="lightgrey" stroke="lightgrey" cx="27" cy="-306" rx="27" ry="18"></ellipse>
<text text-anchor="middle" x="27" y="-301.8" font-family="inherit" font-size="13.00">a3</text></g><g><title>a2-&gt;a3</title>
<path fill="none" stroke="#9c27b0" d="M27,-359.697C27,-351.983 27,-342.712 27,-334.112"></path>
<polygon fill="#9c27b0" stroke="#9c27b0" points="30.5001,-334.104 27,-324.104 23.5001,-334.104 30.5001,-334.104"></polygon></g><g><title>b1</title>
<ellipse fill="lightgrey" stroke="lightgrey" cx="99" cy="-306" rx="27" ry="18"></ellipse>
<text text-anchor="middle" x="99" y="-301.8" font-family="inherit" font-size="13.00">b1</text></g><g><title>a2-&gt;b1</title>
<path fill="none" stroke="#4f5cc8" d="M41.5703,-362.834C51.7499,-352.938 65.5239,-339.546 77.0306,-328.359"></path>
<polygon fill="#4f5cc8" stroke="#4f5cc8" points="79.4741,-330.865 84.2043,-321.385 74.5945,-325.846 79.4741,-330.865"></polygon></g><g><title>a4</title>
<ellipse fill="lightgrey" stroke="lightgrey" cx="27" cy="-234" rx="27" ry="18"></ellipse>
<text text-anchor="middle" x="27" y="-229.8" font-family="inherit" font-size="13.00">a4</text></g><g><title>a3-&gt;a4</title>
<path fill="none" stroke="#9c27b0" d="M27,-287.697C27,-279.983 27,-270.712 27,-262.112"></path>
<polygon fill="#9c27b0" stroke="#9c27b0" points="30.5001,-262.104 27,-252.104 23.5001,-262.104 30.5001,-262.104"></polygon></g><g><title>a5</title>
<ellipse fill="lightgrey" stroke="lightgrey" cx="27" cy="-162" rx="27" ry="18"></ellipse>
<text text-anchor="middle" x="27" y="-157.8" font-family="inherit" font-size="13.00">a5</text></g><g><title>a4-&gt;a5</title>
<path fill="none" stroke="#9c27b0" d="M27,-215.697C27,-207.983 27,-198.712 27,-190.112"></path>
<polygon fill="#9c27b0" stroke="#9c27b0" points="30.5001,-190.104 27,-180.104 23.5001,-190.104 30.5001,-190.104"></polygon></g><g><title>a6</title>
<ellipse fill="lightgrey" stroke="lightgrey" cx="27" cy="-90" rx="27" ry="18"></ellipse>
<text text-anchor="middle" x="27" y="-85.8" font-family="inherit" font-size="13.00">a6</text></g><g><title>a5-&gt;a6</title>
<path fill="none" stroke="#9c27b0" d="M27,-143.697C27,-135.983 27,-126.712 27,-118.112"></path>
<polygon fill="#9c27b0" stroke="#9c27b0" points="30.5001,-118.104 27,-108.104 23.5001,-118.104 30.5001,-118.104"></polygon></g><g><title>a7</title>
<ellipse fill="lightgrey" stroke="lightgrey" cx="27" cy="-18" rx="27" ry="18"></ellipse>
<text text-anchor="middle" x="27" y="-13.8" font-family="inherit" font-size="13.00">a7</text></g><g><title>a6-&gt;a7</title>
<path fill="none" stroke="#9c27b0" d="M27,-71.6966C27,-63.9827 27,-54.7125 27,-46.1124"></path>
<polygon fill="#9c27b0" stroke="#9c27b0" points="30.5001,-46.1043 27,-36.1043 23.5001,-46.1044 30.5001,-46.1043"></polygon></g><g><title>b2</title><ellipse fill="lightgrey" stroke="lightgrey" cx="99" cy="-234" rx="27" ry="18"></ellipse>
<text text-anchor="middle" x="99" y="-229.8" font-family="inherit" font-size="13.00">b2</text></g><g><title>b1-&gt;b2</title><path fill="none" stroke="#4f5cc8" d="M99,-287.697C99,-279.983 99,-270.712 99,-262.112"></path>
<polygon fill="#4f5cc8" stroke="#4f5cc8" points="102.5,-262.104 99,-252.104 95.5001,-262.104 102.5,-262.104"></polygon></g><g><title>c1</title>
<ellipse fill="lightgrey" stroke="lightgrey" cx="171" cy="-234" rx="27" ry="18"></ellipse>
<text text-anchor="middle" x="171" y="-229.8" font-family="inherit" font-size="13.00">c1</text>
</g><g><title>b1-&gt;c1</title>
<path fill="none" stroke="#2e7d32" d="M113.57,-290.834C123.75,-280.938 137.524,-267.546 149.031,-256.359"></path>
<polygon fill="#2e7d32" stroke="#2e7d32" points="151.474,-258.865 156.204,-249.385 146.595,-253.846 151.474,-258.865"></polygon>
</g><g><title>b3</title>
<ellipse fill="lightgrey" stroke="lightgrey" cx="99" cy="-162" rx="27" ry="18"></ellipse>
<text text-anchor="middle" x="99" y="-157.8" font-family="inherit" font-size="13.00">b3</text></g><g><title>b2-&gt;b3</title>
<path fill="none" stroke="#4f5cc8" d="M99,-215.697C99,-207.983 99,-198.712 99,-190.112"></path>
<polygon fill="#4f5cc8" stroke="#4f5cc8" points="102.5,-190.104 99,-180.104 95.5001,-190.104 102.5,-190.104"></polygon></g><g><title>b4</title>
<ellipse fill="lightgrey" stroke="lightgrey" cx="99" cy="-90" rx="27" ry="18"></ellipse>
<text text-anchor="middle" x="99" y="-85.8" font-family="inherit" font-size="13.00">b4</text></g><g><title>b3-&gt;b4</title>
<path fill="none" stroke="#4f5cc8" d="M99,-143.697C99,-135.983 99,-126.712 99,-118.112"></path>
<polygon fill="#4f5cc8" stroke="#4f5cc8" points="102.5,-118.104 99,-108.104 95.5001,-118.104 102.5,-118.104"></polygon></g><g><title>b4-&gt;a7</title>
<path fill="none" stroke="#4f5cc8" d="M84.4297,-74.8345C74.2501,-64.9376 60.4761,-51.5462 48.9694,-40.3591"></path>
<polygon fill="#4f5cc8" stroke="#4f5cc8" points="51.4055,-37.8461 41.7957,-33.3847 46.5259,-42.865 51.4055,-37.8461"></polygon></g><g><title>c2</title>
<ellipse fill="lightgrey" stroke="lightgrey" cx="171" cy="-162" rx="27" ry="18"></ellipse>
<text text-anchor="middle" x="171" y="-157.8" font-family="inherit" font-size="13.00">c2</text></g><g><title>c1-&gt;c2</title>
<path fill="none" stroke="#2e7d32" d="M171,-215.697C171,-207.983 171,-198.712 171,-190.112"></path>
<polygon fill="#2e7d32" stroke="#2e7d32" points="174.5,-190.104 171,-180.104 167.5,-190.104 174.5,-190.104"></polygon></g><g><title>c2-&gt;b4</title>
<path fill="none" stroke="#2e7d32" d="M156.43,-146.834C146.25,-136.938 132.476,-123.546 120.969,-112.359"></path>
<polygon fill="#2e7d32" stroke="#2e7d32" points="123.405,-109.846 113.796,-105.385 118.526,-114.865 123.405,-109.846"></polygon></g></g>
</svg>

Ahora que tenemos una idea de lo que son las ramas pasemos al manejo de ellas. Para crear una rama usamos `git branch <nombre de la rama>`, esto creará un indicador llamado `HEAD` que apuntará a la rama en la que estamos para ubicarnos mejor, en este caso aún seguiríamos en la rama *master*. Para cambiar de ramas usamos `git switch <nombre de la rama>` o `git checkout <nombre de la rama>`, esto moverá el apuntador `HEAD` a la nueva línea en la que estaremos trabajando.

En algún punto las ramas pueden volver a unirse a la rama principal o a otra rama, como se muestra en la gráfica anterior. Todo lo que tienes que hacer es ir a la rama donde se van a hacer los cambios y usar `git merge <nombre de rama>`. Git creará una nueva *snapshot* de los cambios y un nuevo *commit* de referencia especial porque tendrá dos ancestros directos.

<pre><code data-lang="CLI"><span class="purple">git</span> <span class="blue">checkout master</span>
Switched to branch <span class="green">'master'</span>
<span class="purple">git</span> <span class="blue">merge &lt;nombre de rama&gt;</span>
Merge made by the <span class="green">'recursive'</span> strategy.
index.js | 1 <span class="green">+</span>
1 file changed, 1 insertion(<span class="green">+</span>)
create mode 100644 index.js</code></pre>

No todo es tan bonito siempre. Al momento de unir ramas, si cambias la misma parte del mismo archivo en las dos ramas que se han unido ocurrirá un conflicto, Git no podrá unirlas tan fácil, te indicará dónde está el conflicto y te pedirá que lo arregles.

<pre><code data-lang="CLI"><span class="purple">git</span> <span class="blue">merge &lt;nombre de rama&gt;</span>
Auto-merging index.js
<span class="red">CONFLICT</span> (content): Merge conflict in index.js
Automatic merge failed; fix conflicts and then commit the result.</code></pre>

Esto de unir ramas se puede volver un caos y nosotros podemos saber el trabajo que conlleva, pero ¿se lo queremos presentar al público así?. Al final lo que la gente ve es el resultado final y si alguien quiere ver como lo hiciste puede que quieras mostrar algo más coherente.

Se puede aplicar a lo que estás leyendo, duro tres días haciendo el artículo porque escojo el tema, investigo un poco, hago el borrador, creo las imágenes si las necesito, escojo los colores y reviso las faltas de ortografía. Lo primero que hice es hacer la gráfica de las ramas, pero si alguien ve el historial puede que no tenga sentido para nada.

El historial de commits es tal y lo que pasó, cambiar este historial sería cambiar el historial de cómo el proyecto fue construido. Los errores son parte de la historia del proyecto y son necesarias incluso para estudiar las soluciones.

El uso de `git rebase` puede ir en contra de esto porque coloca la base de una rama de un commit a otra rama diferente, pero en algunos casos puede ser útil, simplemente porque talvez no quieras tener una rama completa para un cambio tan pequeño. Una vez ya acabado el trabajo de unir ambas ramas se puede eliminar la rama porque ahora está apuntando a la rama principal, por lo que ya no sería necesaria. Para eliminar ramas se hace con `git branch -d <nombre de rama>`.

<pre><code data-lang="CLI"><span class="purple">git</span> <span class="blue">checkout &lt;nombre de rama&gt;</span>
<span class="purple">git</span> <span class="blue">rebase master</span>
Successfully rebased and updated refs/heads/&lt;nombre de rama&gt;.

<span class="purple">git</span> <span class="blue">checkout master</span>
<span class="purple">git</span> <span class="blue">merge &lt;nombre de rama&gt;</span>
<span class="purple">git</span> <span class="blue">branch -d &lt;nombre de rama&gt;</span>
</code></pre>

## Repositorio Remoto

Todo lo que hemos estado trabajando es sobre el repositorio local de nuestro proyecto. Para que otras personas lo vean y colaboren con él, podemos usar los servicios remotos como GitHub, Bitbucket y GitLab; son servicios que permiten la gestión de proyectos y el seguimiento de trabajo con otros desarrolladores.

Para subir un repositorio local a uno remoto, tendremos que crear un repositorio en algunos de los servicios en el cual obtendremos una *url* del nuestro proyecto, con la que podremos utilizar `git remote add <nombre indentificador> <url>`

Otra forma de obtener un repositorio es **clonar un repositorio remoto** con `git clone <url> <nombre>`. Con esto ya tendremos en nuestro directorio local una copia con la que podremos contribuir al proyecto o simplemente experimentar con su funcionamiento.

<pre><code data-lang="CLI"><span class="purple">git</span> <span class="blue">clone</span> <span class="lightblue">https://github.com/MarcoMadera/Blog.git</span> <span class="blue">GitPost</span>
Cloning into <span class="green">'GitPost'</span>...
remote: Enumerating objects: <span class="darkyellow">64</span>, done.
remote: Counting objects: <span class="darkyellow">100%</span> (<span class="darkyellow">64</span>/<span class="darkyellow">64</span>)</span>, done.
remote: Compressing objects: <span class="darkyellow">100%</span> (<span class="darkyellow">45</span>/<span class="darkyellow">45</span>), done.
remote: Total <span class="darkyellow">64</span> (delta <span class="darkyellow">32</span>), reused <span class="darkyellow">45</span> (delta <span class="darkyellow">17</span>)</span>, pack-reused <span class="darkyellow">0</span>
Unpacking objects: <span class="darkyellow">100%</span> (<span class="darkyellow">64</span>/<span class="darkyellow">64</span>), <span class="darkyellow">74.53 KiB</span> | <span class="darkyellow">19.00 KiB/s</span>, done.</code></pre>

Después de usar `git clone`, si usamos `git remote` veremos que tendremos *origin*, este es el nombre para identificar la *url* que Git le pone por defecto a los proyectos obtenidos por `git clone`. Esto sucede al igual que al inicializar un proyecto, Git por defecto crea la rama con nombre *master*. Se puede **renombrar el identificador** con el comando `git remote rename <origin en este caso> <nuevo nombre>`

Ahora que tenemos un repositorio remoto, puede que el contenido del remoto sea diferente por cambios de otros colaboradores. En nuestro repositorio local no se verán reflejados esos cambios. Para actualizar nuestro repositorio local podemos usar `git pull`. trae los cambios generalmente del servidor al que se clonó y hace un `merge` automático en nuestro repositorio local. Para indicar otro servicio remoto y rama se usa `git pull <remoto> <rama>`

Cuando ya hemos hecho commit de los cambios que queremos compartir en nuestro repositorio, para actualizar el repositorio remoto usamos `git push <remoto> <rama>`, si alguien ya hizo un `git push` antes, nuestros cambios serán rechazados por lo que siempre es bueno hacer `git pull` antes.

## Comandos de Git adicionales

Si no quieres escribir el comando completo cada vez, puedes fácilmente configurar un *alias* para cada comando. Los *alias* en Git nos permiten **crear *shortcuts***, a través de `git config --global alias.<atajo> comando`.

<pre><code data-lang="CLI"><span class="purple">git</span> <span class="blue">config --global alias.&lt;atajo&gt; <span class="green">"&lt;comando&gt;"</span></span>
<span class="purple">git</span> <span class="blue">config --global alias.st <span class="green">"status"</span></span>
<span class="purple">git</span> <span class="blue">git config --global alias.slog <span class="green">"log --pretty=format:'%h | %cn | %cr | %s'"</span></span>
</code></pre>

Si ya hicimos commit y olvidamos **añadir un archivo o enmendar algún cambio** podemos hacerlo con el comando `git commit --amend`. Igualmente si nos equivocamos en la descripción de nuestro commit lo podemos arreglar con el mismo comando si lo invocamos inmediatamente después de haber ocurrido el error.

<pre><code data-lang="CLI"><span class="purple">git</span> <span class="blue">commit -m <span class="green">"&lt;mensaje&gt;"</span></span>
<span class="purple">git</span> <span class="blue">add &lt;archivo&gt;</span>
<span class="purple">git</span> <span class="blue">git commit --amend</span>
</code></pre>

Git mantiene un *log* de dónde el `HEAD` y sus referencias han estado. Lo podemos ver con el comando `git reflog` y mostrar más al respecto con `git show HEAD@{<número o referencia en días>}`

<pre><code data-lang="CLI"><span class="purple">git</span> <span class="blue">reflog</span>
<span class="yellow">2673d2d (<span class="lightblue">HEAD -></span> <span class="green">master</span>, <span class="red">origin/master</span>)</span> HEAD@{0}: merge newbranch: Merge made by the <span class="green">'recursive'</span> strategy.
<span class="yellow">4e85459</span> HEAD@{1}: checkout: moving from master to master
<span class="yellow">4e85459</span> HEAD@{2}: commit: hola mundo
<span class="yellow">8c821a7</span> HEAD@{3}: checkout: moving from newbranch to master

<span class="purple">git</span> <span class="blue">show HEAD@{2}</span>
<span class="yellow">commit ed3946555db4597294bae2014cfe996b88268bef</span>
Author: MarcoMadera &lt;example@email.com&gt;
Date:   Mon Jul 6 17:09:50 2020 -0500

    hola mundo

diff <span class="blue">--git</span> <span class="lightblue">a/index.js b/index.js</span>
index 5e1c309..ade1f58 100644
<span class="red">---</span> <span class="lightblue">a/index.js</span>
<span class="green">+++</span> <span class="lightblue">b/index.js</span>
@@ <span class="red">-</span>1 <span class="green">+</span>1 @@
<span class="red">-</span>Hello World
<span class="green">+</span>Hola Mundo
</code></pre>

Para **crear una rama y cambiar directamente** a ésta se usa el comando `git checkout -b <nombre de rama>` o `git switch -c <nombre de rama>`. Ahora si quieres volver a la rama anterior se puede usar `git switch -`.

Para **cambiar el nombre de una rama** se usa `git branch --move <rama> <nuevo nombre>`. Para enviar los cambios al repositorio remoto `git push --set-upstream <remoto> <nuevo nombre>`. Para eliminar la rama anterior del repositorio remoto utilizamos `git push origin -d <rama>`.

Cuando estamos trabajando pero queremos cambiar de rama y no hacer un commit de un trabajo incompleto usamos `git stash`. Guarda los commits en un estado diferente para poder recuperarlo después con `git stash apply`.

Git tiene una **interfaz grafica integrada** que podemos utilizar con el comando `gitk` para ver el historial y `git-gui` donde puedes preparar los commits y experimentar lo visto.

## Conclusión

Git nos proporciona una manera elegante de hacer el seguimiento de versiones, nos permite hacer un resguardo y hacer posible la colaboración entre varias personas teniendo espacios de trabajo separados como el local y el remoto. Git también se puede implementar en interfaces gráficas y tiene muchos comandos que no se han tocado en este artículo a fondo, por lo que te invito a investigar más sobre el tema.
