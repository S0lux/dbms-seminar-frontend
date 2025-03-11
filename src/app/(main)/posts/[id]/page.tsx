"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, ThumbsDown, Edit, Trash2, ArrowLeft } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { usePost } from "@/hooks/usePost";
import useAuth from "@/hooks/useAuth";
import { VoteType } from "@/types/post";

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: post } = usePost.useGetPostById(params.id);
  const { data: user } = useAuth.useGetMe();

  const votePostAction = usePost.useVotePost(params.id);
  const unVotePostAction = usePost.useRemoveVote(params.id);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const isAuthor = post?.author.id === user?.id;

  const [voteStatus, setVoteStatus] = useState(
    post?.votes.find((v) => v.user === user?.id)?.type ?? "",
  );

  async function handleVote(voteType: VoteType) {
    try {
      if (voteStatus === voteType) {
        await handleUnVote();
      } else {
        await votePostAction.mutateAsync(voteType);
        setVoteStatus(voteType);
      }
    } catch (error) {
      console.error("Failed to vote", error);
      alert("Failed to vote");
    }
  }

  async function handleUnVote() {
    try {
      await unVotePostAction.mutateAsync();
      setVoteStatus("");
    } catch (error) {
      console.error("Failed to unvote", error);
      alert("Failed to unvote");
    }
  }

  function handleDelete() {
    // fetch(`/v1/posts/${params.id}`, { method: 'DELETE', ... })
    router.push("/");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="mb-6 flex items-center text-[#2a9d8f] hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to posts
      </Link>

      <Card className="border-[#2a9d8f]">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-[#264653]">{post?.title}</h1>
            {isAuthor && (
              <div className="flex gap-2">
                <Link href={`/posts/${params.id}/edit`}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-[#2a9d8f] text-[#2a9d8f]"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-[#e76f51] text-[#e76f51]"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={post?.author.profileImage}
                alt={"Author profile image"}
              />
              <AvatarFallback className="bg-[#e9c46a] text-[#264653]">
                {post?.author.displayName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{post?.author.displayName}</p>
              <p className="text-xs text-gray-500">
                {post?.postedAt
                  ? new Date(post!.postedAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="prose max-w-none">
            {post?.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="text-[#e76f51]"
                onClick={() => handleVote(VoteType.UPVOTE)}
              >
                <ThumbsUp
                  className="h-5 w-5"
                  fill={voteStatus === "upvote" ? "#e76f51" : "#FFF"}
                />
              </Button>
              <span className="font-medium">{post?.voteScore}</span>
              <Button
                variant="ghost"
                size="icon"
                className="text-[#e76f51]"
                onClick={() => handleVote(VoteType.DOWNVOTE)}
              >
                <ThumbsDown
                  className="h-5 w-5"
                  fill={voteStatus === "downvote" ? "#e76f51" : "#FFF"}
                />
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-[#e76f51] hover:bg-[#e76f51]/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
