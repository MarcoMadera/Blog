import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import RSS from "rss";
import matter from "gray-matter";

const siteMetadata = {
  title: "Marco Madera",
  description:
    "Comparto mis conocimientos, pensamientos y opiniones sobre la programación",
  siteUrl: "https://marcomadera.com",
  webAuthor: {
    name: "Marco Madera",
    email: "me@marcomadera.com",
  },
  language: "es-MX",
  logo: "https://marcomadera.com/logo512.png",
};

const imageCloudProvider =
  "https://res.cloudinary.com/marcomadera/image/upload";

function insertTextBetween(str, index, value) {
  return str.substr(0, index) + value + str.substr(index);
}

async function generate() {
  const feed = new RSS({
    title: siteMetadata.title,
    description: siteMetadata.description,
    feed_url: `${siteMetadata.siteUrl}/rss.xml`,
    site_url: siteMetadata.siteUrl,
    image_url: siteMetadata.logo,
    webMaster: `${siteMetadata.webAuthor.email} (${siteMetadata.webAuthor.name})`,
    language: siteMetadata.language,
    copyright: "2020 - 2021 Marco Madera",
    custom_namespaces: {
      webfeeds: "http://webfeeds.org/rss/1.0",
    },
    custom_elements: [
      { "webfeeds:icon": `${siteMetadata.siteUrl}/logo.svg` },
      { "webfeeds:logo": `${siteMetadata.siteUrl}/logo.svg` },
      {
        "webfeeds:cover": {
          _attr: {
            image: siteMetadata.logo,
          },
        },
      },
      {
        "webfeeds:related": {
          _attr: {
            layout: "card",
            target: "browser",
          },
        },
      },
      {
        "webfeeds:analytics": {
          _attr: {
            id: "UA-177844057-1",
            engine: "GoogleAnalytics",
          },
        },
      },
    ],
  });

  const posts = readdirSync("posts");

  const postsData = posts.map((filename) => {
    const postContent = readFileSync(join(process.cwd(), "posts", filename));
    const { data } = matter(postContent);
    return { ...data, slug: filename.replace(/\.md?/, "") };
  });

  const sortedDatapostData = postsData.sort(
    (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
  );

  sortedDatapostData.map(
    ({ title, description, date, cover, author, slug }) => {
      feed.item({
        title: title,
        description: description,
        url: `${siteMetadata.siteUrl}/blog/${slug}`,
        author: author || siteMetadata.webAuthor.name,
        date: date,
        enclosure: {
          url:
            author !== siteMetadata.webAuthor.name
              ? cover
              : insertTextBetween(
                  cover,
                  imageCloudProvider.length,
                  "/c_scale,w_760"
                ),
          size: 760,
        },
      });
      writeFileSync("./public/rss.xml", feed.xml({ indent: true }));
    }
  );
}
generate();
