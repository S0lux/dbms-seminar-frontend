import axios, { AxiosError, AxiosInstance, HttpStatusCode } from "axios";
import "dotenv/config";

class Http {
  instance: AxiosInstance;
  constructor() {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    console.log(baseURL);
    this.instance = axios.create({
      baseURL: baseURL,
      timeout: 10000,
      withCredentials: true,
    });
  }
}

const http = new Http().instance;

export default http;
