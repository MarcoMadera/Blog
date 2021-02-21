import css from "styled-jsx/css";

export const aboutStyles = css`
  main {
    display: grid;
    grid-gap: 2em;
    grid-template-columns: 240px minmax(0px, 710px) 240px;
    justify-content: center;
    margin-bottom: 50px;
    min-height: calc(100vh - 160px);
    padding: 0 20px;
  }
  aside:nth-of-type(1) {
    padding-top: 75px;
  }
  aside:nth-of-type(2) {
    box-sizing: border-box;
    padding: 0 5px;
  }
  aside:nth-of-type(1) > :global(svg) {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 60px;
  }
  aside:nth-of-type(1) > :global(svg:hover) {
    animation: rotate-center 250ms ease-in-out 2 alternate both;
  }
  button {
    background: unset;
    border: none;
    cursor: pointer;
    display: inline-flex;
    padding: 0;
    vertical-align: bottom;
  }
  main :global(h1) {
    text-align: center;
  }
  section :global(p) {
    text-align: justify;
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
  @media screen and (min-width: 0px) and (max-width: 876px) {
    main {
      grid-template-columns: auto;
    }
  }
  @media screen and (min-width: 876px) and (max-width: 1024px) {
    main {
      grid-template-columns: auto 240px;
    }
  }
  @media screen and (min-width: 1024px) and (max-width: 1050px) {
    aside:nth-of-type(1) > :global(svg) {
      margin-bottom: 90px;
    }
    aside:nth-of-type(1) > :global(svg:nth-of-type(5)) {
      margin-bottom: 230px;
    }
  }
  @media screen and (min-width: 1050px) and (max-width: 1070px) {
    aside:nth-of-type(1) > :global(svg) {
      margin-bottom: 95px;
    }
    aside:nth-of-type(1) > :global(svg:nth-of-type(5)) {
      margin-bottom: 170px;
    }
  }
  @media screen and (min-width: 1070px) and (max-width: 1120px) {
    aside:nth-of-type(1) > :global(svg) {
      margin-bottom: 70px;
    }
    aside:nth-of-type(1) > :global(svg:nth-of-type(5)) {
      margin-bottom: 240px;
    }
  }
  @media screen and (min-width: 1120px) and (max-width: 1165px) {
    aside:nth-of-type(1) > :global(svg) {
      margin-bottom: 60px;
    }
    aside:nth-of-type(1) > :global(svg:nth-of-type(5)) {
      margin-bottom: 220px;
    }
  }
  @media screen and (min-width: 1165px) and (max-width: 1220px) {
    aside:nth-of-type(1) > :global(svg) {
      margin-bottom: 60px;
    }
    aside:nth-of-type(1) > :global(svg:nth-of-type(5)) {
      margin-bottom: 190px;
    }
  }
  @media screen and (min-width: 1220px) and (max-width: 1280px) {
    aside:nth-of-type(1) > :global(svg) {
      margin-bottom: 60px;
    }
    aside:nth-of-type(1) > :global(svg:nth-of-type(5)) {
      margin-bottom: 150px;
    }
  }
  @media screen and (min-width: 1280px) {
    aside:nth-of-type(1) > :global(svg:nth-of-type(5)) {
      margin-bottom: 120px;
    }
  }
  @media print, screen and (min-width: 0px) and (max-width: 1024px) {
    aside:nth-of-type(1) > :global(svg) {
      display: inline-flex;
      margin: 5px 10px;
      flex-wrap: wrap;
    }
    aside:nth-of-type(1) {
      order: 3;
      margin: 0 auto;
      text-align: center;
    }
    section {
      order: 1;
    }
    aside:nth-of-type(2) {
      order: 2;
    }
  }
`;
