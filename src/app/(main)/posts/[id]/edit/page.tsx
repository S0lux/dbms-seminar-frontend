"use client";

import type React from "react";

import { useState, useEffect } from "react";
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

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  // Simulate fetching post data
  useEffect(() => {
    // fetch(`/v1/posts/${params.id}`).then(...)

    // Mock data
    setFormData({
      title: "Understanding React Server Components",
      content: `React Server Components are a new way to build React applications that leverage the power of the server.
      
They allow you to render components on the server and stream them to the client, reducing the amount of JavaScript that needs to be sent to the browser.

This can lead to faster page loads and a better user experience, especially on slower devices or networks.

Server Components can access server-side resources directly, like databases or file systems, without having to create API endpoints.

They work alongside Client Components, which handle interactivity and state on the client.`,
    });
  }, [params.id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    try {
      // const response = await fetch(`/v1/posts/${params.id}`, { method: 'PATCH', ... })
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push(`/posts/${params.id}`);
    } catch (error) {
      console.error("Failed to update post:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href={`/posts/${params.id}`}
        className="mb-6 flex items-center text-[#2a9d8f] hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to post
      </Link>

      <Card className="mx-auto max-w-2xl border-[#2a9d8f]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#264653]">
            Edit Post
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            id="edit-post-form"
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
            onClick={() => router.push(`/posts/${params.id}`)}
            className="border-[#264653] text-[#264653]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="edit-post-form"
            disabled={isLoading}
            className="bg-[#e76f51] hover:bg-[#f4a261]"
          >
            {isLoading ? "Saving..." : "Update Post"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
