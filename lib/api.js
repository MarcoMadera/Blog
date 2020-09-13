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
function getFormattedDates(date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}
function getPostsFolders() {
  // Get all posts folders located in `content/posts`
  const postsFolders = fs
    .readdirSync(`${process.cwd()}/content/posts`)
    .map((file) => ({
      filename: `${file}`,
    }));

  return postsFolders;
}

function getSortedPosts() {
  const file = getPostsFolders();
  const posts = file
    .map(({ filename }) => {
      // Get raw content from file
      const markdownWithMetadata = fs
        .readFileSync(`content/posts/${filename}`)
        .toString();
      // Parse markdown, get frontmatter data, excerpt and content.
      const { data, content } = matter(markdownWithMetadata);

      const frontmatter = {
        ...data,
        date: getFormattedDates(data.date),
        tag: data.tag,
      };
      const slug = filename.replace(".md", "");
      return {
        slug,
        frontmatter,
        content,
      };
    })
    .sort(
      (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    );

  return posts;
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
  getSortedPosts,
};
