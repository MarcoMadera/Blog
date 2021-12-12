import { SpaceData } from "types/tweet";

export default async function getSpaceData(
  id: string
): Promise<SpaceData | null> {
  const API_URL = "https://api.twitter.com";

  const paramsData = {
    "space.fields":
      "created_at,creator_id,started_at,ended_at,title,scheduled_start,is_ticketed,participant_count,state",
    "user.fields": "username,profile_image_url,verified",
    expansions: "creator_id,invited_user_ids,host_ids,speaker_ids",
  };

  const params = new URLSearchParams(paramsData);

  const res = await fetch(`${API_URL}/2/spaces/${id}?${params}`, {
    method: "GET",
    headers: {
      "User-Agent": "v2TweetLookupJS",
      authorization: `Bearer ${process.env.TWITTER_API_TOKEN}`,
    },
  });

  const spaceResponse = await res.json();
  return spaceResponse;
}
