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
  fullImg: Omit<ImgData, "fullImg"> | null;
}

export interface CodeBlockData {
  result: unknown;
  language: string | undefined;
}

export type Tweets = Record<string, TweetData>;
export type Images = Record<string, ImgData>;
export type CodeBlocks = Record<string, CodeBlockData>;

export interface PostWithMedia extends Post {
  tweets: Tweets;
  images: Images;
  codeBlocks: CodeBlocks;
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
