"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogIn, User, FileText, Home } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  // Check Logged In Here
  const isLoggedIn = true;

  return (
    <header className="border-b border-[#2a9d8f]/20 lg:px-20">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-[#2a9d8f]" />
          <span className="text-xl font-bold text-[#264653]">PostApp</span>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="flex md:items-center md:gap-6">
            {isLoggedIn ? (
              <>
                <Link
                  href="/posts/create"
                  className={`flex items-center gap-1 text-sm font-medium ${
                    pathname === "/posts/create"
                      ? "text-[#2a9d8f]"
                      : "text-[#264653] hover:text-[#2a9d8f]"
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  Create Post
                </Link>
              </>
            ) : null}
          </nav>
          {isLoggedIn ? (
            <Link href="/profile">
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="User"
                />
                <AvatarFallback className="bg-[#e9c46a] text-[#264653]">
                  JS
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link href="/login">
              <Button className="bg-[#2a9d8f] hover:bg-[#264653]">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
