import css from "styled-jsx/css";

const CSS = css.global`
  code[data-lang="css"] .P {
    color: #c62828;
  }
  code[data-lang="css"] .P .o {
    color: #24292e;
  }
  code[data-lang="css"] .P .n {
    color: #673ab7;
  }
  code[data-lang="css"] .a .p,
  code[data-lang="css"] .a .H {
    color: #3f51b5;
  }
  code[data-lang="css"] .M,
  code[data-lang="css"] .a {
    color: #005cc5;
  }
  code[data-lang="css"] .E {
    color: #6a737d;
  }
  code[data-lang="css"] .g {
    color: #36368c;
  }
  code[data-lang="css"] .D {
    color: #475800;
  }
  code[data-lang="css"] .b {
    color: #005cc5;
  }
  code[data-lang="css"] .B {
    color: #2e7d32;
  }
  code[data-lang="css"] .N,
  code[data-lang="css"] .F {
    color: #673ab7;
  }
  code[data-lang="css"] .q {
    color: #19670f;
  }
  code[data-lang="css"] .t {
    color: #005cc5;
  }
  code[data-lang="css"] .S {
    color: #2e7d32;
  }
`;

const HTML = css.global`
  code[data-lang="html"] .r {
    color: #e53935;
  }
  code[data-lang="html"] .o {
    color: #4f5cc8;
  }
  code[data-lang="html"] .b {
    color: #005cc5;
  }
  code[data-lang="html"] .B {
    color: #2e7d32;
  }
  code[data-lang="html"] .css .P {
    color: #c62828;
  }
  code[data-lang="html"] .css .a.p,
  code[data-lang="html"] .css .a.H {
    color: #3f51b5;
  }
  code[data-lang="html"] .css .M,
  code[data-lang="html"] .css .a {
    color: #005cc5;
  }
  code[data-lang="html"] .css .E {
    color: #6a737d;
  }
  code[data-lang="html"] .css .g {
    color: #36368c;
  }
  code[data-lang="html"] .css .D {
    color: #475800;
  }
  code[data-lang="html"] .css .b {
    color: #005cc5;
  }
  code[data-lang="html"] .css .N,
  code[data-lang="html"] .css .F {
    color: #673ab7;
  }
  code[data-lang="html"] .css .q {
    color: #19670f;
  }
  code[data-lang="html"] .css .t {
    color: #005cc5;
  }
  code[data-lang="html"] .css .S {
    color: #2e7d32;
  }
  code[data-lang="html"] .E {
    color: #6a737d;
  }
`;

const JAVASCRIPT = css.global`
  code[data-lang="javascript"] .H {
    color: #e53935;
  }
  code[data-lang="javascript"] .F,
  code[data-lang="javascript"] .m {
    color: #6f42c1;
  }
  code[data-lang="javascript"] .t,
  code[data-lang="javascript"] .f,
  code[data-lang="javascript"] .I {
    color: #005cc5;
  }
  code[data-lang="javascript"] .o {
    color: #24292e;
  }
  code[data-lang="javascript"] .q {
    color: #2e7d32;
  }
  code[data-lang="javascript"] .l,
  code[data-lang="javascript"] .k {
    color: #607d8b;
  }
`;

const JSON = css.global`
  code[data-lang="json"] .K,
  code[data-lang="json"] .M {
    color: #005cc5;
  }
  code[data-lang="json"] .q {
    color: #19670f;
  }
  code[data-lang="json"] .C {
    color: #d32f2f;
  }
`;

const JSX = css.global`
  /* HTML */
  code[data-lang="jsx"] .r {
    color: #e53935;
  }
  code[data-lang="jsx"] .r.o {
    color: #4f5cc8;
  }
  code[data-lang="jsx"] .b {
    color: #005cc5;
  }
  code[data-lang="jsx"] .B {
    color: #2e7d32;
  }

  /* Javascript */
  code[data-lang="jsx"] .H {
    color: #9c27b0;
  }
  code[data-lang="jsx"] .F {
    color: #6f42c1;
  }
  code[data-lang="jsx"] .K,
  code[data-lang="jsx"] .t,
  code[data-lang="jsx"] .k,
  code[data-lang="jsx"] .H.I,
  code[data-lang="jsx"] .m {
    color: #005cc5;
  }
  code[data-lang="jsx"] .o {
    color: #24292e;
  }
  code[data-lang="jsx"] .q,
  code[data-lang="jsx"] .C {
    color: #19670f;
  }
  code[data-lang="jsx"] .i {
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
