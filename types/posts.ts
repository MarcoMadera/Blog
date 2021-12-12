import { ReactNode } from "react";
import { TweetData, SpaceData } from "./tweet";

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
export type Spaces = Record<string, SpaceData>;
export type Images = Record<string, ImgData>;
export type CodeBlocks = Record<string, CodeBlockData>;
export type Elements = Record<
  string,
  TweetData | ImgData | CodeBlockData | SpaceData
>;
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

export interface DefaultElementParams {
  id: string;
}

export interface ElementTweetParams extends DefaultElementParams {
  hideConversation: boolean;
}

export interface ElementCodeBlockParams extends DefaultElementParams {
  content: ReactNode[];
  language: string;
}

export interface ElementImageParams extends DefaultElementParams {
  normal: string;
  full?: { darkImage?: string; lightImage?: string };
}

export type Ids = ImageId | TweetId | CodeBlockId | SpaceId;
export type ImageId = `image:${string}`;
export type TweetId = `tweet:${string}`;
export type CodeBlockId = `codeBlock:${string}`;
export type SpaceId = `space:${string}`;

export interface ElementImage extends ElementImageParams {
  type: "image";
}
export interface ElementTweet extends ElementTweetParams {
  type: "tweet";
}
export interface ElementCodeBlock extends ElementCodeBlockParams {
  type: "codeBlock";
}
export interface ElementSpace extends DefaultElementParams {
  type: "space";
}

export type Element =
  | ElementImage
  | ElementTweet
  | ElementSpace
  | ElementCodeBlock;

export interface UElementRes {
  Img: {
    data: ImgData | undefined;
    ignore: boolean;
  };
  Tweet: {
    data: TweetData | undefined;
    ignore: boolean;
  };
  Space: {
    data: SpaceData | undefined;
    ignore: boolean;
  };
  CodeBlock: {
    data: CodeBlockData | undefined;
    ignore: boolean;
  };
  Response: {
    data: ImgData | TweetData | SpaceData | CodeBlockData | undefined;
    ignore: boolean;
  };
}
