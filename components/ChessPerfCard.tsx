import { ReactElement } from "react";
import { colors } from "styles/theme";
import { IChessPerf } from "types/about";
import { formatNumber } from "utils";
import ArrowDownRight from "./icons/ArrowDownRight";
import ArrowUpRight from "./icons/ArrowUpRight";

interface IChessPerfCardProps {
  title: string;
  perf: IChessPerf;
  icon: ReactElement;
  url: string;
}

export default function ChessPerfCard({
  title,
  perf,
  icon,
  url,
}: IChessPerfCardProps): ReactElement {
  return (
    <a className="card" href={url} target="_blank" rel="noreferrer">
      <div className="icon">{icon}</div>
      <div className="info">
        <h3>{title}</h3>
        <p>
          <strong aria-label="Rating">{perf.rating}</strong>{" "}
          {perf.prog && perf.prog > 0 ? (
            <span aria-label="Progreso">
              <ArrowUpRight
                fill={colors.shamrockGreen}
                width={16}
                height={16}
              />{" "}
              {perf.prog}
            </span>
          ) : perf.prog && perf.prog < 0 ? (
            <span aria-label="Progreso">
              <ArrowDownRight
                fill={colors.deepCarminPink}
                width={16}
                height={16}
              />{" "}
              {perf.prog}
            </span>
          ) : null}{" "}
          {formatNumber(perf.games)} juegos
        </p>
      </div>
      <style jsx>{`
        span {
          color: ${perf.prog && perf.prog > 0
            ? colors.shamrockGreen
            : colors.deepCarminPink};
        }
      `}</style>
      <style jsx>{`
        .card {
          display: grid;
          grid-template-columns: 48px 2fr;
          min-width: 240px;
          max-width: 400px;
          margin: 20px;
          color: inherit;
          text-decoration: none;
          border-radius: 8px;
          transition: box-shadow 0.2s ease;
          padding: 12px;
        }
        .icon {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .info {
          width: 100%;
        }
        h3 {
          font-size: 1.2em;
          font-weight: 400;
          margin: 0 0 10px;
        }
        p {
          font-size: 1em;
          font-weight: 400;
          margin: 0;
        }
        @media (max-width: 500px) {
          .card {
            margin: 0;
          }
        }
      `}</style>
    </a>
  );
}
