import { getTopTracks } from "../../lib/spotify";

export default async function topTracks(_, res) {
  const { items } = await getTopTracks();
  const tracks = items.map((track) => ({
    artist: track.artists.map((_artist) => _artist.name).join(", "),
    songUrl: track.external_urls.spotify,
    title: track.name,
    cover: track.album.images[2].url,
  }));

  res.statusCode = 200;
  res.json(tracks);
}
