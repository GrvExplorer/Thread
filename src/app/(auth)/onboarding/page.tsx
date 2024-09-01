import AccountProfileEdit from "@/components/auth/account-profile-edit";
import { fetchUserById } from "@/db/data";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  let userInfo = await fetchUserById(user.id);
  if (userInfo) userInfo = JSON.parse(userInfo);
  
    

  // if (userInfo?.onboarded) redirect("/feed");

  const userData = {
    id: user.id,
    objectId: userInfo?._id.toString(),
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : (user.firstName ?? ""),
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    <main className="bg-dark-1 h-full flex w-full flex-col justify-start px-40 py-20">
      <div className="w-full max-w-xl mx-auto ">
        <h1 className="head-text">Onboarding</h1>
        <p className="mt-3 text-base-regular text-light-2">
          Complete your profile now, to use Threds.
        </p>

        <section className="w-full h-full">
          <AccountProfileEdit user={userData} btnTitle="Continue" />
        </section>
      </div>
    </main>
  );
}

export default Page;
