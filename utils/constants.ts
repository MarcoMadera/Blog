export const TWITTER_API_BASE_URL = "https://api.twitter.com";
export const TWITTER_API_GET_PARAMS = Object.freeze({
  "tweet.fields":
    "attachments,entities,created_at,public_metrics,referenced_tweets,author_id,source,text",
  "user.fields": "username,profile_image_url,verified",
  "media.fields":
    "type,url,preview_image_url,media_key,duration_ms,height,width",
  "poll.fields": "id,voting_status,duration_minutes,end_datetime,options",
  expansions: "author_id,attachments.media_keys,attachments.poll_ids",
});
export const TWITTER_API_TOKEN = process.env.TWITTER_API_TOKEN;
