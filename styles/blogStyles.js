import css from "styled-jsx/css";
import { colors } from "./theme";
export const blogStyles = css.global`
  .blog code,
  .blog pre {
    color: #393a34;
    font-family: "Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier,
      monospace;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    font-size: 0.9em;
    line-height: 1.2em;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  .blog pre > code {
    font-size: 1em;
  }

  /* Code blocks */
  .blog pre {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
    border: 1px solid #dddddd;
    background-color: white;
  }

  /* Inline code */
  .blog :not(pre) > code {
    padding: 0.2em;
    padding-top: 1px;
    padding-bottom: 1px;
    background: #f8f8f8;
    border: 1px solid #dddddd;
  }
  .token.tag,
  .token.selector,
  .language-autohotkey .token.keyword {
    color: #00009f;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #999988;
    font-style: italic;
  }

  .token.namespace {
    opacity: 0.7;
  }

  .token.string,
  .token.attr-value {
    color: #e3116c;
  }

  .token.punctuation,
  .token.operator {
    color: #393a34; /* no highlight */
  }

  .token.entity,
  .token.url,
  .token.symbol,
  .token.number,
  .token.boolean,
  .token.variable,
  .token.constant,
  .token.property,
  .token.regex,
  .token.inserted {
    color: #36acaa;
  }

  .token.atrule,
  .token.keyword,
  .token.attr-name,
  .language-autohotkey .token.selector {
    color: #00a4db;
  }

  .token.function,
  .token.deleted,
  .language-autohotkey .token.tag {
    color: #9a050f;
  }

  .token.important,
  .token.function,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .blog p {
    text-align: justify;
    line-height: 1.6;
  }
  .blog video {
    filter: brightness(110%);
  }
  .blog blockquote {
    border-left: 5px solid ${colors.primary};
    padding-left: 10px;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
  }

  .blog .mjx-chtml,
  .blog .mjx-chtml:focus {
    display: block !important;
    flex-wrap: wrap;
    white-space: unset;
    width: fit-content;
    margin: 0 auto;
    font-size: 100%;
    line-break: anywhere;
  }
  .blog .MathJax_Preview {
    display: none;
  }

  .blog h1 {
    font-size: 1.8em;
  }
  .blog > aside:nth-of-type(1) {
    order: 1;
  }
  .article {
    order: 2;
  }
  .rightAside {
    order: 3;
  }
  .blog a {
    color: ${colors.primary};
  }
  .blog header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  .blog a:hover {
    text-decoration: underline;
    color: ${colors.secondary};
  }

  .blog span {
    font-family: var(--general-font-family);
  }
  .blog code span {
    font-family: monospace;
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
    padding-inline-start: 0;
    margin-block-end: 0;
    padding: 0 20px 0 0;
    margin-left: 20px;
  }
  .blog img,
  .blog video {
    display: block;
    margin: auto;
    max-width: 99%;
    clip-path: inset(0% 0% 0% 0% round 10px);
    transition: ease 0.3s;
  }
  .blog img:hover {
    position: static;
    transform: scale(1.1);
  }

  .blog img[alt$="100px"] {
    display: block;
    height: 100px;
  }
  .blog img[alt$="ajustar izquierda 50px"] {
    display: block;
    height: 50px;
    float: left;
    margin: 10px;
  }

  .blog img[alt$="ajustar derecha"] {
    display: block;
    float: right;
    margin: 10px;
  }
  .blog img[alt$="ajustar derecha 200px"] {
    display: block;
    float: right;
    height: 300px;
    margin: 10px;
  }

  .blog img[alt$="100px"] {
    display: block;
    height: 100px;
  }
  .blog pre {
    border-radius: 10px;
  }
  .blog pre code {
    line-height: 20px;
    font-size: 14px !important;
  }
  .blog table {
    margin: 0 auto;
    display: table;
  }
  .blog details {
    border: 1px solid ${colors.gray};
    border-radius: 4px;
    padding: 0.5em 0.5em 0;
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
  .blog meter {
    --background: ${colors.white};
    --optimum: ${colors.primary};
    --sub-optimum: ${colors.secondary};
    --sub-sub-optimum: ${colors.primary};

    /* The gray background in Firefox */
    background: var(--background);
    display: block;
    margin-bottom: 1em;
    width: 100%;
    height: 30px;
  }

  /* The gray background in Chrome, etc. */
  .blog meter::-webkit-meter-bar {
    background: var(--background);
  }

  /* The green (optimum) bar in Firefox */
  .blog meter:-moz-meter-optimum::-moz-meter-bar {
    background: linear-gradient(90deg, ${colors.primary}, ${colors.secondary});
  }

  /* The green (optimum) bar in Chrome etc. */
  .blog meter::-webkit-meter-optimum-value {
    background: linear-gradient(90deg, ${colors.primary}, ${colors.secondary});
  }

  /* The yellow (sub-optimum) bar in Firefox */
  .blog meter:-moz-meter-sub-optimum::-moz-meter-bar {
    background: var(--sub-optimum);
  }

  /* The yellow (sub-optimum) bar in Chrome etc. */
  .blog meter::-webkit-meter-suboptimum-value {
    background: var(--sub-optimum);
  }

  /* The red (even less good) bar in Firefox */
  .blog meter:-moz-meter-sub-sub-optimum::-moz-meter-bar {
    background: var(--sub-sub-optimum);
  }

  /* The red (even less good) bar in Chrome etc. */
  .blog meter::-webkit-meter-even-less-good-value {
    background: var(--sub-sub-optimum);
  }
  .blog progress,          /* All HTML5 progress enabled browsers */
        .blog progress[role]     /* polyfill */ {
    /* Turns off styling - not usually needed, but good to know. */
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;

    /* gets rid of default border in Firefox and Opera. */
    border: none;

    /* Needs to be in here for Safari polyfill so background images work as expected. */
    background-size: auto;

    /* Dimensions */
    width: 100%;
    border: 1px solid ${colors.gray};
    border-radius: 20px;
  }

  /* Polyfill */
  .blog progress[role]:after {
    background-image: none; /* removes default background from polyfill */
  }

  /* Ensure fallback text doesn't appear in polyfill */
  .blog progress[role] strong {
    display: none;
  }
  .blog progress,                          /* Firefox  */ 
        .blog progress[role][aria-valuenow] {
    /* Polyfill */
    background: unset !important; /* !important is needed by the polyfill */
  }

  /* Chrome */
  .blog progress::-webkit-progress-bar {
    background: unset;
  }
  /* IE10 */
  .blog progress {
    color: ${colors.primary};
    border-radius: 20px;
  }

  /* Firefox */
  .blog progress::-moz-progress-bar {
    background: ${colors.primary};
    border-radius: 20px;
  }

  .blog caption {
    padding: 8px;
    caption-side: bottom;
  }

  /* Chrome */
  .blog progress::-webkit-progress-value {
    background: ${colors.primary};
    border-radius: 20px;
  }

  /* Polyfill */
  .blog progress[aria-valuenow]:before {
    background: ${colors.primary};
    border-radius: 20px;
  }

  .blog summary {
    font-weight: bold;
    margin: -0.5em -0.5em 0;
    padding: 0.5em;
  }
  .blog details > summary::marker {
    color: ${colors.primary};
  }
  .blog details > summary::-webkit-details-marker {
    color: ${colors.primary};
  }

  .blog details[open] {
    padding: 0.5em;
  }

  .blog details[open] summary {
    border-bottom: 1px solid ${colors.gray};
    margin-bottom: 0.5em;
  }
  .blog figure {
    margin: 0 auto;
    display: block;
    width: fit-content;
  }
`;
