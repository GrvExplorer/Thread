"use client";
import { replyToThread } from "@/actions/thread.actions";
import { useState } from "react";
import { Button } from "../ui/button";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import ProfilePhoto from "../ui/profile-photo";
import { useToast } from "../ui/use-toast";

function RepliesToThread({
  parentId,
  authorId,
  userImage,
}: {
  parentId: string;
  authorId: string;
  userImage: string;
}) {
  const [reply, setReply] = useState("");
  const { toast } = useToast();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const replyRes = await replyToThread({ authorId, text: reply, parentId });

    if (replyRes.success) {
      toast({ title: "Reply added", description: "Your reply has been added" });
      setReply("");
      return;
    }

    console.log(replyRes);

    toast({
      title: "Error",
      description: replyRes.error,
      variant: "destructive",
    });
  }

  return (
    <div className="space-y-4">
      <DropdownMenuSeparator className="bg-dark-4" />
      <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-4 w-full">
        <div className="text-light-1 flex gap-4 w-full">
          <ProfilePhoto userImage={userImage} className="w-10 h-10" />
          <Input
            type="text"
            className=""
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
        </div>
        <div className="">
          <Button className="bg-primary-500 w-full md:w-fit" type="submit">
            Reply
          </Button>
        </div>
      </form>
      <DropdownMenuSeparator className="bg-dark-4 " />
    </div>
  );
}

export default RepliesToThread;
