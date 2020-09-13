import { getNowPlaying } from "../../lib/spotify";

export default async (_, res) => {
  const response = await getNowPlaying();
  let nowPlaying = {};
  if (response.currently_playing_type === "track") {
    nowPlaying = {
      artist: response.item.artists.map((_artist) => _artist.name).join(", "),
      songUrl: response.item.external_urls.spotify,
      title: response.item.name,
      cover: response.item.album.images[2].url,
      listening: response.is_playing,
    };
  }

  res.statusCode = 200;
  res.json(nowPlaying);
};
