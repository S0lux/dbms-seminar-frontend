"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { usePost } from "@/hooks/usePost";

export default function CreatePostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const postAction = usePost.useCreatePost();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await postAction.mutateAsync(formData);
      alert("Post created!");
      router.push(`/`);
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setIsLoading(false);
    }
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

      <Card className="mx-auto max-w-2xl border-[#2a9d8f]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#264653]">
            Create New Post
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            id="create-post-form"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter a descriptive title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your post content here..."
                className="min-h-[300px]"
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="border-[#264653] text-[#264653]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-post-form"
            disabled={isLoading}
            className="bg-[#e76f51] hover:bg-[#f4a261]"
          >
            {isLoading ? "Publishing..." : "Publish Post"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
