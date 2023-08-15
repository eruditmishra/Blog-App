const BASE_URL = process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS
export const endpoints = {
  SIGNUP_API: BASE_URL + "/users/register",
  LOGIN_API: BASE_URL + "/users/login",
};

// POST ENDPOINTS
export const postEndpoints = {
  CREATE_POST_API: BASE_URL + "/post",
};
