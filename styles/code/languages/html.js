import { colors } from "../colors";
import css from "styled-jsx/css";

export const HTML = css.global`
  code[data-lang="html"] .css .P .o,
  code[data-lang="html"] .css .a .k,
  code[data-lang="html"] .css .a .o,
  code[data-lang="html"] .css .a .s {
    color: ${colors.black};
  }
  code[data-lang="html"] .b,
  code[data-lang="html"] .css .M,
  code[data-lang="html"] .css .t,
  code[data-lang="html"] .css .b {
    color: ${colors.blue};
  }
  code[data-lang="html"] .css .E {
    color: ${colors.darkGray};
  }
  code[data-lang="html"] .css .D {
    color: ${colors.darkYellow};
  }
  code[data-lang="html"] .E {
    color: ${colors.gray};
  }
  code[data-lang="html"] .B,
  code[data-lang="html"] .css .B,
  code[data-lang="html"] .css .S,
  code[data-lang="html"] .css .q {
    color: ${colors.green};
  }
  code[data-lang="html"] .css .a {
    color: ${colors.lightBlue};
  }
  code[data-lang="html"] .o,
  code[data-lang="html"] .css .a .p,
  code[data-lang="html"] .css .a .H {
    color: ${colors.lightPurple};
  }
  code[data-lang="html"] .css .g,
  code[data-lang="html"] .css .P .n,
  code[data-lang="html"] .css .N,
  code[data-lang="html"] .css .F {
    color: ${colors.purple};
  }
  code[data-lang="html"] .r,
  code[data-lang="html"] .css .P {
    color: ${colors.red};
  }
`;

export const Dark_HTML = css.global`
  code[data-lang="html"] .b,
  code[data-lang="html"] .css .M,
  code[data-lang="html"] .css .b,
  code[data-lang="html"] .css .t,
  code[data-lang="html"] .css .a {
    color: ${colors.dark_blue};
  }
  code[data-lang="html"] .E,
  code[data-lang="html"] .css .E {
    color: ${colors.dark_darkGray};
  }
  code[data-lang="html"] .css .D {
    color: ${colors.dark_darkYellow};
  }
  code[data-lang="html"] .B,
  code[data-lang="html"] .css .q,
  code[data-lang="html"] .css .S,
  code[data-lang="html"] .css .B {
    color: ${colors.dark_green};
  }
  code[data-lang="html"] .o,
  code[data-lang="html"] .css .g,
  code[data-lang="html"] .css .N,
  code[data-lang="html"] .css .F,
  code[data-lang="html"] .css .P .n {
    color: ${colors.dark_lightPurple};
  }
  code[data-lang="html"] .css .a .p,
  code[data-lang="html"] .css .a .H {
    color: ${colors.dark_purple};
  }
  code[data-lang="html"] .css .P,
  code[data-lang="html"] .r {
    color: ${colors.dark_red};
  }
  code[data-lang="html"] .css .P .o {
    color: ${colors.dark_white};
  }
`;
