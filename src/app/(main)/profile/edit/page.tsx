import AccountProfileEdit from "@/components/auth/account-profile-edit";
import { fetchUserById } from "@/db/data";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  let userInfo = await fetchUserById(user.id);

  if (!userInfo) return <></>;

  userInfo = JSON.parse(userInfo);

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : (user.firstName ?? ""),
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    <div>
      <AccountProfileEdit user={userData} btnTitle="Update" />
    </div>
  );
}
