import css from "styled-jsx/css";

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
