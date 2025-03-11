"use client";
import { usePost } from "@/hooks/usePost";
import PostCard from "./post-card";
import { PoundSterling, Search } from "lucide-react";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { DebounceInput } from "react-debounce-input";

export const PostGrid = () => {
  const [postQuery, setPostQuery] = useState("");
  const { data, isLoading, isError, refetch } = usePost.useGetPosts(
    postQuery ? { title: postQuery } : undefined,
  );
  const posts = data?.data.posts;

  return (
    <div>
      <div className="mb-10 flex space-x-5">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          <DebounceInput
            debounceTimeout={300}
            value={postQuery}
            onChange={(e) => setPostQuery(e.target.value)}
            placeholder="Search by title..."
            className="flex h-9 w-full rounded-md border border-[#2a9d8f] border-input bg-transparent px-3 py-1 py-6 pl-10 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 sm:w-[300px] md:text-sm"
          />
        </div>
        <Link href="/posts/create" className="w-full sm:w-auto">
          <Button className="w-full bg-[#e76f51] py-6 text-base hover:bg-[#f4a261] sm:w-auto">
            Create Post
          </Button>
        </Link>
      </div>

      <div className="space-y-5">
        {posts?.map((post) => {
          return (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              preview={truncateText(post.content)}
              author={post.author.displayName}
              voteScore={post.voteScore}
              voteInfo={post.votes}
              refetch={refetch}
              image={`https://placehold.co/600x400`}
            />
          );
        })}
      </div>
    </div>
  );
};

function truncateText(text: string) {
  return text.slice(0, 100) + "...";
}
