import axios from "axios";

const customAxios = axios.create({
  baseURL: "https://backendintegrador2-production.up.railway.app",
  timeout: 10000,
});

export default customAxios;
