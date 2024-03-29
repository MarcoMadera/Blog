import { writeFileSync } from "fs";
import { globby } from "globby";
import prettier from "prettier";

const siteUrl = "https://marcomadera.com";

(async () => {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");
  const pages = await globby([
    "pages/**/*.tsx",
    "posts/**/*.md",
    "!pages/etiqueta",
    "!pages/newsletter/subscription.tsx",
    "!pages/newsletter/unsubscription.tsx",
    "!pages/pagina",
    "!pages/blog",
    "!pages/_*.tsx",
    "!pages/api",
    "!pages/404.tsx",
    "!pages/500.tsx",
  ]);

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
            ${pages
              .map((page) => {
                const path = page
                  .replace("pages", "")
                  .replace("posts", "/blog")
                  .replace("/index.tsx", "")
                  .replace(".tsx", "")
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

  const formatted = await prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  writeFileSync("public/sitemap.xml", formatted);
})();
