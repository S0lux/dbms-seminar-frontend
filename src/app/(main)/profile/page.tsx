"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut, Edit2 } from "lucide-react";
import { authAction } from "@/api/auth.api";
import { User } from "@/types/user";
import useAuth from "@/hooks/useAuth";

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const authAction = useAuth.useLogout();
  const { data, error } = useAuth.useGetMe();

  // user data
  //const [userData, setUserData] = useState<typeof User>();

  // useEffect(() => {
  //   getMe();
  // }, []);

  // async function getMe() {
  //   const res = await authAction.useGetMe();
  //   if (res instanceof User) setUserData(res);
  // }

  async function handleSave() {
    setIsLoading(true);

    // Simulate API call
    try {
      // Call your API here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogout() {
    // Call your logout API here
    try {
      await authAction.mutateAsync();
      router.push("/login");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4a261]/10 px-4 py-8">
      <Card className="w-full max-w-md border-[#2a9d8f]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-[#264653]">
              Profile
            </CardTitle>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsEditing(!isEditing)}
              className="border-[#2a9d8f] text-[#2a9d8f]"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            View and manage your profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-3">
            <Avatar className="h-24 w-24">
              <AvatarImage src={data?.profileImage} alt={data?.displayName} />
              <AvatarFallback className="bg-[#e9c46a] text-[#264653]">
                {data?.displayName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button
                variant="outline"
                size="sm"
                className="border-[#2a9d8f] text-[#2a9d8f]"
              >
                Change Avatar
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {/* <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={userData.username}
                readOnly={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
              />
            </div> */}
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={data?.displayName}
                readOnly={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
                // onChange={(e) =>
                //   setUserData({ ...userData, displayName: e.target.value })
                // }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={data?.email}
                readOnly={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
                // onChange={(e) =>
                //   setUserData({ ...userData, email: e.target.value })
                // }
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="border-[#e76f51] text-[#e76f51] hover:bg-[#e76f51] hover:text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>

          {isEditing && (
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-[#2a9d8f] hover:bg-[#264653]"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
