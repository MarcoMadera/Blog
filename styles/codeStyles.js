import css from "styled-jsx/css";

const CSS = css.global`
  code[data-lang="css"] .selector {
    color: #60863a;
  }
  code[data-lang="css"] .atrule.rule,
  code[data-lang="css"] .atrule.keyword {
    color: #d73a49;
  }
  code[data-lang="css"] .property,
  code[data-lang="css"] .atrule {
    color: #005cc5;
  }
  code[data-lang="css"] .comment {
    color: #6a737d;
  }
  code[data-lang="css"] .id {
    color: #36368c;
  }
  code[data-lang="css"] .class {
    color: #1e5626;
  }
  code[data-lang="css"] .attr-name {
    color: #005cc5;
  }
  code[data-lang="css"] .attr-value {
    color: #24292e;
  }
  code[data-lang="css"] .function {
    color: #694fd2;
  }
  code[data-lang="css"] .string {
    color: #19670f;
  }
  code[data-lang="css"] .variable {
    color: #005cc5;
  }
`;

const HTML = css.global`
  code[data-lang="html"] .tag {
    color: #e53935;
  }
  code[data-lang="html"] .punctuation {
    color: #4f5cc8;
  }
  code[data-lang="html"] .attr-name {
    color: #005cc5;
  }
  code[data-lang="html"] .attr-value {
    color: #19670f;
  }
  code[data-lang="html"] .language-css.selector {
    color: #60863a;
  }
  code[data-lang="html"] .language-css.atrule.rule,
  code[data-lang="html"] .language-css.atrule.keyword {
    color: #d73a49;
  }
  code[data-lang="html"] .language-css.property,
  code[data-lang="html"] .language-css.atrule {
    color: #005cc5;
  }
  code[data-lang="html"] .language-css.class {
    color: #39adb5;
  }
  code[data-lang="html"] .language-css.comment {
    color: #6a737d;
  }
  code[data-lang="html"] .language-css.id {
    color: #36368c;
  }
  code[data-lang="html"] .language-css.class {
    color: #1e5626;
  }
  code[data-lang="html"] .language-css.attr-name {
    color: #005cc5;
  }
  code[data-lang="html"] .language-css.function {
    color: #694fd2;
  }
  code[data-lang="html"] .language-css.string {
    color: #19670f;
  }
  code[data-lang="html"] .language-css.variable {
    color: #005cc5;
  }
  code[data-lang="html"] .comment {
    color: #6a737d;
  }
`;

const JAVASCRIPT = css.global`
  code[data-lang="javascript"] .keyword {
    color: #d73a49;
  }
  code[data-lang="javascript"] .function {
    color: #6f42c1;
  }
  code[data-lang="javascript"] .operator,
  code[data-lang="javascript"] .variable,
  code[data-lang="javascript"] .number,
  code[data-lang="javascript"] .property-access {
    color: #005cc5;
  }
  code[data-lang="javascript"] .punctuation {
    color: #24292e;
  }
`;

const JSON = css.global`
  code[data-lang="json"] .operator,
  code[data-lang="json"] .property {
    color: #005cc5;
  }
  code[data-lang="json"] .string {
    color: #19670f;
  }
  code[data-lang="json"] .boolean {
    color: #d73a49;
  }
`;

const JSX = css.global`
  /* HTML */
  code[data-lang="jsx"] .tag {
    color: #e53935;
  }
  code[data-lang="jsx"] .tag.punctuation {
    color: #4f5cc8;
  }
  code[data-lang="jsx"] .attr-name {
    color: #005cc5;
  }
  code[data-lang="jsx"] .attr-value {
    color: #19670f;
  }

  /* Javascript */
  code[data-lang="jsx"] .keyword {
    color: #d73a49;
  }
  code[data-lang="jsx"] .function {
    color: #6f42c1;
  }
  code[data-lang="jsx"] .operator,
  code[data-lang="jsx"] .variable,
  code[data-lang="jsx"] .number,
  code[data-lang="jsx"] .keyword.module,
  code[data-lang="jsx"] .property-access {
    color: #005cc5;
  }
  code[data-lang="jsx"] .punctuation {
    color: #24292e;
  }
  code[data-lang="jsx"] .string,
  code[data-lang="jsx"] .boolean {
    color: #19670f;
  }
  code[data-lang="jsx"] .maybe-class-name {
    color: #ee5c18;
  }
`;

module.exports = {
  css: CSS,
  "css-extras": CSS,
  html: HTML,
  javascript: JAVASCRIPT,
  json: JSON,
  jsx: JSX,
};
