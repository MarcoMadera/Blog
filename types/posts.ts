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
export interface FullImg {
  darkImage?: Omit<ImgData, "fullImg"> | null;
  lightImage?: Omit<ImgData, "fullImg"> | null;
}
export interface ImgData {
  base64: string;
  img: {
    height: number;
    width: number;
    type?: string;
    src: string;
  };
  fullImg: FullImg;
}

interface CodeBlockData {
  result: string;
  language?: string;
}

export enum ElementType {
  TWEET = "tweet",
  IMAGE = "image",
  CODEBLOCK = "codeBlock",
  SPACE = "space",
}

export type ElementId = `${ElementType}:${string}`;
export type ElementsData = Record<ElementId, ElementData>;

export interface PostWithMedia extends Post {
  elements: ElementsData;
}

export type AllTags = string[];
export type Pages = number[];
type CurrentPage = number;

export interface HomeData {
  posts: PostData[];
  allTags: AllTags;
  pages: Pages;
  currentPage?: CurrentPage;
  tag?: string;
}

interface DefaultElementParams {
  id: string;
}

interface ElementTweetParams extends DefaultElementParams {
  hideConversation: boolean;
}

interface ElementCodeBlockParams extends DefaultElementParams {
  content: ReactNode[];
  language: string;
}

interface ElementImageParams extends DefaultElementParams {
  normal: string;
  full?: { darkImage?: string; lightImage?: string };
}

export interface Elements {
  tweet: ElementTweet[];
  space: ElementSpace[];
  image: ElementImage[];
  codeBlock: ElementCodeBlock[];
}

export interface ElementImage extends ElementImageParams {
  type: ElementType.IMAGE;
}
export interface ElementTweet extends ElementTweetParams {
  type: ElementType.TWEET;
}
export interface ElementCodeBlock extends ElementCodeBlockParams {
  type: ElementType.CODEBLOCK;
}
export interface ElementSpace extends DefaultElementParams {
  type: ElementType.SPACE;
}

export type Element =
  | ElementImage
  | ElementTweet
  | ElementSpace
  | ElementCodeBlock;

type ElementData = ImgData | TweetData | SpaceData | CodeBlockData;

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
    data: ElementData | undefined;
    ignore: boolean;
  };
}
