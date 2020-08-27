import { getTopTracks } from "../../lib/spotify";

export default async (_, res) => {
  const { items } = await getTopTracks();
  const tracks = items.slice(0, 10).map((track) => ({
    artist: track.artists.map((_artist) => _artist.name).join(", "),
    songUrl: track.external_urls.spotify,
    title: track.name,
    cover: track.album.images[2].url,
  }));

  res.statusCode = 200;
  res.json({ tracks });
};
