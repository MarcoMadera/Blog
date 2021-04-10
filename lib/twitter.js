import ReactDOMServer from "react-dom/server";
import Markdown from "../components/Markdown";
import {
  instructions,
  renderers,
} from "../components/Markdown/instructions/posts";
import { TweetsMapContextProvider } from "../context/TweetsMapContext";

const needle = require("needle");
const API_URL = "https://api.twitter.com";

async function getTweetData(id) {
  const params = {
    "tweet.fields": "attachments,entities,created_at,public_metrics",
    "user.fields": "username,profile_image_url,verified",
    "media.fields": "type,url,preview_image_url",
    "poll.fields": "id,voting_status,duration_minutes,end_datetime",
    expansions: "author_id,attachments.media_keys,attachments.poll_ids",
  };
  const res = await needle("get", `${API_URL}/2/tweets/${id}`, params, {
    headers: {
      "User-Agent": "v2TweetLookupJS",
      authorization: `Bearer ${process.env.TWITTER_API_TOKEN}`,
    },
  });
  const jsonred = await res.body;
  if (!res.body) {
    console.error(`Fetch tweet with id: "${id}" failed`);
    return;
  }
  if (res.body) {
    const media = jsonred?.includes?.media || null;
    const polls = jsonred?.includes?.polls ? jsonred?.includes?.polls[0] : null;
    const user = jsonred?.includes?.users || null;
    const tweet = jsonred.data || null;
    return {
      media,
      polls,
      user,
      tweet,
    };
  }
  return null;
}

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
      <Markdown
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
