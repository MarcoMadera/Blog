import ReactDOMServer from "react-dom/server";
import { TweetsMapContextProvider } from "../context/TweetsMapContext";
import MarkDown from "../components/Markdown/index";
import {
  instructions,
  renderers,
} from "../components/Markdown/instructions/posts";
import { getTweetData } from "./twitter";
export default async function getTweets(content) {
  const ids = [];
  const addTweet = (id) => {
    if (!ids.includes(id)) {
      ids.push(id);
    }
  };

  // Render the page once to populate `ids`
  ReactDOMServer.renderToString(
    <TweetsMapContextProvider addTweet={addTweet}>
      <MarkDown
        source={content}
        instructions={instructions}
        renderers={renderers}
        escapeHtml={false}
      />
    </TweetsMapContextProvider>
  );

  const tweetsData = await Promise.all(
    ids.map(async (id) => {
      const data = await getTweetData(id);
      return { id, data };
    })
  );
  const tweets = tweetsData.reduce((result, { id, data }) => {
    if (data) {
      result[id] = data;
    }
    return result;
  }, {});
  return tweets;
}
