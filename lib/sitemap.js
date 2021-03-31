const fs = require("fs");

const globby = require("globby");
const prettier = require("prettier");
const { siteMetadata } = require("../site.config");
const { siteUrl } = siteMetadata;
(async () => {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");
  const pages = await globby([
    "pages/**/*.js",
    "posts/**/*.md",
    "!pages/etiqueta",
    "!pages/newsletter/suscription.js",
    "!pages/newsletter/unsuscription.js",
    "!pages/pagina",
    "!pages/blog",
    "!pages/_*.js",
    "!pages/api",
    "!pages/404.js",
  ]);

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
            ${pages
              .map((page) => {
                const path = page
                  .replace("pages", "")
                  .replace("posts", "/blog")
                  .replace("/index.js", "")
                  .replace(".js", "")
                  .replace(".md", "");
                const route = path === "/" ? "" : path;
                return `
                        <url>
                            <loc>${`${siteUrl}${route}`}</loc>
                        </url>
                    `;
              })
              .join("")}
        </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  fs.writeFileSync("public/sitemap.xml", formatted);
})();
