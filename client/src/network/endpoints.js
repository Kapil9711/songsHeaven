// export const baseUrl = "https://songsheaven.onrender.com/api/v1";
export const baseUrl = "http://localhost:8000/api/v1";

const ENDPOINTS = {
  GOOGLESINGIN: `${baseUrl}/auth/google`,
  SIGNIN: `${baseUrl}/auth/login`,
  SIGNUP: `${baseUrl}/auth/register`,
  LOGOUT: `${baseUrl}/auth/logout`,
  VERIFY: `${baseUrl}/auth/verify`,
};

export default ENDPOINTS;
