import querystring from "querystring";

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_SECRET_ID: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";

const TOP_TRACKS_ENDPOINT =
  "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10";

const SPOTIFY_URL_RECENTLY_PLAY =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

const getAuth = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

const refreshToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${getAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  const data = await response.json();

  return data.access_token;
};

export const getNowPlaying = async () => {
  const token = await refreshToken();
  const result = await fetch(NOW_PLAYING_ENDPOINT, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (result.status === 204) return {};

  const data = await result.json();
  return data;
};

export const getRecentlyPlayed = async () => {
  const token = await refreshToken();
  const result = await fetch(SPOTIFY_URL_RECENTLY_PLAY, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (result.status === 204) return {};

  const data = await result.json();
  return data;
};

export const getTopTracks = async () => {
  const token = await refreshToken();
  const result = await fetch(TOP_TRACKS_ENDPOINT, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (result.status === 204) return {};
  const data = await result.json();
  return data;
};
