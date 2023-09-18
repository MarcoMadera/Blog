import type {
  ITweetSyndicationData,
  Media,
  QuotedTweet,
  SpaceData,
  Tweet,
  TweetData,
  TweetResponse,
  TweetVideo,
} from "types/tweet";
import getSpaceData from "./getSpaceData";
import {
  TWITTER_API_BASE_URL,
  TWITTER_API_GET_PARAMS,
  TWITTER_API_TOKEN,
} from "./constants";

interface IOptions {
  ignoreTweet: boolean;
  hideConversation: boolean;
}

async function getTweetWithAPI(id: string, options: IOptions) {
  const { ignoreTweet = false, hideConversation = false } = options;
  const params = new URLSearchParams(TWITTER_API_GET_PARAMS);
  const res = await fetch(`${TWITTER_API_BASE_URL}/2/tweets/${id}?${params}`, {
    method: "GET",
    headers: {
      "User-Agent": "v2TweetLookupJS",
      authorization: `Bearer ${TWITTER_API_TOKEN}`,
    },
  });

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
    video: null,
    poll,
    user,
    tweet,
    quotedTweet,
    repliedTweet,
    spaceTweet,
    urlPreview,
  };
}

function mapSingleTweet(data: ITweetSyndicationData | QuotedTweet) {
  const tweet: Tweet = {
    id: data.id_str,
    public_metrics: {
      like_count: data.favorite_count,
      reply_count: "conversation_count" in data ? data.conversation_count : 0,
      retweet_count: 0,
      quote_count: 0,
    },
    author_id: data.user.id_str,
    created_at: data.created_at,
    text: data.text,
    attachments: {
      media_keys: [],
      poll_ids: [],
    },
    entities: {
      annotations: [],
      mentions: data.entities.user_mentions,
    },
  };
  return tweet;
}

async function mapTweetData(data: ITweetSyndicationData, options: IOptions) {
  const { hideConversation } = options;
  const tweet = mapSingleTweet(data);
  let repliedTweet = null;
  let quotedTweet = null;

  if (data.quoted_tweet) {
    quotedTweet = await getTweetFromSyndication(data.quoted_tweet.id_str, {
      ignoreTweet: false,
      hideConversation,
    });
  }

  if (data.in_reply_to_status_id_str && !hideConversation) {
    repliedTweet = await getTweetFromSyndication(
      data.in_reply_to_status_id_str,
      {
        ignoreTweet: false,
        hideConversation,
      }
    );
  }

  const media: (Media | TweetVideo)[] | undefined = data.photos?.map(
    (photo): Media => ({
      type: "photo",
      media_key: photo.url,
      url: photo.url,
      height: photo.height,
      preview_image_url: photo.url,
      width: photo.width,
    })
  );

  if (data.video) {
    media?.push(data.video);
  }

  const tweetData: TweetData = {
    tweet,
    media: media ?? null,
    poll: null,
    quotedTweet: quotedTweet,
    repliedTweet: repliedTweet,
    spaceTweet: null,
    urlPreview: null,
    user: [
      {
        id: tweet.author_id,
        name: data.user.name,
        profile_image_url: data.user.profile_image_url_https,
        username: data.user.screen_name,
        verified: data.user.is_blue_verified || data.user.verified,
      },
    ],
  };

  return tweetData;
}

function getToken(id: string) {
  return ((Number(id) / 1e15) * Math.PI)
    .toString(6 ** 2)
    .replace(/(0+|\.)/g, "");
}

async function getTweetFromSyndication(id: string, options: IOptions) {
  const SYNDICATION_URL = "https://cdn.syndication.twimg.com";
  const url = new URL(`${SYNDICATION_URL}/tweet-result`);

  url.searchParams.set("id", id);
  url.searchParams.set("lang", "en");
  url.searchParams.set(
    "features",
    [
      "tfw_timeline_list:",
      "tfw_follower_count_sunset:true",
      "tfw_tweet_edit_backend:on",
      "tfw_refsrc_session:on",
      "tfw_fosnr_soft_interventions_enabled:on",
      "tfw_show_birdwatch_pivots_enabled:on",
      "tfw_show_business_verified_badge:on",
      "tfw_duplicate_scribes_to_settings:on",
      "tfw_use_profile_image_shape_enabled:on",
      "tfw_show_blue_verified_badge:on",
      "tfw_legacy_timeline_sunset:true",
      "tfw_show_gov_verified_badge:on",
      "tfw_show_business_affiliate_badge:on",
      "tfw_tweet_edit_frontend:on",
    ].join(";")
  );

  url.searchParams.set("token", getToken(id));

  const res = await fetch(url.toString(), {
    method: "GET",
  });
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson
    ? ((await res.json()) as ITweetSyndicationData)
    : undefined;

  if (res.ok && data) {
    const mappedTweetData = await mapTweetData(data, options);
    return mappedTweetData;
  }
  return null;
}

export default async function getTweetData(
  id: string,
  options: { ignoreTweet: boolean; hideConversation: boolean }
): Promise<TweetData | null> {
  try {
    if (TWITTER_API_TOKEN) {
      return await getTweetWithAPI(id, options);
    }

    return await getTweetFromSyndication(id, options);
  } catch (err) {
    console.error(err);
    return null;
  }
}
