export interface IMention {
  type: string;
  author: {
    name: string;
    photo: string;
    url: string;
    type: string;
  };
  published?: string;
  "repost-of"?: string;
  "like-of"?: string;
  "mention-of"?: string;
  "in-reply-to"?: string;
  url: string;
  "wm-id": string;
  "wm-property": string;
  "wm-source": string;
  "wm-target": string;
  "wm-received": string;
  "wm-private": string;
  rels: { canonical: string }[];
  name?: string;
  content?: {
    html: string;
    text: string;
  };
}

export interface IMentions {
  children: IMention[];
  type: string;
  name: string;
}
