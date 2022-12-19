import { ItraktTVShowData, ITVFanArt, ITVShowData } from "types/about";

export async function getTVShows(): Promise<ITVShowData[]> {
  const showsRes = await fetch(
    "https://api.trakt.tv/users/marcomadera/watched/shows?extended=noseasons&limit=2&page=1",
    {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": process.env.NEXT_PUBLIC_TRAKT_CLIENT_ID as string,
      },
    }
  );
  const fanArtPromises: Promise<Response>[] = [];
  if (!showsRes.ok) return [];

  const showData: ItraktTVShowData[] = await showsRes.json();
  showData.slice(0, 10).forEach(async (show) => {
    const fanArtPromise = fetch(
      `http://webservice.fanart.tv/v3/tv/${show.show.ids.tvdb}?api_key=${process.env.FAN_ART_TV_API_KEY}`
    );
    fanArtPromises.push(fanArtPromise);
  });
  const allPromises = await Promise.allSettled(fanArtPromises);
  const tvShows: ITVShowData[] = await Promise.all(
    allPromises.map((res, index) => {
      const currentShow = showData[index];
      if (res.status === "fulfilled") {
        return res.value.json().then((data: ITVFanArt) => ({
          ...currentShow,
          fanArt: data,
        }));
      }
      return currentShow;
    })
  );
  return tvShows;
}
