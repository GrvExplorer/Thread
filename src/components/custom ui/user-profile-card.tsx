import { IUser } from "@/db/models/user.model";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

function UserProfileCard({ user }: { user: IUser | undefined }) {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={user?.image} />
          <AvatarFallback>
            <Image
              src="/assets/profile.svg"
              alt="profile_icon"
              width={16}
              height={16}
              className="object-contain"
            />
          </AvatarFallback>
        </Avatar>

        <div className="">
          <h1 className="text-[20px] text-light-1">{user?.name}</h1>
          <p className=" text-light-3 text-base-regular">@{user?.username}</p>
        </div>
      </div>

      <Link href={`/profile/${user?.id}`}>
        <Button className="user-card_btn">View</Button>
      </Link>
    </div>
  );
}

export default UserProfileCard;
