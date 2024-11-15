let baseUrl, socketUrl;
if (process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:8000/api/v1";
  socketUrl = "http://localhost:8000";
}
if (process.env.NODE_ENV === "production") {
  baseUrl = "https://songs-heaven-server1.vercel.app/api/v1";
  socketUrl = "https://songs-heaven-server1.vercel.app";
}
export { baseUrl, socketUrl };

export const jioBaseUrl = "https://saavn.dev";

const ENDPOINTS = {
  GOOGLESINGIN: `${baseUrl}/auth/google`,
  SIGNIN: `${baseUrl}/auth/login`,
  SIGNUP: `${baseUrl}/auth/register`,
  LOGOUT: `${baseUrl}/auth/logout`,
  VERIFY: `${baseUrl}/auth/verify`,

  ADDTOFAV: `${baseUrl}/favorites`,
  GETFAV: `${baseUrl}/favorites`,

  GLOBALSEARCH: `${jioBaseUrl}/api/search`,
  SONGSEARCH: `${jioBaseUrl}/api/search/songs`,
  ALBUMSEARCH: `${jioBaseUrl}/api/search/albums`,
  PLAYLISTSEARCH: `${jioBaseUrl}/api/search/playlists`,

  ALBUMBYID: `${jioBaseUrl}/api/albums`,
  PLAYLISTBYID: `${jioBaseUrl}/api/playlists`,
};

export default ENDPOINTS;
