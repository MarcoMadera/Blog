export type SongData = {
  artist: string;
  songUrl: string;
  title: string;
  cover: string;
  uri: string;
  explicit: boolean;
  preview?: string;
};

export interface ItraktTVShowData {
  plays: number;
  last_watched_at: string;
  last_updated_at: string;
  reset_at: string;
  show: {
    title: string;
    year: number;
    ids: {
      trakt: number;
      slug: string;
      tvdb: number;
      imdb: string;
      tmdb: number;
      tvrage: number;
    };
  };
}

interface IFanArt {
  id: string;
  lang: string;
  likes: string;
  url: string;
}

interface ISeasonArt extends IFanArt {
  season: string;
}

export interface ITVFanArt {
  name: string;
  characterart?: IFanArt[];
  hdclearart?: IFanArt[];
  hdtvlogo?: IFanArt[];
  seasonposter?: ISeasonArt[];
  seasonthumb?: ISeasonArt[];
  showbackground?: ISeasonArt[];
  tvbanner?: IFanArt[];
  tvposter?: IFanArt[];
  tvthumb?: IFanArt[];
}

export interface ITVShowData extends ItraktTVShowData {
  fanArt?: ITVFanArt;
}

export interface IChessPerf {
  games: number;
  rating: number;
  rd: number;
  prog?: number;
  prov?: boolean;
}
export interface IChessData {
  id: string;
  username: string;
  perfs: {
    bullet: IChessPerf;
    blitz: IChessPerf;
    atomic: IChessPerf;
    ultraBullet: IChessPerf;
    crazyhouse: IChessPerf;
    correspondence: IChessPerf;
    horde: IChessPerf;
    puzzle: IChessPerf;
    classical: IChessPerf;
    rapid: IChessPerf;
  };
  createdAt: number;
  profile: {
    links: string;
  };
  seenAt: number;
  playTime: {
    total: number;
    tv: number;
  };
  url: string;
  playing: string;
  count: {
    all: number;
    rated: number;
    ai: number;
    draw: number;
    drawH: number;
    loss: number;
    lossH: number;
    win: number;
    winH: number;
    bookmark: number;
    playing: number;
    me: number;
    import: number;
  };
  followable: boolean;
  following: boolean;
  blocking: boolean;
  followsYou: boolean;
}

export interface Work {
  title: string;
  key: string;
  author_keys: string[];
  author_names: string[];
  first_publish_year: number;
  lending_edition_s?: unknown;
  edition_key: string[];
  cover_id: number;
  cover_edition_key: string;
}

export interface ReadingLogEntry {
  work: Work;
  logged_edition?: unknown;
  logged_date: string;
}

export interface ReadingLog {
  page: number;
  reading_log_entries: ReadingLogEntry[];
}

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
