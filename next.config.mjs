/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"],
    deviceSizes: [360, 400, 500, 550, 630, 705, 818, 1060, 1140, 1920, 2048],
    imageSizes: [20, 35, 50, 70, 100, 130, 260],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  webpack: (config) => {
    const { pathname: domhandlerPath } = new URL(
      "node_modules/domhandler",
      import.meta.url
    );
    config.resolve.alias["domhandler"] = domhandlerPath;
    return config;
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
        source: "/portfolio/sre-excel",
        destination: "/portafolio/sre-excel",
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

// https://securityheaders.com
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google.com *.vimeo.com *.youtube.com *.firebaseio.com *.twitter.com *.jsdelivr.net;
  child-src *.youtube-nocookie.com *.google.com *.vimeo.com *.twitter.com *.bitsofco.de *.firebaseio.com *.firebaseapp.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com *.vimeo.com;
  img-src * blob: data:;
  media-src 'self' *.cloudinary.com;
  connect-src *;
  font-src 'self' fonts.googleapis.com fonts.gstatic.com;
`;

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: "Referrer-Policy",
    value: "same-origin",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  // Opt-out of Google FLoC: https://amifloced.org/
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

export default nextConfig;
