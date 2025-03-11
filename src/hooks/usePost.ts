import { postAction } from "@/api/post.api";
import { CreatePostBody, QueryPostParams, VoteType } from "@/types/post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const usePost = {
  useCreatePost() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (body: CreatePostBody) => {
        return await postAction.createPost(body);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["posts"],
        });
      },
    });
  },
  useGetPosts(query?: QueryPostParams) {
    return useQuery({
      queryKey: ["posts", query],
      queryFn: async () => {
        return await postAction.getPosts(query);
      },
      onError: (error) => {
        console.error("Failed to fetch posts:", error);
      },
    });
  },
  useGetPostById(id: string) {
    return useQuery({
      queryKey: ["post", id],
      queryFn: async () => {
        return await postAction.getPostById(id);
      },
      onError: (error) => {
        console.error("Failed to fetch post:", error);
      },
    });
  },
  useUpdatePost(postId: string) {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (content: string) => {
        return await postAction.updateContent(postId, content);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["post", postId],
        });
      },
    });
  },
  useVotePost(postId: string) {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (voteType: VoteType) => {
        return await postAction.votePost(postId, voteType);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["post", postId],
        });
      },
    });
  },
  useRemoveVote(postId: string) {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async () => {
        return await postAction.removeVote(postId);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["post", postId],
        });
      },
    });
  },
};
