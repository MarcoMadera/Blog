/* eslint-disable react/prop-types */
import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from "remark-math";
import MathJax from "react-mathjax";
import slugify from "react-slugify";
import htmlParser from "react-markdown/plugins/html-parser";

const parseHtml = htmlParser({
  isValidNode: (node) => node.type !== "script",
});

const _mapProps = (props) => ({
  ...props,
  escapeHtml: false,
  astPlugins: [parseHtml],
  plugins: [RemarkMathPlugin],
  unwrapDisallowed: false,
  renderers: {
    ...props.renderers,
    // eslint-disable-next-line react/prop-types
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

    // eslint-disable-next-line react/prop-types
    heading: function HeadingRenderer(props) {
      if (props.level === 2) {
        return <h2 id={slugify(props.children)}>{props.children}</h2>;
      }

      const Heading = ReactMarkdown.renderers.heading;
      return <Heading {...props} />;
    },
    // eslint-disable-next-line react/prop-types
    math: function Math({ value }) {
      return <MathJax.Node formula={value} />;
    },
    // eslint-disable-next-line react/prop-types
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
