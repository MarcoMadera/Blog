/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const RSS = require("rss");
const { siteMetadata, imageCloudProvider } = require("../site.config");
const { getSortedPostsData, getPostBySlug } = require("./posts");
const {
  title,
  description,
  siteUrl,
  author: webAuthor,
  language,
  logo,
} = siteMetadata;
const md = require("markdown-it")({
  html: true,
  xhtmlOut: true,
  breaks: true,
  linkify: true,
  typographer: false,
  quotes: "“”‘’",
});

function insertTextBetween(str, index, value) {
  return str.substr(0, index) + value + str.substr(index);
}

async function generate() {
  const feed = new RSS({
    title,
    description,
    feed_url: `${siteUrl}/rss.xml`,
    site_url: siteUrl,
    image_url: logo,
    webMaster: `${webAuthor.email} (${webAuthor.name})`,
    language: language,
    copyright: "2020 - 2021 Marco Madera",
    custom_namespaces: {
      webfeeds: "http://webfeeds.org/rss/1.0",
    },
    custom_elements: [
      { "webfeeds:icon": `${siteUrl}/logo.svg` },
      { "webfeeds:logo": `${siteUrl}/logo.svg` },
      {
        "webfeeds:cover": {
          _attr: {
            image: logo,
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

  const allPosts = await getSortedPostsData();
  await Promise.all(
    allPosts.map(async ({ slug }) => {
      const { title, content, author, date, cover } = await getPostBySlug(slug);

      feed.item({
        title: title,
        description: md.render(content),
        url: `${siteUrl}/blog/${slug}`,
        author: author || webAuthor.name,
        date: date,
        enclosure: {
          url:
            author !== webAuthor.name
              ? cover
              : insertTextBetween(
                  cover,
                  imageCloudProvider.length,
                  "/c_scale,w_760"
                ),
          size: 760,
        },
      });
    })
  );

  const xml = feed.xml();

  fs.writeFileSync(path.join("./public", "rss.xml"), xml);
}
generate();
