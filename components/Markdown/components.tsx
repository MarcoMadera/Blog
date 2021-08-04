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
  Youtube,
} from "../tags";
import slugify from "react-slugify";
import useDarkMode from "hooks/useDarkMode";
import Tweet from "../Tweet";
import Colors from "../Colors";
import Font from "../Font";
import ActionButton from "../ActionButton";
import ActionAnchor from "../ActionAnchor";
import useImage from "hooks/useImage";
import {
  NormalComponents,
  ReactBaseProps,
  ReactMarkdownProps,
  SpecialComponents,
} from "react-markdown/src/ast-to-react";
import { ReactNode, ReactPortal } from "react";
import { imageCloudProvider } from "site.config";

type BasicComponent = (props: ReactBaseProps & ReactMarkdownProps) => ReactNode;

export type CustomComponents = {
  usefont: BasicComponent;
  videogif: BasicComponent;
  colors: BasicComponent;
  tweet: BasicComponent;
  youtube: BasicComponent;
  actionanchor: BasicComponent;
  actionbutton: BasicComponent;
};

export const components:
  | Partial<NormalComponents & SpecialComponents & CustomComponents>
  | undefined = {
  p: function ParagraphMd({ node, children }) {
    const allowedChildren = {
      tags: ["dfn", "abbr", "i", "em", "code", "a", "strong", "delete"],
    };
    const style = node.properties?.style as string;
    const tagName = node.children[0].tagName as string;

    const camelize = (string: string) =>
      string.replace(/-([a-z])/gi, (_, group) => group.toUpperCase());
    return allowedChildren.tags.includes(tagName) ||
      node.children[0].type === "text" ? (
      <p
        style={
          style
            ? style
                .split(";")
                .filter((s) => s.length)
                .reduce((a: Record<string, string>, b) => {
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
    const link = href as string;
    const title = node.title as string;
    return (
      <A
        target={link.startsWith("#") ? "_self" : "_blank"}
        title={title}
        rel={link.startsWith("#") ? undefined : "noopener noreferrer"}
        href={link}
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
    const src = node.properties?.src as string;
    const name = node.properties?.name as string;

    return <Font src={src} name={name} />;
  },
  videogif: function VideoGifNode({ node }) {
    return (
      <Video
        src={node.properties?.src as string}
        dark={node.properties?.dark as string}
        light={node.properties?.light as string}
        title={node.properties?.title as string}
        muted
        loop
        autoPlay
        playsInline
      />
    );
  },
  youtube: function YoutubeVideoNode({ node }) {
    const id = node.properties?.id as string;
    const caption =
      (node.properties?.caption as string) || (node.children[0] as ReactNode);
    const title = node.properties?.title as string;

    return <Youtube id={id} caption={caption} title={title} />;
  },
  input: function InputNode(props) {
    return <Input type={props.node.type} {...props} />;
  },
  tweet: function TweetNode({ node }) {
    const hprop = node.properties?.hideconversation;
    const hideConversation = hprop === undefined ? false : hprop !== "false";

    return (
      <Tweet
        id={node.properties?.id as string}
        hideConversation={hideConversation}
        caption={
          (node.properties?.caption as string) ||
          (node.children[0] as ReactNode)
        }
      />
    );
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
          className?.replace("language-", "") ||
          (node.properties?.dataLang as string)
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
    if (!children) {
      return null;
    }
    const liChild = children[1] as ReactPortal;
    return (
      <Li checked={checked}>
        {node.children[1]?.tagName === "p"
          ? liChild?.props?.children
          : children?.map((el) => {
              const element = el as ReactPortal;
              return element?.props?.type === "checkbox" ? null : el;
            })}
      </Li>
    );
  },
  img: function ImageMD({ node }) {
    const { darkMode } = useDarkMode();
    const regularImage = node.properties?.src as string;
    const darkImage = node.properties?.dark as string;
    const lightImage = node.properties?.light as string;
    const src = (darkMode ? darkImage : lightImage) || regularImage;

    const isFromCloudProvider = src.startsWith(imageCloudProvider);

    const myLoader = (src: string) => {
      const rest = `${src.replace(
        new RegExp(
          `${imageCloudProvider.replace(/[.*+?^${}()|/[\]\\]/g, "\\$&")}.+?(/)`,
          "g"
        ),
        ""
      )}`;
      return `${imageCloudProvider}/c_limit/${rest}`;
    };
    const { data } = useImage({
      normal: src,
      full: isFromCloudProvider ? myLoader(src) : undefined,
    });
    const classNames = node.properties?.className as string[];

    if (classNames?.includes("twemoji")) {
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      return <img {...node.properties} />;
    }
    if (node.properties?.caption) {
      return (
        <figure>
          <Img
            src={src}
            blurDataURL={data?.base64}
            width={data?.img.width}
            height={data?.img.height}
            fullImage={data?.fullImg}
            {...node.properties}
          />
          <figcaption>{node.properties.caption}</figcaption>
          <style jsx>{`
            figcaption {
              font-size: 14px;
              text-align: center;
              margin: 10px 10% 20px;
            }
          `}</style>
        </figure>
      );
    }

    return (
      <Img
        src={src}
        blurDataURL={data?.base64}
        width={data?.img.width}
        height={data?.img.height}
        fullImage={data?.fullImg}
        {...node.properties}
      />
    );
  },
  actionanchor: function ActionAnchorNode({ node, children }) {
    const href = node.properties?.href as string;
    return (
      <ActionAnchor href={href} {...node.properties}>
        {children}
      </ActionAnchor>
    );
  },
  actionbutton: function ActionButtonNode({ node, children }) {
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
  h1: function Heading1Md({ children }) {
    return <H2>{children}</H2>;
  },
  h2: function Heading2Md({ children }) {
    return <H2 id={slugify(children)}>{children}</H2>;
  },
};
