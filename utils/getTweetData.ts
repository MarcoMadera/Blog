import type { SpaceData, TweetData, TweetResponse } from "types/tweet";
import getSpaceData from "./getSpaceData";
import {
  TWITTER_API_BASE_URL,
  TWITTER_API_GET_PARAMS,
  TWITTER_API_TOKEN,
} from "./constants";

export default async function getTweetData(
  id: string,
  options: { ignoreTweet: boolean; hideConversation: boolean }
): Promise<TweetData | null> {
  const { ignoreTweet = false, hideConversation = false } = options;

  const params = new URLSearchParams(TWITTER_API_GET_PARAMS);

  try {
    const res = await fetch(
      `${TWITTER_API_BASE_URL}/2/tweets/${id}?${params}`,
      {
        method: "GET",
        headers: {
          "User-Agent": "v2TweetLookupJS",
          authorization: `Bearer ${TWITTER_API_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Fetch tweet with id: "${id}" failed`);
    }

    const tweetResponse: TweetResponse = await res.json();
    if (!tweetResponse.data) return null;
    const tweet = tweetResponse.data;
    const media = tweetResponse.includes?.media || null;
    const urls = tweet.entities?.urls || null;
    const urlsIsArray = Array.isArray(urls) && urls.length > 0;
    const urlPreview = urlsIsArray
      ? urls.filter((url) => url?.status === 200)[urls.length - 1] ?? null
      : null;
    const poll = tweetResponse.includes?.polls
      ? tweetResponse.includes?.polls[0]
      : null;
    const user = tweetResponse.includes?.users || null;
    const spaceId =
      tweet.entities?.urls?.map((url) => {
        if (url.expanded_url.startsWith("https://twitter.com/i/spaces/")) {
          return url.expanded_url.split("/spaces/")[1].split("/")[0];
        }
        return null;
      })[0] || null;
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
    let spaceTweet: SpaceData | null = null;

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
    if (spaceId) {
      const res = await getSpaceData(spaceId);
      spaceTweet = res;
    }

    return {
      media,
      poll,
      user,
      tweet,
      quotedTweet,
      repliedTweet,
      spaceTweet,
      urlPreview,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}
