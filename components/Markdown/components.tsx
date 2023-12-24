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
  Iframe,
} from "../tags";
import slugify from "react-slugify";
import useDarkMode from "hooks/useDarkMode";
import Tweet from "../Tweet";
import Colors from "../Colors";
import Font from "../Font";
import ActionButton from "../ActionButton";
import {
  ReactNode,
  ReactPortal,
  ReactElement,
  Children,
  isValidElement,
} from "react";
import useElementData from "hooks/useElementData";
import { Element } from "hast";
import {
  isImgFromCloudProvider,
  replaceUrlImgTransformations,
} from "utils/cloudProvider";
import { Components } from "react-markdown";
import { convertParamsToObject } from "utils";
import SpaceTweet from "components/Tweet/SpaceTweet";
import { ElementType } from "types/posts";
import css from "styled-jsx/css";

type ExtraProps = { node?: Element };

type BasicComponent = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > &
    ExtraProps
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

export const components: Partial<Components & CustomComponents> | undefined = {
  p: function ParagraphMd({ node, children, style }) {
    const allowedChildren = {
      tags: ["dfn", "abbr", "i", "em", "code", "a", "strong", "delete"],
    };
    const child =
      node?.children[0].type === "element" ? node.children[0] : null;
    const shouldBeInParagraph =
      allowedChildren.tags.includes(child?.tagName ?? "") ||
      node?.children[0].type === "text";
    const { data, ...properties } = node?.properties ?? {};

    const dataObject = convertParamsToObject(data ?? "");
    return shouldBeInParagraph ? (
      <P {...properties} {...dataObject} style={style}>
        {children}
      </P>
    ) : (
      <div>{children}</div>
    );
  },
  section: function SectionNode({ children, className, ...attribs }) {
    let footNotes = 0;
    if (className?.includes("footnotes")) {
      const olElement = Children.toArray(children).find(
        (child) => isValidElement(child) && child.props.node.tagName === "ol"
      );

      if (isValidElement(olElement)) {
        const liElements = Children.toArray(olElement.props.children).filter(
          (child) => isValidElement(child) && child.props.node.tagName === "li"
        );

        footNotes = liElements.length;
      }
    }

    return (
      <section className={className} {...attribs}>
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
    if (!node) return null;
    const link = href as string;
    let title = node.properties.title ?? node.properties.ariaLabel;
    if (node.properties && "dataFootnoteRef" in node.properties) {
      title = `Ir a la referencia ${children}`;
    }
    const isSelf = link.startsWith("#");

    if (isSelf) {
      return (
        <ALink
          href={link}
          target="_self"
          title={title?.toString()}
          {...attribs}
        >
          {children}
        </ALink>
      );
    }

    return (
      <A
        target={"_blank"}
        title={title?.toString()}
        rel={"noopener noreferrer"}
        href={link}
        {...attribs}
        ref={undefined}
      >
        {children}
      </A>
    );
  },
  hr: function HorizontalRuleMd() {
    return <Hr />;
  },
  abbr: function AbbreviationMd({ children, node }) {
    return <Abbr {...node?.properties}>{children}</Abbr>;
  },
  usefont: function UseFont({ node }) {
    if (!node) return null;
    const src = node.properties?.src as string;
    const name = node.properties?.name as string;

    return <Font src={src} name={name} />;
  },
  videogif: function VideoGifNode({ node }) {
    if (!node) return null;
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
    if (!node) return null;
    const id = node.properties?.id as string;
    const caption = (node.properties?.caption as string) || node.children[0];
    const title = node.properties?.title as string;

    return <Youtube id={id} caption={caption as string} title={title} />;
  },
  input: function InputNode(props) {
    return <Input type={props.node?.type} {...props} />;
  },
  captione: function CaptionNode({ node, children }) {
    if (!node) return null;
    const text = node.properties?.text as string;
    return <Caption>{text ?? children}</Caption>;
  },
  tweet: function TweetNode({ node }) {
    if (!node) return null;
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
    const id = node?.properties?.id as string;
    const { data, ignore } = useElementData({
      type: ElementType.SPACE,
      id: id,
    });
    if (ignore || !id) return null;
    return <SpaceTweet spaceTweet={data} />;
  },
  note: function NoteNode({ node, children }) {
    const inline = typeof node?.properties?.inline === "string";
    return (
      <Note {...node?.properties} inline={inline}>
        {children}
      </Note>
    );
  },
  pre: function PreNode({ children }) {
    return <Pre>{children}</Pre>;
  },
  colors: function ColorsNode({ node }) {
    return <Colors {...node?.properties} />;
  },
  dialog: function DialogNode({ node, children }) {
    return <Dialog {...node?.properties}>{children}</Dialog>;
  },
  select: function SelectNode({ node, children }) {
    return <Select {...node?.properties}>{children}</Select>;
  },
  code: function CodeMd({ children, className, node }) {
    const match = /language-(\w+)/.exec(className ?? "");
    const dataLang = node?.properties.dataLang;
    if (!node) return null;
    return !match && !dataLang ? (
      <InlineCode>{children}</InlineCode>
    ) : (
      <CodeBlock
        language={
          className?.replace("language-", "") ??
          (node.properties?.dataLang as string)
        }
        meta={node.properties?.meta as string}
        mdCode={!!className}
        value={children}
        id={node.position?.start.offset as number}
      />
    );
  },
  blockquote: function BlockQuoteMd({ children, node }) {
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
        const d = (children as unknown as ReactElement[])[1];
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
  ol: function OlNode({ children }) {
    return <Ol>{children}</Ol>;
  },
  ul: function UlNode({ children }) {
    return <Ul>{children}</Ul>;
  },
  li: function ListsItemMd({ children, node }) {
    if (!children || !node) return null;
    let checked;
    Children.forEach(children, (child) => {
      if (!isValidElement(child)) return;
      if (child.props.type === "checkbox") {
        checked = !!child.props.checked;
      }
    });

    return (
      <Li checked={checked} {...node.properties}>
        {Array.isArray(children)
          ? children.map((el) => {
              const element = el as ReactPortal;
              if (element?.props?.type === "checkbox") {
                return null;
              }
              return el;
            })
          : children}
      </Li>
    );
  },
  img: function ImageMD({ node }) {
    const { darkMode } = useDarkMode();
    const regularImage = node?.properties?.src as string | undefined;
    const darkImage = node?.properties?.dark as string | undefined;
    const lightImage = node?.properties?.light as string | undefined;
    const src = (darkMode ? darkImage : lightImage) ?? regularImage;

    const isFromCloudProvider = isImgFromCloudProvider(src ?? "");

    function getFullImage(src: string) {
      return replaceUrlImgTransformations(src, "c_limit");
    }

    const { data, ignore } = useElementData({
      id: node?.position?.start.offset?.toString() as string,
      type: ElementType.IMAGE,
      normal: src ?? "",
      full: {
        darkImage: isFromCloudProvider
          ? getFullImage(regularImage ?? darkImage ?? "")
          : undefined,
        lightImage: isFromCloudProvider
          ? getFullImage(lightImage ?? "")
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

    const classNames = node?.properties?.className as string[];
    const properties = node?.properties as Element["properties"];

    const shouldIgnore = classNames?.includes("twemoji");

    if (shouldIgnore) {
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      return <img alt="" {...properties} />;
    }
    if (node?.properties?.caption) {
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
        {...node?.properties}
      />
    );
  },
  actionanchor: function ActionAnchorNode({ node, children }) {
    const href = node?.properties?.href as string;
    return (
      <ActionButton type="anchor" href={href} {...node?.properties}>
        {children}
      </ActionButton>
    );
  },
  actionbutton: function ActionButtonNode({ node, children }) {
    return <ActionButton {...node?.properties}>{children}</ActionButton>;
  },
  details: function DetailsMd({ children }) {
    return <Details>{children}</Details>;
  },
  table: function TableMd({ children }) {
    return <Table>{children}</Table>;
  },
  td: function TdMd({ style, children, node }) {
    return (
      <Td style={style} {...node?.properties}>
        {children}
      </Td>
    );
  },
  meter: function MeterMd({ children, node }) {
    return <Meter {...node?.properties}>{children}</Meter>;
  },
  kbd: function KbdMd({ children, node }) {
    return <Kbd {...node?.properties}>{children}</Kbd>;
  },
  progress: function ProgressNode({ node }) {
    return <Progress {...node?.properties} />;
  },
  th: function ThMd({ style, children, node }) {
    return (
      <Th style={style} {...node?.properties}>
        {children}
      </Th>
    );
  },
  h1: function Heading1Md({ children, node }) {
    useElementData({
      type: ElementType.HEADING,
      level: 1,
      id: node?.position?.start.offset?.toString() as string,
      text: children,
    });
    return <H2>{children}</H2>;
  },
  h2: function Heading2Md({ children, node }) {
    useElementData({
      type: ElementType.HEADING,
      level: 2,
      id: node?.position?.start.offset?.toString() ?? "ref-2",
      text: children,
    });
    return <H2 id={slugify(children)}>{children}</H2>;
  },
  h3: function Heading3Md({ children, node }) {
    useElementData({
      type: ElementType.HEADING,
      level: 3,
      id: node?.position?.start.offset?.toString() ?? "ref-3",
      text: children,
    });
    return <H3 id={slugify(children)}>{children}</H3>;
  },
  style: function StyleNode({ children }) {
    const { styles } = css.resolve`
      ${children}
    `;
    return styles;
  },
  iframe: function IframeNode({ node }) {
    return (
      <Iframe
        {...node?.properties}
        title={node?.properties?.title as string}
      ></Iframe>
    );
  },
};
