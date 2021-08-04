import ReactDOMServer from "react-dom/server";
import Markdown from "components/Markdown";
import { DataMapContextProvider } from "context/DataMapContext";
import { getPlaiceholder } from "plaiceholder";
import { TweetData, TweetResponse } from "types/tweet";
import needle from "needle";
import { Images, Tweets } from "types/posts";

const API_URL = "https://api.twitter.com";

async function getTweetData(
  id: string,
  options: { ignoreTweet: boolean; hideConversation: boolean }
): Promise<TweetData | null> {
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

  const tweetResponse: TweetResponse = res.body;

  if (!tweetResponse) {
    console.error(`Fetch tweet with id: "${id}" failed`);
    return null;
  }

  if (tweetResponse) {
    const media = tweetResponse.includes?.media || null;
    const poll = tweetResponse.includes?.polls
      ? tweetResponse.includes?.polls[0]
      : null;
    const user = tweetResponse.includes?.users || null;
    const tweet = tweetResponse.data || null;
    let quotedTweetId = "";
    let repliedTweetId = "";

    if (Array.isArray(tweet.referenced_tweets)) {
      tweet.referenced_tweets.forEach(function ({ type, id }) {
        if (type === "quoted") {
          quotedTweetId = id;
        }
        if (type === "replied_to") {
          repliedTweetId = id;
        }
      });
    }

    let quotedTweet: TweetData | null = null;
    let repliedTweet: TweetData | null = null;

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
      poll,
      user,
      tweet,
      quotedTweet,
      repliedTweet,
    };
  }
  return null;
}

export default async function getElementsData(content: string): Promise<{
  tweets: Tweets;
  images: Images;
}> {
  const ids: { id: string; hideConversation: boolean }[] = [];
  const imgs: { src: { normal: string; full: string | undefined } }[] = [];

  const addTweet = (id: string, hideConversation: boolean) => {
    if (!ids.some((i) => i.id.includes(id))) {
      ids.push({ id, hideConversation });
    }
  };

  const addImage = (src: { normal: string; full: string | undefined }) => {
    if (!imgs.some((i) => i.src.normal.includes(src.normal))) {
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
      let fullImg = null;
      const { base64, img } = await getPlaiceholder(src.normal, {
        size: 10,
      });
      if (src.full) {
        const { base64, img } = await getPlaiceholder(src.full, {
          size: 10,
        });
        fullImg = { base64, img };
      }
      return { src, base64, img, fullImg };
    })
  );

  const tweets = tweetsData.reduce((result: Tweets, { id, data }) => {
    if (data) {
      result[id] = data;
    }
    return result;
  }, {});

  const images = imagesData.reduce(
    (result: Images, { src, base64, img, fullImg }) => {
      if (base64) {
        result[src.normal] = { img, base64, fullImg };
      }
      return result;
    },
    {}
  );

  return { tweets, images };
}
