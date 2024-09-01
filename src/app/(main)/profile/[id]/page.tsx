import ThreadCard from "@/components/custom ui/thread-card";
import UserProfile from "@/components/custom ui/user-profile";
import UserProfileSections from "@/components/custom ui/user-profile-sections";
import { fetchAllThreadsOfUser, fetchUserById } from "@/db/data";

export default async function Page({ params }: { params: { id: string } }) {
  const userId = params.id;
  if (!userId) return <></>;

  const user = await fetchUserById(userId);

  let thread = await fetchAllThreadsOfUser(user?._id);
  if (!thread) return <></>;
  thread = JSON.parse(thread);

  return (
    <div className="space-y-8">
      {/* @ts-ignore  */}
      <UserProfile user={user} />

      <UserProfileSections />
      {/* @ts-ignore */}
      {thread.map((thread, i) => {
        return <ThreadCard key={i} thread={thread} />;
      })}
    </div>
  );
}
