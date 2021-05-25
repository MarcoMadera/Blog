import ReactDOMServer from "react-dom/server";
import Markdown from "../components/Markdown";
import { TweetsMapContextProvider } from "../context/TweetsMapContext";

const needle = require("needle");
const API_URL = "https://api.twitter.com";

async function getTweetData(
  id,
  ignoreTweet = false,
  includeConversation = true
) {
  const params = {
    "tweet.fields":
      "attachments,entities,created_at,public_metrics,referenced_tweets",
    "user.fields": "username,profile_image_url,verified",
    "media.fields":
      "type,url,preview_image_url,media_key,duration_ms,height,width",
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
    let quotedTweetId = null;
    let repliedTweetId = null;
    if (Array.isArray(jsonred?.data?.referenced_tweets)) {
      jsonred.data.referenced_tweets.forEach(function (obj) {
        if (obj.type === "quoted") {
          quotedTweetId = obj.id;
        }
        if (obj.type === "replied_to") {
          repliedTweetId = obj.id;
        }
      });
    }
    let quotedTweet = null;
    let repliedTweet = null;
    if (quotedTweetId && !ignoreTweet) {
      const res = await getTweetData(quotedTweetId, true, includeConversation);
      quotedTweet = res;
    }
    if (repliedTweetId && includeConversation) {
      const res = await getTweetData(
        repliedTweetId,
        false,
        includeConversation
      );
      repliedTweet = res;
    }
    return {
      media,
      polls,
      user,
      tweet,
      quotedTweet,
      repliedTweet,
    };
  }
  return null;
}

export default async function getTweets(content) {
  const ids = [];
  const addTweet = (id, includeConversation) => {
    if (!ids.includes(id)) {
      ids.push({ id, includeConversation: includeConversation });
    }
  };

  // Render the page once to populate `ids`
  ReactDOMServer.renderToString(
    <TweetsMapContextProvider addTweet={addTweet}>
      <Markdown source={content} html={true} />
    </TweetsMapContextProvider>
  );

  const tweetsData = await Promise.all(
    ids.map(async ({ id, includeConversation }) => {
      const data = await getTweetData(id, false, includeConversation);
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
