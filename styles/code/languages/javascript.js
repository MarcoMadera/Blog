import { colors } from "../colors";
import css from "styled-jsx/css";

export const JAVASCRIPT = css.global`
  code[data-lang="javascript"] .o {
    color: ${colors.black};
  }
  code[data-lang="javascript"] .t,
  code[data-lang="javascript"] .f,
  code[data-lang="javascript"] .I {
    color: ${colors.blue};
  }
  code[data-lang="javascript"] .l,
  code[data-lang="javascript"] .k {
    color: ${colors.darkgray};
  }
  code[data-lang="javascript"] .q {
    color: ${colors.green};
  }
  code[data-lang="javascript"] .F,
  code[data-lang="javascript"] .m {
    color: ${colors.purple};
  }
  code[data-lang="javascript"] .H {
    color: ${colors.red};
  }
`;

export const Dark_JAVASCRIPT = css.global`
  code[data-lang="javascript"] .t,
  code[data-lang="javascript"] .f,
  code[data-lang="javascript"] .I {
    color: ${colors.dark_blue};
  }
  code[data-lang="javascript"] .q {
    color: ${colors.dark_green};
  }
  code[data-lang="javascript"] .F,
  code[data-lang="javascript"] .m {
    color: ${colors.dark_lightpurple};
  }
  code[data-lang="javascript"] .H {
    color: ${colors.dark_red};
  }
  code[data-lang="javascript"] .l,
  code[data-lang="javascript"] .o,
  code[data-lang="javascript"] .k {
    color: ${colors.dark_white};
  }
`;
