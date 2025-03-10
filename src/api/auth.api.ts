import http from "@/lib/http";
import { LoginBody, RegisterBody, User } from "@/types/user";
import axios, { Axios, AxiosError } from "axios";

export const authAction = {
  login: async (body: LoginBody) => {
    try {
      const response = await http
        .post("/v1/auth/login", {
          email: body.email,
          password: body.password,
        })
        .then((response) => response.data);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
    }
  },
  logout: async () => {
    try {
      const res = await http.post("/v1/auth/logout").then((res) => res.data);
      return res;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
    }
  },
  register: async (body: RegisterBody) => {
    try {
      const res = await http.post("v1/users", body).then((res) => res.data);
      return res;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.error);
      }
    }
  },
  me: async (): Promise<User> => {
    try {
      const response = await http.get("/v1/auth/me").then((res) => res.data);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      } else throw new Error("Internal error");
    }
  },
};
