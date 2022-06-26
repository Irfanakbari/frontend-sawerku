import axios from "axios";
import { getCookie, setCookies } from "cookies-next";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const axiosInstance = axios.create();
const refreshAuthLogic = (failedRequest) =>
  axios
    .get("https://backend-sawerku.herokuapp.com/token", { withCredentials: true })
    .then((tokenRefreshResponse) => {
      console.log("Refreshed token: ", tokenRefreshResponse.data.token);
      localStorage.setItem("token", tokenRefreshResponse.data.token);
      failedRequest.response.config.headers["Authorization"] =
        "Bearer " + tokenRefreshResponse.data.token;
      return Promise.resolve();
    });

createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);
axiosInstance.interceptors.request.use((request) => {
  // const token = getCookie("token");
  const token = localStorage.getItem("token");
  if (token) {
    request.headers["Authorization"] = "Bearer " + token;
  }
  return request;
});

export default axiosInstance
