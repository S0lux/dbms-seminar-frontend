import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import PostCard from "@/components/post-card/post-card";

export default function Home() {
  return (
    <main className="container mx-auto px-6 py-10 md:px-8">
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:px-16">
        <h1 className="text-4xl font-bold text-[#264653] md:text-5xl">Posts</h1>
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search by title..."
              className="w-full border-[#2a9d8f] py-6 pl-10 text-base sm:w-[300px]"
            />
          </div>
          <Link href="/posts/create" className="w-full sm:w-auto">
            <Button className="w-full bg-[#e76f51] py-6 text-base hover:bg-[#f4a261] sm:w-auto">
              Create Post
            </Button>
          </Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-4xl flex-col space-y-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <PostCard
            key={i}
            id={`post-${i + 1}`}
            title={`Post Title ${i + 1}`}
            preview="This is a preview of the post content. Click to read more..."
            author="John Doe"
            votes={Math.floor(Math.random() * 100)}
            image={`https://placehold.co/600x400`}
          />
        ))}
      </div>
    </main>
  );
}
