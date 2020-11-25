import Skeleton from "./skeleton";
import { tweets } from "../../../styles/theme";

export default function TweetSkeleton({ simple = false }) {
  return (
    <div className="container">
      <div className="content">
        <Skeleton style={{ height: "2.25rem" }} />
        <Skeleton style={{ height: "7rem", margin: "1.25rem 0" }} />
        <Skeleton style={{ height: "1.25rem" }} />
      </div>
      {simple ? null : (
        <div className="footer">
          <Skeleton style={{ height: "1.25rem" }} />
        </div>
      )}
      <style jsx>{`
        .container {
          background: ${tweets.tweetBgColor};
          border: ${tweets.tweetBorder};
          border-radius: 5px;
          margin: ${tweets.containerMargin};
        }
        .content {
          padding: 1.25rem 1.25rem 0.625rem 1.25rem;
        }
        .footer {
          height: 2.5rem;
          padding: 0.625rem 1.25rem;
          border-top: ${tweets.tweetBorder};
        }
      `}</style>
    </div>
  );
}
