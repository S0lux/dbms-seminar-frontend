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

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [voteCount, setVoteCount] = useState(42);

  // Mock post data
  const post = {
    id: params.id,
    title: "Understanding React Server Components",
    content: `
      React Server Components are a new way to build React applications that leverage the power of the server.
      
      They allow you to render components on the server and stream them to the client, reducing the amount of JavaScript that needs to be sent to the browser.
      
      This can lead to faster page loads and a better user experience, especially on slower devices or networks.
      
      Server Components can access server-side resources directly, like databases or file systems, without having to create API endpoints.
      
      They work alongside Client Components, which handle interactivity and state on the client.
    `,
    author: "Jane Smith",
    authorId: "user-123",
    createdAt: "2023-05-15T10:30:00Z",
    isAuthor: true, // Check if the user is the author of the post
  };

  function handleVote(type: "up" | "down") {
    // fetch(`/v1/posts/${params.id}/interaction`, { method: 'PATCH', ... })
    setVoteCount((prev) => (type === "up" ? prev + 1 : prev - 1));
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
            <h1 className="text-3xl font-bold text-[#264653]">{post.title}</h1>
            {post.isAuthor && (
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
                src="/placeholder.svg?height=32&width=32"
                alt={post.author}
              />
              <AvatarFallback className="bg-[#e9c46a] text-[#264653]">
                {post.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{post.author}</p>
              <p className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="prose max-w-none">
            {post.content.split("\n\n").map((paragraph, i) => (
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
                onClick={() => handleVote("up")}
              >
                <ThumbsUp className="h-5 w-5" />
              </Button>
              <span className="font-medium">{voteCount}</span>
              <Button
                variant="ghost"
                size="icon"
                className="text-[#e76f51]"
                onClick={() => handleVote("down")}
              >
                <ThumbsDown className="h-5 w-5" />
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
