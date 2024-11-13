import request from "@/network/request";
import Cookies from "js-cookie";
const apiMiddleware = (store) => (next) => async (action) => {
  // if action is not type api/Requested than pass the action to next middleware;
  if (action.type !== "api/Requested") return next(action);

  const { method = "GET", url, data, params } = action.payload;
  const { onSuccess, onLoading, onError, showToast = true } = action.payload;
  const httpConfig = { method, url };
  if (data) httpConfig.data = data;
  if (params) httpConfig.params = params;

  // pending actions
  if (onLoading) store.dispatch({ type: onLoading, payload: true });
  if (showToast) store.dispatch({ type: "toast/pending" });

  const res = await request(httpConfig);
  // success actions
  if (res.success === true) {
    const msg = res?.data?.message || "Success";
    if (res.data.token) Cookies.set("token", res.data.token);
    if (showToast) store.dispatch({ type: "toast/success", payload: msg });
    if (onSuccess) store.dispatch({ type: onSuccess, payload: res.data });
  }

  // error actions
  if (res.success === false) {
    const msg = res?.data?.message || "Something Went Wrong Try Again Later";
    if (showToast) store.dispatch({ type: "toast/error", payload: msg });
    if (onError) store.dispatch({ type: onError, payload: msg });
    if (window.setLoading) window.setLoading(false);
  }
};

export default apiMiddleware;
