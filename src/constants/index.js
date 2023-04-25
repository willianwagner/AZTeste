import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://reqres.in/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default httpClient;