const fs = require("fs");
const path = require("path");
const RSS = require("rss");
const { siteMetadata, imageCloudProvider } = require("../site.config");
const { getSortedPostsData, getPostBySlug } = require("../utils/posts");
const { title, description, siteUrl, author, language, logo } = siteMetadata;
const md = require("markdown-it")({
  html: true,
  xhtmlOut: true,
  breaks: true,
  langPrefix: "language-",
  linkify: true,
  typographer: false,
  quotes: "“”‘’",
}).use(require("markdown-it-highlightjs"), {
  inline: true,
});

const feed = new RSS({
  title,
  description,
  feed_url: `${siteUrl}/rss.xml`,
  site_url: siteUrl,
  image_url: logo,
  webMaster: `${author.email} (${author.name})`,
  language: language,
  copyright: "2020 Marco Madera",
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

const allPosts = getSortedPostsData();
allPosts.forEach(({ slug }) => {
  const { title, content, author, date, cover } = getPostBySlug(slug);

  feed.item({
    title: title,
    description: md.render(content),
    url: `${siteUrl}/blog/${slug}`,
    author: author,
    date: date,
    enclosure: {
      url:
        author !== siteMetadata.author.name
          ? cover
          : `${imageCloudProvider}/c_scale,w_760/${cover}`,
      size: 760,
    },
  });
});

const xml = feed.xml();

fs.writeFileSync(path.join("./public", "rss.xml"), xml);
