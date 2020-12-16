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

<style>.preCode{background:none !important;padding:0 !important;}.codeGreen{color:#12da2a;}.codeBlue{color:#26a5ab;}.boldBlue{color:#12acda;font-weight:600;}.codeRed{color:#c13b4e}.codeGray{color:#808080;}.codeBold{font-weight:600;}.codeYellow{color:#bbda12;}</style>

<pre><code data-lang="CLI" className="preCode"><span class="codeGreen">?</span> What account do you want to log into? <span class="codeBlue">GitHub.com</span>
- Logging into github.com
<span class="codeGreen">?</span> How would you like to authenticate? <span class="codeBlue">Paste an authentication token</span>

Tip: you can generate a Personal Access Token here https://github.com/settings/tokens
The minimum required scopes are 'repo' and 'read:org'.
<span class="codeGreen">?</span> Paste your authentication token: ****************************************
<span class="codeGreen">?</span> Choose default git protocol <span class="codeBlue">SSH</span>
- gh config set -h github.com git_protocol ssh
<span class="codeGreen">&#10004;</span> Configured git protocol
<span class="codeGreen">&#10004;</span> Logged in as MarcoMadera</code></pre>

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

<pre><code data-lang="CLI" className="preCode">C:\Users\marco\repositorios>gh repo create github-cli
<span class="codeGreen">?</span> Visibility <span class="codeBlue">Private</span>
<span class="codeGreen">?</span> This will create 'github-cli' in your current directory. Continue? <span class="codeBlue">Yes</span>
<span class="codeGreen">&#10004;</span> Created repository MarcoMadera/github-cli on GitHub
<span class="codeGreen">?</span> Create a local project directory for MarcoMadera/github-cli <span class="codeBlue">Yes</span>
Initialized empty Git repository in C:/Users/marco/repositorios/github-cli/.git/
<span class="codeGreen">&#10004;</span> Initialized repository in './github-cli/'

C:\Users\marco\repositorios>cd github-cli

C:\Users\marco\repositorios>github-cli>
</code></pre>

Para **ver repositorios** utilizamos `gh repo view` seguido del nombre del repositorio de esta forma `usuario/repositorio`. Se puede observar la descripción del repositorio y el contenido del archivo `README.md`.

Los *flags* que recibe pueden ser por ejemplo `-w` o `--web` para ver el repositorio en la web. Si no incluye un nombre de repositorio se verá el repositorio que está en el directorio actual.

<pre><code data-lang="CLI" className="preCode">C:\Users\marco\repositorios\github-cli>gh repo view
MarcoMadera/github-cli
<span class="codeGray">No description provided</span>

  <span class="boldBlue">## GitHub CLI</span>

  Github CLI es la herramienta oficial de código abierto para ejecutar todo el flujo de trabajo en github desde la línea de comandos.

  <span class="boldBlue">### Ver los repositorios</span>

    $gh repo view <span class="codeRed">[</span>< repository ><span class="codeRed">]</span> <span class="codeRed">[</span>flags<span class="codeRed">]</span>

  Con este comando se puede observar la descripción del repositorio y el contenido del archivo README.md.
</code></pre>

Podemos **clonar un repositorio** propio o de otro usuario. Para clonar repositorios propios se usa el comando `gh repo clone` seguido del nombre del repositorio. Para clonar repositorios de otros usuarios es el mismo comando seguido del `usuario/repositorio`.

<div class="codeDiv">
<pre><code data-lang="CLI" className="preCode">C:\Users\marco\repositorios>gh repo clone github-cli
Cloning into 'github-cli'...
remote: Enumerating objects: 3, done.
remote: Counting objects: 100% (3/3), done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 3 (delta 0), reused 3 (delta 0), pack-reused 0
Receiving objects: 100% (3/3), done.

C:\Users\marco\repositorios>cd github-cli

C:\Users\marco\repositorios\github-cli>
</code></pre></div>

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

<pre><code data-lang="CLI" className="preCode">C:\Users\marco\repositorios\github-cli>gh pr create --title "Como crear un pr" --body "contenido"

<span class="codeGreen">?</span> Where should we push the 'rp branch? <span class="codeBlue">MarcoMadera/github-cli</span>

Creating pull request for <span class="codeBlue">rp</span> into <span class="codeBlue">master</span> in MarcoMadera/github-cli

Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
remote:
remote: Create a pull request for 'rp' on GitHub by visiting:
remote: https://github.com/MarcoMadera/github-cli/pull/new/rp
remote:
To github.com:MarcoMadera/github-cli.git
 * [new branch]    HEAD -> rp
Branch 'rp' set up to track remote branch 'rp' from 'origin'.
</code></pre>

Con `gh pr list` seguido de los *flags* podemos **listar pull request**. Los *flags* se pueden usar como filtros. `--limit` seguido del número limita a la lista. `--state` y  `--label` seguidos por el valor muestra solo las `pr` que coincidan.

Para **ver pull request** se usa `gh pr view` seguido del número del *pull request* o directamente la *url*.

<pre><code data-lang="CLI" className="preCode">C:\Users\marco\repositorios>gh pr view
<span class="codeBold">Update README.md</span>
<span class="codeGreen">Open</span> <span class="codeGray">&middot; MarcoMadera want to merge 1 commit into rp from master</span>

<span class="codeGray">View this pull request on GitHub: https://github.com/MarcoMadera/github-cli/pull/1</span>
</code></pre>

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

<pre><code data-lang="CLI" className="preCode">C:\Users\marco\repositorios\github-cli>gh issue create --title "titulo" --body "contenido" --label "bug"

Creating issue in MarcoMadera/github-cli

https://github.com/MarcoMadera/github-cli/issues/2
</code></pre>

Para **ver issues** se usa `gh issue view` seguido del número del *pull request* o directamente la *url*.

Para **listar issues** se usa `gh issue list`. Los *flags* se pueden usar como filtros: `--limit` seguida del número limita a la lista, `--author`, `--label`, `--assignee` seguidos por el valor muestra solo las `issues` que coincidan.

<pre><code data-lang="CLI" className="preCode">C:\Users\marco\repositorios\github-cli>gh issue list --label "bug"

Showing 1 of 1 issue in MarcoMadera/github-cli that matches your search

<span class="codeGreen">2</span> título <span class="codeGray">(bug)    about 5 minutes ago</span>

C:\Users\marco\repositorios>gh issue view 2
<span class="codeBold">título</span>
<span class="codeGreen">Open</span> <span class="codeGray">&middot; MarcoMadera opened about 5 minutes ago &middot; 0 comments</span>

<span class="codeBold">Labels:</span> bug

  contenido

<span class="codeGray">View this issue on GitHub: https://github.com/MarcoMadera/github-cli/issues/2</span>
</code></pre>

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

<pre><code data-lang="CLI" className="preCode">C:\Users\marco\repositorios>gh alias set cr "repo create"
- Adding alias for cr: <span class="codeBold">repo create</span>
<span class="codeGreen">&#10004;</span> Added alias.

C:\Users\marco\repositorios\github-cli>gh alias list
co: pr checkout
cr: repo create
</code></pre>

## API

Github API es poderoso, con `gh api` se pueden hacer llamadas <abbr title="Hyper Text Transfer Protocol">HTTP</abbr> a <abbr title="Representational State Transfer">REST</abbr> o GraphQL API. Se usa con el comando `gh api` seguido del *endpoint* que puede ser una *url* absoluta o la represetación de un repositorio de la siguiente manera de ejemplo `repos/user/repo/releases`. El método que usa por defecto es `GET`, se puede cambiar con el *flag* `--method`.

<pre><code data-lang="CLI" className="preCode">C:\Users\marco>gh api https://marcomadera.com/api/now-playing
{
  <span class="codeBlue">"artist"</span>: <span class="codeGreen">"Logic"</span>,
  <span class="codeBlue">"songUrl"</span>: <span class="codeGreen">"https://open.spotify.com/track/25F6MWrnFBCXVnpN4n76EK"</span>,
  <span class="codeBlue">"title"</span>: <span class="codeGreen">"Keanu Reeves"</span>,
  <span class="codeBlue">"cover"</span>: <span class="codeGreen">"https://i.scdn.co/image/ab67616d00004851c27ad6f3930a857177ba33dc"</span>,
  <span class="codeBlue">"listening"</span>: <span class="codeYellow">true</span>,
}

C:\Users\marco>
</code></pre>

## Conclusión

Github CLI reduce la necesidad de abrir la [Página de Github](https://github.com/ "Página de Github") después de hacer *commits* y *push* de código. Por lo que es de gran ayuda para ahorrar tiempo. A día de hoy es la versión 1.0.0 y trae la mayoría de características de GitHub.
