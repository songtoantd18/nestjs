// src/config.js
const BASE_URL = "http://localhost:3000";

export default {
  BASE_URL,
  API: {
    LOGIN: `${BASE_URL}/user/login`,
    REGISTER: `${BASE_URL}/user/register`,
    CURRENT_USER: `${BASE_URL}/user/curent-user`,
    SELECT_POST: `${BASE_URL}/post/select`,
  },
};
