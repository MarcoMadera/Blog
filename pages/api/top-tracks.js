import { getTopTracks } from "../../lib/spotify";

export default async (_, res) => {
  const { items } = await getTopTracks();
  console.log(items);
  const tracks = items.slice(0, 10).map((track) => ({
    artist: track.artists.map((_artist) => _artist.name).join(", "),
    songUrl: track.external_urls.spotify,
    title: track.name,
  }));

  res.statusCode = 200;
  res.json({ tracks });
};
