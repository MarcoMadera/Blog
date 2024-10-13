import { numberBetweenRange } from "utils";
import { siteMetadata } from "site.config";
import { ReactElement, useCallback, useEffect, useState } from "react";
import AboutLayout from "../../layouts/About";
import { GetServerSideProps } from "next";
import type { SongData, NowPlaying } from "types/spotify";
import { ITVShowData, IChessData, ReadingLog } from "types/about";
import useAnalytics from "hooks/useAnalytics";
import { ApiError } from "next/dist/server/api-utils";
import { HitType } from "types/analytics";
import { getTVShows } from "utils/getTvShows";
import { fetchWithTimeout } from "utils/fetchWithTimeout";

interface AboutProps {
  nowPlaying: NowPlaying | null;
  topTracks: SongData[] | null;
  recentlyPlayed: SongData | null;
  tvShows: ITVShowData[] | null;
  chess: IChessData | null;
  currentlyReading: ReadingLog | null;
}

const NOW_PLAYING_ENDPOINT = `${siteMetadata.siteUrl}/api/now-playing`;
const TOP_TRACKS_ENDPOINT = `${siteMetadata.siteUrl}/api/top-tracks`;
const RECENTLY_PLAYED_ENDPOINT = `${siteMetadata.siteUrl}/api/recently-played`;
const CHESS_ENDPOINT = "https://lichess.org/api/user/MarcoMadera";
const CURRENTLY_READING_ENDPOINT =
  "https://openlibrary.org/people/marcomadera/books/currently-reading.json";

export default function About({
  nowPlaying,
  topTracks,
  recentlyPlayed,
  tvShows,
  chess,
  currentlyReading,
}: Readonly<AboutProps>): ReactElement {
  useAnalytics("sobre-mi");
  const [newNowPlaying, setNewNowPlaying] = useState(
    nowPlaying?.listening ? nowPlaying : recentlyPlayed
  );
  const [newTopTracks, setNewTopTracks] = useState<SongData[] | null>(
    topTracks
  );
  const { trackWithGoogleAnalytics } = useAnalytics();

  const reqNowPlaying = useCallback(async () => {
    try {
      const nowPlayingProm: Promise<Response> = fetch(NOW_PLAYING_ENDPOINT);
      const recentlyPlayedProm: Promise<Response> = fetch(
        RECENTLY_PLAYED_ENDPOINT
      );

      const [nowPlayingRes, recentlyPlayedRes] = await Promise.all([
        nowPlayingProm,
        recentlyPlayedProm,
      ]);

      if (!nowPlayingRes.ok || !recentlyPlayedRes.ok) {
        throw new Error("Error fetching now playing");
      }

      const nowPlaying: NowPlaying = await nowPlayingRes.json();
      const recentlyPlayed: SongData = await recentlyPlayedRes.json();

      setNewNowPlaying(nowPlaying.listening ? nowPlaying : recentlyPlayed);
    } catch (error: unknown) {
      const responseError = error as ApiError;
      trackWithGoogleAnalytics(HitType.EXCEPTION, {
        exDescription: responseError.message,
        exFatal: "0",
      });
    }
  }, [trackWithGoogleAnalytics]);

  const reqTopTracks = useCallback(async () => {
    try {
      const topTracksProm: Promise<Response> = fetch(TOP_TRACKS_ENDPOINT);

      const [topTracksRes] = await Promise.all([topTracksProm]);

      if (!topTracksRes.ok) {
        throw new Error("Error fetching top tracks");
      }

      const topTracks: SongData[] = await topTracksRes.json();

      setNewTopTracks(topTracks);
    } catch (error: unknown) {
      const responseError = error as ApiError;
      trackWithGoogleAnalytics(HitType.EXCEPTION, {
        exDescription: responseError.message,
        exFatal: "0",
      });
    }
  }, [trackWithGoogleAnalytics]);

  useEffect(() => {
    const updateNowPlaying = setInterval(
      () => {
        if (!topTracks) {
          reqTopTracks();
        }
        reqNowPlaying();
      },
      numberBetweenRange(60000, 90000)
    );
    return () => clearInterval(updateNowPlaying);
  }, [reqNowPlaying, reqTopTracks, topTracks]);

  return (
    <AboutLayout
      newNowPlaying={newNowPlaying}
      topTracks={newTopTracks}
      tvShows={tvShows}
      chess={chess}
      currentlyReading={currentlyReading}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const nowPlayingProm: Promise<Response> =
    fetchWithTimeout(NOW_PLAYING_ENDPOINT);
  const topTracksProm: Promise<Response> =
    fetchWithTimeout(TOP_TRACKS_ENDPOINT);
  const recentlyPlayedProm: Promise<Response> = fetchWithTimeout(
    RECENTLY_PLAYED_ENDPOINT
  );
  const chessProm: Promise<Response> = fetchWithTimeout(CHESS_ENDPOINT);
  const currentlyReadingProm: Promise<Response> = fetchWithTimeout(
    CURRENTLY_READING_ENDPOINT
  );
  const tvShowsPromise = getTVShows();

  try {
    const [
      nowPlayingRes,
      topTracksRes,
      recentlyPlayedRes,
      chessRes,
      currentlyReadingRes,
      tvShowsRes,
    ] = await Promise.allSettled([
      nowPlayingProm,
      topTracksProm,
      recentlyPlayedProm,
      chessProm,
      currentlyReadingProm,
      tvShowsPromise,
    ]);

    return {
      props: {
        nowPlaying:
          nowPlayingRes.status === "fulfilled"
            ? await nowPlayingRes.value.json()
            : null,
        topTracks:
          topTracksRes.status === "fulfilled"
            ? await topTracksRes.value.json()
            : null,
        recentlyPlayed:
          recentlyPlayedRes.status === "fulfilled"
            ? await recentlyPlayedRes.value.json()
            : null,
        chess:
          chessRes.status === "fulfilled" ? await chessRes.value.json() : null,
        currentlyReading:
          currentlyReadingRes.status === "fulfilled"
            ? await currentlyReadingRes.value.json()
            : null,
        tvShows: tvShowsRes.status === "fulfilled" ? tvShowsRes.value : null,
      },
    };
  } catch (error) {
    return {
      props: {
        nowPlaying: null,
        topTracks: null,
        recentlyPlayed: null,
        tvShows: null,
        chess: null,
      },
    };
  }
};
