import css from "styled-jsx/css";
import { colors } from "./theme";

export const blogStyles = css.global`
  @media print {
    .blog code,
    pre {
      text-shadow: none !important;
    }
    iframe[title="FastComments"] {
      display: none !important;
    }
  }
  .blog h1 {
    font-size: 1.8em;
  }
  .blog input[type="number"],
  .blog select {
    border: 1px solid ${colors.gray};
    border-radius: 4px;
    padding: 0.5em;
  }
  .blog input[type="color"] {
    border-radius: 100%;
    height: 40px;
    width: 40px;
    border: none;
    outline: none;
    cursor: pointer;
    -webkit-appearance: none;
    padding: 0;
    overflow: hidden;
  }
  .blog input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  .blog input[type="color"]::-webkit-color-swatch {
    border: none;
    border-radius: 100%;
  }
  .blog caption {
    padding: 8px;
    caption-side: bottom;
  }
  .blog figure {
    margin: 0 auto;
    display: block;
    width: fit-content;
  }
  .blog iframe {
    display: block;
    margin: auto;
  }
`;
