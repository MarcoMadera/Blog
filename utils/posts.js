import matter from "gray-matter";
import fs from "fs";
import slugify from "react-slugify";
import path from "path";
export const getPostsFiles = () => {
  // Get all posts Files located in `content/posts`
  const postsFiles = fs
    .readdirSync(`${process.cwd()}/content/posts`)
    .map((file) => ({
      filename: `${file}`,
    }));

  return postsFiles;
};

export const getSortedPosts = () => {
  const postsFiles = getPostsFiles();

  const posts = postsFiles
    .map(({ filename }) => {
      // Get raw content from file
      const markdownWithMetadata = fs
        .readFileSync(`content/posts/${filename}`)
        .toString();

      // Parse markdown, get frontmatter data
      const { data } = matter(markdownWithMetadata);

      const frontmatter = {
        ...data,
        date: data.date.toString(),
      };
      const slug = filename.replace(".md", "");
      return {
        slug,
        frontmatter,
      };
    })
    .sort(
      (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    );
  return posts;
};

export const getSortedPostsData = () => {
  const postsFiles = getPostsFiles();
  const posts = postsFiles
    .map(({ filename }) => {
      // Get raw content from file
      const markdownWithMetadata = fs.readFileSync(`content/posts/${filename}`);

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

export const getPostBySlug = (slug) => {
  const posts = getSortedPosts();
  const markdownWithMetadata = fs
    .readFileSync(path.join("content/posts", slug + ".md"))
    .toString();
  const postIndex = posts.findIndex(({ slug: postSlug }) => postSlug === slug);

  const { data, content } = matter(markdownWithMetadata);

  const frontmatter = {
    ...data,
    date: data.date.toString(),
  };
  const previousPost = posts[postIndex + 1] ? posts[postIndex + 1] : null;
  const nextPost = posts[postIndex - 1] ? posts[postIndex - 1] : null;

  const recommendedPosts = posts.filter(({ frontmatter }) =>
    frontmatter.tag.some((name) => data.tag.includes(name))
  );
  return {
    frontmatter,
    post: { content },
    previousPost,
    nextPost,
    recommendedPosts,
  };
};

export const getPostsSlugs = () => {
  const postsFiles = getPostsFiles();
  const paths = postsFiles.map(({ filename }) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));
  return paths;
};

export const getPostsPages = () => {
  const posts = getPostsFiles();
  const pages = Array.from(
    { length: Math.ceil(posts.length / 4) },
    (_, i) => i + 1
  );
  return pages;
};

export const getPostsPagesPaths = () => {
  const pages = getPostsPages();
  const paths = pages.map((_, i) => ({
    params: {
      id: (i + 1).toString(),
    },
  }));
  return paths;
};

export const getHomeData = (id) => {
  const allPosts = getSortedPostsData();
  const indexOfLastPost = id * 4;
  const indexOfFirstPost = indexOfLastPost - 4;
  const posts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  const pages = Array.from(
    { length: Math.ceil(allPosts.length / 4) },
    (_, i) => i + 1
  );

  const tags = [...new Set(allPosts.map(({ tag }) => tag).flat())];
  return {
    posts,
    pages,
    tags,
  };
};

export const getTagData = (slug) => {
  const posts = getSortedPostsData();
  const tags = [...new Set(posts.map(({ tag }) => tag).flat())];

  const postsByTag = posts.filter(({ tag }) => slugify(tag).includes(slug));
  const postData = {
    postsByTag,
    slug,
  };
  return {
    postData,
    tags,
  };
};
