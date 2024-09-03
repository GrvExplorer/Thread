import { currentUser } from "@clerk/nextjs/server";
import ThreadCard from "./thread-card";

async function ShowReplies({ replies }: any) {

  const user = await currentUser();

  return (
    <>
      <div className="space-y-4">
        {replies.map((reply: any, i: any) => (
          <ThreadCard
            key={i}
            id={reply._id}
            author={reply.author}
            comments={reply.children}
            isComment={reply.children.length > 0}
            createdAt={reply.createdAt}
            community={reply.community}
            content={reply.text}
            parentId={reply.parentId}
            currentUserId={user?.id}
          />
        ))}
      </div>
    </>
  );
}

export default ShowReplies;
