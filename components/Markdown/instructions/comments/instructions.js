/* eslint-disable react/prop-types */
import { A } from "../../../tags";

export const instructions = {
  isValidNode: (node) => {
    return node?.type !== "script";
  },
  processingInstructions: [
    {
      shouldProcessNode: ({ type, name }) => type === "tag" && name === "a",
      processNode: function AnchorNode({ attribs }, children) {
        return attribs.href ? (
          <A
            target={attribs.href?.startsWith("#") ? "_self" : "_blank"}
            rel={
              attribs.href?.startsWith("#") ? undefined : "noopener noreferrer"
            }
            href={attribs?.href}
          >
            {children}
          </A>
        ) : (
          children
        );
      },
    },
    {
      shouldProcessNode: function ({ type, name }) {
        return type === "tag" && name === "i";
      },
      processNode: function Itallic(_, children) {
        return <i>{children}</i>;
      },
    },
    {
      shouldProcessNode: function ({ type, name }) {
        return type === "tag" && name === "del";
      },
      processNode: function Delete(_, children) {
        return <del>{children}</del>;
      },
    },
    {
      shouldProcessNode: function ({ type, name }) {
        return type === "tag" && name === "strong";
      },
      processNode: function Bold(_, children) {
        return <strong>{children}</strong>;
      },
    },
    {
      shouldProcessNode: function ({ type, name }) {
        return type === "tag" && name === "u";
      },
      processNode: function Underline(_, children) {
        return <u>{children}</u>;
      },
    },
    {
      shouldProcessNode: function () {
        return true;
      },
      processNode: function InvalidNode(_, children) {
        return <span>{children}</span>;
      },
    },
  ],
};
