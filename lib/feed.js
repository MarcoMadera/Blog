const fs = require("fs");
const path = require("path");
const RSS = require("rss");
const { siteMetadata } = require("../site.config");
const { getAllPosts, getPostBySlug } = require("./api.js");
const { title, description, siteUrl, author, language, logo } = siteMetadata;

const feed = new RSS({
  title,
  description,
  feed_url: `${siteUrl}rss.xml`,
  site_url: siteUrl,
  image_url: logo,
  webMaster: `${author.email} (${author.name})`,
  language: language,
  copyright: "2020 Marco Madera",
});

const allPosts = getAllPosts();

allPosts.forEach((post) => {
  const { title, slug, author, date, content } = getPostBySlug(post);

  feed.item({
    title,
    description: content,
    url: `${siteUrl}blog/${slug}`,
    author,
    date,
  });
});

const xml = feed.xml();

fs.writeFileSync(path.join("./public", "rss.xml"), xml);
