module.exports = {
  images: {
    loader: "cloudinary",
    path: "https://res.cloudinary.com/marcomadera/image/upload/",
    deviceSizes: [360, 400, 500, 550, 630, 705, 818, 1060, 1140, 1920, 2048],
    imageSizes: [20, 35, 50, 70, 100, 130, 260],
  },
  future: {
    webpack5: true,
  },
  async redirects() {
    return [
      {
        source: "/privacy",
        destination: "/privacidad",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blog/tag",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blog/etiqueta",
        destination: "/",
        permanent: true,
      },
      {
        source: "/pagina",
        destination: "/",
        permanent: true,
      },
      {
        source: "/pagina/1",
        destination: "/",
        permanent: true,
      },
      {
        source: "/page/2",
        destination: "/pagina/2",
        permanent: true,
      },
      {
        source: "/portfolio",
        destination: "/portafolio",
        permanent: true,
      },
      {
        source: "/portfolio/challenges",
        destination: "/portafolio/retos-frontend",
        permanent: true,
      },
      {
        source: "/portfolio/random-numbers-test",
        destination: "/portafolio/test-de-numeros-aleatorios",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/sobre-mi",
        permanent: true,
      },
      {
        source: "/blog/tag/css",
        destination: "/blog/etiqueta/css",
        permanent: true,
      },
      {
        source: "/blog/tag/personalizacion",
        destination: "/blog/etiqueta/personalizacion",
        permanent: true,
      },
      {
        source: "/blog/tag/terminal",
        destination: "/blog/etiqueta/terminal",
        permanent: true,
      },
      {
        source: "/blog/tag/html",
        destination: "/blog/etiqueta/html",
        permanent: true,
      },
      {
        source: "/blog/tag/a11y",
        destination: "/blog/etiqueta/a11y",
        permanent: true,
      },
      {
        source: "/blog/tag/web",
        destination: "/blog/etiqueta/web",
        permanent: true,
      },
      {
        source: "/blog/tag/javascript",
        destination: "/blog/etiqueta/javascript",
        permanent: true,
      },
      {
        source: "/blog/tag/vscode",
        destination: "/blog/etiqueta/vscode",
        permanent: true,
      },
      {
        source: "/blog/tag/estadistica",
        destination: "/blog/etiqueta/estadistica",
        permanent: true,
      },
    ];
  },
};
