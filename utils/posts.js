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

export const getSortedPosts = () => {
  const postFolders = getPostsFolders();

  const posts = postFolders
    .map(({ filename }) => {
      // Get raw content from file
      const markdownWithMetadata = fs
        .readFileSync(`content/posts/${filename}`)
        .toString();

      // Parse markdown, get frontmatter data, excerpt and content.
      const { data, content } = matter(markdownWithMetadata);

      const frontmatter = {
        ...data,
        date: data.date.toString(),
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
};
export const getSortedPostsData = () => {
  const postFolders = getPostsFolders();

  const posts = postFolders
    .map(({ filename }) => {
      // Get raw content from file
      const markdownWithMetadata = fs.readFileSync(`content/posts/${filename}`);

      // Parse markdown, get frontmatter data, excerpt and content.
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

export const getTagsSlugs = () => {
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
export const getPostsTags = () => {
  const posts = getSortedPosts();
  let tags = [];
  posts.map(({ frontmatter }) =>
    frontmatter.tag.forEach((tag) => tags.push(tag))
  );
  return tags;
};

export const getPostBySlug = (slug) => {
  const posts = getSortedPosts();

  const postIndex = posts.findIndex(({ slug: postSlug }) => postSlug === slug);

  const { frontmatter, content } = posts[postIndex];
  const previousPost = posts[postIndex + 1];
  const currentPost = posts[postIndex];
  const nextPost = posts[postIndex - 1];

  return {
    frontmatter,
    post: { content },
    previousPost,
    currentPost,
    nextPost,
  };
};
export const getPostsByTag = (slug) => {
  const posts = getSortedPostsData();
  const postsByTag = posts.filter(({ tag }) => slugify(tag).includes(slug));

  return {
    postsByTag,
    slug,
  };
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

export const getPostsByTags = (data) =>
  [
    ...new Set(
      data
        .map((tag) => getPostsByTag(slugify(tag)).postsByTag)
        .flat()
        .map(JSON.stringify)
    ),
  ].map(JSON.parse);
