import { currentUser } from "@clerk/nextjs/server";
import CreateThread from "./CreateThread";
import { fetchUserById } from "@/db/data";

export default async function Page() {
  const user = await currentUser()
  if (!user) return null;

  const userDB = await fetchUserById(user.id)

  return (
    <div>
      <h1 className='head-text'>Create Threads</h1>
      <CreateThread authorId={userDB._id}  />
      </div>
  );
}