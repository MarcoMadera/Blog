import { colors } from "../colors";
import css from "styled-jsx/css";

export const JSON = css.global`
  code[data-lang="json"] {
    color: ${colors.blue};
  }
  code[data-lang="json"] .o {
    color: ${colors.black};
  }
  code[data-lang="json"] .K,
  code[data-lang="json"] .M {
    color: ${colors.blue};
  }
  code[data-lang="json"] .q {
    color: ${colors.green};
  }
  code[data-lang="json"] .C {
    color: ${colors.red};
  }
`;

export const Dark_JSON = css.global`
  code[data-lang="json"] {
    color: ${colors.dark_blue};
  }
  code[data-lang="json"] .o {
    color: ${colors.dark_white};
  }
  code[data-lang="json"] .K,
  code[data-lang="json"] .M {
    color: ${colors.dark_blue};
  }
  code[data-lang="json"] .q {
    color: ${colors.dark_green};
  }
  code[data-lang="json"] .C {
    color: ${colors.dark_red};
  }
`;
