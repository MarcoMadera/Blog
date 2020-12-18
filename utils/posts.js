const matter = require("gray-matter");
const fs = require("fs");
const slugify = require("react-slugify").default;
const path = require("path");
const metaData = require("../site.config").siteMetadata;

const getPostsFiles = () => {
  // Get all posts Files located in `posts`
  const postsFiles = fs.readdirSync(`${process.cwd()}/posts`).map((file) => ({
    filename: `${file}`,
  }));
  return postsFiles;
};

const getSortedPostsData = () => {
  const postsFiles = getPostsFiles();
  const posts = postsFiles
    .map(({ filename }) => {
      // Get raw content from file
      const markdownWithMetadata = fs.readFileSync(`posts/${filename}`);

      // Parse markdown, get frontmatter data
      const { data } = matter(markdownWithMetadata);

      const slug = filename.replace(".md", "");
      return {
        ...data,
        date: data.date.toString(),
        slug: slug,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  return posts;
};

const getTagsSlugs = () =>
  getSortedPostsData().flatMap(({ tags }) =>
    tags.map((tag) => ({
      params: {
        slug: slugify(tag),
      },
    }))
  );

const getPostBySlug = (slug) => {
  const posts = getSortedPostsData();
  const markdownWithMetadata = fs
    .readFileSync(path.join("posts", slug + ".md"))
    .toString();
  const postIndex = posts.findIndex(({ slug: postSlug }) => postSlug === slug);

  const { data, content } = matter(markdownWithMetadata);

  const recommendedPosts = posts
    .filter(({ tags }) => tags.some((tag) => data.tags.includes(tag)))
    .map(({ title, cover, slug }) => {
      return { title, cover, slug };
    });

  return {
    ...data,
    date: data.date.toString(),
    content,
    author: data.author ?? metaData.author.name,
    profilePhoto: data.profilePhoto ?? metaData.author.image,
    twitter: data.twitter ?? metaData.social.twitter,
    summary: data.summary ?? metaData.author.summary,
    previousPost: posts[postIndex + 1]
      ? {
          title: posts[postIndex + 1].title,
          slug: posts[postIndex + 1].slug,
        }
      : null,
    nextPost: posts[postIndex - 1]
      ? {
          title: posts[postIndex - 1].title,
          slug: posts[postIndex - 1].slug,
        }
      : null,
    recommendedPosts,
    slug,
  };
};

const getPostsSlugs = () =>
  getPostsFiles().map(({ filename }) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

const getPostsPages = () =>
  Array.from(
    { length: Math.ceil(getPostsFiles().length / metaData.postsPerPage) },
    (_, i) => i + 1
  );

const getPostsPagesPaths = () =>
  getPostsPages().map((page) => ({
    params: {
      id: page.toString(),
    },
  }));

const getHomeData = (id) => {
  const allPosts = getSortedPostsData();
  const indexOfLastPost = id * metaData.postsPerPage;
  const indexOfFirstPost = indexOfLastPost - metaData.postsPerPage;
  return {
    posts: allPosts.slice(indexOfFirstPost, indexOfLastPost),
    pages: Array.from(
      { length: Math.ceil(allPosts.length / metaData.postsPerPage) },
      (_, i) => i + 1
    ),
    tags: [...new Set(allPosts.flatMap(({ tags }) => tags))],
  };
};

const getTagData = (slug) => {
  const posts = getSortedPostsData();
  return {
    postsByTag: posts.filter(({ tags }) => slugify(tags).includes(slug)),
    tags: [...new Set(posts.flatMap(({ tags }) => tags))],
  };
};

module.exports = {
  getSortedPostsData,
  getPostsFiles,
  getTagsSlugs,
  getPostBySlug,
  getPostsSlugs,
  getPostsPages,
  getPostsPagesPaths,
  getHomeData,
  getTagData,
};
