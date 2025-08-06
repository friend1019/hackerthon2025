import axios from "axios";

const api = axios.create({
  baseURL: "https://hackerton-seosanbook.onrender.com/api",
});

export default api;
