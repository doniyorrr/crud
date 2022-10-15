import axios from "axios";
import Cookies from "universal-cookie";
// import { RefreshLogin } from "../utils/refreshToken";
// import { notifyError } from "../utils/speccificToasts";
// import { debounce } from "../utils/usefullFunctions";

const httpClient = axios.create({
  baseURL: "https://profitmodel-server.herokuapp.com/api/",
  headers: { "Content-Type": "application/json" },
});
let cookie = new Cookies();

httpClient.interceptors.request.use(
  config => {
    let url = config.url
    if (url.slice(-1) !== '/') {
      config.url = url + '/'
    }
    let token = cookie.get("token")
    let refresh_token = cookie.get("refresh_token")
    if (token) {
      config.headers = Object.assign(config.headers, { "Authorization": "Bearer " + token });
      return config;
    }
    else if (refresh_token) {
      config.headers = Object.assign(config.headers, { "Authorization": "Bearer " + refresh_token });
      return config;
    }
    return config
  },
  error => Promise.reject(error)
);
export default httpClient;

// httpClient.interceptors.response.use(
//   (response) => {
//     // Edit response config
//     return response;
//   },
//   (error) => {
//     notifyError(JSON.stringify(error.response.data));

//     if (parseInt(error.response?.status) === 401) {
//       notifyError(error.response.data);
//       debouncedGetToken();
//     }

//     if (parseInt(error.response?.status) === 403) {
//       notifyError(error.response.data);
//       window.location.href = "/";
//     }

//     return Promise.reject(error);
//   }
// );


// let debouncedGetToken = debounce(() => RefreshLogin('Токен был исперпан, соединение восстановлено, но Ваш последний запрос не был отправлен, повторите попытку ещё раз'), 1000)