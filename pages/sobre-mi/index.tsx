import { numberBetweenRange } from "utils";
import { siteMetadata } from "site.config";
import { ReactElement, useCallback, useEffect, useState } from "react";
import AboutLayout from "../../layouts/About";
import { GetServerSideProps } from "next";
import { SongData, NowPlaying } from "types/spotify";
import useAnalytics from "hooks/useAnalytics";
import { ApiError } from "next/dist/server/api-utils";

interface AboutProps {
  nowPlaying: NowPlaying | null;
  topTracks: SongData[] | null;
  recentlyPlayed: SongData | null;
}

const NOW_PLAYING_ENDPOINT = `${siteMetadata.siteUrl}/api/now-playing`;
const TOP_TRACKS_ENDPOINT = `${siteMetadata.siteUrl}/api/top-tracks`;
const RECENTLY_PLAYED_ENDPOINT = `${siteMetadata.siteUrl}/api/recently-played`;

export default function About({
  nowPlaying,
  topTracks,
  recentlyPlayed,
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
      trackWithGoogleAnalytics("exception", {
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
      trackWithGoogleAnalytics("exception", {
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

  return <AboutLayout newNowPlaying={newNowPlaying} topTracks={newTopTracks} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const nowPlayingProm: Promise<Response> = fetch(NOW_PLAYING_ENDPOINT);
  const topTracksProm: Promise<Response> = fetch(TOP_TRACKS_ENDPOINT);
  const recentlyPlayedProm: Promise<Response> = fetch(RECENTLY_PLAYED_ENDPOINT);

  const [nowPlayingRes, topTracksRes, recentlyPlayedRes] = await Promise.all([
    nowPlayingProm,
    topTracksProm,
    recentlyPlayedProm,
  ]);

  try {
    const nowPlaying: NowPlaying = await nowPlayingRes.json();
    const topTracks: SongData[] = await topTracksRes.json();
    const recentlyPlayed: SongData = await recentlyPlayedRes.json();

    return {
      props: {
        nowPlaying,
        topTracks,
        recentlyPlayed,
      },
    };
  } catch (error) {
    return {
      props: {
        nowPlaying: null,
        topTracks: null,
        recentlyPlayed: null,
      },
    };
  }
};
