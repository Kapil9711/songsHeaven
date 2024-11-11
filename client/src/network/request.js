import axios from "axios";
import Cookies from "js-cookie";

const request = async (httpConfig) => {
  if (Cookies.get("token")) {
    httpConfig.headers = { Authorization: `Bearer ${token}` };
  }
  try {
    const { data } = await axios.request(httpConfig);
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, data: error?.response?.data };
  }
};

export default request;
