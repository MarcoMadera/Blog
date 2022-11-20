import css from "styled-jsx/css";

export const aboutStyles = css`
  main {
    padding: 0 20px;
    margin: 0 auto;
    max-width: 1300px;
    min-height: calc(100vh - 257px);
  }
  div {
    max-width: 48rem;
    margin: 0 auto;
  }
  button {
    background: unset;
    border: none;
    cursor: pointer;
    display: inline-flex;
    padding: 0;
    vertical-align: text-top;
  }
  main :global(h1) {
    text-align: center;
  }
  video {
    display: block;
    margin: 30px auto 0 auto;
  }
  @keyframes rotate-center {
    0% {
      transform: rotate(0);
    }
    50% {
      transform: rotate(-15deg);
    }
    100% {
      transform: rotate(15deg);
    }
  }
`;
