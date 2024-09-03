import { deleteThread } from "@/actions/thread.actions";
import { formatDateString } from "@/utils/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card } from "../ui/card";

interface ThreadCardProps {
  id: string;
  currentUserId: string | null | undefined;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    _id: string;
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
      name: string;
    };
  }[];
  isComment?: boolean;
}

function ThreadCard({
  id,
  author,
  comments,
  isComment,
  createdAt,
  community,
  content,
  parentId,
  currentUserId,
}: ThreadCardProps) {
  
  const threadOwner = author.id === currentUserId || false;

  const handelDelete = async () => {
    try {
      const res = await deleteThread(id, "/feed");

      if (res.status === 200 || res.success) {
      }
    } catch (error) {
      console.log("error at delete: ", error);
    }
  };

  return (
    <Card className="bg-dark-3 py-4 px-8 ">
      <div className="w-full flex justify-between ">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <Avatar className="w-10 h-10">
              <AvatarImage src={author.image} />
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
              <h1 className="text-light-1">{author.name}</h1>
              <p className="text-light-2 text-small-regular">{content}</p>
            </div>
            <div className="space-x-2 flex">
              <div className="">
                <Link href={`/thread/${id}`}>
                  <Image
                    src={"/assets/heart-gray.svg"}
                    alt="heart_icon"
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
              <div className="">
                <Link href={`/thread/${id}`}>
                  <Image
                    src={"/assets/reply.svg"}
                    alt="reply_icon"
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
              <div className="">
                <Link href={`/thread/${id}`}>
                  <Image
                    src={"/assets/share.svg"}
                    alt="share_icon"
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
              <div className="">
                <Link href={`/thread/${id}`}>
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
          {threadOwner && (
            <Image
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
        <div className="text-base-regular pl-2 pt-2 text-light-3">
          {isComment && comments.length > 0 ? (
            <div className="flex gap-4 items-center">
              <div className="flex -space-x-2">
                {comments.slice(0, 3).map((comment, i) => {
                  
                  if (i > 5) return

                  return (
                  <div
                    key={i}
                    className="relative border border-white overflow-hidden rounded-full w-6 h-6"
                  >
                    <Image
                      src={comment.author.image}
                      alt={comment.author.name}
                      fill
                    />
                  </div>
                )})}
              </div>

              {`${comments.length}reply`}
            </div>
          ) : (
            ""
          )}
          {!!community && (
            <Link href={`/communities/${community._id}`}>            
            <div className="flex gap-2 items-center">
              <p className="text-light-3 text-small-regular">{community.name}</p>
              <div className="relative overflow-hidden rounded-full w-6 h-6">
                <Image src={community.image} alt={community.name} fill />
              </div>
            </div>
            </Link>
          )}

        </div>


        {/* FIXME: add timestamp FORM database */}
        <p className="text-base-regular text-light-3">
          {formatDateString(createdAt)}
        </p>
      </div>
    </Card>
  );
}

export default ThreadCard;
