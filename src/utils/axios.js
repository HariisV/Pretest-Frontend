import axios from "axios";
// require("dotenv").config();

const axiosApiInterface = axios.create({
  baseURL: "http://127.0.0.1:8000",
});
axiosApiInterface.interceptors.request.use(
  function (config) {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosApiInterface.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 403) {
      if (error.response.data.msg === "jwt expired") {
        const refreshToken = localStorage.getItem("refreshToken");
        axiosApiInterface
          .post("auth/refresh", { refreshToken })
          .then((res) => {
            alert("token baru sudah berhasil di dapatkan");
            // localStorage.setItem("token", res.data.data.token);
            // localStorage.setItem("refreshToken", res.data.data.refreshToken);
            // window.location.reload();
          })
          .catch((err) => {
            localStorage.clear();
            window.location.href = "/basic-login";
          });
      } else {
        localStorage.clear();
        window.location.href = "/basic-login";
      }
      // alert(error.response.data.msg);
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosApiInterface;
