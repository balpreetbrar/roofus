import axios from "axios";
export default ({ requiresAuth = false } = {}) => {
  const options = {};
  options.baseURL = "https://api-angad.networkon.in/roofus/";

  //? Decide add token or not
  if (requiresAuth) {
    options.headers.Authorization = "JWT TOKEN";
  }
  const instance = axios.create(options);
  return instance;
};
