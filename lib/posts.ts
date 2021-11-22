/* eslint-disable @typescript-eslint/no-var-requires */
import matter from "gray-matter";
import { readdirSync, readFileSync } from "fs";
import slugify from "react-slugify";
import { siteMetadata } from "../site.config";
import toc from "markdown-toc-unlazy";
import { parse } from "twemoji";
import readingTime from "reading-time";
import { getPlaiceholder } from "plaiceholder";
import { AllTags, Pages, Post, PostData } from "types/posts";

export function getPostsFiles(): {
  filename: string;
}[] {
  // Get all posts Files located in `posts`
  const postsFiles = readdirSync(`${process.cwd()}/posts`).map((file) => ({
    filename: `${file}`,
  }));
  return postsFiles;
}

export async function getSortedPostsData(): Promise<PostData[]> {
  const postsFiles = getPostsFiles();

  const posts = Promise.all(
    postsFiles.map(async ({ filename }) => {
      // Get raw content from file
      const markdownWithMetadata = readFileSync(`posts/${filename}`);

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

      const h2s: string[] = toc(content)
        .json.filter(({ lvl }: { lvl: number }) => lvl === 2)
        .map(({ content }: { content: string }) => {
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

export async function getTagsSlugs(): Promise<
  {
    params: {
      tag: string;
    };
  }[]
> {
  const sortedposts = await getSortedPostsData();

  return sortedposts.flatMap(({ tags }) =>
    tags.map((tag) => ({
      params: {
        tag: slugify(tag),
      },
    }))
  );
}

export async function getPostBySlug(slug: PostData["slug"]): Promise<Post> {
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
    content: parse(currentPost.content, {
      className: "twemoji",
      attributes: () => ({ width: "24", height: "24" }),
    }),
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

export function getPostsSlugs(): {
  params: {
    slug: string;
  };
}[] {
  return getPostsFiles().map(({ filename }) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));
}

export function getPostsPages(): number[] {
  return Array.from(
    { length: Math.ceil(getPostsFiles().length / siteMetadata.postsPerPage) },
    (_, i) => i + 1
  );
}

export function getPostsPagesPaths(): {
  params: {
    number: string;
  };
}[] {
  return getPostsPages().map((pageNumber) => ({
    params: {
      number: pageNumber.toString(),
    },
  }));
}

type Posts = Omit<PostData, "h2s" | "content">[];

interface HomeDataFromPage {
  posts: Posts;
  pages: Pages;
  allTags: AllTags;
}

export async function getHomeDataFromPage(
  number: number
): Promise<HomeDataFromPage> {
  const allPosts = await getSortedPostsData();
  const indexOfLastPost = number * siteMetadata.postsPerPage;
  const indexOfFirstPost = indexOfLastPost - siteMetadata.postsPerPage;
  return {
    posts: allPosts.slice(indexOfFirstPost, indexOfLastPost).map((post) => ({
      tags: post.tags,
      author: post.author,
      cover: post.cover,
      date: post.date,
      description: post.description,
      slug: post.slug,
      title: post.title,
      readingTimeInMinutes: post.readingTimeInMinutes,
      blurDataURL: post.blurDataURL,
    })),
    pages: Array.from(
      { length: Math.ceil(allPosts.length / siteMetadata.postsPerPage) },
      (_, i) => i + 1
    ),
    allTags: [...new Set(allPosts.flatMap(({ tags }) => tags))],
  };
}

export async function getTagData(slug: PostData["slug"]): Promise<{
  posts: Posts;
  allTags: AllTags;
}> {
  const allPosts = await getSortedPostsData();
  return {
    posts: allPosts
      .filter(({ tags }) => slugify(tags).includes(slug))
      .map((post) => ({
        tags: post.tags,
        author: post.author,
        cover: post.cover,
        date: post.date,
        description: post.description,
        slug: post.slug,
        title: post.title,
        readingTimeInMinutes: post.readingTimeInMinutes,
        blurDataURL: post.blurDataURL,
      })),
    allTags: [...new Set(allPosts.flatMap(({ tags }) => tags))],
  };
}
