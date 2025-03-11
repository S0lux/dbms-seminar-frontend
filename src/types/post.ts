import { User } from "./user";

export type CreatePostBody = {
  content: string;
  title: string;
};

export type QueryPostParams = {
  title?: string;
  cursor?: string;
  limit?: number;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  postedAt: string;
  editedAt: string;
  voteScore: number;
  upvoteCount: number;
  downvoteCount: number;
  author: User;
  votes: Vote[];
};

export enum VoteType {
  UPVOTE = "upvote",
  DOWNVOTE = "downvote",
}

type Pagination = {
  nextCursor: string;
};

type Data = {
  posts: Post[];
  pagination: Pagination;
};

export type Vote = {
  id: string;
  type: "upvote" | "downvote";
  user: string;
  post: string;
  createdAt: string;
  updatedAt: string;
};

export type GetPostResponse = {
  success: boolean;
  data: Data;
};
