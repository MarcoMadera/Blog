export type SongData = {
  artist: string;
  songUrl: string;
  title: string;
  cover: string;
};

export interface NowPlaying extends SongData {
  listening?: boolean;
}

type Artist = {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

type Image = {
  height: number;
  url: string;
  width: number;
};

type ExternalUrls = {
  spotify: string;
};

type Album = {
  album_type: string;
  artists: Artist[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
};

type Track = {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
};

export interface CurrentlyPlaying {
  timestamp: number;
  context: {
    external_urls: ExternalUrls;
    href: string;
    type: string;
    uri: string;
  };
  progress_ms: number;
  item: {
    album: Album;
    artists: Artist[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
      isrc: string;
    };
    external_urls: ExternalUrls;
    href: string;
    id: string;
    is_local: boolean;
    is_playable: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
  };
  currently_playing_type: string;
  actions: {
    disallows: {
      resuming: boolean;
      skipping_prev: boolean;
    };
  };
  is_playing: boolean;
}

export interface RecentlyPlayed {
  items: {
    track: Track;
    played_at: string;
    context: {
      external_urls: ExternalUrls;
      href: string;
      type: string;
      uri: string;
    };
  }[];
  next: string;
  cursors?: {
    after: string;
    before: string;
  };
  limit: number;
  href: string;
}

export interface TopTracks {
  items: Track[];
  next: string;
  total: number;
  limit: number;
  offset: number;
  href: string;
}
