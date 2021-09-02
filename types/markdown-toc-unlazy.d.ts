interface tocResul {
  tokens: {
    type: string;
    tight?: boolean;
    lines?: unknown[];
    level?: number;
    content?: string;
    children?: unknown[];
    i?: number;
    seen?: number;
    slug?: string;
  }[];
  json: {
    content: string;
    slug: string;
    lvl: number;
    i: number;
    seen: number;
  }[];
  content: string;
}

declare module "markdown-toc-unlazy" {
  export default function toc(
    str: string,
    options?: {
      firsth1?: number;
      linkify?: boolean;
    }
  ): tocResul;
}
