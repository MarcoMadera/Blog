import { colors } from "../../styles/theme";

// eslint-disable-next-line react/prop-types
export const Meter = (props) => {
  return (
    <>
      <meter {...props}>{props.children}</meter>
      <style jsx>
        {`
          meter {
            display: block;
            margin: 0 auto;
            width: 100%;
            -webkit-appearance: none;
            appearance: meter;
            -moz-appearance: none;
            border: 1px solid #ccc;
            border-radius: 10px;
            background: none;
            background-color: ${colors.white};
          }
          meter::-webkit-meter-bar {
            background: none;
            background-color: ${colors.white};
            height: 18px;
          }
          meter::-moz-meter-bar {
            background: none;
            background-color: ${colors.white};
          }
          meter:-moz-meter-sub-sub-optimum::-moz-meter-bar {
            border-radius: 10px;
            background-image: linear-gradient(90deg, #dd2121 20%, #dd4921 100%);
            background-size: 100% 100%;
          }
          meter::-webkit-meter-even-less-good-value {
            background-image: linear-gradient(90deg, #dd2121 20%, #dd4921 100%);
            background-size: 100% 100%;
            border-radius: 10px;
          }
          meter:-moz-meter-sub-optimum::-moz-meter-bar {
            border-radius: 10px;
            background-image: linear-gradient(
              90deg,
              #dd2121 20%,
              #dd2121 30%,
              #df5535 40%,
              #f2db34 60%,
              #f2db34 100%
            );
            background-size: 100% 100%;
          }
          meter::-webkit-meter-suboptimum-value {
            border-radius: 10px;
            background-image: linear-gradient(
              90deg,
              #dd2121 20%,
              #dd2121 30%,
              #df5535 40%,
              #f2db34 60%,
              #f2db34 100%
            );
            background-size: 100% 100%;
          }
          meter:-moz-meter-optimum::-moz-meter-bar {
            background-image: linear-gradient(
              90deg,
              #dd2121 20%,
              #dd2121 30%,
              #df5535 40%,
              #f2db34 60%,
              #f2db34 80%,
              #72e13a 100%
            );
            background-size: 100% 100%;
            border-radius: 10px;
          }
          meter::-webkit-meter-optimum-value {
            border-radius: 10px;
            background-image: linear-gradient(
              90deg,
              #dd2121 20%,
              #dd2121 30%,
              #df5535 40%,
              #f2db34 60%,
              #f2db34 80%,
              #72e13a 100%
            );
            background-size: 100% 100%;
          }
        `}
      </style>
    </>
  );
};

export const Progress = (props) => {
  return (
    <progress {...props}>
      {props.value}
      <style jsx>{`
        progress,
        progress[role] {
          appearance: none;
          -moz-appearance: none;
          -webkit-appearance: none;
          border: none;
          background-size: auto;
          width: 100%;
          border: 1px solid ${colors.gray};
          border-radius: 20px;
        }
        progress[role]:after {
          background-image: none;
        }
        progress[role] strong {
          display: none;
        }
        progress,
        progress[role][aria-valuenow] {
          background: unset !important;
        }
        progress::-webkit-progress-bar {
          background: unset;
        }
        progress {
          color: ${colors.primary};
          border-radius: 20px;
        }
        progress::-moz-progress-bar {
          background: ${colors.primary};
          border-radius: 20px;
        }
        progress::-webkit-progress-value {
          background: ${colors.primary};
          border-radius: 20px;
        }
        progress[aria-valuenow]:before {
          background: ${colors.primary};
          border-radius: 20px;
        }
      `}</style>
    </progress>
  );
};
