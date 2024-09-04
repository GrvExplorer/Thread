"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import ProfilePhoto from "../ui/profile-photo";

interface ProfileHeaderProp {
  accountId: string;
  image: string;
  name: string;
  username: string;
  bio: string;
  type: "community" | "user";
  activeUserId: string; 
}

function ProfileHeader({
  accountId,
  image,
  name,
  username,
  bio,
  type = "user",
  activeUserId,
}: ProfileHeaderProp) {


  return (
    <div>
      <div>
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-6">
            <ProfilePhoto image={image} />

            <div className="">
              <h1 className="text-heading4-medium text-light-1">{name}</h1>
              <p className="text-base-regular text-light-3">@{username}</p>
            </div>
          </div>
          {type == "user" && activeUserId === accountId && (
            <Link href="/profile/edit">
              <Button className="flex items-center gap-2">
                <Image
                  src={"/assets/edit.svg"}
                  alt="edit_icon"
                  width={16}
                  height={16}
                />
                Edit
              </Button>
            </Link>
          )}
        </div>

        <p className="mt-6 text-base-regular text-light-2">{bio}</p>

        <DropdownMenuSeparator className="w-full bg-dark-4 mt-10" />
      </div>
    </div>
  );
}

export default ProfileHeader;
