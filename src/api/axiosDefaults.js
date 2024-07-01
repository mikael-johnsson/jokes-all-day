import axios from "axios";

axios.defaults.baseURL = "https://jokes-all-day-0142d90d5482.herokuapp.com";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
