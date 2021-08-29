import { TweetData, TweetResponse } from "types/tweet";

export default async function getTweetData(
  id: string,
  options: { ignoreTweet: boolean; hideConversation: boolean }
): Promise<TweetData | null> {
  const API_URL = "https://api.twitter.com";
  const { ignoreTweet = false, hideConversation = false } = options;

  const paramsData = {
    "tweet.fields":
      "attachments,entities,created_at,public_metrics,referenced_tweets",
    "user.fields": "username,profile_image_url,verified",
    "media.fields":
      "type,url,preview_image_url,media_key,duration_ms,height,width",
    "poll.fields": "id,voting_status,duration_minutes,end_datetime",
    expansions: "author_id,attachments.media_keys,attachments.poll_ids",
  };

  const params = new URLSearchParams(paramsData);

  const res = await fetch(`${API_URL}/2/tweets/${id}?${params}`, {
    method: "GET",
    headers: {
      "User-Agent": "v2TweetLookupJS",
      authorization: `Bearer ${process.env.TWITTER_API_TOKEN}`,
    },
  });

  const tweetResponse: TweetResponse = await res.json();

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