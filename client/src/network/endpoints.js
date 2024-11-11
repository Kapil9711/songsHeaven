export const baseUrl = "https://songsheaven.onrender.com/api/v1";

const ENDPOINTS = {
  GOOGLESINGIN: `${baseUrl}/auth/google`,
  SIGNIN: `${baseUrl}/auth/register`,
  SIGNUP: `${baseUrl}/auth/login`,
  LOGOUT: `${baseUrl}/auth/logout`,
  VERIFY: `${baseUrl}/auth/verify`,
};

export default ENDPOINTS;
