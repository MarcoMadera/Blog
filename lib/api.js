const matter = require("gray-matter");
const fs = require("fs");
const { join } = require("path");

const POSTS_DIR = join(process.cwd(), "./content/posts");

function getPostSlugs(dir) {
  return fs.readdirSync(dir);
}

function getAllPosts(dir = POSTS_DIR) {
  const slugs = getPostSlugs(dir);
  return slugs.map((slug) => slug.replace(/\.md$/, ""));
}

function getPostBySlug(slug) {
  if (!slug) {
    return false;
  }

  const fullPath = join(POSTS_DIR, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    ...data,
    slug,
    content,
  };
}

module.exports = {
  getPostSlugs,
  getAllPosts,
  getPostBySlug,
};
