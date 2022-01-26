import {
  Anchor,
  ImageCloud,
  BlockCode,
  BlockQuote,
  BulletList,
  CheckList,
  NumberList,
} from "components/icons";
import type { CommentOptions } from "types/comments";

export const options: CommentOptions[] = [
  { name: "Título", type: "header", mark: "# ", children: "T" },
  { name: "Negrita", openMark: "**", closeMark: "**", children: "B" },
  { name: "Cursiva", openMark: "_", closeMark: "_", children: "I" },
  { name: "Tachado", openMark: "~~", closeMark: "~~", children: "D" },
  { name: "Código en línea", openMark: "`", closeMark: "`", children: "<>" },
  {
    name: "Bloque acotado",
    type: "blockquote",
    mark: "> ",
    children: <BlockQuote width={13} height={13} />,
  },
  {
    name: "Bloque de código",
    type: "blockCode",
    children: <BlockCode width={24} height={24} />,
  },
  {
    name: "Enlace",
    type: "anchor",
    children: <Anchor width={17} height={17} />,
  },
  {
    name: "Lista de puntos",
    type: "bulletList",
    mark: "- ",
    children: <BulletList width={20} height={20} />,
  },
  {
    name: "Lista de números",
    type: "numberList",
    mark: "1. ",
    children: <NumberList width={20} height={20} />,
  },
  {
    name: "Lista de tareas",
    type: "checkList",
    mark: "- [ ] ",
    children: <CheckList width={18} height={18} />,
  },
  {
    name: "Imagen por enlace",
    type: "anchorImage",
    children: <ImageCloud width={24} height={24} />,
  },
];
