import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000",
  //   headers: {
  //     "content-type": "application/x-www-form-urlencoded;charset=utf-8",
  //   },
});

export default instance;
