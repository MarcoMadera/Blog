import { useTweet } from "../lib/tweets";
import Node from "../static-tweet/node";
import components from "../static-tweet/components/";
import twitterTheme from "../static-tweet/components/twitter-layout/twitter.module.css";

export default function Tweet({ id, caption }) {
  const tweet = useTweet(id);

  // Happens when `getStaticProps` is traversing the tree to collect the tweet ids
  if (tweet.ignore) return null;

  return (
    <div className={twitterTheme.theme}>
      {tweet && <Node components={components} node={tweet.ast[0]} />}
      {caption != null ? <p>{caption}</p> : null}
      <style jsx>{`
        div {
          max-width: 598px;
          min-width: 220px;
          margin: 2rem auto;
        }
        p {
          font-size: 14px;
          color: #999;
          text-align: center;
          margin: 0;
          margin-top: 10px;
          padding: 0;
        }
        @media (max-width: 500px) {
          div {
            max-width: 300px;
          }
        }
      `}</style>
    </div>
  );
}
