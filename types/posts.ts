import { ReactNode } from "react";
import { TweetData } from "./tweet";

export type PostData = {
  readingTimeInMinutes: number;
  date: string;
  title: string;
  tags: string[];
  slug: string;
  blurDataURL: string;
  cover: string;
  h2s: string[];
  content: string;
  author: string;
  profilePhoto?: string;
  twitter?: string;
  description: string;
  summary?: string;
};

export interface Post extends PostData {
  previousPost: Pick<PostData, "title" | "slug"> | null;
  nextPost: Pick<PostData, "title" | "slug"> | null;
  recommendedPosts: Pick<PostData, "title" | "cover" | "slug">[];
}

export interface ImgData {
  base64: string;
  img: {
    height: number;
    width: number;
    type?: string;
    src: string;
  };
  fullImg: {
    darkImage?: Omit<ImgData, "fullImg"> | null;
    lightImage?: Omit<ImgData, "fullImg"> | null;
  };
}

export interface CodeBlockData {
  result: string;
  language?: string;
}

export type Tweets = Record<string, TweetData>;
export type Images = Record<string, ImgData>;
export type CodeBlocks = Record<string, CodeBlockData>;
export type Elements = Record<string, TweetData | ImgData | CodeBlockData>;
export interface PostWithMedia extends Post {
  elements: Elements;
}

export type AllTags = string[];
export type Pages = number[];
export type CurrentPage = number;

export interface HomeData {
  posts: PostData[];
  allTags: AllTags;
  pages: Pages;
  currentPage?: CurrentPage;
  tag?: string;
}

export interface ElementTweetParams {
  id: string;
  hideConversation: boolean;
}

export interface ElementCodeBlockParams {
  id: string;
  content: ReactNode[];
  language: string;
}

export interface ElementImageParams {
  id: string;
  normal: string;
  full?: { darkImage?: string; lightImage?: string };
}

export type Ids = ImageId | TweetId | CodeBlockId;
export type ImageId = `image:${string}`;
export type TweetId = `tweet:${string}`;
export type CodeBlockId = `codeBlock:${string}`;

export interface ElementImage extends ElementImageParams {
  type: "image";
}
export interface ElementTweet extends ElementTweetParams {
  type: "tweet";
}
export interface ElementCodeBlock extends ElementCodeBlockParams {
  type: "codeBlock";
}

export type Element = ElementImage | ElementTweet | ElementCodeBlock;

export interface UElementRes {
  Img: {
    data: ImgData | undefined;
    ignore: boolean;
  };
  Tweet: {
    data: TweetData | undefined;
    ignore: boolean;
  };
  CodeBlock: {
    data: CodeBlockData | undefined;
    ignore: boolean;
  };
  Response: {
    data: ImgData | TweetData | CodeBlockData | undefined;
    ignore: boolean;
  };
}
