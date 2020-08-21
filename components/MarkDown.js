import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from "remark-math";
import MathJax from "react-mathjax";
import slugify from "react-slugify";
import styles from "./styles/Aside.module.css";
const _mapProps = (props) => ({
  ...props,
  escapeHtml: false,
  plugins: [RemarkMathPlugin],
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

    // eslint-disable-next-line react/prop-types
    heading: function Heading({ children }) {
      // eslint-disable-next-line react/prop-types
      return <h2 id={slugify(children[0].value)}>{children}</h2>;
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
