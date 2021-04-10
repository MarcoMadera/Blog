import {
  A,
  Abbr,
  Details,
  Dialog,
  Img,
  InlineCode,
  Input,
  Kbd,
  Li,
  Meter,
  Ol,
  Pre,
  Progress,
  Select,
  Table,
  Td,
  Th,
  Ul,
  Video,
} from "../../../tags";
import ActionAnchor from "../../../ActionAnchor";
import ActionButton from "../../../ActionButton";
import Colors from "../../../Colors";
import HtmlToReact from "html-to-react";
import React from "react";
import Head from "next/head";
import Tweet from "../../../Tweet";
import useDarkMode from "../../../../hooks/useDarkMode";

/* eslint-disable react/prop-types */
const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);

export const instructions = {
  isValidNode: ({ type }) => type !== "script",
  processingInstructions: [
    {
      shouldProcessNode: ({ type, name }) =>
        type === "tag" && name === "videogif",
      processNode: function VideoGifNode({ attribs }) {
        return (
          <Video
            src={attribs.src}
            dark={attribs.dark}
            light={attribs.light}
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
      shouldProcessNode: ({ type, name }) => type === "tag" && name === "table",
      processNode: function TableNode(_, children) {
        return <Table>{children}</Table>;
      },
    },
    {
      shouldProcessNode: ({ type, name }) => type === "tag" && name === "th",
      processNode: function TableHeaderNode({ attribs }, children) {
        return <Th {...attribs}>{children}</Th>;
      },
    },
    {
      shouldProcessNode: ({ type, name }) => type === "tag" && name === "td",
      processNode: function TableDataNode({ attribs }, children) {
        return <Td {...attribs}>{children}</Td>;
      },
    },
    {
      shouldProcessNode: ({ type, name }) => type === "tag" && name === "pre",
      processNode: function PreformatedNode({ attribs }, children) {
        return <Pre {...attribs}>{children}</Pre>;
      },
    },
    {
      shouldProcessNode: ({ type, name }) =>
        type === "tag" && name === "actionanchor",
      processNode: function ActionAnchorNode({ attribs }, children) {
        return <ActionAnchor {...attribs}>{children}</ActionAnchor>;
      },
    },
    {
      shouldProcessNode: ({ type, name }) =>
        type === "tag" && name === "actionbutton",
      processNode: function ActionButtonNode({ attribs }, children) {
        return <ActionButton {...attribs}>{children}</ActionButton>;
      },
    },
    {
      shouldProcessNode: ({ type, name }) => type === "tag" && name === "ol",
      processNode: function OrderedListNode({ attribs }, children) {
        return <Ol {...attribs}>{children}</Ol>;
      },
    },
    {
      shouldProcessNode: ({ type, name }) => type === "tag" && name === "ul",
      processNode: function UnorderedListNode({ attribs }, children) {
        return <Ul {...attribs}>{children}</Ul>;
      },
    },
    {
      shouldProcessNode: ({ type, name }) => type === "tag" && name === "li",
      processNode: function ListItemNode({ attribs }, children, i) {
        return (
          <Li {...attribs} key={i}>
            {children}
          </Li>
        );
      },
    },
    {
      shouldProcessNode: ({ type, name }) => type === "tag" && name === "video",
      processNode: function VideoNode({ attribs }) {
        return (
          <Video src={attribs.src} title={attribs.title} autoPlay controls />
        );
      },
    },
    {
      shouldProcessNode: ({ type, name, children }) =>
        type === "style" && name === "style" && children.length > 0,
      processNode: function StyleNode(_, children, i) {
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
      shouldProcessNode: ({ type, name }) => type === "tag" && name === "meter",
      processNode: function MeterNode({ attribs }, children) {
        return (
          <Meter
            min={attribs.min}
            max={attribs.max}
            value={attribs.value}
            low={attribs.low}
            high={attribs.high}
            optimum={attribs.optimum}
          >
            {children}
          </Meter>
        );
      },
    },
    {
      shouldProcessNode: ({ type, name }) =>
        type === "tag" && name === "progress",
      processNode: function ProgressBarNode({ attribs }) {
        return <Progress max={attribs.max} value={attribs.value} />;
      },
    },
    {
      shouldProcessNode: ({ type, name }) => type === "tag" && name === "a",
      processNode: function AnchorNode({ attribs }, children) {
        return (
          <A {...attribs} target="_blank" rel="noopener noreferrer">
            {children}
          </A>
        );
      },
    },
    {
      shouldProcessNode: ({ type, name }) =>
        type === "tag" && name === "details",
      processNode: function DetailsNode(_, children) {
        return <Details>{children}</Details>;
      },
    },
    {
      shouldProcessNode: ({ type, name }) => type === "tag" && name === "code",
      processNode: function InlineCodeNode({ attribs }, children, i) {
        return (
          <InlineCode {...attribs} key={i}>
            {children}
          </InlineCode>
        );
      },
    },
    {
      shouldProcessNode: ({ type, name }) => type === "tag" && name === "input",
      processNode: function InputNode({ attribs }) {
        return <Input {...attribs} />;
      },
    },
    {
      shouldProcessNode: ({ type, name }) =>
        type === "tag" && name === "select",
      processNode: function SelectNode({ attribs }, children) {
        return <Select {...attribs}>{children}</Select>;
      },
    },
    {
      shouldProcessNode: ({ type, name }) =>
        type === "tag" && name === "colors",
      processNode: function ColorsNode({ attribs }) {
        return <Colors {...attribs} />;
      },
    },
    {
      shouldProcessNode: ({ type, name }) => type === "tag" && name === "kbd",
      processNode: function KeyBoard({ attribs }, children) {
        return <Kbd {...attribs}>{children}</Kbd>;
      },
    },
    {
      shouldProcessNode: ({ type, name }) => type === "tag" && name === "image",
      processNode: function ImageNode({ attribs }) {
        const { darkMode } = useDarkMode();
        return (
          <Img src={darkMode ? attribs.dark : attribs.light} {...attribs} />
        );
      },
    },
    {
      shouldProcessNode: ({ type, name }) => type === "tag" && name === "abbr",
      processNode: function AbbreviationNode({ attribs }, children) {
        return <Abbr {...attribs}>{children}</Abbr>;
      },
    },
    {
      shouldProcessNode: ({ type, name }) => type === "tag" && name === "tweet",
      processNode: function TweetNode({ attribs }) {
        return <Tweet id={attribs.id} caption={attribs.caption} />;
      },
    },
    {
      shouldProcessNode: ({ type, name }) =>
        type === "tag" && name === "dialog",
      processNode: function DialogNode({ attribs }, children) {
        return <Dialog {...attribs}>{children}</Dialog>;
      },
    },
    {
      shouldProcessNode: ({ type, name }) =>
        type === "tag" && name === "youtube",
      processNode: function YoutubeVideoNode({ attribs }) {
        return (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube-nocookie.com/embed/${attribs.id}`}
            title={attribs.title}
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
};
