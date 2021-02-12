import ReactDOMServer from "react-dom/server";
import fetchTweetAst from "../static-tweet/lib/fetchTweetAst";
import { TweetsMap } from "./tweets";
import MarkDown from "../components/Markdown";
import {
  instructions,
  renderers,
} from "../components/Markdown/instructions/posts";
export default async function getTweets(content) {
  const ids = [];
  const addTweet = (id) => {
    if (!ids.includes(id)) ids.push(id);
  };

  // Render the page once to populate `ids`
  ReactDOMServer.renderToString(
    <TweetsMap.Provider value={addTweet}>
      <MarkDown
        source={content}
        instructions={instructions}
        renderers={renderers}
      />
    </TweetsMap.Provider>
  );

  const tweetsData = await Promise.all(
    ids.map(async (id) => {
      const ast = await fetchTweetAst(id);
      return { id, ast };
    })
  );
  const tweets = tweetsData.reduce((result, { id, ast }) => {
    if (ast) result[id] = ast;
    return result;
  }, {});
  return tweets;
}
