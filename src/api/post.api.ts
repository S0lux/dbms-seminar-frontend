import http from "@/lib/http";
import {
  CreatePostBody,
  GetPostResponse,
  Post,
  QueryPostParams,
  VoteType,
} from "@/types/post";
import axios, { AxiosError } from "axios";
import { Trophy } from "lucide-react";

export const postAction = {
  getPosts: async (query?: QueryPostParams): Promise<GetPostResponse> => {
    try {
      const response = await http
        .get("/v1/posts", { params: query })
        .then((res) => res.data);
      return response ? response : [];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data);
      } else throw new Error("Internal error");
    }
  },
  getPostById: async (id: string): Promise<Post> => {
    try {
      const res = await http.get(`v1/posts/${id}`).then((res) => res.data);
      return res;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      } else throw new Error("Internal error");
    }
  },
  createPost: async (body: CreatePostBody) => {
    try {
      const res = await http.post("v1/posts", body).then((res) => res.data);
      return res;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data);
      }
    }
  },
  votePost: async (postId: string, voteType: VoteType) => {
    try {
      const res = await http
        .patch(`v1/posts/${postId}/vote`, { type: voteType })
        .then((res) => res.data);
      return res;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data);
      }
    }
  },
  removeVote: async (postId: string) => {
    try {
      const res = await http
        .patch(`v1/posts/${postId}/un-vote`)
        .then((res) => res.data);
      return res;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data);
      }
    }
  },
  updateContent: async (postId: string, content: string) => {
    try {
      const res = await http
        .patch(`v1/posts/${postId}/content`, { content: content })
        .then((res) => res.data);
      return res;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data);
      }
    }
  },
};
