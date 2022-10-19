import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { components } from "./components";
import { ReactElement } from "react";

type Username = string;
export type MarkdownType = "post" | `comment-${Username}` | "microMemory";

interface MarkdownProps {
  source: string;
  html?: boolean;
  type: MarkdownType;
}

interface Child {
  tagName: string;
  children: Child[];
  data: {
    meta: string;
  };
  properties: {
    className: string[];
    meta?: string;
  };
}

export default function Markdown({
  source,
  html,
  type,
}: MarkdownProps): ReactElement {
  return (
    <ReactMarkdown
      rehypePlugins={
        html
          ? [
              () => (tree: Child) => {
                const children = tree.children;

                children.forEach((child) => {
                  if (
                    child.tagName === "pre" &&
                    child.children[0]?.tagName === "code" &&
                    child.children[0].data?.meta
                  ) {
                    child.children[0].properties = {
                      ...child.children[0]?.properties,
                      meta: child.children[0].data.meta,
                    };
                  }
                });

                return tree;
              },
              rehypeRaw,
            ]
          : undefined
      }
      remarkPlugins={[[gfm]]}
      components={components}
      disallowedElements={["script", "head", "meta"]}
      remarkRehypeOptions={{
        footnoteBackLabel: "Volver al contenido",
        footnoteLabel: "Referencias",
        clobberPrefix: type,
      }}
    >
      {source}
    </ReactMarkdown>
  );
}
