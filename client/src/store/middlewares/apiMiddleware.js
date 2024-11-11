import request from "@/network/request";
import Cookies from "js-cookie";
const apiMiddleware = (store) => (next) => async (action) => {
  if (action.type !== "api/Requested") return next(action);
  const { method = "GET", url, data, params } = action.payload;
  const { onSuccess, onLoading, onError, showToast = true } = action.payload;
  const httpConfig = { method, url };
  if (data) httpConfig.data = data;
  if (params) httpConfig.params = params;
  const res = await request(httpConfig);
  console.log(res);
  if (res.success) {
    if (res.data.token) Cookies.set("token", res.data.token);
    if (onSuccess) store.dispatch({ type: onSuccess, payload: res.data });
  } else {
    console.log(res);
  }
};

export default apiMiddleware;
