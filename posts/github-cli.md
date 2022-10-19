---
title: GitHub desde la línea de comandos
description: Github CLI es la herramienta oficial para ejecutar todo el flujo de trabajo en GitHub desde la línea de comandos.
date: 2020-09-20
cover: https://res.cloudinary.com/marcomadera/image/upload/v1664626932/Blog/6/roman-synkevych-wX2L8L-fGeA-unsplash_ti5f7b.jpg
coverAlt: Muñeco de Octocat, mascota de GitHub.
author: Marco Madera
tags:
  - Terminal
---

Sin importar el lenguaje que usamos para programar la línea de comandos es una herramienta que nos permite trabajar de manera más rápida y productiva. Cambiar entre la terminal y la web va en contra de esto. En octubre de 2019 se empezó a trabajar[^1] con Github CLI para reducir el cambio de contexto entre GitHub web y la máquina local.

[^1]: Primer commit de Github CLI en [Github](https://github.com/cli/cli/commit/8dd03144ffdc6c0d486d6b705f9c7fba871ee7c3)

## ¿Qué es GitHub CLI?

Github <abbr title="Command Line Interface">CLI</abbr> es la herramienta oficial de código abierto para **ejecutar todo el flujo de trabajo en GitHub en la línea de comandos**. Nos permite interactuar con repositorios, _issues_, _pull request_ y más[^2].

[^2]: [Github CLI Manual](https://cli.github.com/manual/)

<tweet id="1306586113293729795"></tweet>

## Instalación y autenticación

GitHub <abbr title="Command Line Interface">CLI</abbr> se descarga desde su [página oficial](https://cli.github.com/ "Página oficial de GitHub CLI"). Está disponible para MAC Windows Linux y en paquetes binarios.

Github CLI es interactivo con cada uno de sus comandos que nos guiarán a lo que queramos hacer. Una vez instalado podemos iniciar sesión con `gh auth login` y seguir las instrucciones:

<colors green blue red gray yellow></colors>

<pre><code data-lang="CLI"><span><span class="green">?</span> What account do you want to log into? <span class="blue">GitHub.com</span></span>
<span>- Logging into github.com</span>
<span><span class="green">?</span> How would you like to authenticate? <span class="blue">Paste an authentication token</span></span>
<span></span>
<span>Tip: you can generate a Personal Access Token here https://github.com/settings/tokens</span>
<span>The minimum required scopes are 'repo' and 'read:org'.</span>
<span><span class="green">?</span> Paste your authentication token: ****************************************</span>
<span><span class="green">?</span> Choose default git protocol <span class="blue">SSH</span></span>
<span>- gh config set -h github.com git_protocol ssh</span>
<span><span class="green">✓</span> Configured git protocol</span>
<span><span class="green">✓</span> Logged in as MarcoMadera</span></code></pre>

Otros subcomandos que también se pueden usar con `gh auth`:

- `gh auth logout`: Salir de la sesión.
- `gh auth refresh`: Actualizar las credenciales.
- `gh auth status`: Verificar el estado de la autenticación.

## Comandos

La estructura de los comandos siguen el mismo patrón `gh <comando> <acción> [flags]` y pueden ser los siguientes:

| Comando | Acciones                                        |
| :-----: | :---------------------------------------------- |
|  gist   | Ver, crear, editar, eliminar _gists_...         |
|  issue  | Ver, crear, reabrir, cerrar _issues_...         |
|   pr    | Ver, crear, revisar, cerrar _pull requests_...  |
| release | Crear, eliminar, subir, descargar _releases_... |
|  repo   | Crear, clonar, _fork_, y ver repositorios.      |
|  alias  | Crea, lista y elimina atajos de comandos.       |
|   api   | Hacer llamadas HTTP a Rest o GraphQL API.       |
|  auth   | Login, logout, y _refresh_ de la autenticación. |
| config  | Maneja la configuración para gh.                |
|  help   | El comando de ayuda.                            |

## Repositorios

Para **crear repositorios** tenemos el comando `gh repo create` seguido del nombre del repositorio. Su versión web sería el siguiente atajo [repo.new](https://repo.new "Atajo de nuevo repositorio"), que con GitHub CLI podemos decirle adiós.

<pre><code data-lang="CLI"><span>C:\Users\marco\repositorios>gh repo create github-cli</span>
<span><span class="green">?</span> Visibility <span class="blue">Private</span></span>
<span><span class="green">?</span> This will create 'github-cli' in your current directory. Continue? <span class="blue">Yes</span></span>
<span><span class="green">✓</span> Created repository MarcoMadera/github-cli on GitHub</span>
<span><span class="green">?</span> Create a local project directory for MarcoMadera/github-cli <span class="blue">Yes</span></span>
<span>Initialized empty Git repository in C:/Users/marco/repositorios/github-cli/.git/</span>
<span><span class="green">✓</span> Initialized repository in './github-cli/'</span>
<span></span>
<span>C:\Users\marco\repositorios>cd github-cli</span>
<span></span>
<span>C:\Users\marco\repositorios>github-cli></span></code></pre>

Para **ver repositorios** utilizamos `gh repo view` seguido del nombre del repositorio de esta forma `usuario/repositorio`. Se puede observar la descripción del repositorio y el contenido del archivo `README.md`.

Los _flags_ que recibe pueden ser por ejemplo `-w` o `--web` para ver el repositorio en la web. Si no incluye un nombre de repositorio se verá el repositorio que está en el directorio actual.

<pre><code data-lang="CLI"><span>C:\Users\marco\repositorios\github-cli>gh repo view</span>
<span>MarcoMadera/github-cli</span>
<span class="gray">No description provided</span>
<span></span>
<span>  <span style="font-weight:600;">## GitHub CLI</span></span>
<span></span>
<span>  Github CLI es la herramienta oficial de código abierto para ejecutar todo el flujo de trabajo en github desde la línea de comandos.</span>
<span></span>
<span>  <span style="font-weight:600;">### Ver los repositorios</span></span>
<span></span>
<span>    $gh repo view <span class="red">[</span>&#60;repository&#62;<span class="red">]</span> <span class="red">[</span>flags<span class="red">]</span></span>
<span></span>
<span>  Con este comando se puede observar la descripción del repositorio y el contenido del archivo README.md.</span></code></pre>

Podemos **clonar un repositorio** propio o de otro usuario. Para clonar repositorios propios se usa el comando `gh repo clone` seguido del nombre del repositorio. Para clonar repositorios de otros usuarios es el mismo comando seguido del `usuario/repositorio`.

<div class="codeDiv">
<pre><code data-lang="CLI"><span>C:\Users\marco\repositorios>gh repo clone github-cli</span>
<span>Cloning into 'github-cli'...</span>
<span>remote: Enumerating objects: 3, done.</span>
<span>remote: Counting objects: 100% (3/3), done.</span>
<span>remote: Compressing objects: 100% (2/2), done.</span>
<span>remote: Total 3 (delta 0), reused 3 (delta 0), pack-reused 0</span>
<span>Receiving objects: 100% (3/3), done.</span>
<span>&nbsp;</span>
<span>C:\Users\marco\repositorios>cd github-cli</span>
<span>&nbsp;</span>
<span>C:\Users\marco\repositorios\github-cli></span></code></pre></div>

Para hacer **fork de un repositorio** funciona de la misma manera que clonar un repositorio, el comando _fork_ `gh repo fork` seguido del repositorio. Si no se provee de ningún repositorio, hace un _fork_ del proyecto actual. Lo que es bueno se quiere empezar a arreglar _bugs_ o realizar una nueva mejora rápidamente.

## Pull Request

El comando para _pull request_ es `pr` seguido de una acción que pueden ser una de las siguientes:

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

Para **crear pull request** podemos usar `gh pr create`. Para agregar directamente un título usamos el _flag_ `--title`, para el contenido el _flag_ `--body` y para agregar a alguien para que lo revise el _flag_ `--reviewer` seguido del usuario.

<pre><code data-lang="CLI"><span>C:\Users\marco\repositorios\github-cli>gh pr create --title "Como crear un pr" --body "contenido"</span>
<span></span>
<span><span class="green">?</span> Where should we push the 'rp branch? <span class="blue">MarcoMadera/github-cli</span></span>
<span></span>
<span>Creating pull request for <span class="blue">rp</span> into <span class="blue">master</span> in MarcoMadera/github-cli</span>
<span></span>
<span>Total 0 (delta 0), reused 0 (delta 0), pack-reused 0</span>
<span>remote:</span>
<span>remote: Create a pull request for 'rp' on GitHub by visiting:</span>
<span>remote: https://github.com/MarcoMadera/github-cli/pull/new/rp</span>
<span>remote:</span>
<span>To github.com:MarcoMadera/github-cli.git</span>
<span> * [new branch]    HEAD -> rp</span>
<span>Branch 'rp' set up to track remote branch 'rp' from 'origin'.</span></code></pre>

Con `gh pr list` seguido de los _flags_ podemos **listar pull request**. Los _flags_ se pueden usar como filtros. `--limit` seguido del número limita a la lista. `--state` y `--label` seguidos por el valor muestra solo las `pr` que coincidan.

Para **ver pull request** se usa `gh pr view` seguido del número del _pull request_ o directamente la _URL_.

<pre><code data-lang="CLI"><span>C:\Users\marco\repositorios>gh pr view</span>
<span style="font-weight:600;">Update README.md</span>
<span><span class="green">Open</span> <span class="gray">&middot; MarcoMadera want to merge 1 commit into rp from master</span></span>
<span></span>
<span class="gray">View this pull request on GitHub: https://github.com/MarcoMadera/github-cli/pull/1</span></code></pre>

Las demás acciones funcionan de manera similar. `gh pr status` muestra el estado de las `pr` en las que participas. GitHub CLI sigue mucho este patrón, revisa el funcionamiento de las acciones listadas anteriormente.

## Issues

El comando para manejar _issues_ es `issue` seguido de una acción que pueden ser una de las siguientes:

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

Para **crear issues** se usa el comando `gh issue create`. Para agregar directamente un título usamos el _flag_ `--title`, para el contenido el _flag_ `--body`.

<pre><code data-lang="CLI"><span>C:\Users\marco\repositorios\github-cli>gh issue create --title "título" --body "contenido" --label "bug"</span>
<span></span>
<span>Creating issue in MarcoMadera/github-cli</span>
<span></span>
<span>https://github.com/MarcoMadera/github-cli/issues/2</span></code></pre>

Para **ver issues** se usa `gh issue view` seguido del número del _pull request_ o directamente la _URL_.

Para **listar issues** se usa `gh issue list`. Los _flags_ se pueden usar como filtros: `--limit` seguida del número limita a la lista, `--author`, `--label`, `--assignee` seguidos por el valor muestra solo las `issues` que coincidan.

<pre><code data-lang="CLI"><span>C:\Users\marco\repositorios\github-cli>gh issue list --label "bug"</span>
<span></span>
<span>Showing 1 of 1 issue in MarcoMadera/github-cli that matches your search</span>
<span></span>
<span><span class="green">2</span> título <span class="gray">(bug)    about 5 minutes ago</span></span>
<span></span>
<span>C:\Users\marco\repositorios>gh issue view 2</span>
<span style="font-weight:600;">título</span>
<span><span class="green">Open</span> <span class="gray">&middot; MarcoMadera opened about 5 minutes ago &middot; 0 comments</span></span>
<span></span>
<span><span style="font-weight:600;">Labels:</span> bug</span>
<span></span>
<span>  contenido</span>
<span></span>
<span class="gray">View this issue on GitHub: https://github.com/MarcoMadera/github-cli/issues/2</span></code></pre>

## Gist

El comando para manejar los _gists_ es `gist` seguido de una acción que pueden ser una de las siguientes:

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

Para **crear un gist** nuevo se hace a través del siguiente comando: `gh gist create` seguido del nombre de uno o varios archivos separados por espacio. Por defecto los gist son privados, se pueden hacer públicos con el _flag_ `-public`.

Para **editar ver o borrar un gists** es con `gh gist edit` `gh gist view` o `gh gist delete` respectivamente seguido del _ID_ del _gist_ o directamente la _URL_.

## Alias

Los _aliases_ son declaraciones de una palabra como un comando extendible, un _shortcut_ al comando. Para manejarlos se usa el comando `alias` seguido de una acción que pueden ser una de las siguientes:

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

Para **crear un alias** se hace con el comando `gh alias set` seguido del nombre del alias a utilizar como _shortcut_ y la expansión del comando. Para crear una lista de mis _bugs_ sería el siguiente comando `gh alias misbugs='gh issue list -a "MarcoMadera" -l "bug"'`

<pre><code data-lang="CLI"><span>C:\Users\marco\repositorios>gh alias set cr "repo create"</span>
<span>- Adding alias for cr: <span style="font-weight:600;">repo create</span></span>
<span><span class="green">✓</span> Added alias.</span>
<span></span>
<span>C:\Users\marco\repositorios\github-cli>gh alias list</span>
<span>co: pr checkout</span>
<span>cr: repo create</span></code></pre>

## API

Github API es poderoso, con `gh api` se pueden hacer llamadas <abbr title="Hyper Text Transfer Protocol">HTTP</abbr> a <abbr title="Representational State Transfer">REST</abbr> o GraphQL API. Se usa con el comando `gh api` seguido del _endpoint_ que puede ser una _URL_ absoluta o la representación de un repositorio de la siguiente manera de ejemplo `repos/user/repo/releases`. El método que usa por defecto es `GET`, se puede cambiar con el _flag_ `--method`.

<pre><code data-lang="CLI"><span>C:\Users\marco>gh api https://marcomadera.com/api/now-playing</span>
<span>{</span>
<span>  <span class="blue">"artist"</span>: <span class="green">"Logic"</span>,</span>
<span>  <span class="blue">"songUrl"</span>: <span class="green">"https://open.spotify.com/track/25F6MWrnFBCXVnpN4n76EK"</span>,</span>
<span>  <span class="blue">"title"</span>: <span class="green">"Keanu Reeves"</span>,</span>
<span>  <span class="blue">"cover"</span>: <span class="green">"https://i.scdn.co/image/ab67616d00004851c27ad6f3930a857177ba33dc"</span>,</span>
<span>  <span class="blue">"listening"</span>: <span class="red">true</span>,</span>
<span>}</span></code></pre>

## Conclusión

Github CLI reduce la necesidad de abrir la [Página de Github](https://github.com/ "Página de Github") después de hacer _commits_ y _push_ de código. Por lo que es de gran ayuda para ahorrar tiempo. A día de hoy es la versión 1.0.0 y trae la mayoría de características de GitHub.
