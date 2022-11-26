import { IMention } from "types/mentions";
import { TweetData } from "types/tweet";

export function getDefaultTweetDataFromMention(mention: IMention): TweetData {
  const source = mention.url || mention["wm-source"];
  return {
    tweet: {
      id: source.split("/").pop() || "",
      text: mention.content?.text || "",
      author_id: "",
      created_at: mention.published || "",
      public_metrics: {
        retweet_count: 0,
        reply_count: 0,
        like_count: 0,
        quote_count: 0,
      },
    },
    user: [
      {
        id: "",
        name: mention.author.name,
        username: mention.author.url.split("/").pop() || mention.author.name,
        profile_image_url: mention.author.photo,
        verified: false,
      },
    ],
    media: [],
    poll: null,
    quotedTweet: null,
    repliedTweet: null,
    spaceTweet: null,
    urlPreview: null,
  };
}
