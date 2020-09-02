import { getNowPlaying } from "../../lib/spotify";

export default async (_, res) => {
  let response = await getNowPlaying();
  if (response.currently_playing_type !== "track") response = {};
  res.statusCode = 200;
  res.json({ response });
};
