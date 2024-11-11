import request from "@/network/request";
const apiMiddleware = (store) => (next) => async (action) => {
  if (action.type !== "api/Requested") return next(action);

  const { method = "GET", url, data, params } = action.payload;
  const { onSuccess, onLoading, onError, showToast = true } = action.payload;
  const httpConfig = { method, url };
  if (data) httpConfig.data = data;
  if (params) httpConfig.params = params;
  console.log(httpConfig);
  const res = await request(httpConfig);
  console.log(res);
};

export default apiMiddleware;
