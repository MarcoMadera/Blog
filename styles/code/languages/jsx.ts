import { colors } from "../colors";
import css from "styled-jsx/css";

export const JSX = css.global`
  code[data-lang="jsx"] .o {
    color: ${colors.black};
  }
  code[data-lang="jsx"] .b,
  code[data-lang="jsx"] .K,
  code[data-lang="jsx"] .t,
  code[data-lang="jsx"] .k,
  code[data-lang="jsx"] .H.I,
  code[data-lang="jsx"] .m {
    color: ${colors.blue};
  }
  code[data-lang="jsx"] .H {
    color: ${colors.darkpink};
  }
  code[data-lang="jsx"] .q,
  code[data-lang="jsx"] .C,
  code[data-lang="jsx"] .B {
    color: ${colors.green};
  }
  code[data-lang="jsx"] .r.o {
    color: ${colors.lightpurple};
  }
  code[data-lang="jsx"] .i {
    color: ${colors.orange};
  }
  code[data-lang="jsx"] .F {
    color: ${colors.purple};
  }
  code[data-lang="jsx"] .r {
    color: ${colors.red};
  }
`;

export const Dark_JSX = css.global`
  code[data-lang="jsx"] .b,
  code[data-lang="jsx"] .K,
  code[data-lang="jsx"] .t,
  code[data-lang="jsx"] .k,
  code[data-lang="jsx"] .H.I,
  code[data-lang="jsx"] .m {
    color: ${colors.dark_blue};
  }
  code[data-lang="jsx"] .B,
  code[data-lang="jsx"] .q,
  code[data-lang="jsx"] .C {
    color: ${colors.dark_green};
  }
  code[data-lang="jsx"] .r.o,
  code[data-lang="jsx"] .F {
    color: ${colors.dark_lightpurple};
  }
  code[data-lang="jsx"] .i {
    color: ${colors.dark_orange};
  }
  code[data-lang="jsx"] .H {
    color: ${colors.dark_purple};
  }
  code[data-lang="jsx"] .r {
    color: ${colors.dark_red};
  }
  code[data-lang="jsx"] .o {
    color: ${colors.dark_white};
  }
`;
