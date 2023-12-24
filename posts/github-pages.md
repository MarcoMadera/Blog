---
title: Cómo publicar tu sitio web con GitHub Pages
description: GitHub Pages es una herramienta gratuita que te permite alojar tu sitio web estático directamente desde un repositorio de GitHub.
date: 2023-03-11
cover: https://res.cloudinary.com/marcomadera/image/upload/Blog/github-pages/github-pages-octo-m_md8b7i.jpg
coverAlt: Muñeco de Octocat, mascota de GitHub.
author: Marco Madera
tags:
  - Terminal
---

GitHub Pages[^github-pages] es una herramienta muy útil para publicar sitios web estáticos[^static-site]. Si tienes un repositorio de GitHub con un sitio web estático, puedes utilizar GitHub Pages para alojar tu sitio y hacerlo público en internet.

[^static-site]: Wikipedia contributors. (2023, February 18). The Free Encyclopedia. Retrieved 15:36, January 24, 2022, from <cite>[Página web estática](https://es.wikipedia.org/wiki/P%C3%A1gina_web_est%C3%A1tica)</cite>
[^github-pages]: GitHub Pages | Websites for you and your projects, hosted directly from your GitHub repository. Just edit, push, and your changes are live... <cite>[GitHub Pages](https://pages.github.com)</cite>

## Ventajas y desventajas de GitHub Pages

### Ventajas:

- Gratuito y fácil de configurar, lo que lo hace una opción atractiva para proyectos pequeños o sitios web personales.
- Es un servicio de alojamiento de sitios web estáticos, lo que significa que no tienes que preocuparte por la configuración del servidor o la base de datos. Solo necesitas subir los archivos HTML, CSS y JavaScript de tu sitio web al repositorio de GitHub.
- Incluye soporte para sitios web generados por Jekyll, un generador de sitios estáticos que permite la creación de sitios web más complejos y estructurados.
- Puedes utilizar un dominio personalizado para tu sitio web en GitHub Pages, lo que significa que puedes tener una presencia en línea sin tener que pagar por un alojamiento web tradicional.

### Desventajas:

- Solo admite sitios web estáticos, lo que significa que no puedes alojar aplicaciones web dinámicas o sitios web que requieran una base de datos en línea.
- Tiene un límite de ancho de banda y almacenamiento, lo que significa que si tienes un sitio web muy popular o grande, es posible que necesites considerar opciones de alojamiento web pagas.
- No admite todas las características de un alojamiento web tradicional, como el acceso FTP y los registros del servidor web.
- Es un servicio de terceros, lo que significa que estás confiando en la disponibilidad y confiabilidad de GitHub para mantener tu sitio web en línea. Si GitHub experimenta una interrupción o falla, tu sitio web también se verá afectado.

## Formas de publicar a GitHub Pages

He usado tres formas diferentes de publicar un sitio web con GitHub Pages:

- Creando un branch de gh-pages en el repositorio con los archivos estáticos.
- Instalando el paquete gh-pages en Node.js que se encarga de publicar los archivos estáticos en el branch de gh-pages.
- Utilizando GitHub Actions sin necesidad de crear un branch de gh-pages.

### Crear un branch de gh-pages

La forma más sencilla de publicar tu sitio web con GitHub Pages es crear un branch de gh-pages. Para ello, sigue los siguientes pasos:

1. Crea un branch de gh-pages en tu repositorio:
   ```bash
   git checkout -b gh-pages
   ```
2. Asegúrate de que este branch contenga todos los archivos que quieres publicar. Si no es así, súbelos al branch:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin gh-pages
   ```
3. Ve a la página de configuración de GitHub Pages de tu repositorio (_Settings_ > _Pages_).
4. En la sección _Source_, selecciona el branch de gh-pages y haz clic en _Save_.

¡Listo! Tu sitio web ya está publicado en la dirección `[usuario].github.io/[repositorio]`.

### Instalar el paquete gh-pages en Node.js

Si prefieres no utilizar un branch de gh-pages, otra forma de publicar tu sitio web con GitHub Pages es utilizando el paquete gh-pages en Node.js. Para ello, sigue los siguientes pasos:

1. Instala el paquete gh-pages en tu proyecto:
   ```bash
   npm install gh-pages --save-dev
   ```
2. En el archivo package.json, añade las siguientes líneas:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
   <note type="important" inline>`dist` es la carpeta que contiene tus archivos estáticos generados por tu proyecto.</note>
3. En tu terminal, ejecuta el siguiente comando:
   ```bash
   npm run deploy
   ```
4. Ve a la página de configuración de GitHub Pages de tu repositorio (_Settings_ > _Pages_)`.
5. En la sección _Source_, selecciona la opción `gh-pages branch` y haz clic en _Save_.

¡Listo! Tu sitio web ya está publicado en la dirección `[usuario].github.io/[repositorio]`.

### Utilizar GitHub Actions

Finalmente, otra forma de publicar tu sitio web con GitHub Pages es utilizando GitHub Actions[^github-actions]. Para ello, sigue los siguientes pasos:

[^github-actions]: GitHub Actions Documentation - GitHub Docs <cite>[GitHub Actions](https://docs.github.com/en/actions)</cite>

1. Crea un archivo .yml en la carpeta `.github/workflows/` de tu repositorio.
2. En este archivo, escribe el siguiente código:

   ```yaml
   name: Publish Site

   on:
     push:
       branches: [ main ]

   permissions:
     contents: read
     pages: write
     id-token: write

   concurrency:
     group: "pages"
     cancel-in-progress: true

   jobs:
     build:
       runs-on: ubuntu-latest

       steps:
         - name: Checkout code
           uses: actions/checkout@v2

       - name: Install dependencies
           run: npm install

       - name: Build
           run: npm run build

       - name: Upload Pages artifact
         uses: actions/upload-pages-artifact@v1
         with:
           artifact-name: github-pages
           path: dist

     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       needs: build
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v1
   ```

3. Haz los cambios necesarios para que el archivo se ajuste a tu proyecto y guarda el archivo y haz commit y push a tu repositorio.
4. Ve a la página de acciones de GitHub (Actions) y espera a que se complete la acción "Publish Site".
5. ¡Listo! Tu sitio web ya está publicado en la dirección `[usuario].github.io/[repositorio]`.

<note type="info" inline>Podrás ver que de esta forma no hay un branch de gh-pages en tu repositorio. En su lugar, le indicamos que despues de construir el sitio, directamente suba el artefacto y haga deploy en el ambiente de github-pages.</note>

## Publicar al directorio raíz

Si quieres publicar tu sitio web en el directorio raíz de tu usuario de GitHub, puedes hacerlo con un repositorio que se llame `[usuario].github.io`. Para ello, sigue los siguientes pasos:

1. Crea un repositorio con el nombre `[usuario].github.io`.
2. Añade los archivos estáticos de tu sitio web a este repositorio y haz commit y push.
3. Y listo tu sitio web ya está publicado en la dirección `[usuario].github.io`.

## Añadir un dominio personalizado

Si tienes un dominio y quieres añadir un dominio personalizado a tu sitio web, puedes hacerlo de la siguiente forma:

1. Ve a la página de configuración de GitHub Pages de tu repositorio (Settings > Pages).
2. En la sección "Custom domain", añade el dominio que quieres utilizar y haz clic en "Save".
3. Este dominio debe estar apuntando a la dirección IP de GitHub Pages. Para ello, añade un registro `CNAME` en tu proveedor de DNS con el valor que te indica GitHub.

## Conclusión

En este artículo, hemos visto tres formas diferentes de publicar tu sitio web con GitHub Pages.

Utilizando un branch de gh-pages, instalando el paquete gh-pages en Node.js o utilizando GitHub Actions.

Cualquiera de estas opciones te permitirá alojar tu sitio web estático de manera gratuita y hacerlo público en internet.
