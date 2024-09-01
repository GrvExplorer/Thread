import ShowReplies from "@/components/custom ui/replies";
import RepliesToThread from "@/components/custom ui/replies-to-thread";
import ThreadCard from "@/components/custom ui/thread-card";
import { fetchThreadById, fetchThreadReplies, fetchUserById } from "@/db/data";
import { currentUser } from "@clerk/nextjs/server";

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return;

  let thread = await fetchThreadById(params.id);
  if (!thread) return <></>;
  thread = JSON.parse(thread);

  let replies = await fetchThreadReplies(params.id);
  if (replies) replies = JSON.parse(replies);

  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUserById(user.id);

  return (
    <div className="space-y-10">
      <ThreadCard thread={thread} />

      {/* @ts-ignore */}
      <RepliesToThread
        userImage={userInfo.image}
        authorId={userInfo._id}
        parentId={thread._id}
      />

      <ShowReplies replies={replies} />
    </div>
  );
}

export default page;
