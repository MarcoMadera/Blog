import { numberBetweenRange } from "utils";
import { siteMetadata } from "site.config";
import { ReactElement, useCallback, useEffect, useState } from "react";
import AboutLayout from "../../layouts/About";
import { GetServerSideProps } from "next";
import type { SongData, NowPlaying } from "types/spotify";
import {
  ITVShowData,
  ItraktTVShowData,
  ITVFanArt,
  IChessData,
  ReadingLog,
} from "types/about";
import useAnalytics from "hooks/useAnalytics";
import { ApiError } from "next/dist/server/api-utils";
import { HitType } from "types/analytics";

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
}: AboutProps): ReactElement {
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
    const updateNowPlaying = setInterval(() => {
      if (!topTracks) {
        reqTopTracks();
      }
      reqNowPlaying();
    }, numberBetweenRange(60000, 90000));
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
  const nowPlayingProm: Promise<Response> = fetch(NOW_PLAYING_ENDPOINT);
  const topTracksProm: Promise<Response> = fetch(TOP_TRACKS_ENDPOINT);
  const recentlyPlayedProm: Promise<Response> = fetch(RECENTLY_PLAYED_ENDPOINT);
  const chessProm: Promise<Response> = fetch(CHESS_ENDPOINT);
  const currentlyReadingProm: Promise<Response> = fetch(
    CURRENTLY_READING_ENDPOINT
  );
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
  let tvShows: ITVShowData[] = [];
  if (showsRes.ok) {
    const showData: ItraktTVShowData[] = await showsRes.json();
    showData.slice(0, 10).forEach(async (show) => {
      const fanArtPromise = fetch(
        `http://webservice.fanart.tv/v3/tv/${show.show.ids.tvdb}?api_key=${process.env.FAN_ART_TV_API_KEY}`
      );
      fanArtPromises.push(fanArtPromise);
    });
    const allPromises = await Promise.allSettled(fanArtPromises);
    tvShows = await Promise.all(
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
  }

  try {
    const [
      nowPlayingRes,
      topTracksRes,
      recentlyPlayedRes,
      chessRes,
      currentlyReadingRes,
    ] = await Promise.allSettled([
      nowPlayingProm,
      topTracksProm,
      recentlyPlayedProm,
      chessProm,
      currentlyReadingProm,
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
        tvShows: tvShows,
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
