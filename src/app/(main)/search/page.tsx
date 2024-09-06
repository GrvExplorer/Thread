import SearchBar from "@/components/custom ui/search-bar";
import ThreadCard from "@/components/custom ui/thread-card";
import { fetchSearchThreads } from "@/db/data";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page({
  searchParams,
}: {
  searchParams: { q: string | undefined };
}) {
  const { q } = searchParams;

  const threads = await fetchSearchThreads({ searchString: q });
  const user = await currentUser();

  return (
    <div>
      <h1 className="head-text">Search</h1>

      <SearchBar type={"thread"} />

      <div className="space-y-4">
        {threads &&
          threads?.map((thread, i) => (
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

        {/* FIXME: add pagination */}
      </div>
    </div>
  );
}
