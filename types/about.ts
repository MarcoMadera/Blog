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
