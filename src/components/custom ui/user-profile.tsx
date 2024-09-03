"use client";
import { IUser } from "@/db/models/user.model";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import ProfilePhoto from "../ui/profile-photo";

function UserProfile({ user }: { user: IUser | undefined }) {
  const session = useUser();
  if (!user) return null;

  const edit = session?.user?.id === user?.id || false;

  return (
    <div>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-6">
          <ProfilePhoto userImage={user?.image} />

          <div className="">
            <h1 className="text-heading4-medium text-light-1">{user?.name}</h1>
            <p className="text-base-regular text-light-3">@{user?.username}</p>
          </div>
        </div>
        {edit && (
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

      <p className="mt-6 text-base-regular text-light-2">{user?.bio}</p>

      <DropdownMenuSeparator className="w-full bg-dark-4 mt-10" />
    </div>
  );
}

export default UserProfile;
