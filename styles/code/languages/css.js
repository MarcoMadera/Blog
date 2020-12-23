import { colors } from "../colors";
import css from "styled-jsx/css";

export const CSS = css.global`
  code[data-lang="css"] .P .o,
  code[data-lang="css"] .a .k,
  code[data-lang="css"] .a .o,
  code[data-lang="css"] .a .s {
    color: ${colors.black};
  }
  code[data-lang="css"] .M,
  code[data-lang="css"] .t,
  code[data-lang="css"] .b {
    color: ${colors.blue};
  }
  code[data-lang="css"] .E {
    color: ${colors.darkGray};
  }
  code[data-lang="css"] .D {
    color: ${colors.darkYellow};
  }
  code[data-lang="css"] .B,
  code[data-lang="css"] .S,
  code[data-lang="css"] .q {
    color: ${colors.green};
  }
  code[data-lang="css"] .a {
    color: ${colors.lightBlue};
  }
  code[data-lang="css"] .a .p,
  code[data-lang="css"] .a .H {
    color: ${colors.lightPurple};
  }
  code[data-lang="css"] .P .n,
  code[data-lang="css"] .N,
  code[data-lang="css"] .F,
  code[data-lang="css"] .g {
    color: ${colors.purple};
  }
  code[data-lang="css"] .P {
    color: ${colors.red};
  }
`;

export const Dark_CSS = css.global`
  code[data-lang="css"] .M,
  code[data-lang="css"] .b,
  code[data-lang="css"] .t,
  code[data-lang="css"] .a {
    color: ${colors.dark_blue};
  }
  code[data-lang="css"] .E {
    color: ${colors.dark_darkGray};
  }
  code[data-lang="css"] .D {
    color: ${colors.dark_darkYellow};
  }
  code[data-lang="css"] .q,
  code[data-lang="css"] .S,
  code[data-lang="css"] .B {
    color: ${colors.dark_green};
  }
  code[data-lang="css"] .g,
  code[data-lang="css"] .N,
  code[data-lang="css"] .F,
  code[data-lang="css"] .P .n {
    color: ${colors.dark_lightPurple};
  }
  code[data-lang="css"] .a .p,
  code[data-lang="css"] .a .H {
    color: ${colors.dark_purple};
  }
  code[data-lang="css"] .P {
    color: ${colors.dark_red};
  }
  code[data-lang="css"] .P .o,
  code[data-lang="css"] .a .k,
  code[data-lang="css"] .a .o,
  code[data-lang="css"] .a .s {
    color: ${colors.dark_white};
  }
`;
