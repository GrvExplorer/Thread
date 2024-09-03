import ThreadCard from "@/components/custom ui/thread-card";
import UserProfile from "@/components/custom ui/user-profile";
import UserProfileSections from "@/components/custom ui/user-profile-sections";
import { fetchAllThreadsOfUser, fetchUserById } from "@/db/data";

export default async function Page({ params }: { params: { id: string } }) {
  const userId = params.id;
  if (!userId) return <></>;

  const user = await fetchUserById(userId);

  const userThreads = await fetchAllThreadsOfUser(user?._id);

  return (
    <div className="space-y-8">
      {/* @ts-ignore  */}
      <UserProfile user={user} />

      <UserProfileSections />
      {/* @ts-ignore */}
      {userThreads.map((userThread, i) => {
        return (
          <ThreadCard
            key={i}
            id={userThread._id}
            author={userThread.author}
            comments={userThread.children}
            isComment={userThread.children.length > 0}
            createdAt={userThread.createdAt}
            community={userThread.community}
            content={userThread.text}
            parentId={userThread.parentId}
            currentUserId={userId}
          />
        );
      })}
    </div>
  );
}
