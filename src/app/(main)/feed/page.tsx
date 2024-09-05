import ThreadCard from "@/components/custom ui/thread-card";
import { fetchThreads } from "@/db/data";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const user = await currentUser();

  const threads = await fetchThreads();
  if (!threads) return;

  return (
    <div>
      <h1 className="head-text">Home</h1>
      <div className="mt-8">
        <div className="space-y-4">
          {threads?.map((thread, i) => (
            <ThreadCard
              key={thread._id}
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
          ))}
        </div>
      </div>
    </div>
  );
}
