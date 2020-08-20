import matter from "gray-matter";
import fs from "fs";
import slugify from "react-slugify";

export const getPostsFolders = () => {
  // Get all posts folders located in `content/posts`
  const postsFolders = fs
    .readdirSync(`${process.cwd()}/content/posts`)
    .map((file) => ({
      filename: `${file}`,
    }));

  return postsFolders;
};

// Get day in format: Month day, Year. e.g. April 19, 2020
export const getFormattedDate = (date) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};

export const getSortedPosts = () => {
  const postFolders = getPostsFolders();

  const posts = postFolders
    .map(({ filename }) => {
      // Get raw content from file
      const markdownWithMetadata = fs
        .readFileSync(`content/posts/${filename}`)
        .toString();

      // Parse markdown, get frontmatter data, excerpt and content.
      const { data, excerpt, content } = matter(markdownWithMetadata);

      const frontmatter = {
        ...data,
        date: getFormattedDate(data.date),
        tag: data.tag,
      };
      const slug = filename.replace(".md", "");
      return {
        slug,
        frontmatter,
        excerpt,
        content,
      };
    })
    .sort(
      (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    );

  return posts;
};

export const getPostsSlugs = () => {
  const postFolders = getPostsFolders();

  const paths = postFolders.map(({ filename }) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));
  return paths;
};
export const getPostsTags = () => {
  const posts = getSortedPosts();
  let paths = [];
  posts.map(({ frontmatter }) =>
    frontmatter.tag.forEach((tag) =>
      paths.push({
        params: {
          slug: slugify(tag),
        },
      })
    )
  );
  return paths;
};

export const getPostBySlug = (slug) => {
  const posts = getSortedPosts();

  const postIndex = posts.findIndex(({ slug: postSlug }) => postSlug === slug);

  const { frontmatter, content, excerpt } = posts[postIndex];
  const previousPost = posts[postIndex + 1];
  const currentPost = posts[postIndex];
  const nextPost = posts[postIndex - 1];

  return {
    frontmatter,
    post: { content, excerpt },
    previousPost,
    currentPost,
    nextPost,
  };
};
export const getPostsByTag = (slug) => {
  const posts = getSortedPosts();
  const postsByTag = posts.filter(({ frontmatter }) =>
    slugify(frontmatter.tag).includes(slug)
  );

  return {
    postsByTag,
    slug,
  };
};
