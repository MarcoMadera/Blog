---
title: GitHub desde la línea de comandos
description: Github CLI es la herramienta oficial para ejecutar todo el flujo de trabajo en GitHub desde la línea de comandos.
date: 2020-09-20
cover: v1600483976/Blog/6/Octocat-removebg_wamv2v.png
author: Marco Madera
tags:
  - Terminal
---

Sin importar el lenguaje que usamos para programar la línea de comandos es una herramienta que nos permite trabajar de manera más rápida y productiva. Cambiar entre la terminal y la web va en contra de esto. En octubre de 2019 [se empezó a trabajar con Github CLI](https://github.com/cli/cli/commit/8dd03144ffdc6c0d486d6b705f9c7fba871ee7c3 "Primer commit de Github CLI") para reducir el cambio de contexto entre GitHub web y la máquina local.

## ¿Qué es GitHub CLI?

Github <abbr title="Command Line Interface">CLI</abbr> es la herramienta oficial de código abierto para **ejecutar todo el flujo de trabajo en GitHub en la línea de comandos**. Nos permite interactuar con repositorios, *issues*, *pull request* y más.

<tweet id="1306586113293729795">

## Instalación y autenticación

GitHub <abbr title="Command Line Interface">CLI</abbr> se descarga desde su [página oficial](https://cli.github.com/ "Página oficial de GitHub CLI"). Está disponible para MAC Windows Linux y en paquetes binarios.

Github CLI es interactivo con cada uno de sus comandos que nos guiarán a lo que queramos hacer. Una vez instalado nos podemos *loguear* con `gh auth login` y seguir las instrucciones:

![Login en GitHub cli](https://res.cloudinary.com/marcomadera/image/upload/v1600485625/Blog/6/Login_Github_Cli_vjd3it.png "Login en GitHub cli")

Otros subcomandos que también se pueden usar con `gh auth`:

- `gh auth logout`: Salir de la sesión.
- `gh auth refresh`: Actualizar las credenciales.
- `gh auth status`: Verificar el estado de la autenticación.

## Comandos

La estructura de los comandos siguen el mismo patrón `gh <comando> <acción> [flags]` y pueden ser los siguientes:

| Comando |                    Acciones                    |
|:-------:|:-----------------------------------------------|
|   gist  | Ver, crear, editar, eliminar *gists*...        |
|  issue  | Ver, crear, reabrir, cerrar *issues*...        |
|    pr   | Ver, crear, revisar, cerrar *pull requests*... |
| release | Crear, eliminar, subir, descargar *releases*...|
|   repo  | Crear, clonar, *fork*, y ver repositorios.     |
|  alias  | Crea, lista y elimina atajos de comandos.      |
|   api   | Hacer llamadas HTTP a Rest o GraphQL API.      |
|   auth  | Login, logout, y *refresh* de la autenticación.|
|  config | Maneja la configuración para gh.               |
|   help  | El comando de ayuda.                           |

## Repositorios

Para **crear repositorios** tenemos el comando `gh repo create` seguido del nombre del repositorio. Su versión web sería el siguiente atajo [repo.new](https://repo.new "Atajo de nuevo repositorio"), que con GitHub CLI podemos decirle adiós.

![Creación de repositorio](https://res.cloudinary.com/marcomadera/image/upload/v1600490072/Blog/6/repocreate_z7ri8f.png "Creación de repositorio")

Para **ver repositorios** utilizamos `gh repo view` seguido del nombre del repositorio de esta forma `usuario/repositorio`. Se puede observar la descripción del repositorio y el contenido del archivo `README.md`.

Los *flags* que recibe pueden ser por ejemplo `-w` o `--web` para ver el repositorio en la web. Si no incluye un nombre de repositorio se verá el repositorio que está en el directorio actual.

![Ver repositorio](https://res.cloudinary.com/marcomadera/image/upload/v1600493607/Blog/6/repoview_yvcrdm.png "Ver repositorio")

Podemos **clonar un repositorio** propio o de otro usuario. Para clonar repositorios propios se usa el comando `gh repo clone` seguido del nombre del repositorio. Para clonar repositorios de otros usuarios es el mismo comando seguido del `usuario/repositorio`.

![Clonar repositorio](https://res.cloudinary.com/marcomadera/image/upload/v1600494350/Blog/6/repoclone_gdqyis.png "Clonar repositorio")

Para hacer **fork de un repositorio** funciona de la misma manera que clonar un repositorio, el comando *fork* `gh repo fork` seguido del repositorio. Si no se provee de ningún repositorio, hace un *fork* del proyecto actual. Lo que es bueno se quiere empezar a arreglar *bugs* o realizar una nueva mejora rápidamente.

## Pull Request

El comando para *pull request* es `pr` seguido de una acción que pueden ser una de las siguientes:

<div style="display:grid;justify-content:space-between;grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));">
  <ul>
    <li>checkout</li>
    <li>checks</li>
    <li>close</li>
  </ul>
  <ul>
    <li>create</li>
    <li>diff</li>
    <li>list</li>
  </ul>
  <ul>
    <li>merge</li>
    <li>ready</li>
    <li>reopen</li>
  </ul>
  <ul>
    <li>review</li>
    <li>status</li>
    <li>view</li>
  </ul>
</div>

Para **crear pull request** podemos usar `gh pr create`. Para agregar directamente un título usamos el *flag* `--title`, para el contenido el *flag* `--body` y para agregar a alguien para que lo revise el *flag* `--reviewer` seguido del usuario.

![Crear Pull Request](https://res.cloudinary.com/marcomadera/image/upload/v1600497956/Blog/6/rp_f3gmh5.png "Crear Pull Request")

Con `gh pr list` seguido de los *flags* podemos **listar pull request**. Los *flags* se pueden usar como filtros. `--limit` seguido del número limita a la lista. `--state` y  `--label` seguidos por el valor muestra solo las `pr` que coincidan.

Para **ver pull request** se usa `gh pr view` seguido del número del *pull request* o directamente la *url*.

![Ver pull request](https://res.cloudinary.com/marcomadera/image/upload/v1600498372/Blog/6/prview_hrrjvo.png "Ver pull request")

Las demás acciones funcionan de manera similar. `gh pr status` muestra el estado de las `pr` en las que participas. GitHub CLI sigue mucho este patrón, revisa el funcionamiento de las acciones listadas anteriormente.

## Issues

El comando para manejar *issues* es `issue` seguido de una acción que pueden ser una de las siguientes:

<div style="display:grid;justify-content:space-between;grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));">
  <ul>
    <li>close</li>
    <li>create</li>
  </ul>
  <ul>
    <li>list</li>
    <li>reopen</li>
  </ul>
  <ul>
    <li>status</li>
    <li>view</li>
  </ul>
</div>

Para **crear issues** se usa el comando `gh issue create`. Para agregar directamente un título usamos el *flag* `--title`, para el contenido el *flag* `--body`.

![Crear issue](https://res.cloudinary.com/marcomadera/image/upload/v1600532173/Blog/6/createissue_ckxu8l.png "Crear issue")

Para **ver issues** se usa `gh issue view` seguido del número del *pull request* o directamente la *url*.

Para **listar issues** se usa `gh issue list`. Los *flags* se pueden usar como filtros: `--limit` seguida del número limita a la lista, `--author`, `--label`, `--assignee` seguidos por el valor muestra solo las `issues` que coincidan.

![Listar Issue](https://res.cloudinary.com/marcomadera/image/upload/v1600535838/Blog/6/viewIssue_fl9jji.png "Listar Issue")

## Gist

El comando para manejar los *gists* es `gist` seguido de una acción que pueden ser una de las siguientes:

<div style="display:grid;justify-content:space-between;grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));">
  <ul>
    <li>create</li>
    <li>edit</li>
  </ul>
  <ul>
    <li>delete</li>
    <li>list</li>
  </ul>
  <ul>
    <li>view</li>
  </ul>
</div>

Para crear **crear un gist** nuevo se hace a través del siguiente comando: `gh gist create` seguido del nombre de uno o varios archivos separados por espacio. Por defecto los gist son privados, se pueden hacer públicos con el *flag* `-public`.

Para **editar ver o borrar un gists** es con `gh gist edit` `gh gist view` o `gh gist delete` respectivamente seguido del *id* del *gist* o directamente la *url*.

## Alias

Los *aliases* son declaraciones de una palabra como un comando extendible, un *shortcut* al comando. Para manejarlos se usa el comando `alias` seguido de una acción que pueden ser una de las siguientes:

<div style="display:grid;justify-content:space-between;grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));">
  <ul>
    <li>delete</li>
  </ul>
  <ul>
    <li>list</li>
  </ul>
  <ul>
    <li>set</li>
  </ul>
</div>

Para **crear un alias** se hace con el comando `gh alias set` seguido del nombre del alias a utilizar como *shortcut* y la expansión del comando. Para crear una lista de mis *bugs* sería el siguiente comando `gh alias misbugs='gh issue list -a "MarcoMadera" -l "bug"'`

![Alias](https://res.cloudinary.com/marcomadera/image/upload/v1600539890/Blog/6/aliases_u0mnwn.png "Alias")

## API

Github API es poderoso, con `gh api` se pueden hacer llamadas <abbr title="Hyper Text Transfer Protocol">HTTP</abbr> a <abbr title="Representational State Transfer">REST</abbr> o GraphQL API. Se usa con el comando `gh api` seguido del *endpoint* que puede ser una *url* absoluta o la represetación de un repositorio de la siguiente manera de ejemplo `repos/user/repo/releases`. El método que usa por defecto es `GET`, se puede cambiar con el *flag* `--method`.

![Llamada API](https://res.cloudinary.com/marcomadera/image/upload/v1600495544/Blog/6/api_c3nf1n.png "Llamada API")

## Conclusión

Github CLI reduce la necesidad de abrir la [Página de Github](https://github.com/ "Página de Github") después de hacer *commits* y *push* de código. Por lo que es de gran ayuda para ahorrar tiempo. A día de hoy es la versión 1.0.0 y trae la mayoría de características de GitHub.
