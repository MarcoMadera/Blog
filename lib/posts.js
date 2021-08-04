/* eslint-disable @typescript-eslint/no-var-requires */
const matter = require("gray-matter");
const fs = require("fs");
const slugify = require("react-slugify").default;
const { siteMetadata } = require("../site.config");
const toc = require("markdown-toc-unlazy");
const twemoji = require("twemoji");
const readingTime = require("reading-time");
const { getPlaiceholder } = require("plaiceholder");

function getPostsFiles() {
  // Get all posts Files located in `posts`
  const postsFiles = fs.readdirSync(`${process.cwd()}/posts`).map((file) => ({
    filename: `${file}`,
  }));
  return postsFiles;
}

async function getSortedPostsData() {
  const postsFiles = getPostsFiles();

  const posts = Promise.all(
    postsFiles.map(async ({ filename }) => {
      // Get raw content from file
      const markdownWithMetadata = fs.readFileSync(`posts/${filename}`);

      // Parse markdown, get frontmatter data
      const { data, content } = matter(markdownWithMetadata);

      const slug = filename.replace(".md", "");

      const { base64 } = await getPlaiceholder(data.cover, {
        size: 10,
      });

      const date = data.date.toString();
      const title = data.title;
      const cover = data.cover;
      const tags = data.tags;
      const author = data.author || null;
      const profilePhoto = data.profilePhoto || null;
      const twitter = data.twitter || null;
      const summary = data.summary || null;
      const description = data.description;

      const h2s = toc(content)
        .json.filter(({ lvl }) => lvl === 2)
        .map(({ content }) => {
          return content;
        });

      return {
        readingTimeInMinutes: Math.ceil(readingTime(content).minutes),
        date,
        title,
        tags,
        slug,
        cover,
        blurDataURL: base64,
        h2s,
        content,
        author,
        profilePhoto,
        twitter,
        description,
        summary,
      };
    })
  ).then((postsData) =>
    postsData.sort(
      (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
    )
  );
  return posts;
}

async function getTagsSlugs() {
  const sortedposts = await getSortedPostsData();

  return sortedposts.flatMap(({ tags }) =>
    tags.map((tag) => ({
      params: {
        tag: slugify(tag),
      },
    }))
  );
}

async function getPostBySlug(slug) {
  const posts = await getSortedPostsData();

  const postIndex = posts.findIndex(({ slug: postSlug }) => postSlug === slug);

  const currentPost = posts[postIndex];

  const recommendedPosts = posts
    .filter(({ tags }) => tags.some((tag) => currentPost.tags.includes(tag)))
    .map(({ title, cover, slug }) => {
      return { title, cover, slug };
    });

  return {
    date: currentPost.date,
    title: currentPost.title,
    cover: currentPost.cover,
    tags: currentPost.tags,
    description: currentPost.description,
    blurDataURL: currentPost.blurDataURL,
    content: twemoji.parse(currentPost.content, { className: "twemoji" }),
    author: currentPost.author ?? siteMetadata.author.name,
    profilePhoto: currentPost.profilePhoto ?? siteMetadata.author.image,
    twitter: currentPost.twitter ?? siteMetadata.social.twitter,
    summary: currentPost.summary ?? siteMetadata.author.summary,
    readingTimeInMinutes: Math.ceil(readingTime(currentPost.content).minutes),
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
    h2s: currentPost.h2s,
  };
}

function getPostsSlugs() {
  return getPostsFiles().map(({ filename }) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));
}

function getPostsPages() {
  return Array.from(
    { length: Math.ceil(getPostsFiles().length / siteMetadata.postsPerPage) },
    (_, i) => i + 1
  );
}

function getPostsPagesPaths() {
  return getPostsPages().map((pageNumber) => ({
    params: {
      number: pageNumber.toString(),
    },
  }));
}

async function getHomeDataFromPage(number) {
  const allPosts = await getSortedPostsData();
  const indexOfLastPost = number * siteMetadata.postsPerPage;
  const indexOfFirstPost = indexOfLastPost - siteMetadata.postsPerPage;
  return {
    posts: allPosts.slice(indexOfFirstPost, indexOfLastPost),
    pages: Array.from(
      { length: Math.ceil(allPosts.length / siteMetadata.postsPerPage) },
      (_, i) => i + 1
    ),
    allTags: [...new Set(allPosts.flatMap(({ tags }) => tags))],
  };
}

async function getTagData(slug) {
  const allPosts = await getSortedPostsData();
  return {
    posts: allPosts.filter(({ tags }) => slugify(tags).includes(slug)),
    allTags: [...new Set(allPosts.flatMap(({ tags }) => tags))],
  };
}

module.exports = {
  getSortedPostsData,
  getPostsFiles,
  getTagsSlugs,
  getPostBySlug,
  getPostsSlugs,
  getPostsPages,
  getPostsPagesPaths,
  getHomeDataFromPage,
  getTagData,
};
