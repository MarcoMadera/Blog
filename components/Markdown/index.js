/* eslint-disable react/prop-types */
import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { components } from "./components";
export default function Markdown({ source, html }) {
  return (
    <ReactMarkdown
      rehypePlugins={html ? [rehypeRaw] : undefined}
      remarkPlugins={[[gfm]]}
      components={components}
      disallowedElements={["script"]}
    >
      {source}
    </ReactMarkdown>
  );
}
