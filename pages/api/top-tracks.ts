import { getTopTracks } from "lib/spotify";
import type { NextApiRequest, NextApiResponse } from "next";
import type { SongData } from "types/spotify";

export default async function topTracks(
  _: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const response = await getTopTracks();
  const items = response.items;

  if (!items) {
    res.json([]);
    return;
  }

  const tracks: Partial<SongData>[] = items.map((track) => ({
    artist: track.artists.map(({ name }) => name).join(", "),
    songUrl: track.external_urls.spotify,
    title: track.name,
    cover: track.album.images[2].url,
    uri: track.uri,
    preview: track?.preview_url,
    explicit: track?.explicit,
  }));

  res.statusCode = 200;
  res.json(tracks);
}
