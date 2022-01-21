import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { components } from "./components";
import { ReactElement } from "react";

interface MarkdownProps {
  source: string;
  html?: boolean;
}

export default function Markdown({
  source,
  html,
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
        clobberPrefix: "",
      }}
    >
      {source}
    </ReactMarkdown>
  );
}
