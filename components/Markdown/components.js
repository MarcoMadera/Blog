/* eslint-disable react/prop-types */
import {
  A,
  Blockquote,
  CodeBlock,
  Hr,
  Img,
  InlineCode,
  Li,
  Ol,
  Table,
  Td,
  Kbd,
  Th,
  Ul,
  H2,
  Input,
  Meter,
  Progress,
  Details,
  Abbr,
  Dialog,
  Select,
  Video,
} from "../tags";
import slugify from "react-slugify";
import useDarkMode from "../../hooks/useDarkMode";
import Tweet from "../Tweet";
import Colors from "../Colors";
import Font from "../Font";
import ActionButton from "../ActionButton";
import ActionAnchor from "../ActionAnchor";

export const components = {
  p: function ParagraphMd({ node, children }) {
    const allowedChildren = {
      tags: ["dfn", "abbr", "i", "em", "code", "a", "strong", "delete"],
    };
    const style = node.properties.style;
    const camelize = (string) =>
      string.replace(/-([a-z])/gi, (_, group) => group.toUpperCase());
    return allowedChildren.tags.includes(node.children[0].tagName) ||
      node.children[0].type === "text" ? (
      <p
        style={
          style
            ? style
                .split(";")
                .filter((s) => s.length)
                .reduce((a, b) => {
                  const keyValue = b.split(":");
                  a[camelize(keyValue[0])] = keyValue[1];
                  return a;
                }, {})
            : undefined
        }
      >
        {children}
      </p>
    ) : (
      <>{children}</>
    );
  },
  a: function LinkMd({ children, node, href, ...attribs }) {
    return (
      <A
        target={href.startsWith("#") ? "_self" : "_blank"}
        title={node.title}
        rel={href.startsWith("#") ? undefined : "noopener noreferrer"}
        href={href}
        {...attribs}
      >
        {children}
      </A>
    );
  },
  hr: function HorizontalRuleMd() {
    return <Hr />;
  },
  abbr: function HorizontalRuleMd({ children, node }) {
    return <Abbr {...node.properties}>{children}</Abbr>;
  },
  usefont: function UseFont({ node }) {
    return <Font src={node.properties.src} name={node.properties.name} />;
  },
  videogif: function VideoGifNode({ node }) {
    return (
      <Video
        src={node.properties.src}
        dark={node.properties.dark}
        light={node.properties.light}
        title={node.properties.title}
        muted
        loop
        autoPlay
        playsInline
      />
    );
  },
  youtube: function YoutubeVideoNode({ node }) {
    return (
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube-nocookie.com/embed/${node.properties.id}`}
        title={node.properties.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ maxWidth: 100 + "%" }}
      ></iframe>
    );
  },
  input: function InputNode(props) {
    return <Input {...props} />;
  },
  tweet: function TweetNode({ node }) {
    return <Tweet id={node.properties.id} caption={node.properties.caption} />;
  },
  pre: function PreNode({ children }) {
    return <>{children}</>;
  },
  colors: function PreNode({ node }) {
    return <Colors {...node.properties} />;
  },
  dialog: function DialogNode({ node, children }) {
    return <Dialog {...node.properties}>{children}</Dialog>;
  },
  select: function SelectNode({ node, children }) {
    return <Select {...node.properties}>{children}</Select>;
  },
  code: function CodeMd({ children, inline, className, node }) {
    return inline ? (
      <InlineCode>{children}</InlineCode>
    ) : (
      <CodeBlock
        language={
          className?.replace("language-", "") || node.properties?.dataLang
        }
        mdCode={!!className}
        value={children}
      />
    );
  },
  blockquote: function BlockQuoteMd({ children }) {
    return <Blockquote>{children}</Blockquote>;
  },
  ol: function OlNode({ children, depth }) {
    return <Ol depth={depth}>{children}</Ol>;
  },
  ul: function UlNode({ children, depth }) {
    return <Ul depth={depth}>{children}</Ul>;
  },
  li: function ListsItemMd({ children, checked, node }) {
    return (
      <Li checked={checked}>
        {node.children[1]?.tagName === "p"
          ? children[1]?.props?.children
          : children?.map((el) => {
              return el.props?.type === "checkbox" ? null : el;
            })}
      </Li>
    );
  },
  img: function ImageMD(props) {
    const { darkMode } = useDarkMode();
    if (props.className === "twemoji") {
      // eslint-disable-next-line jsx-a11y/alt-text
      return <img {...props.node.properties} />;
    }
    return <Img src={darkMode ? props.dark : props.light} {...props} />;
  },
  actionanchor: function ActionAnchorNode({ node, children }) {
    return <ActionAnchor {...node.properties}>{children}</ActionAnchor>;
  },
  actionbutton: function ActionAnchorNode({ node, children }) {
    return <ActionButton {...node.properties}>{children}</ActionButton>;
  },
  details: function DetailsMd({ children }) {
    return <Details>{children}</Details>;
  },
  table: function TableMd({ children }) {
    return <Table>{children}</Table>;
  },
  td: function ThMd({ style, children, node }) {
    return (
      <Td style={style} {...node.properties}>
        {children}
      </Td>
    );
  },
  meter: function MeterMd({ children, node }) {
    return <Meter {...node.properties}>{children}</Meter>;
  },
  kbd: function KbdMd({ children, node }) {
    return <Kbd {...node.properties}>{children}</Kbd>;
  },
  progress: function ProgressNode({ node }) {
    return <Progress {...node.properties} />;
  },
  th: function TdMd({ style, children, node }) {
    return (
      <Th style={style} {...node.properties}>
        {children}
      </Th>
    );
  },
  h1: function HeadingMd({ children }) {
    return <H2>{children}</H2>;
  },
  h2: function HeadingMd({ children }) {
    return <H2 id={slugify(children)}>{children}</H2>;
  },
};
