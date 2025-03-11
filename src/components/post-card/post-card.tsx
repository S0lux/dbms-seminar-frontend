import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { usePost } from "@/hooks/usePost";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { Vote, VoteType } from "@/types/post";

interface PostCardProps {
  id: string;
  title: string;
  preview: string;
  author: string;
  voteScore: number;
  voteInfo: Vote[];
  image?: string;
  refetch?: () => void;
}

export default function PostCard({
  id,
  title,
  preview,
  author,
  voteScore,
  voteInfo,
  image,
  refetch,
}: PostCardProps) {
  const { data: user } = useAuth.useGetMe();

  const votePostAction = usePost.useVotePost(id);
  const unVotePostAction = usePost.useRemoveVote(id);

  const [voteStatus, setVoteStatus] = useState(
    voteInfo.find((v) => v.user === user?.id)?.type ?? "",
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
    } finally {
      refetch && refetch();
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
  return (
    <Card className="w-full overflow-hidden border-[#2a9d8f] transition-all hover:shadow-md">
      {image && (
        <div className="relative h-[240px] w-full">
          <Image
            src={image || "https://placehold.co/600x400/png"}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <CardContent className="p-6">
        <Link href={`/posts/${id}`}>
          <h2 className="mb-3 text-2xl font-bold text-[#264653] hover:text-[#2a9d8f]">
            {title}
          </h2>
        </Link>
        <p className="mb-4 text-base text-gray-600">{preview}</p>
        <p className="text-sm font-medium text-[#2a9d8f]">By {author}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between bg-gray-50 px-6 py-4">
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">{voteScore}</span>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-[#e76f51]"
              onClick={() => handleVote(VoteType.UPVOTE)}
            >
              <ThumbsUp
                className="h-4 w-4"
                fill={voteStatus === "upvote" ? "#e76f51" : "#FFF"}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-[#e76f51]"
              onClick={() => handleVote(VoteType.DOWNVOTE)}
            >
              <ThumbsDown
                className="h-4 w-4"
                fill={voteStatus === "downvote" ? "#e76f51" : "#FFF"}
              />
            </Button>
          </div>
        </div>
        <Link href={`/posts/${id}`}>
          <Button
            variant="outline"
            className="border-[#2a9d8f] text-[#264653] hover:bg-[#2a9d8f] hover:text-white"
          >
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
