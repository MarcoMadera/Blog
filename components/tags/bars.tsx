import { colors } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";
import { ReactElement, ReactNode } from "react";

interface MeterProps {
  children: ReactNode;
}

export function Meter({ children, ...attribs }: MeterProps): ReactElement {
  return (
    <>
      <meter {...attribs}>{children}</meter>
      <style jsx>
        {`
          meter {
            -moz-appearance: none;
            -webkit-appearance: none;
            appearance: meter;
            background: none;
            border: 1px solid ${colors.silverChalice};
            border-radius: 10px;
            display: block;
            margin: 0 auto;
            width: 100%;
          }
          meter::-moz-meter-bar {
            background: none;
          }
          /* 0% ~ 33% */
          meter:-moz-meter-sub-sub-optimum::-moz-meter-bar {
            background-image: linear-gradient(
              90deg,
              ${colors.lavaRed} 20%,
              ${colors.lavaRed} 100%
            );
            background-size: 100% 100%;
            border-radius: 10px;
          }
          /* 33% ~ 66% */
          meter:-moz-meter-sub-optimum::-moz-meter-bar {
            background-image: linear-gradient(
              90deg,
              ${colors.lavaRed} 20%,
              ${colors.lavaRed} 30%,
              ${colors.lavaRed} 40%,
              ${colors.dandelion} 60%,
              ${colors.dandelion} 100%
            );
            background-size: 100% 100%;
            border-radius: 10px;
          }
          /* 66% ~ 100% */
          meter:-moz-meter-optimum::-moz-meter-bar {
            background-image: linear-gradient(
              90deg,
              ${colors.lavaRed} 20%,
              ${colors.lavaRed} 30%,
              ${colors.lavaRed} 40%,
              ${colors.dandelion} 60%,
              ${colors.dandelion} 80%,
              ${colors.toxicGreen} 100%
            );
            background-size: 100% 100%;
            border-radius: 10px;
          }
          meter::-webkit-meter-bar {
            background: none;
            height: 18px;
          }
          /* 0% ~ 33% */
          meter::-webkit-meter-even-less-good-value {
            background-image: linear-gradient(
              90deg,
              ${colors.lavaRed} 20%,
              ${colors.lavaRed} 100%
            );
            background-size: 100% 100%;
            border-radius: 10px;
          }
          /* 33% ~ 66% */
          meter::-webkit-meter-suboptimum-value {
            background-image: linear-gradient(
              90deg,
              ${colors.lavaRed} 20%,
              ${colors.lavaRed} 30%,
              ${colors.lavaRed} 40%,
              ${colors.dandelion} 60%,
              ${colors.dandelion} 100%
            );
            background-size: 100% 100%;
            border-radius: 10px;
          }
          /* 66% ~ 100% */
          meter::-webkit-meter-optimum-value {
            background-image: linear-gradient(
              90deg,
              ${colors.lavaRed} 20%,
              ${colors.lavaRed} 30%,
              ${colors.lavaRed} 40%,
              ${colors.dandelion} 60%,
              ${colors.dandelion} 80%,
              ${colors.toxicGreen} 100%
            );
            background-size: 100% 100%;
            border-radius: 10px;
          }
        `}
      </style>
    </>
  );
}

interface ProgressProps {
  value?: string | number;
}
export function Progress({ value, ...attribs }: ProgressProps): ReactElement {
  const { darkMode } = useDarkMode();

  return (
    <progress value={value} {...attribs}>
      {value}
      <style jsx>{`
        progress {
          border: 1px solid ${colors.silverChalice};
          color: ${darkMode ? colors.deepCarminPink : colors.guardsmanRed};
        }
        progress:before {
          background: ${darkMode ? colors.deepCarminPink : colors.guardsmanRed};
        }
        progress::-moz-progress-bar {
          background: ${darkMode ? colors.deepCarminPink : colors.guardsmanRed};
        }
        progress::-webkit-progress-value {
          background: ${darkMode ? colors.deepCarminPink : colors.guardsmanRed};
        }
      `}</style>
      <style jsx>{`
        progress {
          appearance: none;
          -moz-appearance: none;
          -webkit-appearance: none;
          background: unset;
          background-size: auto;
          border-radius: 20px;
          width: 100%;
        }
        progress:after {
          background-image: none;
        }
        progress:before {
          border-radius: 20px;
        }
        progress::-moz-progress-bar {
          border-radius: 20px;
        }
        progress::-webkit-progress-bar {
          background: unset;
        }
        progress::-webkit-progress-value {
          border-radius: 20px;
        }
      `}</style>
    </progress>
  );
}
