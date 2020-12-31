/* eslint-disable react/prop-types */
import ReactMarkdown from "react-markdown";
import slugify from "react-slugify";
import htmlParser from "react-markdown/plugins/html-parser";
import React from "react";
import HtmlToReact from "html-to-react";
import gfm from "remark-gfm";
import Head from "next/head";
import { colors } from "../styles/theme";
import {
  A,
  Progress,
  Meter,
  InlineCode,
  Table,
  Th,
  Td,
  Img,
  Details,
  CodeBlock,
  Ul,
  Ol,
  Li,
  Video,
  Blockquote,
  Select,
  Input,
  Kbd,
  Abbr,
  Pre,
} from "../components/tags/";
import Colors from "../components/Colors";
import ActionAnchor from "./ActionAnchor";
import ActionButton from "./ActionButton";
import Tweet from "../components/tweet";
import { useContext } from "react";
import { ThemeContext } from "./Layout";
const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
const parseHtml = htmlParser({
  isValidNode: (node) => node.type !== "script",
  processingInstructions: [
    {
      shouldProcessNode: (node) =>
        node.type === "tag" && node.name === "videogif",
      processNode: function VideoGifs({ attribs }) {
        const { darkMode } = useContext(ThemeContext);
        return (
          <Video
            src={attribs.src ?? (darkMode ? attribs.dark : attribs.light)}
            title={attribs.title}
            muted
            loop
            autoPlay
            playsInline
          />
        );
      },
    },
    {
      shouldProcessNode: (node) => node.type === "tag" && node.name === "table",
      processNode: function Tab(_, children) {
        return <Table>{children}</Table>;
      },
    },
    {
      shouldProcessNode: (node) => node.type === "tag" && node.name === "th",
      processNode: function TabH({ attribs }, children) {
        return <Th {...attribs}>{children}</Th>;
      },
    },
    {
      shouldProcessNode: (node) => node.type === "tag" && node.name === "td",
      processNode: function TabD({ attribs }, children) {
        return <Td {...attribs}>{children}</Td>;
      },
    },
    {
      shouldProcessNode: (node) => node.type === "tag" && node.name === "pre",
      processNode: function PreC({ attribs }, children) {
        return <Pre {...attribs}>{children}</Pre>;
      },
    },
    {
      shouldProcessNode: (node) =>
        node.type === "tag" && node.name === "actionanchor",
      processNode: function ActAnchor({ attribs }, children) {
        return <ActionAnchor {...attribs}>{children}</ActionAnchor>;
      },
    },
    {
      shouldProcessNode: (node) =>
        node.type === "tag" && node.name === "actionbutton",
      processNode: function ActButton({ attribs }, children) {
        return <ActionButton {...attribs}>{children}</ActionButton>;
      },
    },
    {
      shouldProcessNode: (node) => node.type === "tag" && node.name === "ol",
      processNode: function OrderedList({ attribs }, children) {
        return <Ol {...attribs}>{children}</Ol>;
      },
    },
    {
      shouldProcessNode: (node) => node.type === "tag" && node.name === "ul",
      processNode: function UnorderedList({ attribs }, children) {
        return <Ul {...attribs}>{children}</Ul>;
      },
    },
    {
      shouldProcessNode: (node) => node.type === "tag" && node.name === "li",
      processNode: function ListItem({ attribs }, children, i) {
        return (
          <Li {...attribs} key={i}>
            {children}
          </Li>
        );
      },
    },
    {
      shouldProcessNode: (node) => node.type === "tag" && node.name === "video",
      processNode: function Clip({ attribs }) {
        return (
          <Video src={attribs.src} title={attribs.title} autoPlay controls />
        );
      },
    },
    {
      shouldProcessNode: (node) =>
        node.type === "style" &&
        node.name === "style" &&
        node.children.length > 0,
      processNode: function Style(_, children, i) {
        const styles = children[0];
        return (
          <div key={i}>
            <Head>
              <style>{styles}</style>
            </Head>
          </div>
        );
      },
    },
    {
      shouldProcessNode: (node) => node.type === "tag" && node.name === "meter",
      processNode: function metar(node, children) {
        return (
          <Meter
            min={node.attribs.min}
            max={node.attribs.max}
            value={node.attribs.value}
            low={node.attribs.low}
            high={node.attribs.high}
            optimum={node.attribs.optimum}
          >
            {children}
          </Meter>
        );
      },
    },
    {
      shouldProcessNode: (node) =>
        node.type === "tag" && node.name === "progress",
      processNode: function progressBar(node) {
        return <Progress max={node.attribs.max} value={node.attribs.value} />;
      },
    },
    {
      shouldProcessNode: (node) => node.type === "tag" && node.name === "a",
      processNode: function progressBar(node, children) {
        return (
          <A {...node.attribs} target="_blank" rel="noopener noreferrer">
            {children}
          </A>
        );
      },
    },
    {
      shouldProcessNode: (node) =>
        node.type === "tag" && node.name === "details",
      processNode: function Deta(_, children) {
        return <Details>{children}</Details>;
      },
    },
    {
      shouldProcessNode: (node) => node.type === "tag" && node.name === "code",
      processNode: function Deta({ attribs }, children, i) {
        return (
          <InlineCode {...attribs} key={i}>
            {children}
          </InlineCode>
        );
      },
    },
    {
      shouldProcessNode: (node) => node.type === "tag" && node.name === "input",
      processNode: function Deta({ attribs }) {
        return <Input {...attribs} />;
      },
    },
    {
      shouldProcessNode: (node) =>
        node.type === "tag" && node.name === "select",
      processNode: function Deta({ attribs }, children) {
        return <Select {...attribs}>{children}</Select>;
      },
    },
    {
      shouldProcessNode: (node) =>
        node.type === "tag" && node.name === "colors",
      processNode: function Color({ attribs }) {
        return <Colors {...attribs} />;
      },
    },
    {
      shouldProcessNode: (node) => node.type === "tag" && node.name === "kbd",
      processNode: function KeyBoard({ attribs }, children) {
        return <Kbd {...attribs}>{children}</Kbd>;
      },
    },
    {
      shouldProcessNode: (node) => node.type === "tag" && node.name === "image",
      processNode: function Images({ attribs }) {
        const { darkMode } = useContext(ThemeContext);
        return (
          <Img src={darkMode ? attribs.dark : attribs.light} {...attribs} />
        );
      },
    },
    {
      shouldProcessNode: (node) => node.type === "tag" && node.name === "abbr",
      processNode: function KeyBoard({ attribs }, children) {
        return <Abbr {...attribs}>{children}</Abbr>;
      },
    },
    {
      shouldProcessNode: (node) => node.type === "tag" && node.name === "tweet",
      processNode: function Tweets(node) {
        return <Tweet id={node.attribs.id} />;
      },
    },
    {
      shouldProcessNode: (node) =>
        node.type === "tag" && node.name === "dialog",
      processNode: function Tweets({ attribs }, children) {
        const { darkMode } = useContext(ThemeContext);
        return (
          <dialog {...attribs}>
            {children}
            <style jsx>{`
              dialog {
                background: ${darkMode
                  ? colors.dark_background
                  : colors.background};
                border-color: ${colors.primary};
                color: ${darkMode ? colors.dark_textColor : colors.textColor};
                margin: 0 auto;
                padding: 10px;
              }
            `}</style>
          </dialog>
        );
      },
    },
    {
      shouldProcessNode: (node) =>
        node.type === "tag" && node.name === "youtube",
      processNode: function Youtube(node) {
        return (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube-nocookie.com/embed/${node.attribs.id}`}
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

const _mapProps = (source) => ({
  source: source,
  escapeHtml: false,
  plugins: [gfm],
  astPlugins: [parseHtml],
  renderers: {
    paragraph: function Para({ node, children }) {
      if (
        node.children[0].type === "text" ||
        node.children[0].type === "link" ||
        node.children[0].type === "strong" ||
        node.children[0].type === "emphasis" ||
        node.children[0].type === "inlineCode" ||
        node.children[0].type === "delete" ||
        node.children[0].tag === "dfn" ||
        node.children[0].tag === "abbr" ||
        node.children[0].tag === "i" ||
        node.children[0].tag === "em"
      ) {
        return <p>{children}</p>;
      }
      return <>{children}</>;
    },
    link: function Link({ children, node, ...attribs }) {
      return (
        <A
          target="_blank"
          title={node.title}
          rel="noopener noreferrer"
          {...attribs}
        >
          {children}
        </A>
      );
    },
    thematicBreak: function Break() {
      return (
        <>
          <hr />
          <style jsx>{`
            hr {
              margin: 0.5em 0;
            }
          `}</style>
        </>
      );
    },
    inlineCode: function Inline({ children }) {
      return <InlineCode>{children}</InlineCode>;
    },
    blockquote: function BlokQuote({ children }) {
      return <Blockquote>{children}</Blockquote>;
    },
    list: function Lists({ ordered, children, depth }) {
      if (ordered) {
        return <Ol depth={depth}>{children}</Ol>;
      } else {
        return <Ul depth={depth}>{children}</Ul>;
      }
    },
    listItem: function ListsItems({ children, checked }) {
      return (
        <Li checked={checked}>
          {children[0].props.node && children[0].props.node.type === "paragraph"
            ? children[0].props.children
            : children}
        </Li>
      );
    },
    image: function Image({ src, alt, title, attribs }) {
      return <Img src={src} alt={alt} title={title} {...attribs} />;
    },
    table: function Tab({ children }) {
      return <Table>{children}</Table>;
    },
    tableCell: function ThTd({ isHeader, align, children }) {
      if (isHeader) {
        return <Th>{children}</Th>;
      } else {
        return <Td align={align}>{children}</Td>;
      }
    },
    heading: function HeadingRenderer(props) {
      if (props.level === 2) {
        return <h2 id={slugify(props.children)}>{props.children}</h2>;
      }

      const Heading = ReactMarkdown.renderers.heading;
      return <Heading {...props} />;
    },
    code: function CodeBlk({ language, value = "", node }) {
      return <CodeBlock language={language} value={value} meta={node.meta} />;
    },
  },
});

const Markdown = ({ source }) => {
  return <ReactMarkdown {..._mapProps(source)} />;
};

export default Markdown;
