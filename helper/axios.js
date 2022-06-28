import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const axiosInstance = axios.create();
const refreshAuthLogic = (failedRequest) =>
  axios
    .get("https://backend1.irfans.me/token", {
      withCredentials: true,
      // headers: {
      //   Cookie: "refreshToken=" + getCookie("refreshToken"),
      // },
    })
    .then((tokenRefreshResponse) => {
      localStorage.removeItem("token");
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

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response;
    }
    return Promise.reject(response);
  },
  (error) => {
    if (error.response.status === 401) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
