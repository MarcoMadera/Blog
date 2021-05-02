import css from "styled-jsx/css";

export const blogStyles = css.global`
  @media print {
    .blog code,
    pre {
      text-shadow: none !important;
    }
  }
  .blog caption {
    padding: 8px;
    caption-side: bottom;
  }
  .blog figure {
    margin: 0 auto;
    display: grid;
    grid-gap: 4px;
    width: fit-content;
  }
  .blog iframe {
    display: block;
    margin: auto;
  }
`;
