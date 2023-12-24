import css from "styled-jsx/css";
import { colors } from "styles/theme";

export const DARK_THEME = css.global`
  pre {
    background-color: white;
    color: black;
    border-left: 1px solid #999;
    border-bottom: 1px solid #999;
  }
  pre.shiki div.highlight {
    background-color: #d6bcf726;
  }
  pre.twoslash:hover data-lsp {
    border-color: #747474;
  }
  pre.twoslash data-lsp:hover::before {
    background-color: #0d1117;
    color: #fff;
    border: 1px solid #747474;
  }
  pre .code-container {
    scrollbar-color: #f03030bf transparent;
  }
  pre .code-container::-webkit-scrollbar-thumb {
    background: #d32f2fe1;
  }
  pre .code-container > a {
    border: 1px solid #719af4;
    color: #719af4;
  }
  pre .code-container > a:hover {
    color: white;
    background-color: #719af4;
  }
  pre .query {
    color: #137998;
  }
  pre .error {
    background-color: #fee;
    border-left: 16px solid #bf1818;
    color: black;
  }
  pre .error-behind {
    color: #fee;
  }
  pre .arrow {
    background-color: #1f2937;
    border-left: 1px solid #1f2937;
    border-top: 1px solid #1f2937;
  }
  pre .popover {
    background-color: #1f2937;
  }
  pre .inline-completions ul.dropdown {
    background-color: #1f2937;
    color: white;
    border-left: 4px solid #4b9edd;
  }
  pre .inline-completions ul.dropdown::before {
    background-color: #4b9edd;
  }
  pre .inline-completions ul.dropdown li span.result-found {
    color: #4b9edd;
  }
  .tag-container .twoslash-annotation {
    color: #c93131;
  }
  .tag-container .twoslash-annotation svg path {
    stroke: #d8d8d8c9;
  }
  .dark-theme .markdown pre {
    background-color: #d8d8d8;
    border-color: #ddd;
  }
  pre .inline-completions ul.dropdown li span.result {
    color: black;
  }
  pre .logger {
    color: black;
  }
  pre .logger.error-log {
    background-color: #fee;
    border-left: 2px solid #bf1818;
  }
  pre .logger.warn-log {
    background-color: #ffe;
    border-left: 2px solid #eae662;
  }
  pre .logger.log-log {
    background-color: rgba(127, 127, 127, 0.183);
    border-left: 2px solid #ababab;
    color: #c6c6c6;
  }
  pre .code-title {
    border-bottom: 1px solid #45535d;
  }
  pre.shiki .language-id {
    border: 1px solid #45535d;
    background: ${colors.cinder};
    color: rgba(255, 255, 255, 0.7);
  }
`;

export const LIGHT_THEME = css.global`
  pre {
    background-color: white;
    color: black;
    border-left: 1px solid #999;
    border-bottom: 1px solid #999;
  }
  pre.shiki div.highlight {
    background-color: #d6bcf726;
  }
  pre.twoslash:hover data-lsp {
    border-color: #747474;
  }
  pre.twoslash data-lsp:hover::before {
    background-color: #ffffff;
    color: #121212;
    border: 1px solid #747474;
  }
  pre .code-container {
    scrollbar-color: #f03030bf transparent;
  }
  pre .code-container::-webkit-scrollbar-thumb {
    background: #d32f2fe1;
  }
  pre .code-container > a {
    border: 1px solid #719af4;
    color: #719af4;
  }
  pre .code-container > a:hover {
    color: white;
    background-color: #719af4;
  }
  pre .query {
    color: #137998;
  }
  pre .error {
    background-color: #fee;
    border-left: 16px solid #bf1818;
    color: black;
  }
  pre .error-behind {
    color: #fee;
  }
  pre .arrow {
    background-color: #f8f8f8;
    border-left: 1px solid #cfcfcf;
    border-top: 1px solid #cfcfcf;
  }
  pre .popover {
    background-color: #f8f8f8;
    border: 1px solid #cfcfcf;
  }
  pre .inline-completions ul.dropdown {
    background-color: #f8f8f8;
    color: white;
    border-left: 4px solid #4b9edd;
  }
  pre .inline-completions ul.dropdown::before {
    background-color: #4b9edd;
  }
  pre .inline-completions ul.dropdown li span.result-found {
    color: #4b9edd;
  }
  .tag-container .twoslash-annotation {
    color: #c93131;
  }
  .tag-container .twoslash-annotation svg path {
    stroke: #414141c9;
  }
  .dark-theme .markdown pre {
    background-color: #d8d8d8;
    border-color: #ddd;
  }
  pre .inline-completions ul.dropdown li span.result {
    color: black;
  }
  pre .logger {
    color: black;
  }
  pre .logger.error-log {
    background-color: #fee;
    border-left: 2px solid #bf1818;
  }
  pre .logger.warn-log {
    background-color: #ffe;
    border-left: 2px solid #eae662;
  }
  pre .logger.log-log {
    background-color: #f3f3f3;
    border-left: 2px solid #f7f7f7ba;
  }
  pre .code-title {
    border-bottom: 1px solid #e1e8ed;
  }
  pre.shiki .language-id {
    border: 1px solid #e1e8ed;
    background: ${colors.romance};
    color: rgba(0, 0, 0, 0.7);
  }
`;

export const DEFAULT = css.global`
  code .line {
    padding: 0 0.8rem;
  }
  pre {
    margin-bottom: 3rem;
    position: relative;
  }
  pre.shiki:hover .dim {
    opacity: 1;
  }
  pre.shiki div.dim {
    opacity: 0.5;
  }
  pre.shiki div.dim,
  pre.shiki div.highlight {
    margin: 0;
    padding: 0 0.8rem;
  }
  pre.shiki div.line {
    min-height: 1rem;
  }
  pre.shiki .language-id {
    position: absolute;
    border-radius: 4px;
    font-size: 12px;
    padding: 2px 8px;
    right: 8px;
    text-transform: uppercase;
    top: -11px;
  }
  body[data-theme="dark"] pre.shiki.light,
  body[data-theme="light"] pre.shiki.theme,
  body[data-theme="dark"] pre.shiki.light ~ *,
  body[data-theme="light"] pre.shiki.theme ~ * {
    display: none;
  }
  body[data-theme="light"] pre.shiki.light,
  body[data-theme="dark"] pre.shiki.theme {
    display: block;
  }
  pre.shiki.with-title .language-id {
    position: absolute;
    top: 0;
    right: 0;
    padding: 12px;
    border: none;
    background: transparent;
    user-select: none;
  }
  pre.twoslash data-lsp:hover::before {
    content: attr(lsp);
    position: absolute;
    transform: translate(0, 1rem);
    text-align: left;
    padding: 5px 8px;
    border-radius: 2px;
    font-family: "JetBrains Mono", Menlo, Monaco, Consolas, Courier New,
      monospace;
    font-size: 14px;
    white-space: pre-wrap;
    z-index: 100;
  }
  pre .code-container {
    overflow-x: auto;
    scrollbar-width: thin;
    padding: 0.8rem 0;
    min-height: 78px;
    display: grid;
    align-items: center;
  }
  pre .code-title {
    padding: 0 12px 0 16px;
    border-radius: 6px 6px 0 0;
    display: flex;
    height: 48px;
    align-items: center;
  }
  pre .code-container::-webkit-scrollbar {
    height: 8px;
    width: 8px;
    overflow: visible;
  }
  pre .code-container::-webkit-scrollbar-thumb {=
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 30px;
    border-bottom-left-radius: 30px;
  }
  pre .code-container::-webkit-scrollbar-track {
    background: transparent;
  }
  pre .code-container > a {
    position: absolute;
    right: 8px;
    bottom: 8px;
    border-radius: 4px;
    padding: 0 8px;
    text-decoration: none;
    opacity: 0;
    transition-timing-function: ease;
    transition: opacity 0.3s;
  }
  @media (prefers-reduced-motion: reduce) {
    pre .code-container > a {
      transition: none;
    }
  }
  pre .code-container:hover a {
    opacity: 1;
  }
  pre code {
    font-size: 15px;
    font-family: "JetBrains Mono", Menlo, Monaco, Consolas, Courier New,
      monospace;
    white-space: pre;
    -webkit-overflow-scrolling: touch;
  }
  pre code a {
    text-decoration: none;
  }
  pre data-err {
    background: url("data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%206%203'%20enable-background%3D'new%200%200%206%203'%20height%3D'3'%20width%3D'6'%3E%3Cg%20fill%3D'%23c94824'%3E%3Cpolygon%20points%3D'5.5%2C0%202.5%2C3%201.1%2C3%204.1%2C0'%2F%3E%3Cpolygon%20points%3D'4%2C0%206%2C2%206%2C0.6%205.4%2C0'%2F%3E%3Cpolygon%20points%3D'0%2C2%201%2C3%202.4%2C3%200%2C0.6'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E")
      repeat-x bottom left;
    padding-bottom: 3px;
  }
  pre .query {
    margin-bottom: 10px;
    display: inline-block;
  }
  pre .error,
  pre .error-behind {
    margin-left: -14px;
    margin-top: 8px;
    margin-bottom: 4px;
    padding: 6px;
    padding-left: 14px;
    width: calc(100% - 20px);
    white-space: pre-wrap;
    display: block;
  }
  pre .error {
    display: flex;
    align-items: center;
    width: calc(100% + 14px);
  }
  pre .error .code {
    display: none;
  }
  pre .error-behind {
    user-select: none;
    visibility: transparent;
    display: none;
  }
  pre .arrow {
    position: relative;
    top: -7px;
    margin-left: 0.1rem;
    transform: translateY(25%) rotate(45deg);
    height: 8px;
    width: 8px;
  }
  pre .popover {
    margin-bottom: 10px;
    display: inline-block;
    padding: 0 0.5rem 0.3rem;
    margin-top: 10px;
    border-radius: 3px;
  }
  pre .inline-completions ul.dropdown {
    display: inline-block;
    position: absolute;
    width: 240px;
    padding-top: 4px;
    font-family: var(--code-font);
    font-size: 0.8rem;
    margin: 0;
    padding: 0;
  }
  pre .inline-completions ul.dropdown::before {
    width: 2px;
    position: absolute;
    top: -1.2rem;
    left: -3px;
    content: " ";
  }
  pre .inline-completions ul.dropdown li {
    overflow-x: hidden;
    padding-left: 4px;
    margin-bottom: 4px;
  }
  pre .inline-completions ul.dropdown li.deprecated {
    text-decoration: line-through;
  }
  
  pre .inline-completions ul.dropdown li span.result {
    width: 100px;
    display: inline-block;
  }
  .dark-theme .markdown pre {
    filter: invert(98%) hue-rotate(180deg);
  }
  data-lsp {
    border-bottom: 1px dotted transparent;
    transition-timing-function: ease;
    transition: border-color 0.3s;
  }
  @media (prefers-reduced-motion: reduce) {
    data-lsp {
      transition: none;
    }
  }
  .tag-container {
    position: relative;
  }
  .tag-container .twoslash-annotation {
    position: absolute;
    font-family: "JetBrains Mono", Menlo, Monaco, Consolas, Courier New,
      monospace;
    right: -10px;
    width: 200px;
  }
  .tag-container .twoslash-annotation p {
    text-align: left;
    font-size: 0.8rem;
    line-height: 0.9rem;
  }
  .tag-container .twoslash-annotation svg {
    float: left;
    margin-left: -44px;
  }
  .tag-container .twoslash-annotation.left {
    right: auto;
    left: -200px;
  }
  .tag-container .twoslash-annotation.left svg {
    float: right;
    margin-right: -5px;
  }
  pre .logger {
    display: flex;
    align-items: center;
    padding-left: 8px;
    width: 100%;
    white-space: pre-wrap;
  }
  pre .logger svg {
    margin-right: 9px;
  }
  pre .logger.log-log svg {
    margin-left: 6px;
    margin-right: 9px;
  }
`;
