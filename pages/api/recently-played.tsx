import { getRecentlyPlayed } from "lib/spotify";
import type { NextApiRequest, NextApiResponse } from "next";
import type { SongData } from "types/spotify";

export default async function recentlyPlayed(
  _: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const response = await getRecentlyPlayed();
  const firstTrack = response.items && response.items[0];
  if (!firstTrack) {
    res.json({});
    return;
  }
  const track: Partial<SongData> = {
    artist: firstTrack.track.artists.map((_artist) => _artist.name).join(", "),
    songUrl: firstTrack.track.external_urls.spotify,
    title: firstTrack.track.name,
    cover: firstTrack.track.album.images[2].url,
  };
  res.statusCode = 200;
  res.json(track);
}
