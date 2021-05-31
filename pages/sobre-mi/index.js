import { numberBetween } from "utils/helpers";
import PropTypes from "prop-types";
import { siteMetadata } from "site.config";
import { useCallback, useEffect, useState } from "react";
import AboutLayout from "../../layouts/About";

export default function About({
  nowPlaying = {},
  topTracks = [],
  recentlyPlayed = {},
}) {
  const [newNowPlaying, setNewNowPlaying] = useState(
    Object.keys(nowPlaying).length > 0 ? nowPlaying : recentlyPlayed
  );
  const reqNowPlaying = useCallback(async () => {
    const nowPlaying = await fetch(
      `${siteMetadata.siteUrl}/api/now-playing`
    ).then((res) => {
      if (res.status !== 200) return;
      return res.json();
    });

    const recentlyPlayed = await fetch(
      `${siteMetadata.siteUrl}/api/recently-played`
    ).then((res) => {
      if (res.status !== 200) return;
      return res.json();
    });

    setNewNowPlaying(
      Object.keys(nowPlaying).length > 0 ? nowPlaying : recentlyPlayed
    );
  }, []);

  useEffect(() => {
    const updateNowPlaying = setInterval(
      () => reqNowPlaying(),
      numberBetween(60000, 90000)
    );
    return () => clearInterval(updateNowPlaying);
  }, [reqNowPlaying]);

  useEffect(() => {
    fetch("/api/views/page-sobre-mi", {
      method: "POST",
    });
  }, []);

  return <AboutLayout newNowPlaying={newNowPlaying} topTracks={topTracks} />;
}

export async function getServerSideProps() {
  const nowPlaying = await fetch(`${siteMetadata.siteUrl}/api/now-playing`)
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      if (res.status !== 200) return {};
      return res.json();
    })
    .catch((err) => {
      console.error(err);
      return {};
    });
  const topTracks = await fetch(`${siteMetadata.siteUrl}/api/top-tracks`)
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      if (res.status !== 200) return [];
      return res.json();
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
  const recentlyPlayed = await fetch(
    `${siteMetadata.siteUrl}/api/recently-played`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      if (res.status !== 200) return {};
      return res.json();
    })
    .catch((err) => {
      console.error(err);
      return {};
    });
  const [nowPlayingRes, topTracksRes, recentlyPlayedRes] = await Promise.all([
    nowPlaying,
    topTracks,
    recentlyPlayed,
  ]);
  return {
    props: {
      nowPlaying: nowPlayingRes,
      topTracks: topTracksRes,
      recentlyPlayed: recentlyPlayedRes,
    },
  };
}

About.propTypes = {
  nowPlaying: PropTypes.object,
  topTracks: PropTypes.array,
  recentlyPlayed: PropTypes.object,
};
