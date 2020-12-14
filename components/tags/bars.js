import { colors } from "../../styles/theme";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "../Layout";
export const Meter = ({ children, ...attribs }) => {
  return (
    <>
      <meter {...attribs}>{children}</meter>
      <style jsx>
        {`
          meter {
            display: block;
            margin: 0 auto;
            width: 100%;
            -webkit-appearance: none;
            appearance: meter;
            -moz-appearance: none;
            border: 1px solid ${colors.accents1};
            border-radius: 10px;
            background: none;
          }
          meter::-webkit-meter-bar {
            background: none;
            height: 18px;
          }
          meter::-moz-meter-bar {
            background: none;
          }
          meter:-moz-meter-sub-sub-optimum::-moz-meter-bar {
            border-radius: 10px;
            background-image: linear-gradient(
              90deg,
              ${colors.red} 20%,
              ${colors.red} 100%
            );
            background-size: 100% 100%;
          }
          meter::-webkit-meter-even-less-good-value {
            background-image: linear-gradient(
              90deg,
              ${colors.red} 20%,
              ${colors.red} 100%
            );
            background-size: 100% 100%;
            border-radius: 10px;
          }
          meter:-moz-meter-sub-optimum::-moz-meter-bar {
            border-radius: 10px;
            background-image: linear-gradient(
              90deg,
              ${colors.red} 20%,
              ${colors.red} 30%,
              ${colors.red} 40%,
              ${colors.yellow} 60%,
              ${colors.yellow} 100%
            );
            background-size: 100% 100%;
          }
          meter::-webkit-meter-suboptimum-value {
            border-radius: 10px;
            background-image: linear-gradient(
              90deg,
              ${colors.red} 20%,
              ${colors.red} 30%,
              ${colors.red} 40%,
              ${colors.yellow} 60%,
              ${colors.yellow} 100%
            );
            background-size: 100% 100%;
          }
          meter:-moz-meter-optimum::-moz-meter-bar {
            background-image: linear-gradient(
              90deg,
              ${colors.red} 20%,
              ${colors.red} 30%,
              ${colors.red} 40%,
              ${colors.yellow} 60%,
              ${colors.yellow} 80%,
              ${colors.green} 100%
            );
            background-size: 100% 100%;
            border-radius: 10px;
          }
          meter::-webkit-meter-optimum-value {
            border-radius: 10px;
            background-image: linear-gradient(
              90deg,
              ${colors.red} 20%,
              ${colors.red} 30%,
              ${colors.red} 40%,
              ${colors.yellow} 60%,
              ${colors.yellow} 80%,
              ${colors.green} 100%
            );
            background-size: 100% 100%;
          }
        `}
      </style>
    </>
  );
};

export const Progress = ({ value, ...attribs }) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <progress value={value} {...attribs}>
      {value}
      <style jsx>{`
        progress,
        progress {
          appearance: none;
          -moz-appearance: none;
          -webkit-appearance: none;
          border: none;
          background-size: auto;
          width: 100%;
          border: 1px solid ${colors.accents1};
          border-radius: 20px;
        }
        progress:after {
          background-image: none;
        }
        progress strong {
          display: none;
        }
        progress,
        progress {
          background: unset !important;
        }
        progress::-webkit-progress-bar {
          background: unset;
        }
        progress {
          color: ${darkMode ? colors.dark_primary : colors.primary};
          border-radius: 20px;
        }
        progress::-moz-progress-bar {
          background: ${darkMode ? colors.dark_primary : colors.primary};
          border-radius: 20px;
        }
        progress::-webkit-progress-value {
          background: ${darkMode ? colors.dark_primary : colors.primary};
          border-radius: 20px;
        }
        progress:before {
          background: ${darkMode ? colors.dark_primary : colors.primary};
          border-radius: 20px;
        }
      `}</style>
    </progress>
  );
};

Meter.propTypes = {
  children: PropTypes.node,
};
Progress.propTypes = {
  value: PropTypes.node,
};
