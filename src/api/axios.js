import axios from "axios";
const PORT = process.env.PORT || 4000;
const instance = axios.create({
  baseURL: `http://localhost:${PORT}`,
  //   headers: {
  //     "content-type": "application/x-www-form-urlencoded;charset=utf-8",
  //   },
});

export default instance;
