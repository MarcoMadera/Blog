import matter from "gray-matter";
import { readdirSync, readFileSync } from "fs";
import slugify from "react-slugify";
import { join } from "path";
import { siteMetadata as metaData } from "../site.config";

function getPostsFiles() {
  // Get all posts Files located in `posts`
  const postsFiles = readdirSync(`${process.cwd()}/posts`).map((file) => ({
    filename: `${file}`,
  }));
  return postsFiles;
}

function getSortedPostsData() {
  const postsFiles = getPostsFiles();
  const posts = postsFiles
    .map(({ filename }) => {
      // Get raw content from file
      const markdownWithMetadata = readFileSync(`posts/${filename}`);

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
}

function getTagsSlugs() {
  return getSortedPostsData().flatMap(({ tags }) =>
    tags.map((tag) => ({
      params: {
        tag: slugify(tag),
      },
    }))
  );
}

function getPostBySlug(slug) {
  const posts = getSortedPostsData();
  const markdownWithMetadata = readFileSync(
    join("posts", slug + ".md")
  ).toString();
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
    { length: Math.ceil(getPostsFiles().length / metaData.postsPerPage) },
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

function getHomeDataFromPage(number) {
  const allPosts = getSortedPostsData();
  const indexOfLastPost = number * metaData.postsPerPage;
  const indexOfFirstPost = indexOfLastPost - metaData.postsPerPage;
  return {
    posts: allPosts.slice(indexOfFirstPost, indexOfLastPost),
    pages: Array.from(
      { length: Math.ceil(allPosts.length / metaData.postsPerPage) },
      (_, i) => i + 1
    ),
    tags: [...new Set(allPosts.flatMap(({ tags }) => tags))],
  };
}

function getTagData(slug) {
  const posts = getSortedPostsData();
  return {
    postsByTag: posts.filter(({ tags }) => slugify(tags).includes(slug)),
    tags: [...new Set(posts.flatMap(({ tags }) => tags))],
  };
}

export {
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
