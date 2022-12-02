import {
  A,
  Blockquote,
  CodeBlock,
  Hr,
  Img,
  InlineCode,
  Li,
  P,
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
  Caption,
  ALink,
  H3,
} from "../tags";
import slugify from "react-slugify";
import useDarkMode from "hooks/useDarkMode";
import Tweet from "../Tweet";
import Colors from "../Colors";
import Font from "../Font";
import ActionButton from "../ActionButton";
import {
  ReactMarkdownProps,
  SpecialComponents,
} from "react-markdown/lib/ast-to-react";
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
import { NormalComponents } from "react-markdown/lib/complex-types";
import { convertInlineStylesToObject, convertParamsToObject } from "utils";
import SpaceTweet from "components/Tweet/SpaceTweet";
import { ElementType } from "types/posts";
import css from "styled-jsx/css";

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
  space: BasicComponent;
  captione: BasicComponent;
  youtube: BasicComponent;
  actionanchor: BasicComponent;
  actionbutton: BasicComponent;
  note: BasicComponent;
  section: BasicComponent;
};

interface ElementNodes {
  type: Element["type"];
  tagName?: Element["tagName"];
  properties?: Element["properties"];
  position?: Element["position"];
  children?: ElementNodes;
  value?: string | number;
  meta?: string | number;
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
    const child = node.children[0] as Element;
    const tagName = child?.tagName as string;
    const shouldBeInParagraph =
      allowedChildren.tags.includes(tagName) ||
      node.children[0].type === "text";
    const { data, ...properties } =
      (node.properties as
        | (Element["properties"] & {
            data: string;
          })
        | undefined) || {};

    const dataObject = convertParamsToObject(data || "");

    return shouldBeInParagraph ? (
      <P
        {...properties}
        {...dataObject}
        style={style ? convertInlineStylesToObject(style) : undefined}
      >
        {children}
      </P>
    ) : (
      <>{children}</>
    );
  },
  section: function SectionNode({
    children,
    node,
    ...attribs
  }: {
    children: ReactNode & ReactNode[];
    node: Element;
  }) {
    let footNotes = 0;
    const nodes: ElementNodes = node as unknown as ElementNodes;
    const classNames = nodes.properties?.className as string[] | undefined;
    if (classNames?.includes("footnotes")) {
      if (Array.isArray(nodes.children)) {
        const olElements: ElementNodes["children"] = nodes.children?.filter(
          (child) => child.tagName === "ol"
        )[0];
        if (Array.isArray(olElements?.children)) {
          const olChildren = olElements?.children?.filter(
            (child: { type: string } | undefined) => child?.type === "element"
          );
          footNotes = olChildren?.length || 0;
        }
      }
    }
    return (
      <section {...attribs}>
        {children}
        <style jsx>{`
          section > :global(ol) {
            column-width: ${footNotes > 2 ? "19em" : "initial"};
          }
        `}</style>
      </section>
    );
  },
  a: function LinkMd({ children, node, href, ...attribs }) {
    const link = href as string;
    let title =
      (node.properties?.title as string) ??
      (node.properties?.ariaLabel as string);
    if (node.properties && "dataFootnoteRef" in node.properties) {
      title = `Ir a la referencia ${children}`;
    }
    const isSelf = link.startsWith("#");

    return (
      <>
        {isSelf ? (
          <ALink href={link} target="_self" title={title} {...attribs}>
            {children}
          </ALink>
        ) : (
          <A
            target={"_blank"}
            title={title}
            rel={"noopener noreferrer"}
            href={link}
            {...attribs}
          >
            {children}
          </A>
        )}
      </>
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
    const caption = (node.properties?.caption as string) || node.children[0];
    const title = node.properties?.title as string;

    return <Youtube id={id} caption={caption as string} title={title} />;
  },
  input: function InputNode(props) {
    return <Input type={props.node.type} {...props} />;
  },
  captione: function CaptionNode({ node, children }) {
    const text = node.properties?.text as string;
    return <Caption>{text ?? children}</Caption>;
  },
  tweet: function TweetNode({ node }) {
    const hprop = node.properties?.hideconversation;
    const hideConversation = hprop === undefined ? false : hprop !== "false";
    const caption = (node.properties?.caption as string) || node.children[0];

    return (
      <Tweet
        id={node.properties?.id as string}
        hideConversation={hideConversation}
        caption={caption as string}
      />
    );
  },
  space: function SpaceNode({ node }) {
    const id = node.properties?.id as string;
    const { data, ignore } = useElementData({
      type: ElementType.SPACE,
      id: id,
    });
    if (ignore || !id) return null;
    return <SpaceTweet spaceTweet={data} />;
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
        meta={node.properties?.meta as string}
        mdCode={!!className}
        value={children}
        id={node.position?.start.offset as number}
      />
    );
  },
  blockquote: function BlockQuoteMd({ children, node }: ReactMarkdownProps) {
    const nodes: ElementNodes = node as unknown as ElementNodes;
    const nodeChildren = nodes.children;
    const blockData: ElementNodes["children"] = Array.isArray(nodeChildren)
      ? nodeChildren[1]?.children
      : undefined;
    if (!Array.isArray(blockData)) return <Blockquote>{children}</Blockquote>;
    const hasSource = blockData[blockData.length - 1].tagName === "a";
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
          <P>
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
          </P>
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
    if (!children || !Array.isArray(children)) return null;

    return (
      <Li checked={checked} {...node.properties}>
        {children.map((el) => {
          const element = el as ReactPortal;
          if (element?.props?.type === "checkbox") {
            return null;
          }
          return el;
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

    const { data, ignore } = useElementData({
      id: node.position?.start.offset?.toString() as string,
      type: ElementType.IMAGE,
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

    if (ignore) {
      return null;
    }

    const fullImage =
      lightImage && !darkMode
        ? data?.fullImg.lightImage
        : data?.fullImg.darkImage;

    const classNames = node.properties?.className as string[];
    const properties = node.properties as Element["properties"];

    const shouldIgnore = classNames?.includes("twemoji");

    if (shouldIgnore) {
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      return <img {...properties} />;
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
  h1: function Heading1Md({ children, node }) {
    useElementData({
      type: ElementType.HEADING,
      level: 1,
      id: node.position?.start.offset?.toString() as string,
      text: children,
    });
    return <H2>{children}</H2>;
  },
  h2: function Heading2Md({ children, node }) {
    useElementData({
      type: ElementType.HEADING,
      level: 2,
      id: node.position?.start.offset?.toString() ?? "ref-2",
      text: children,
    });
    return <H2 id={slugify(children)}>{children}</H2>;
  },
  h3: function Heading3Md({ children, node }) {
    useElementData({
      type: ElementType.HEADING,
      level: 3,
      id: node.position?.start.offset?.toString() ?? "ref-3",
      text: children,
    });
    return <H3 id={slugify(children)}>{children}</H3>;
  },
  style: function StyleNode({ children }) {
    const { styles } = css.resolve`
      ${children}
    `;
    return <>{styles}</>;
  },
};
