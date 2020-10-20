import css from "styled-jsx/css";
import { colors } from "./theme";
export const blogStyles = css.global`
  .blog pre {
    border: 1px solid #ccc;
  }
  .blog code,
  pre {
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    hyphens: none;
    color: inherit;
    text-shadow: none;
    font-family: "Roboto Mono", monospace;
    font-size: 1em;
    tab-size: 4;
  }

  @media print {
    .blog code,
    pre {
      text-shadow: none !important;
    }
  }

  .blog :not(pre) > code {
    white-space: normal;
    color: #24292e;
    border-radius: 0.2em;
    padding: 0.1em;
  }

  .blog pre {
    overflow: auto;
    position: relative;
    color: #24292e;
    border-radius: 0;
    margin: 0.5em 0;
    padding: 0.8em 1em;
  }

  .blog pre.language-css > code,
  pre.language-sass > code,
  pre.language-scss > code {
    color: #f76d47;
  }

  .namespace {
    opacity: 0.7;
  }

  .token.atrule.rule {
    color: #d73a49;
  }

  .token.attr-name {
    color: #39adb5;
  }

  .token.attr-value {
    color: #f6a434;
  }
  .token.tag.attr-value {
    color: #24292e;
  }

  .token.attribute {
    color: #f6a434;
  }

  .token.boolean {
    color: #005cc5;
  }

  .token.builtin {
    color: #39adb5;
  }

  .token.cdata {
    color: #39adb5;
  }

  .token.char {
    color: #39adb5;
  }

  .token.class {
    color: #39adb5;
  }
  .token.tag.class-name {
    color: #22863a;
  }
  .token.tag.attr-name {
    color: #005cc5;
  }
  .token.tag.script.language-javascript.boolean,
  .token.tag.script.language-javascript.property-access,
  .token.property-access {
    color: #005cc5;
  }
  .token.tag.script.language-javascript.punctuation {
    color: #24292e;
  }
  .token.tag.script.language-javascript.operator {
    color: #005cc5;
  }
  .token.tag.script.language-javascript.keyword {
    color: #d73a49;
  }
  .token.tag.script.language-javascript.class-name {
    color: #e36209;
  }

  .token.class-name {
    color: #e36209;
  }

  .token.comment {
    color: #aabfc9;
  }

  .token.constant {
    color: #005ccf;
  }

  .token.deleted {
    color: #e53935;
  }

  .token.doctype {
    color: #aabfc9;
  }

  .token.entity {
    color: #e53935;
  }

  .token.function {
    color: #6f42c1;
  }
  .token.color.function {
    color: #6f42c1;
  }

  .token.hexcode {
    color: #f76d47;
  }

  .token.id {
    color: #6f42c1;
    font-weight: bold;
  }

  .token.important {
    color: #7c4dff;
    font-weight: bold;
  }

  .token.inserted {
    color: #39adb5;
  }

  .token.keyword {
    color: #d73a49;
  }

  .token.number {
    color: #005cc5;
  }

  .token.operator {
    color: #005cc5;
  }

  .token.prolog {
    color: #aabfc9;
  }

  .token.property,
  .token.selector.pseudo-class,
  .token.variable {
    color: #005cc5;
  }

  .token.pseudo-class {
    color: #f6a434;
  }

  .token.pseudo-element {
    color: #f6a434;
  }
  .token.unit,
  .token.color,
  .token.parameter {
    color: #24292e;
  }
  .token.selector.punctuation,
  .token.punctuation {
    color: #24292e;
  }
  .token.tag.punctuation {
    color: #4f5cc8;
  }

  .token.regex {
    color: #6182b8;
  }

  .token.selector {
    color: #60863a;
  }

  .token.string,
  .token.tag.script.language-javascript {
    color: #24292e;
  }

  .token.symbol {
    color: #7c4dff;
  }

  .token.tag {
    color: #e53935;
  }

  .token.keyword.module {
    color: #d73a49;
  }
  .token.maybe-class-name {
    color: #ea7a09;
  }

  .token.url {
    color: #e53935;
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
