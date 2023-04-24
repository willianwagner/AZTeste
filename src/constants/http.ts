import axios from "axios";
import type { AxiosInstance } from "axios";

const httpClient: AxiosInstance = axios.create({
  baseURL: "https://reqres.in/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default httpClient;