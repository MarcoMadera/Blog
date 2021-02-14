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
  Th,
  Ul,
  H3,
} from "../../../tags";

export const renderers = {
  paragraph: function ParagraphMd({ node, children }) {
    const allowedChildren = {
      types: ["text", "link", "strong,", "emphasis", "inlineCode", "delete"],
      tags: ["dfn", "abbr", "i", "em", "u"],
    };
    return allowedChildren.types.includes(node.children[0].type) ||
      allowedChildren.tags.includes(node.children[0].tag) ? (
      <p>{children}</p>
    ) : (
      <>{children}</>
    );
  },
  link: function LinkMd({ children, node, href, ...attribs }) {
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
  thematicBreak: function HorizontalRuleMd() {
    return <Hr />;
  },
  inlineCode: function InlineCodeMd({ children }) {
    return <InlineCode>{children}</InlineCode>;
  },
  blockquote: function BlockQuoteMd({ children }) {
    return <Blockquote>{children}</Blockquote>;
  },
  list: function ListsNode({ ordered, children, depth }) {
    if (ordered) {
      return <Ol depth={depth}>{children}</Ol>;
    } else {
      return <Ul depth={depth}>{children}</Ul>;
    }
  },
  listItem: function ListsItemMd({ children, checked }) {
    return (
      <Li checked={checked}>
        {children[0].props.node && children[0].props.node.type === "paragraph"
          ? children[0].props.children
          : children}
      </Li>
    );
  },
  image: function ImageMD({ src, alt, title, attribs }) {
    return <Img src={src} alt={alt} title={title} {...attribs} />;
  },
  table: function TableMd({ children }) {
    return <Table>{children}</Table>;
  },
  tableCell: function TableCellMd({ isHeader, align, children }) {
    if (isHeader) {
      return <Th>{children}</Th>;
    } else {
      return <Td align={align}>{children}</Td>;
    }
  },
  heading: function HeadingMd(props) {
    return <H3>{props.children}</H3>;
  },
  code: function CodeBlockMd({ language, value = "", node }) {
    return <CodeBlock language={language} value={value} meta={node.meta} />;
  },
};
