import { getRecentlyPlayed } from "../../lib/spotify";

export default async function recentlyPlayed(_, res) {
  const response = await getRecentlyPlayed();
  const track = {
    artist: response.items[0].track.artists
      .map((_artist) => _artist.name)
      .join(", "),
    songUrl: response.items[0].track.external_urls.spotify,
    title: response.items[0].track.name,
    cover: response.items[0].track.album.images[2].url,
  };
  res.statusCode = 200;
  res.json(track);
}
