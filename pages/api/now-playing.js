import { getNowPlaying } from "../../lib/spotify";

export default async (_, res) => {
  const response = await getNowPlaying();

  res.statusCode = 200;
  res.json({ response });
};
