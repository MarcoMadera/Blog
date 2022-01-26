export interface Poll {
  id: string;
  duration_minutes: number;
  end_datetime: string;
  voting_status: "closed" | "open";
  options: {
    position: number;
    label: string;
    votes: number;
  }[];
}

export enum TwitterLinkType {
  HASHTAG = "#",
  MENTION = "@",
  CASHTAG = "$",
}

export interface User {
  id: string;
  profile_image_url: string;
  verified: boolean;
  name: string;
  username: string;
}
interface Mention {
  start: number;
  end: number;
  username: string;
  id: string;
}
interface Annotation {
  start: number;
  end: number;
  probability: number;
  type: string;
  normalized_text: string;
}
interface Url {
  start: number;
  end: number;
  url: string;
  expanded_url: string;
  display_url: string;
  images?: {
    url: string;
    width: number;
    height: number;
  }[];
  status?: number;
  title?: string;
  description?: string;
  unwound_url?: string;
}
export interface Tweet {
  id: string;
  public_metrics: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
  };
  text: string;
  author_id: string;
  created_at: string;
  attachments?: {
    poll_ids?: string[];
    media_keys?: string[];
  };
  entities?: {
    mentions?: Mention[];
    annotations?: Annotation[];
    urls?: Url[];
  };
  referenced_tweets?: {
    type: "replied_to" | "quoted";
    id: string;
  }[];
  quotedTweet?: Tweet;
  repliedTweet?: Tweet;
}

export interface SpaceData {
  data: {
    id: string;
    name: string;
    description?: string;
    is_ticketed: boolean;
    title: string;
    created_at: string;
    creator_id: string;
    scheduled_start: string;
    state?: "ended" | "started" | "scheduled";
    ended_at?: string;
    started_at?: string;
  };
  includes: {
    users: User[];
  };
}

export interface Media {
  url: string;
  height?: number;
  width?: number;
  preview_image_url?: string;
  media_key: string;
  type: "photo" | "video" | "animated_gif";
}

export interface TweetResponse {
  data: Tweet;
  includes?: {
    polls: Poll[];
    users: User[];
    media: Media[];
  };
}

export interface TweetData {
  media: Media[] | null;
  poll: Poll | null;
  user: User[] | null;
  tweet: Tweet;
  quotedTweet: TweetData | null;
  repliedTweet: TweetData | null;
  spaceTweet: SpaceData | null;
}
