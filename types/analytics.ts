export enum HitType {
  PAGEVIEW = "pageview",
  EVENT = "event",
  TIMING = "timing",
  SCREENVIEW = "screenview",
  TRANSACTION = "transaction",
  ITEM = "item",
  SOCIAL = "social",
  EXCEPTION = "exception",
}

interface Event {
  eventCategory: DataToSendType["ec"];
  eventAction: DataToSendType["ea"];
  eventLabel: DataToSendType["el"];
  eventValue: DataToSendType["ev"];
}

interface Screenview {
  screenName: DataToSendType["cd"];
}

interface Timing {
  timingCategory: DataToSendType["utc"];
  timingVar: DataToSendType["utv"];
  timingValue: DataToSendType["utt"];
  timingLabel: DataToSendType["utl"];
}

interface Exception {
  exDescription: DataToSendType["exd"];
  exFatal: DataToSendType["exf"];
}

interface Social {
  socialNetwork: DataToSendType["sn"];
  socialAction: DataToSendType["sa"];
  socialTarget: DataToSendType["st"];
}

export type DataToSendType = {
  v: string;
  tid: string;
  cid: string;
  aip: "1" | "0";
  ds: string;
  qt: string;
  uid: string;
  dr: string;
  cn: string;
  cs: string;
  cm: string;
  ck: string;
  cc: string;
  ci: string;
  sr: string;
  vp: string;
  de: string;
  sd: string;
  ul: string;
  je: "1" | "0";
  fl: string;
  ni: "1" | "0";
  dl: string;
  dh: string;
  dp: string;
  dt: string;
  cd: string;
  linkid: string;
  an: string;
  aid: string;
  av: string;
  aiid: string;
  cu: string;
  sc: string;
  t: string;
  ec: string;
  ea: string;
  el: string;
  ev: string;
  sn: string;
  sa: string;
  st: string;
  utc: string;
  utv: string;
  utt: string;
  utl: string;
  exd: string;
  exf: "1" | "0";
};

export type Fields =
  | Event
  | Screenview
  | Timing
  | Exception
  | Social
  | undefined;

export interface UseAnalyticsParams {
  trackWithGoogleAnalytics<T extends HitType>(
    hitType: HitType | T,
    fields: T extends HitType.EVENT
      ? Event
      : T extends HitType.SCREENVIEW
      ? Screenview
      : T extends HitType.SOCIAL
      ? Social
      : T extends HitType.EXCEPTION
      ? Exception
      : T extends HitType.TIMING
      ? Timing
      : undefined
  ): void;
  trackWithGoogleAnalytics(
    hitType?: HitType.PAGEVIEW | HitType.ITEM | HitType.TRANSACTION,
    fields?: undefined
  ): void;
  views: number | null;
}
