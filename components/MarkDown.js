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
      shouldProcessNode: (node) => node.type === "tag" && node.name === "tweet",
      processNode: function Tweets(node) {
        return (
          <iframe
            border="0"
            frameBorder="0"
            width="550"
            height={node.attribs.height || 250}
            src={`https://platform.twitter.com/embed/index.html?dnt=false&embedId=twitter-widget-0&frame=false&hideCard=false&hideThread=false&id=${node.attribs.src}&lang=en&origin=https://marcomadera.com/&theme=light&widgetsVersion=ed20a2b%3A1601588405575&width=550px`}
            title={node.attribs.title}
          ></iframe>
        );
      },
    },
    {
      shouldProcessNode: (node) =>
        node.type === "tag" && node.name === "youtube",
      processNode: function Tweets(node) {
        return (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube-nocookie.com/embed/${node.attribs.src}`}
            title={node.attribs.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ maxWidth: 100 + "%" }}
          ></iframe>
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
