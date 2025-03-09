import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface PostCardProps {
  id: string;
  title: string;
  preview: string;
  author: string;
  votes: number;
  image?: string;
}

export default function PostCard({
  id,
  title,
  preview,
  author,
  votes,
  image,
}: PostCardProps) {
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
          <span className="text-sm font-medium">{votes}</span>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-[#e76f51]"
            >
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-[#e76f51]"
            >
              <ThumbsDown className="h-4 w-4" />
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
