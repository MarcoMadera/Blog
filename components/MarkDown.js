/* eslint-disable react/prop-types */
import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from "remark-math";
import MathJax from "react-mathjax";
import slugify from "react-slugify";
import htmlParser from "react-markdown/plugins/html-parser";
import React from "react";
import HtmlToReact from "html-to-react";
const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
const parseHtml = htmlParser({
  isValidNode: (node) => node.type !== "script",
  processingInstructions: [
    {
      shouldProcessNode: (node) =>
        node.type === "tag" && node.name === "videogif",
      processNode: function VideoGifs(node) {
        return (
          <video
            src={node.attribs.src}
            title={node.attribs.title}
            muted
            loop
            autoPlay
            playsInline
          >
            Tu navegador no soporta vídeos
          </video>
        );
      },
    },
    {
      shouldProcessNode: function () {
        return true;
      },
      processNode: processNodeDefinitions.processDefaultNode,
    },
  ],
});

const _mapProps = (props) => ({
  ...props,
  escapeHtml: false,
  astPlugins: [parseHtml],
  plugins: [RemarkMathPlugin],
  unwrapDisallowed: false,
  renderers: {
    ...props.renderers,
    link: function Link({ href, children }) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
    image: function Image({ src, alt, title }) {
      return <img loading="lazy" src={src} alt={alt} title={title} />;
    },

    heading: function HeadingRenderer(props) {
      if (props.level === 2) {
        return <h2 id={slugify(props.children)}>{props.children}</h2>;
      }

      const Heading = ReactMarkdown.renderers.heading;
      return <Heading {...props} />;
    },
    math: function Math({ value }) {
      return <MathJax.Node formula={value} />;
    },
    inlineMath: function InlineMath({ value }) {
      return <MathJax.Node inline formula={value} />;
    },
  },
});

const Markdown = (props) => (
  <MathJax.Provider input="tex">
    <ReactMarkdown {..._mapProps(props)} />
  </MathJax.Provider>
);
export default Markdown;
