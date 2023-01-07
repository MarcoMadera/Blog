import { ReactNode } from "react";
import { TweetData, SpaceData } from "./tweet";
import { IGetPlaiceholderReturn } from "plaiceholder";
import { IMicroMemories } from "./microMemories";
export type PostData = {
  readingTimeInMinutes: number;
  date: string;
  title: string;
  tags: string[];
  slug: string;
  blurDataURL: string;
  cover: string;
  coverAlt: string;
  content: string;
  author: string;
  profilePhoto?: string;
  twitter?: string;
  description: string;
  summary?: string;
  authorUrl?: string;
  coverData: IGetPlaiceholderReturn["img"];
};

export interface Post extends PostData {
  previousPost: Pick<PostData, "title" | "slug"> | null;
  nextPost: Pick<PostData, "title" | "slug"> | null;
  recommendedPosts: Pick<PostData, "title" | "cover" | "slug" | "coverAlt">[];
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
export interface HeadingData {
  level: number;
  text: string;
}

export enum ElementType {
  TWEET = "tweet",
  IMAGE = "image",
  CODEBLOCK = "codeBlock",
  SPACE = "space",
  HEADING = "heading",
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
  microMemories?: IMicroMemories;
}

interface DefaultElementParams {
  id: string;
}

interface ElementTweetParams extends DefaultElementParams {
  hideConversation: boolean;
}

interface ElementCodeBlockParams extends DefaultElementParams {
  content: ReactNode[];
  meta: string;
  language: string;
}

interface ElementHeadingParams extends DefaultElementParams {
  level: number;
  text: ReactNode & ReactNode[];
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
  heading: ElementHeading[];
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
export interface ElementHeading extends ElementHeadingParams {
  type: ElementType.HEADING;
}
export interface ElementSpace extends DefaultElementParams {
  type: ElementType.SPACE;
}

export type Element =
  | ElementImage
  | ElementTweet
  | ElementSpace
  | ElementCodeBlock
  | ElementHeading;

type ElementData =
  | ImgData
  | TweetData
  | SpaceData
  | CodeBlockData
  | HeadingData;

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
  Heading: {
    data: HeadingData | undefined;
    ignore: boolean;
  };
  Response: {
    data: ElementData | undefined;
    ignore: boolean;
  };
}
