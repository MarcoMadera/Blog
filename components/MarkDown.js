import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from "remark-math";
import MathJax from "react-mathjax";
// import { BlockMath, InlineMath } from "react-katex";

const _mapProps = (props) => ({
  ...props,
  escapeHtml: false,
  plugins: [RemarkMathPlugin],
  renderers: {
    ...props.renderers,
    link: (props) => (
      <a href={props.href} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    ),
    // math: ({ value }) => <BlockMath>{value}</BlockMath>,
    // inlineMath: ({ value }) => <InlineMath>{value}</InlineMath>,
    math: ({ value }) => <MathJax.Node formula={value} />,
    inlineMath: ({ value }) => <MathJax.Node inline formula={value} />,
  },
});

const Markdown = (props) => (
  <MathJax.Provider input="tex">
    <ReactMarkdown {..._mapProps(props)} />
  </MathJax.Provider>
);

export default Markdown;
