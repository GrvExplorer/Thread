"use client";
import { fetchAuthorById  } from "@/db/data";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";
import { useToast } from "../ui/use-toast";
import { deleteThread } from "@/actions/thread.actions";

function ThreadCard({ thread }) {
  // FIXME: add delete functionality
  const [user, setUser] = useState();
console.log(thread);


  const path = usePathname();
  const session = useUser();
  const { toast } = useToast();

  useEffect(() => {
    const userByThread = async () => {
      const res = await fetchAuthorById(thread.author);
      if (res) {
        setUser(JSON.parse(res));
      }
    };

    userByThread();
  }, [thread.author]);

  async function handelDelete(id: string) {
    const res = await deleteThread(id, path);

    if (res.status === 200 || res.success) {
      toast({
        title: "Success",
        description: res.message,
      });
      return
    }
    toast({
      title: "Error",
      description: res.error,
      variant: "destructive",
    });
  }

  if (!session) return null;

  const isAuthor = session?.user?.id === user?.id;

  return (
    <Card className="bg-dark-3 py-4 px-8 ">
      <div className="w-full flex justify-between items-start">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.image} />
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

            <div className="thread-card_bar ml-5 bg-dark-4 h-20" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="">
              <h1 className="text-light-1">{user?.name}</h1>
              <p className="text-light-2 text-small-regular">{thread.text}</p>
            </div>
            <div className="space-x-2 flex">
              <div className="">
                <Link href={`/thread/${thread._id}`}>
                  <Image
                    src={"/assets/heart-gray.svg"}
                    alt="heart_icon"
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
              <div className="">
                <Link href={`/thread/${thread._id}`}>
                  <Image
                    src={"/assets/reply.svg"}
                    alt="reply_icon"
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
              <div className="">
                <Link href={`/thread/${thread._id}`}>
                  <Image
                    src={"/assets/share.svg"}
                    alt="share_icon"
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
              <div className="">
                <Link href={`/thread/${thread._id}`}>
                  <Image
                    src={"/assets/tag.svg"}
                    alt="tag_icon"
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="cursor-pointer">
          {isAuthor && (
            <Image
              onClick={() => handelDelete(thread._id)}
              src={"/assets/delete.svg"}
              alt="reply_icon"
              width={24}
              height={24}
            />
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        {/* FIXME: add number of replies */}
        <p className="text-base-regular text-light-3">1 reply</p>

        {/* FIXME: add timestamp FORM database */}
        <p className="text-base-regular text-light-3">1 day ago</p>
      </div>
    </Card>
  );
}

export default ThreadCard;
