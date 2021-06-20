import ReactDOMServer from "react-dom/server";
import Markdown from "components/Markdown";
import { DataMapContextProvider } from "context/DataMapContext";
import { getPlaiceholder } from "plaiceholder";

const needle = require("needle");
const API_URL = "https://api.twitter.com";

async function getTweetData(id, options) {
  const { ignoreTweet = false, hideConversation = false } = options;
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
      const res = await getTweetData(quotedTweetId, {
        ignoreTweet: true,
        hideConversation,
      });
      quotedTweet = res;
    }
    if (repliedTweetId && !hideConversation) {
      const res = await getTweetData(repliedTweetId, {
        ignoreTweet: false,
        hideConversation,
      });
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

export default async function getElementsData(content) {
  const ids = [];
  const imgs = [];
  const addTweet = (id, hideConversation) => {
    if (!ids.includes(id)) {
      ids.push({ id, hideConversation });
    }
  };
  const addImage = (src) => {
    if (!imgs.includes(src)) {
      imgs.push({ src });
    }
  };

  // Render the page once to populate `ids`
  ReactDOMServer.renderToString(
    <DataMapContextProvider addTweet={addTweet} addImage={addImage}>
      <Markdown source={content} html={true} />
    </DataMapContextProvider>
  );

  const tweetsData = await Promise.all(
    ids.map(async ({ id, hideConversation }) => {
      const data = await getTweetData(id, {
        ignoreTweet: false,
        hideConversation,
      });
      return { id, data };
    })
  );

  const imagesData = await Promise.all(
    imgs.map(async ({ src }) => {
      if (src) {
        const { base64, img } = await getPlaiceholder(src, {
          size: 10,
        });
        return { src, base64, img };
      }
      return null;
    })
  );

  const tweets = tweetsData.reduce((result, { id, data }) => {
    if (data) {
      result[id] = data;
    }
    return result;
  }, {});

  const images = imagesData.reduce((result, { src, base64, img }) => {
    if (base64) {
      result[src] = { img, base64 };
    }
    return result;
  }, {});
  return { tweets, images };
}
