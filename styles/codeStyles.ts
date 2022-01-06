import { CSS, Dark_CSS } from "./code/languages/css";
import { HTML, Dark_HTML } from "./code/languages/html";
import { JSON, Dark_JSON } from "./code/languages/json";
import { JSX, Dark_JSX } from "./code/languages/jsx";
import { JAVASCRIPT, Dark_JAVASCRIPT } from "./code/languages/javascript";
import { DEFAULT, Dark_DEFAULT } from "./code/languages/default";

const codeStyles = {
  light: {
    css: CSS,
    html: HTML,
    javascript: JAVASCRIPT,
    json: JSON,
    jsx: JSX,
    default: DEFAULT,
  },
  dark: {
    css: Dark_CSS,
    html: Dark_HTML,
    javascript: Dark_JAVASCRIPT,
    json: Dark_JSON,
    jsx: Dark_JSX,
    default: Dark_DEFAULT,
  },
};

export default codeStyles;
