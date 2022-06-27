import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { getCookie } from "cookies-next";

const axiosInstance = axios.create();
const refreshAuthLogic = (failedRequest) =>
  axios
    .get("https://backend1.irfans.my.id/token", {
      withCredentials: true,
      headers: {
        Cookie: "refreshToken=" + getCookie("refreshToken"),
      },
    })
    .then((tokenRefreshResponse) => {
      localStorage.removeItem("token");
      localStorage.setItem("token", tokenRefreshResponse.data.token);
      failedRequest.response.config.headers["Authorization"] =
        "Bearer " + tokenRefreshResponse.data.token;
      return Promise.resolve();
    })

createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);
axiosInstance.interceptors.request.use((request) => {
  // const token = getCookie("token");
  const token = localStorage.getItem("token");
  if (token) {
    request.headers["Authorization"] = "Bearer " + token;
  }
  return request;
});

export default axiosInstance;
