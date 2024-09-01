import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { cn } from "@/utils/utils";

function ProfilePhoto({userImage,
  className
}: {userImage: string | undefined, className?: string}) {
  return (
    <div>
      <Avatar className={cn("w-20 h-20", className)}>
        <AvatarImage src={userImage} />
        <AvatarFallback>
          <Image
            src="/assets/profile.svg"
            alt="profile_icon"
            width={24}
            height={24}
            className="object-contain"
          />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}

export default ProfilePhoto;
