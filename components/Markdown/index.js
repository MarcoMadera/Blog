/* eslint-disable react/prop-types */
import gfm from "remark-gfm";
import htmlParser from "react-markdown/plugins/html-parser";
import ReactMarkdown from "react-markdown";

const _mapProps = (source, instructions, renderers, escapeHtml) => ({
  source: source,
  escapeHtml: escapeHtml,
  plugins: [gfm],
  renderers: renderers,
  astPlugins: [htmlParser(instructions)] || null,
});

export default function Markdown({
  source,
  instructions,
  renderers,
  escapeHtml,
}) {
  return (
    <ReactMarkdown
      {..._mapProps(source, instructions, renderers, escapeHtml)}
    />
  );
}
