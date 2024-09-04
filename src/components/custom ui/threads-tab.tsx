import { fetchCommunityPosts } from "@/actions/community.actions";
import { fetchUserPosts } from "@/db/data";
import ThreadCard from "./thread-card";

interface Result {
  name: string;
  image: string;
  id: string;
  threads: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    children: {
      author: {
        image: string;
        name: string;
      };
    }[];
  }[];
}

async function ThreadsTab({
  accountId,
  type,
  activeUserId,
}: {
  accountId: string;
  type: "community" | "user";
  activeUserId: string;
}) {
  let result: Result;
  if (type === "community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchUserPosts(accountId);
  }

  return (
    <>
      <section className="mt-9 flex flex-col gap-10">
        {result.threads.map((thread, i) => {
          return (
            <ThreadCard
              key={i}
              id={thread._id}
              author={
                type === "community"
                  ? thread.author
                  : {
                      name: result.name,
                      image: result.image,
                      id: result.id,
                    }
              }
              community={
                type === "user"
                  ? thread.community
                  : {
                      name: result.name,
                      image: result.image,
                      id: result.id,
                    }
              }
              comments={thread.children}
              isComment={thread.children.length > 0}
              createdAt={thread.createdAt}
              content={thread.text}
              parentId={thread.parentId}
              currentUserId={activeUserId}
            />
          );
        })}
      </section>
    </>
  );
}

export default ThreadsTab;
