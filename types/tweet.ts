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
export interface Url {
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
    mentions?: Mention[] | UserMentionEntity[];
    annotations?: Annotation[];
    urls?: Url[];
  };
  referenced_tweets?: {
    type: "replied_to" | "quoted";
    id: string;
  }[];
  quotedTweet?: Tweet;
  repliedTweet?: Tweet;
  source?: string;
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
  media: (Media | TweetVideo)[] | null;
  poll: Poll | null;
  user: User[] | null;
  tweet: Tweet;
  quotedTweet: TweetData | null;
  repliedTweet: TweetData | null;
  spaceTweet: SpaceData | null;
  urlPreview: Url | null;
}

export interface TweetVideo {
  aspectRatio: [number, number];
  contentType: string;
  durationMs: number;
  mediaAvailability: {
    status: string;
  };
  poster: string;
  variants: {
    type: string;
    src: string;
  }[];
  videoId: {
    type: string;
    id: string;
  };
  viewCount: number;
}

export interface HashtagEntity {
  indices: Indices;
  text: string;
}

export interface UserMentionEntity {
  id_str: string;
  indices: Indices;
  name: string;
  screen_name: string;
}

export interface MediaEntity {
  display_url: string;
  expanded_url: string;
  indices: Indices;
  url: string;
}

export interface UrlEntity {
  display_url: string;
  expanded_url: string;
  indices: Indices;
  url: string;
}

export interface SymbolEntity {
  indices: Indices;
  text: string;
}

export interface TweetEntities {
  hashtags: HashtagEntity[];
  urls: UrlEntity[];
  user_mentions: UserMentionEntity[];
  symbols: SymbolEntity[];
  media?: MediaEntity[];
}

interface TweetBase {
  /**
   * Language code of the tweet. E.g "en", "es".
   */
  lang: string;
  /**
   * Creation date of the tweet in the format ISO 8601.
   */
  created_at: string;
  /**
   * Text range of the tweet text.
   */
  display_text_range: Indices;
  /**
   * All the entities that are part of the tweet. Like hashtags, mentions, urls, etc.
   */
  entities: TweetEntities;
  /**
   * The unique identifier of the tweet.
   */
  id_str: string;
  /**
   * The tweet text, including the raw text from the entities.
   */
  text: string;
  /**
   * Information about the user who posted the tweet.
   */
  user: TweetUser;
  /**
   * Edit information about the tweet.
   */
  edit_control: TweetEditControl;
  isEdited: boolean;
  isStaleEdit: boolean;
}

export interface TweetParent extends TweetBase {
  reply_count: number;
  retweet_count: number;
  favorite_count: number;
}
export interface TweetEditControl {
  edit_tweet_ids: string[];
  editable_until_msecs: string;
  is_edit_eligible: boolean;
  edits_remaining: string;
}

export interface TweetUser {
  id_str: string;
  name: string;
  profile_image_url_https: string;
  profile_image_shape: "Circle" | "Square";
  screen_name: string;
  verified: boolean;
  verified_type?: "Business" | "Government";
  is_blue_verified: boolean;
}

/**
 * A tweet quoted by another tweet.
 */
export interface QuotedTweet extends TweetBase {
  reply_count: number;
  retweet_count: number;
  favorite_count: number;
  self_thread: {
    id_str: string;
  };
}
export type Indices = [number, number];
interface MediaBase {
  display_url: string;
  expanded_url: string;
  ext_media_availability: {
    status: string;
  };
  ext_media_color: {
    palette: {
      percentage: number;
      rgb: RGB;
    }[];
  };
  indices: Indices;
  media_url_https: string;
  original_info: {
    height: number;
    width: number;
    focus_rects: Rect[];
  };
  sizes: {
    large: Size;
    medium: Size;
    small: Size;
    thumb: Size;
  };
  url: string;
}
export type RGB = {
  red: number;
  green: number;
  blue: number;
};

export type Rect = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type Size = {
  h: number;
  w: number;
  resize: string;
};
export interface MediaPhoto extends MediaBase {
  type: "photo";
  ext_alt_text?: string;
}

export interface MediaAnimatedGif extends MediaBase {
  type: "animated_gif";
  video_info: VideoInfo;
}

export interface MediaVideo extends MediaBase {
  type: "video";
  video_info: VideoInfo;
}

export type MediaDetails = MediaPhoto | MediaAnimatedGif | MediaVideo;
export interface VideoInfo {
  aspect_ratio: [number, number];
  variants: {
    bitrate?: number;
    content_type: "video/mp4" | "application/x-mpegURL";
    url: string;
  }[];
}

export interface TweetPhoto {
  backgroundColor: RGB;
  cropCandidates: Rect[];
  expandedUrl: string;
  url: string;
  width: number;
  height: number;
}

export interface ITweetSyndicationData extends TweetBase {
  __typename: "Tweet";
  favorite_count: number;
  mediaDetails?: MediaDetails[];
  photos?: TweetPhoto[];
  video?: TweetVideo;
  conversation_count: number;
  news_action_type: "conversation";
  quoted_tweet?: QuotedTweet;
  in_reply_to_screen_name?: string;
  in_reply_to_status_id_str?: string;
  in_reply_to_user_id_str?: string;
  parent?: TweetParent;
  possibly_sensitive?: boolean;
}
