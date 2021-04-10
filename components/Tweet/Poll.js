import { Fragment } from "react";
import { tweets } from "../../styles/theme";
import PropTypes from "prop-types";

// Note: Poll data is most likely cached, so ongoing polls will not be updated
// until a revalidation happens
export const Poll = ({ data }) => {
  const votesCount = data.options.reduce(
    (count, option) => count + option.votes,
    0
  );
  const endsAt = new Date(data.end_datetime);
  const now = new Date();

  return (
    <div className="poll">
      <div className="options">
        {data.options.map((option) => {
          const per =
            +(Math.round((option.votes / votesCount) * 100 + "e+1") + "e-1") ||
            0;
          const width = per || 1;
          const widthLabel = per + "%";

          return (
            <Fragment key={option.position}>
              <span className="label">{option.label}</span>
              <span className="chart" style={{ width: `${width}%` }}></span>
              <span>{widthLabel}</span>
            </Fragment>
          );
        })}
      </div>
      <hr />
      <div className="footer">
        <span className="votes-count">{votesCount} votos</span>
        <span>{now > endsAt ? "Resultados finales" : "Encuesta en curso"}</span>
      </div>

      <style jsx>{`
        .poll {
          margin: ${tweets.pollMargin};
        }
        .options {
          display: grid;
          grid-template-columns: max-content 1fr max-content;
          align-items: center;
          grid-gap: 1rem;
          overflow: auto;
        }
        .label {
          overflow: auto;
          text-align: right;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .chart {
          height: 100%;
          background: ${tweets.pollBarColor};
          border-radius: 3px;
        }
        hr {
          border: 0;
          border-top: 1px solid ${tweets.accents2};
          margin: 1rem 0 0.5rem 0;
        }
        .footer {
          display: flex;
          font-size: 0.875rem;
          color: ${tweets.accents4};
        }
        .votes-count {
          flex-grow: 1;
        }
        @media screen and (max-width: 450px) {
          .options {
            grid-template-columns: max-content 7rem max-content;
          }
        }
      `}</style>
    </div>
  );
};

Poll.propTypes = {
  data: PropTypes.object,
};
