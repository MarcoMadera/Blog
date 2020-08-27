import { getRecentlyPlayed } from "../../lib/spotify";

export default async (_, res) => {
  const response = await getRecentlyPlayed();
  res.statusCode = 200;
  res.json({ response });
};
