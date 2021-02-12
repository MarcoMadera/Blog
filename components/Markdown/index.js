/* eslint-disable react/prop-types */
import gfm from "remark-gfm";
import htmlParser from "react-markdown/plugins/html-parser";
import ReactMarkdown from "react-markdown";

const _mapProps = (source, instructions, renderers) => ({
  source: source,
  escapeHtml: false,
  plugins: [gfm],
  renderers: renderers,
  astPlugins: [htmlParser(instructions)] || null,
});

export default function Markdown({ source, instructions, renderers }) {
  return <ReactMarkdown {..._mapProps(source, instructions, renderers)} />;
}
