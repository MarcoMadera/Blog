import { numberBetweenRange } from "utils";
import { siteMetadata } from "site.config";
import { ReactElement, useCallback, useEffect, useState } from "react";
import AboutLayout from "../../layouts/About";
import { GetServerSideProps } from "next";
import { SongData, NowPlaying } from "types/spotify";
import useAnalitycs from "hooks/useAnalitycs";

interface AboutProps {
  nowPlaying: NowPlaying;
  topTracks: SongData[];
  recentlyPlayed: SongData;
}

const NOW_PLAYING_ENDPOINT = `${siteMetadata.siteUrl}/api/now-playing`;
const TOP_TRACKS_ENDPOINT = `${siteMetadata.siteUrl}/api/top-tracks`;
const RECENTLY_PLAYED_ENDPOINT = `${siteMetadata.siteUrl}/api/recently-played`;

export default function About({
  nowPlaying,
  topTracks,
  recentlyPlayed,
}: AboutProps): ReactElement {
  useAnalitycs("sobre-mi");
  const [newNowPlaying, setNewNowPlaying] = useState(
    nowPlaying.listening ? nowPlaying : recentlyPlayed
  );

  const reqNowPlaying = useCallback(async () => {
    const nowPlayingProm: Promise<Response> = fetch(NOW_PLAYING_ENDPOINT);
    const recentlyPlayedProm: Promise<Response> = fetch(
      RECENTLY_PLAYED_ENDPOINT
    );

    const [nowPlayingRes, recentlyPlayedRes] = await Promise.all([
      nowPlayingProm,
      recentlyPlayedProm,
    ]);

    const nowPlaying: NowPlaying = await nowPlayingRes.json();
    const recentlyPlayed: SongData = await recentlyPlayedRes.json();

    setNewNowPlaying(nowPlaying.listening ? nowPlaying : recentlyPlayed);
  }, []);

  useEffect(() => {
    const updateNowPlaying = setInterval(
      () => reqNowPlaying(),
      numberBetweenRange(60000, 90000)
    );
    return () => clearInterval(updateNowPlaying);
  }, [reqNowPlaying]);

  return <AboutLayout newNowPlaying={newNowPlaying} topTracks={topTracks} />;
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
};
