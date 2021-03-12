/* eslint-disable react/prop-types */
import useTweet from "../hooks/useTweet";
import Node from "../static-tweet/node";
import components from "../static-tweet/components/";

export default function Tweet({ id, caption }) {
  const tweet = useTweet(id);

  // Happens when `getStaticProps` is traversing the tree to collect the tweet ids
  if (tweet.ignore) {
    return null;
  }

  return (
    <div>
      {tweet && <Node components={components} node={tweet.ast[0]} />}
      {caption != null ? <p>{caption}</p> : null}
      <style jsx>{`
        div {
          max-width: 550px;
          border-width: 1px;
          border-radius: 15px;
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
      `}</style>
    </div>
  );
}
