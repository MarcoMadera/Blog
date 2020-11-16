/* eslint-disable react/prop-types */
import ReactMarkdown from "react-markdown";
import slugify from "react-slugify";
import htmlParser from "react-markdown/plugins/html-parser";
import React from "react";
import HtmlToReact from "html-to-react";
import { siteMetadata } from "../site.config";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import gfm from "remark-gfm";
import codeStyles from "../styles/codeStyles";
import { colors } from "../styles/theme";
import Head from "next/head";
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
      shouldProcessNode: (node) => node.type === "tag" && node.name === "table",
      replaceChildren: true,
      processNode: function Table(_, children) {
        return (
          <>
            {children}
            <style global jsx>{`
              .blog table {
                margin: 5px auto;
                border-collapse: collapse;
                text-align: center;
                display: block;
                width: max-content;
                max-width: 100%;
                overflow: auto;
              }
              .blog th,
              .blog td {
                empty-cells: hide;
                border: 1px solid #aaa;
                font-weight: normal;
                padding: 5px 11px;
              }
            `}</style>
          </>
        );
      },
    },
    {
      shouldProcessNode: (node) =>
        node.type === "style" &&
        node.name === "style" &&
        node.children.length > 0,
      processNode: function Style(_, children) {
        const styles = children[0];
        return (
          <div>
            <Head>
              <style>{styles}</style>
            </Head>
          </div>
        );
      },
    },
    {
      shouldProcessNode: (node) => node.type === "tag" && node.name === "meter",
      processNode: function Meter(node) {
        return (
          <meter
            min={node.attribs.min}
            max={node.attribs.max}
            value={node.attribs.value}
            low={node.attribs.low}
            high={node.attribs.high}
            optimum={node.attribs.optimum}
          >
            {node.attribs.value}
            <style jsx>
              {`
                meter {
                  --background: ${colors.white};
                  display: block;
                  margin: 0 auto;
                  width: 100%;
                  -webkit-appearance: none;
                  appearance: meter;
                  -moz-appearance: none;
                  border: 1px solid #ccc;
                  border-radius: 10px;
                  background: none;
                  background-color: ${colors.white};
                }
                meter::-webkit-meter-bar {
                  background: none;
                  background-color: var(--background);
                  height: 18px;
                }
                meter::-moz-meter-bar {
                  background: none;
                  background-color: var(--background);
                }
                meter:-moz-meter-sub-sub-optimum::-moz-meter-bar {
                  border-radius: 10px;
                  background-image: linear-gradient(
                    90deg,
                    #dd2121 20%,
                    #dd4921 100%
                  );
                  background-size: 100% 100%;
                }
                meter::-webkit-meter-even-less-good-value {
                  background-image: linear-gradient(
                    90deg,
                    #dd2121 20%,
                    #dd4921 100%
                  );
                  background-size: 100% 100%;
                  border-radius: 10px;
                }
                meter:-moz-meter-sub-optimum::-moz-meter-bar {
                  border-radius: 10px;
                  background-image: linear-gradient(
                    90deg,
                    #dd2121 20%,
                    #dd2121 30%,
                    #df5535 40%,
                    #f2db34 60%,
                    #f2db34 100%
                  );
                  background-size: 100% 100%;
                }
                meter::-webkit-meter-suboptimum-value {
                  border-radius: 10px;
                  background-image: linear-gradient(
                    90deg,
                    #dd2121 20%,
                    #dd2121 30%,
                    #df5535 40%,
                    #f2db34 60%,
                    #f2db34 100%
                  );
                  background-size: 100% 100%;
                }
                meter:-moz-meter-optimum::-moz-meter-bar {
                  background-image: linear-gradient(
                    90deg,
                    #dd2121 20%,
                    #dd2121 30%,
                    #df5535 40%,
                    #f2db34 60%,
                    #f2db34 80%,
                    #72e13a 100%
                  );
                  background-size: 100% 100%;
                  border-radius: 10px;
                }
                meter::-webkit-meter-optimum-value {
                  border-radius: 10px;
                  background-image: linear-gradient(
                    90deg,
                    #dd2121 20%,
                    #dd2121 30%,
                    #df5535 40%,
                    #f2db34 60%,
                    #f2db34 80%,
                    #72e13a 100%
                  );
                  background-size: 100% 100%;
                }
              `}
            </style>
          </meter>
        );
      },
    },
    {
      shouldProcessNode: (node) =>
        node.type === "tag" && node.name === "progress",
      processNode: function Progress(node) {
        return (
          <progress max={node.attribs.max} value={node.attribs.value}>
            <style jsx>{`
              progress,
              progress[role] {
                appearance: none;
                -moz-appearance: none;
                -webkit-appearance: none;
                border: none;
                background-size: auto;
                width: 100%;
                border: 1px solid ${colors.gray};
                border-radius: 20px;
              }
              progress[role]:after {
                background-image: none;
              }
              progress[role] strong {
                display: none;
              }
              progress,
              progress[role][aria-valuenow] {
                background: unset !important;
              }
              progress::-webkit-progress-bar {
                background: unset;
              }
              progress {
                color: ${colors.primary};
                border-radius: 20px;
              }
              progress::-moz-progress-bar {
                background: ${colors.primary};
                border-radius: 20px;
              }
              progress::-webkit-progress-value {
                background: ${colors.primary};
                border-radius: 20px;
              }
              progress[aria-valuenow]:before {
                background: ${colors.primary};
                border-radius: 20px;
              }
            `}</style>
          </progress>
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
            src={`https://platform.twitter.com/embed/index.html?dnt=false&embedId=twitter-widget-0&frame=false&hideCard=false&hideThread=false&id=${node.attribs.id}&lang=en&origin=${siteMetadata.siteUrl}/&theme=light&widgetsVersion=ed20a2b%3A1601588405575&width=550px`}
            title={node.attribs.title}
          ></iframe>
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
  unwrapDisallowed: false,
  renderers: {
    link: function Link({ href, children, title }) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" title={title}>
          {children}
        </a>
      );
    },
    inlineCode: function InlineCode({ children }) {
      return (
        <code>
          {children}
          <style jsx>{`
            code {
              background: #f5f5f5;
              padding: 3px 6px;
              border-radius: 6px;
            }
          `}</style>
        </code>
      );
    },
    image: function Image({ src, alt, title }) {
      return (
        <>
          <img loading="lazy" src={src} alt={alt} title={title || alt} />
          <style jsx>{`
            img:hover {
              position: static;
              transform: scale(1.1);
            }
            img[alt$="100px"] {
              display: block;
              height: 100px;
            }
            img[alt$="ajustar izquierda 50px"] {
              display: block;
              height: 50px;
              float: left;
              margin: 10px;
            }
            img[alt$="ajustar derecha"] {
              display: block;
              float: right;
              margin: 10px;
            }
            img[alt$="ajustar derecha 200px"] {
              display: block;
              float: right;
              height: 300px;
              margin: 10px;
            }
            img[alt$="100px"] {
              display: block;
              height: 100px;
            }
          `}</style>
        </>
      );
    },
    table: function Table({ children }) {
      return (
        <table>
          {children}
          <style global jsx>{`
            .blog table {
              margin: 5px auto;
              border-collapse: collapse;
              text-align: center;
              display: block;
              width: max-content;
              max-width: 100%;
              overflow: auto;
            }
            .blog th,
            .blog td {
              empty-cells: hide;
              border: 1px solid #aaa;
              font-weight: normal;
              padding: 5px 11px;
            }
          `}</style>
        </table>
      );
    },
    heading: function HeadingRenderer(props) {
      if (props.level === 2) {
        return <h2 id={slugify(props.children)}>{props.children}</h2>;
      }

      const Heading = ReactMarkdown.renderers.heading;
      return <Heading {...props} />;
    },
    code: function CodeBlock({ language, value }) {
      const style = codeStyles[`${language}`] ?? undefined;
      return (
        <div style={{ position: "relative", margin: "20px 0" }}>
          <SyntaxHighlighter
            showLineNumbers={true}
            showInlineLineNumbers={false}
            wrapLines={false}
            language={language}
            useInlineStyles={false}
            lineNumberStyle={{ color: "#aaa", fontSize: "14px" }}
            codeTagProps={{ "data-lang": language }}
            PreTag={({ children }) => <pre>{children}</pre>}
          >
            {value}
          </SyntaxHighlighter>
          {style && (
            <style global jsx>
              {style}
            </style>
          )}
          {language && (
            <style global jsx>{`
              code[data-lang]::before {
                border-radius: 4px;
                color: rgba(0, 0, 0, 0.7);
                content: attr(data-lang);
                font-size: 12px;
                padding: 2px 8px;
                position: absolute;
                right: 8px;
                text-transform: uppercase;
                top: -11px;
                border: 1px solid #ccc;
                background: ${colors.white};
              }
              code[data-lang] {
                width: 100%;
              }
              code,
              pre {
                font-family: Roboto Mono, monospace;
                hyphens: none;
                line-height: 1.8;
                overflow: auto;
                tab-size: 4;
                text-align: left;
                white-space: pre;
                word-break: normal;
                word-spacing: normal;
                word-wrap: normal;
                font-size: 14px;
              }
              pre {
                display: block;
                border-radius: 10px;
                margin: 0.5em 0px;
                overflow: auto;
                padding: 0.8em 1em;
                border: 1px solid #ccc;
                color: rgb(36, 41, 46);
              }
              code span {
                font-family: monospace;
              }
            `}</style>
          )}
        </div>
      );
    },
  },
});

const Markdown = ({ source }) => <ReactMarkdown {..._mapProps(source)} />;
export default Markdown;
