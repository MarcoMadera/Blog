---
title: GitHub desde la línea de comandos
description: Github CLI es la herramienta oficial para ejecutar todo el flujo de trabajo en GitHub desde la línea de comandos.
date: 2020-09-20
cover: v1600483976/Blog/6/Octocat-removebg_wamv2v.png
author: Marco Madera
tags:
  - Terminal
---

Sin importar el lenguaje que usamos para programar, la línea de comandos es una herramienta que nos permite trabajar de manera más rápida y productiva, tener que estar cambiando entre la terminal y la web iba en contra de esto, por lo que en octubre de 2019 [se empezó a trabajar con Github CLI](https://github.com/cli/cli/commit/8dd03144ffdc6c0d486d6b705f9c7fba871ee7c3 "Primer commit de Github CLI"), para reducir el cambio de contexto entre github web y la máquina local.

## ¿Qué es github CLI?

Github <abbr title="Command Line Interface">CLI</abbr> es la herramienta oficial de código abierto para ejecutar todo el flujo de trabajo en github desde la línea de comandos.

Esta herramienta nos permite interactuar con repositorios, issues, pull request y más y ya ha sido lanzada.

<tweet id="1306586113293729795">

## Uso

La estructura de los comandos siguen el mismo patrón:

```bash
gh <comando> <subcomando> [flags]
```

Por comandos se pueden tomar los siguientes:

- gist : Crea gists.
- issue : Controla issues.
- pr : Controla pull requests.
- release : Control GitHub releases.
- repo : Crear, clonar, fork, y ver repositorios.
- alias: Crea atajos de comandos.
- api: Hace llamadas HTTP a Rest o GraphQL API.
- auth: Login, logout, y refresh de la autenticación.
- config: Maneja la configuración para gh.
- help: El comando de ayuda.

## Instalación

Para instalar Github <abbr title="Command Line Interface">CLI</abbr> en tu computadora, se descarga desde la [página oficial](https://cli.github.com/ "Página oficial de Github CLI").

Una vez instalado nos podemos loguear con el siguiente comando:

```bash
gh auth login
```

![Login en github cli](https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto/v1600485625/Blog/6/Login_Github_Cli_vjd3it.png "Login en github cli")

Otros subcomandos que también se pueden usar:

- ```gh auth logout```: Salir de la sesión.
- ```gh auth refresh```: Actualizar las credenciales.
- ```gh auth status```: Verificar el estado de la autenticación.

## Repositorios

Subcomandos:

- clone
- create
- fork
- view

### Crear repositorios

```bash
gh repo create [<name>] [flags]
```

Adios [repo.new](https://repo.new "Atajo de nuevo repositorio"), hola `gh repo create`

![Creación de repositorio](https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto/v1600490072/Blog/6/repocreate_z7ri8f.png "Creación de repositorio")

### Ver los repositorios

```bash
gh repo view [<repository>] [flags]
```

Con este comando se puede observar la descripción del repositorio y el contenido del archivo README.md.
Recibe dos argumentos, el nombre del repositorio y flags que puede ser por ejemplo `-w` `--web` para ver el repositorio en la web.
Si no se incluyen flags se verá el repositorio que está en el directorio actual.

![Ver repositorio](https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto/v1600493607/Blog/6/repoview_yvcrdm.png "Ver repositorio")

### Clonar repositorio

Existen varias formas de clonar un repositorio.

```bash
gh repo clone <repositorio> [<directorio>] [-- <gitflags>...]
```

Esto clona un repositorio que el propietario es la persona que está autenticada.

```bash
gh repo clone proyecto
```

Con solo el usuario y el nombre del proyecto.

```bash
gh repo clone usuario/proyecto
```

También se puede usar de la forma tradicional a través de un enlace.

```bash
gh repo clone https://github.com/usuario/proyecto
```

![Clonar repositorio](https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto/v1600494350/Blog/6/repoclone_gdqyis.png "Clonar repositorio")

### Hacer fork del repositorio

```bash
gh repo fork [<repository>] [flags]
```

Si no se provee de ningún argumento, hace un fork del proyecto actual. Lo que es bueno se quiere empezar a arreglar bugs o realizar una nueva mejora rápidamente.

## Pull Request

Subcomandos:

- checkout
- checks
- close
- create
- diff
- list
- merge
- ready
- reopen
- review
- status
- view

### Crea pull request

```bash
gh pr create --title "Título" --body "Contenido"
```

![Crear Pull Request](https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto/v1600497956/Blog/6/rp_f3gmh5.png "Crear Pull Request")

### Enlistar las pull request

```bash
gh pr list [flags]
```

Se puede usar flags como filtros.

### Ver pull request

```bash
gh pr view [<number> | <url> | <branch>] [flags]
```

![Ver pull request](https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto/v1600498372/Blog/6/prview_hrrjvo.png "Ver pull request")

### Revisar el estado de las pr

Esto mostrará el estado de las pr en las que participas.

```bash
gh pr status
```

## Issues

Subcomandos:

- close
- create
- list
- reopen
- status
- view

### Crear issue

```bash
gh issue create --title "Issue title" --body "Issue body"
```

![Crear issue](https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto/v1600532173/Blog/6/createissue_ckxu8l.png "Crear issue")

### Ver issue

```bash
gh issue view {<number> | <url>} [flags]
```

### Enlistar issues

```bash
gh issue list
```

![Enlistar Issue](https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto/v1600535838/Blog/6/viewIssue_fl9jji.png "Enlistar Issue")

### Revisar el estado del issue

```bash
gh issue list -s "all"
```

## Gist

Subcomandos:

- create
- edit
- list
- view

```bash
gh gist create [<filename>... | -] [flags]
```

Para crear crear un gist nuevo se hace a través de uno o varios archivos separados por "-". Por defecto los gist son privados, se pueden hacer públicos con el flag `-public`.

## Alias

Subcomandos:

- delete
- list
- set

### Set Alias

Crea un shortcut para los comandos gh

```bash
gh alias set <alias> <expansion> [flags]
```

![Alias](https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto/v1600539890/Blog/6/aliases_u0mnwn.png "Alias")

Ejemplo de lista de bugs:

```bash
alias misbugs='gh issue list -a "MarcoMadera" -l "bug"'
```

### Enlistar Aliases

```bash
gh alias list [flags]
```

## API

```bash
gh api <endpoint> [flags]
```

Github API es poderoso, con `gh api` se pueden hacer llamadas HTTP a Rest o GraphQL API. El método que usa por defecto es GET, se puede cambiar con el flag --method.

Para llamadas a la API de github se puede usar de la siguiente manera:

```bash
gh api repos/user/repo/releases
```

También soporta urls absolutas.

![Llamada API](https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto/v1600495544/Blog/6/api_c3nf1n.png "Llamada API")

## Conclusión

Github CLI reduce la necesidad de abrir la [Página de Github](https://github.com/ "Página de Github") después de hacer commits y push de código. Por lo que es de gran ayuda para ahorrar tiempo. A día de hoy es la versión 1.0.0 y trae la mayoría de características de github.
