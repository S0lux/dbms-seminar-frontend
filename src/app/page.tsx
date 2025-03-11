import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import PostCard from "@/components/post-card/post-card";
import Header from "@/components/header/header";
import { PostGrid } from "@/components/post-card/post-grid";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-6 py-10 md:px-8">
        <div className="mx-auto flex max-w-4xl flex-col space-y-8">
          <h1 className="text-4xl font-bold text-[#264653] md:text-5xl">
            Posts
          </h1>
          <PostGrid />
        </div>
      </main>
    </>
  );
}
