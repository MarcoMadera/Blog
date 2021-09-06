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
  Pre,
  Note,
} from "../tags";
import slugify from "react-slugify";
import useDarkMode from "hooks/useDarkMode";
import Tweet from "../Tweet";
import Colors from "../Colors";
import Font from "../Font";
import ActionButton from "../ActionButton";
import {
  NormalComponents,
  ReactMarkdownProps,
  SpecialComponents,
} from "react-markdown/src/ast-to-react";
import {
  ReactNode,
  ReactPortal,
  ClassAttributes,
  HTMLAttributes,
  ReactElement,
} from "react";
import useElementData from "hooks/useElementData";
import { Element } from "hast";
import {
  isImgFromCloudProvider,
  replaceUrlImgTransformations,
} from "utils/cloudProvider";

type BasicComponent = (
  props: ClassAttributes<HTMLElement> &
    HTMLAttributes<HTMLElement> &
    ReactMarkdownProps
) => ReactNode;

export type CustomComponents = {
  usefont: BasicComponent;
  videogif: BasicComponent;
  colors: BasicComponent;
  tweet: BasicComponent;
  youtube: BasicComponent;
  actionanchor: BasicComponent;
  actionbutton: BasicComponent;
  note: BasicComponent;
};

interface ElementNodes {
  type: Element["type"];
  tagName?: Element["tagName"];
  properties?: Element["properties"];
  position?: Element["position"];
  children?: ElementNodes;
  value?: string | number;
}

export const components:
  | Partial<
      Omit<NormalComponents, keyof SpecialComponents> &
        SpecialComponents &
        CustomComponents
    >
  | undefined = {
  p: function ParagraphMd({ node, children }) {
    const allowedChildren = {
      tags: ["dfn", "abbr", "i", "em", "code", "a", "strong", "delete"],
    };
    const style = node.properties?.style as string;
    const child = node.children[0] as unknown as Element;
    const tagName = child?.tagName as string;

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
    const title = node.properties?.title as string;

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
  abbr: function AbbreviationMd({ children, node }) {
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
  note: function NoteNode({ node, children }) {
    const nodes: ElementNodes = node as unknown as ElementNodes;
    const nodeChildren = nodes.children;
    const isInline = Array.isArray(nodeChildren)
      ? nodeChildren[0].value !== "\n"
      : false;
    const type = node.properties?.type as unknown as string;
    const title = node.properties?.title as unknown as string;
    return (
      <Note type={type} isInline={isInline} title={title}>
        {children}
      </Note>
    );
  },
  pre: function PreNode({ children }) {
    return <Pre>{children}</Pre>;
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
        id={node.position?.start.offset as number}
      />
    );
  },
  blockquote: function BlockQuoteMd({ children, node }: ReactMarkdownProps) {
    const nodes: ElementNodes = node as unknown as ElementNodes;
    const nodeChildren = nodes.children;
    const blockData = Array.isArray(nodeChildren)
      ? nodeChildren[1].children
      : undefined;
    const hasSource = Array.isArray(blockData)
      ? blockData[blockData.length - 1].tagName === "a"
      : false;
    const sourceHref = blockData[blockData.length - 1].properties?.href;
    const sourceChild = blockData[blockData.length - 1]?.children;
    const sourceName = Array.isArray(sourceChild)
      ? sourceChild[0]?.value
      : undefined;

    const childrenWithOutSource = blockData.map(
      (data: ElementNodes[], i: number) => {
        const d = children[1] as unknown as ReactElement;
        if (blockData.length - 1 !== i) {
          return data || Array.isArray(d) ? d.props.children[i] : null;
        }
      }
    );

    return (
      <Blockquote>
        {hasSource ? (
          <p>
            {childrenWithOutSource}{" "}
            <A
              classname="source"
              target="_blank"
              title={sourceName}
              rel="noopener noreferrer"
              href={sourceHref}
            >
              {sourceName}
            </A>
          </p>
        ) : (
          children
        )}
      </Blockquote>
    );
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
    const child = node.children[1] as unknown as Element;
    return (
      <Li checked={checked}>
        {child?.tagName === "p"
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
    const regularImage = node.properties?.src as string | undefined;
    const darkImage = node.properties?.dark as string | undefined;
    const lightImage = node.properties?.light as string | undefined;
    const src = (darkMode ? darkImage : lightImage) || regularImage;

    const isFromCloudProvider = isImgFromCloudProvider(src || "");

    function getFullImage(src: string) {
      return replaceUrlImgTransformations(src, "c_limit");
    }

    const { data } = useElementData({
      id: node.position?.start.offset?.toString() as string,
      type: "image",
      normal: src || "",
      full: {
        darkImage: isFromCloudProvider
          ? getFullImage(regularImage || darkImage || "")
          : undefined,
        lightImage: isFromCloudProvider
          ? getFullImage(lightImage || "")
          : undefined,
      },
    });

    const fullImage =
      lightImage && !darkMode
        ? data?.fullImg.lightImage
        : data?.fullImg.darkImage;

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
            fullImage={fullImage}
            {...node.properties}
          />
          <figcaption>{node.properties.caption}</figcaption>
          <style jsx>{`
            figcaption {
              font-size: 15px;
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
        fullImage={fullImage}
        {...node.properties}
      />
    );
  },
  actionanchor: function ActionAnchorNode({ node, children }) {
    const href = node.properties?.href as string;
    return (
      <ActionButton type="anchor" href={href} {...node.properties}>
        {children}
      </ActionButton>
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
  td: function TdMd({ style, children, node }) {
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
  th: function ThMd({ style, children, node }) {
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
