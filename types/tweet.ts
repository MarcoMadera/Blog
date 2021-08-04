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

export interface User {
  id: string;
  profile_image_url: string;
  verified: boolean;
  name: string;
  username: string;
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
    mentions?: {
      start: number;
      end: number;
      username: string;
      id: string;
    }[];
    annotations?: {
      start: number;
      end: number;
      probability: number;
      type: string;
      normalized_text: string;
    }[];
    urls?: {
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
    }[];
  };
  referenced_tweets?: {
    type: "replied_to" | "quoted";
    id: string;
  }[];
  quotedTweet?: Tweet;
  repliedTweet?: Tweet;
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
}
