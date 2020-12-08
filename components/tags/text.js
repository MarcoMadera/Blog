import { colors } from "../../styles/theme";
import PropTypes from "prop-types";

export const P = ({ children }) => {
  return (
    <p>
      {children}
      <style jsx>{`
        p {
          margin: 1em 0;
          line-height: 1.6;
        }
      `}</style>
    </p>
  );
};
export const Blockquote = ({ children }) => {
  return (
    <blockquote>
      {children}
      <style jsx>{`
        blockquote {
          border-left: 5px solid ${colors.primary};
          padding-left: 10px;
          margin-left: 30px;
          margin-right: 30px;
        }
        @media screen and (min-width: 0px) and (max-width: 500px) {
          blockquote {
            margin-left: 15px;
            margin-right: 15px;
          }
        }
      `}</style>
    </blockquote>
  );
};

P.propTypes = {
  children: PropTypes.node,
};
Blockquote.propTypes = {
  children: PropTypes.node,
};
