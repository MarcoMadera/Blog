import { tweets } from "../../../styles/theme";

export default function Skeleton({ children, style }) {
  return (
    <span style={style}>
      {children}
      <style global jsx>{`
        span {
          display: block;
          width: 100%;
          border-radius: 5px;

          background-image: linear-gradient(
            270deg,
            ${tweets.accents1},
            ${tweets.accents2},
            ${tweets.accents2},
            ${tweets.accents1}
          );
          background-size: 400% 100%;
          animation: loading 8s ease-in-out infinite;
        }

        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </span>
  );
}
