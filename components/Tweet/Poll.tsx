import { Fragment, ReactElement, useEffect, useState } from "react";
import { tweets } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";
import type { Poll } from "types/tweet";
// Note: Poll data is most likely cached, so ongoing polls will not be updated
// until a revalidation happens

interface PollProps {
  poll: Poll;
}

export function TweetPoll({ poll }: PollProps): ReactElement {
  const { darkMode } = useDarkMode();
  const votesCount = poll.options.reduce(
    (count, option) => count + option.votes,
    0
  );
  const [endsAt, setendsAt] = useState<Date | undefined>(undefined);
  const [now, setNow] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (poll.end_datetime && window) {
      setendsAt(new Date(poll.end_datetime));
      setNow(new Date());
    }
  }, [poll.end_datetime]);

  return (
    <div className="poll">
      <div className="options">
        {poll.options.map((option) => {
          const per = +((option.votes / votesCount) * 100).toFixed(2) || 0;
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
        <span>
          {now &&
            endsAt &&
            (now > endsAt ? "Resultados finales" : "Encuesta en curso")}
        </span>
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
          border-top: ${darkMode ? "1px solid #45535d" : tweets.tweetBorder};
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
}
