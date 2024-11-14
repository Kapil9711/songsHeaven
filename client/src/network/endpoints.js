// export const baseUrl = "https://songsheaven.onrender.com/api/v1";
export const baseUrl = "http://localhost:8000/api/v1";
export const jioBaseUrl = "https://saavn.dev";
export const socketUrl = "http://localhost:8000";

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
};

export default ENDPOINTS;
