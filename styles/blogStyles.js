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
  .blog :not(pre) > code {
    white-space: normal;
    color: #24292e;
    border-radius: 0.2em;
    padding: 0.1em;
  }
  .blog video {
    filter: brightness(110%);
  }
  .blog blockquote {
    border-left: 5px solid ${colors.primary};
    padding-left: 10px;
    margin-left: 30px;
    margin-right: 30px;
  }
  .blog h1 {
    font-size: 1.8em;
  }
  .blog > aside:nth-of-type(1) {
    order: 1;
  }
  .blog ol,
  .blog ul {
    padding: 0;
  }
  .blog ul li {
    list-style-type: disc;
  }
  .blog ol li {
    list-style-type: decimal;
  }
  .blog ol li,
  .blog ul li {
    list-style-position: outside;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.6;
    margin-bottom: 0;
    padding: 0 20px 0 0;
    margin-left: 20px;
  }
  .blog video {
    display: block;
    margin: auto;
    max-width: 99%;
    clip-path: inset(0% 0% 0% 0% round 10px);
    transition: ease 0.3s;
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
  .blog dialog {
    border-color: ${colors.secondary};
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
  @media screen and (min-width: 0px) and (max-width: 500px) {
    .blog blockquote {
      margin-left: 15px;
      margin-right: 15px;
    }
  }
`;
