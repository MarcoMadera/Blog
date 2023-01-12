/* eslint-disable @typescript-eslint/no-var-requires */
import matter from "gray-matter";
import { readdirSync, readFileSync } from "fs";
import slugify from "react-slugify";
import { siteMetadata } from "../site.config";
import twemoji from "twemoji";
import readingTime from "reading-time";
import { getPlaiceholder } from "plaiceholder";
import type { AllTags, Pages, Post, PostData } from "types/posts";
import { database } from "lib/firebase/admin";
import { IMicroMemories } from "types/microMemories";

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

  const sortedPosts = Promise.all(
    postsFiles.map(async ({ filename }) => {
      // Get raw content from file
      const markdownWithMetadata = readFileSync(`posts/${filename}`);

      // Parse markdown, get frontmatter data
      const { data, content } = matter(markdownWithMetadata);

      const slug = filename.replace(".md", "");

      const isDev = process.env.NODE_ENV === "development";

      const { base64: blurDataURL, img: coverData } = isDev
        ? {
            base64:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAkElEQVQImSXNOw7CMAwA0GyckFOwcwtGbsKE2Ir4DVwAhJBKoE0tO6kTO3yDENLbn3FASIFj6tBTYI4imkWzakZi40MkQmttKc9SPqUU0QdgAkwUxCBxtd5tV8vF5jiazBqHgP2lxfqGDoLhKEg+M4ynczMY1tfu/bqrSlbhmEzjfrUP8XBuq/3JQQDs/1rwX1uuhqf+VOa4AAAAAElFTkSuQmCC",
            img: data.cover,
          }
        : await getPlaiceholder(data.cover, {
            size: 10,
          });

      const date = data.date.toString();
      const title = data.title;
      const cover = data.cover;
      const coverAlt = data.coverAlt;
      const tags = data.tags;
      const author = data.author || null;
      const authorUrl = data.authorUrl || null;
      const profilePhoto = data.profilePhoto || null;
      const twitter = data.twitter || null;
      const summary = data.summary || null;
      const description = data.description;

      return {
        readingTimeInMinutes: Math.ceil(readingTime(content).minutes),
        date,
        title,
        tags,
        slug,
        cover,
        coverAlt,
        blurDataURL,
        content,
        author,
        profilePhoto,
        twitter,
        description,
        summary,
        coverData,
        authorUrl,
      };
    })
  ).then((postsData) =>
    postsData.sort(
      (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
    )
  );
  return sortedPosts;
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
    .map(({ title, cover, slug, coverAlt }) => {
      return { title, cover, slug, coverAlt };
    });

  return {
    date: currentPost.date,
    title: currentPost.title,
    cover: currentPost.cover,
    coverAlt: currentPost.coverAlt,
    tags: currentPost.tags,
    description: currentPost.description,
    blurDataURL: currentPost.blurDataURL,
    content: twemoji.parse(currentPost.content, {
      className: "twemoji",
      base: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/",
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
    coverData: currentPost.coverData,
    authorUrl: currentPost.authorUrl,
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
  microMemories: IMicroMemories;
}

export async function getHomeDataFromPage(
  number: number
): Promise<HomeDataFromPage> {
  const allPosts = await getSortedPostsData();
  const indexOfLastPost = number * siteMetadata.postsPerPage;
  const indexOfFirstPost = indexOfLastPost - siteMetadata.postsPerPage;
  const { microMemoriesPerPage } = siteMetadata;
  const ref = database.ref("micromemories/memory");
  const snapshot = await ref.limitToLast(microMemoriesPerPage).get();
  const totalItems = (await ref.get()).numChildren();
  const microMemories: IMicroMemories = {
    totalItems,
    items: [],
  };
  snapshot.forEach((snap) => {
    microMemories.items.unshift(snap.val());
  });

  return {
    posts: allPosts.slice(indexOfFirstPost, indexOfLastPost).map((post) => ({
      tags: post.tags,
      author: post.author,
      cover: post.cover,
      coverAlt: post.coverAlt,
      date: post.date,
      description: post.description,
      slug: post.slug,
      title: post.title,
      readingTimeInMinutes: post.readingTimeInMinutes,
      blurDataURL: post.blurDataURL,
      coverData: post.coverData,
    })),
    pages: Array.from(
      { length: Math.ceil(allPosts.length / siteMetadata.postsPerPage) },
      (_, i) => i + 1
    ),
    allTags: [...new Set(allPosts.flatMap(({ tags }) => tags))],
    microMemories,
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
        authorUrl: post.authorUrl,
        cover: post.cover,
        coverAlt: post.coverAlt,
        date: post.date,
        description: post.description,
        slug: post.slug,
        title: post.title,
        readingTimeInMinutes: post.readingTimeInMinutes,
        blurDataURL: post.blurDataURL,
        coverData: post.coverData,
      })),
    allTags: [...new Set(allPosts.flatMap(({ tags }) => tags))],
  };
}
