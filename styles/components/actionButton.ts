import css from "styled-jsx/css";
import { colors } from "styles/theme";

export const actionButtonStyle = css`
  :global(.actionButton) {
    margin-top: 0;
    align-items: center;
    justify-content: center;
    user-select: none;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-property: color, background-color, border-color,
      text-decoration-color, fill, stroke, opacity, box-shadow, transform,
      filter, backdrop-filter, -webkit-backdrop-filter;
    transition-duration: 0.2s;
    text-transform: uppercase;
    text-decoration-line: none;
    line-height: 1em;
    min-height: 3rem;
    padding-left: 1rem;
    padding-right: 1rem;
    text-align: center;
    flex-wrap: wrap;
    font-size: 0.875rem;
    font-weight: 600;
    height: 3rem;
    cursor: pointer;
    display: inline-flex;
    margin-top: auto;
    flex: none;
    border-radius: 0.5rem;
  }
  :global(.actionButton):not(:disabled):not(.disabled):hover {
    background-color: ${colors.vetenianRed};
    border-color: ${colors.vetenianRed};
    color: ${colors.white};
    text-decoration: none;
  }
  :global(.actionButton):not(:disabled):not(.disabled):active {
    background-color: ${colors.vetenianRed};
    border-color: ${colors.vetenianRed};
    color: ${colors.white};
  }
  :global(.actionButton):not(:disabled):not(.disabled):focus {
    box-shadow: 0 0 0 0.2rem rgba(181, 0, 0, 0.3);
    outline: none;
  }
`;

export const darkActionButtonDynamicStyle = css`
  :global(.actionButton) {
    background-color: ${colors.deepCarminPink};
    border: 1px solid ${colors.dark};
    color: ${colors.white};
  }
`;

export const actionButtonDynamicStyle = css`
  :global(.actionButton) {
    background-color: ${colors.guardsmanRed};
    border: 1px solid ${colors.white};
    color: ${colors.white};
  }
`;
