import { CSS, Dark_CSS } from "./code/languages/css";
import { HTML, Dark_HTML } from "./code/languages/html";
import { JSON, Dark_JSON } from "./code/languages/json";
import { JSX, Dark_JSX } from "./code/languages/jsx";
import { JAVASCRIPT, Dark_JAVASCRIPT } from "./code/languages/javascript";

module.exports = {
  light: {
    css: CSS,
    html: HTML,
    javascript: JAVASCRIPT,
    json: JSON,
    jsx: JSX,
  },
  dark: {
    css: Dark_CSS,
    html: Dark_HTML,
    javascript: Dark_JAVASCRIPT,
    json: Dark_JSON,
    jsx: Dark_JSX,
  },
};
