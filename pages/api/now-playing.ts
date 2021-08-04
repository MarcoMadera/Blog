import { getNowPlaying } from "lib/spotify";
import { NowPlaying } from "types/spotify";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function nowPlaying(
  _: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const response = await getNowPlaying();
  let track: Partial<NowPlaying> = {};
  if (response.currently_playing_type === "track") {
    track = {
      artist: response.item?.artists.map((_artist) => _artist.name).join(", "),
      songUrl: response.item?.external_urls.spotify,
      title: response.item?.name,
      cover: response.item?.album.images[2].url,
      listening: response.is_playing,
    };
  }

  res.statusCode = 200;
  res.json(track);
}
