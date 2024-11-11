const { default: notify } = require("@/utils/notify");
let res, rej;
const toastMiddleware = (store) => (next) => (action) => {
  if (!action.type.includes("toast")) return next(action);
  if (action.type === "toast/pending") [res, rej] = notify();
  else if (action.type === "toast/success") res(action.payload);
  else if (action.type === "toast/error") rej(action.payload);
};

export default toastMiddleware;
