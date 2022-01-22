import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { components } from "./components";
import { ReactElement } from "react";

type Username = string;
export type MarkdownType = "post" | `comment-${Username}`;

interface MarkdownProps {
  source: string;
  html?: boolean;
  type: MarkdownType;
}

export default function Markdown({
  source,
  html,
  type,
}: MarkdownProps): ReactElement {
  return (
    <ReactMarkdown
      rehypePlugins={html ? [rehypeRaw] : undefined}
      remarkPlugins={[[gfm]]}
      components={components}
      disallowedElements={["script", "head", "meta"]}
      remarkRehypeOptions={{
        footnoteBackLabel: "Volver al contenido",
        footnoteLabel: "Notas",
        clobberPrefix: type,
      }}
    >
      {source}
    </ReactMarkdown>
  );
}
