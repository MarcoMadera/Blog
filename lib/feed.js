const fs = require("fs");
const path = require("path");
const RSS = require("rss");
const { siteMetadata } = require("../site.config");
const { getAllPosts, getPostBySlug } = require("./api.js");
const { title, description, siteUrl, author, language } = siteMetadata;

const feed = new RSS({
  title,
  description,
  feed_url: `${siteUrl}rss.xml`,
  site_url: siteUrl,
  webMaster: `${author.email} (${author.name})`,
  language: { language },
});

const allPosts = getAllPosts();

allPosts.forEach((post) => {
  const { title, description, slug, author, date } = getPostBySlug(post);

  feed.item({
    title,
    description: description,
    url: `${siteUrl}blog/${slug}`,
    author,
    date,
  });
});

const xml = feed.xml();

fs.writeFileSync(path.join("./public", "rss.xml"), xml);
