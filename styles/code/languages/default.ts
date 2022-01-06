import { colors } from "../colors";
import css from "styled-jsx/css";

export const DEFAULT = css.global`
  code .o {
    color: ${colors.black};
  }
  code .t,
  code .f,
  code .D,
  code .D .i,
  code .T,
  code .M,
  code .I {
    color: ${colors.blue};
  }
  code .l,
  code .k {
    color: ${colors.darkgray};
  }
  code .q,
  code .E {
    color: ${colors.green};
  }
  code .F,
  code .m {
    color: ${colors.purple};
  }
  code .H {
    color: ${colors.red};
  }
  code .K {
    color: ${colors.lightblue};
  }
  code .i {
    color: ${colors.orange};
  }
`;

export const Dark_DEFAULT = css.global`
  code .t,
  code .f,
  code .D,
  code .D .i,
  code .T,
  code .M,
  code .I {
    color: ${colors.dark_blue};
  }
  code .q,
  code .E {
    color: ${colors.dark_green};
  }
  code .F,
  code .m {
    color: ${colors.dark_lightpurple};
  }
  code .H {
    color: ${colors.dark_red};
  }
  code .l,
  code .o,
  code .k {
    color: ${colors.dark_white};
  }
  code .K {
    color: ${colors.dark_lightblue};
  }
  code .i {
    color: ${colors.dark_orange};
  }
`;
