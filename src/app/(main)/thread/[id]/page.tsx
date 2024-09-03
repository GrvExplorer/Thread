import ShowReplies from "@/components/custom ui/replies";
import RepliesToThread from "@/components/custom ui/replies-to-thread";
import ThreadCard from "@/components/custom ui/thread-card";
import { fetchThreadById, fetchThreadReplies, fetchUserById } from "@/db/data";
import { currentUser } from "@clerk/nextjs/server";

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return;
  const user = await currentUser();
  if (!user) return null;

  const thread = await fetchThreadById(params.id);

  // let replies = await fetchThreadReplies(params.id);
  // if (replies) replies = JSON.parse(replies);

  const userInfo = await fetchUserById(user.id);

  return (
    <div className="space-y-10">
      <ThreadCard
        id={thread._id}
        author={thread.author}
        comments={thread.children}
        isComment={thread.children.length > 0}
        createdAt={thread.createdAt}
        community={thread.community}
        content={thread.text}
        parentId={thread.parentId}
        currentUserId={user?.id}
      />

      {/* @ts-ignore */}
      <RepliesToThread
        userImage={userInfo.image}
        authorId={userInfo._id}
        parentId={JSON.stringify(thread._id)}
      />

      <ShowReplies replies={thread.children} />
    </div>
  );
}

export default page;
