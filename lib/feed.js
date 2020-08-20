const fs = require("fs");
const path = require("path");
const RSS = require("rss");
const { siteMetadata } = require("../site.config");
const { getSortedPosts, getPostBySlug } = require("./api.js");
const { title, description, siteUrl, author, language, logo } = siteMetadata;
const MarkdownIt = require("markdown-it");

md = new MarkdownIt();
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

const allPosts = getSortedPosts();

allPosts.forEach(({ slug }) => {
  const data = getPostBySlug(slug);
  // const { title, slug, author, date, content } = getPostBySlug(slug);

  feed.item({
    title: data.title,
    description: md.render(data.content),
    url: `${siteUrl}blog/${data.slug}`,
    author: data.author,
    date: data.date,
  });
});

const xml = feed.xml();

fs.writeFileSync(path.join("./public", "rss.xml"), xml);
