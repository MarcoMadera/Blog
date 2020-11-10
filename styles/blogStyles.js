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
  .namespace {
    opacity: 0.7;
  }
  .blog p {
    text-align: justify;
    line-height: 1.6;
  }
  .blog p code {
    background: #f5f5f5;
    padding: 3px 6px;
    border-radius: 6px;
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
  .article {
    order: 2;
  }
  .rightAside {
    order: 3;
  }
  .blog a {
    color: ${colors.primary};
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
    margin-bottom: 0;
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

  .blog table {
    margin: 5px auto;
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
