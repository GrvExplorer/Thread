import ProfileHeader from "@/components/custom ui/profile-header";
import ThreadsTab from "@/components/custom ui/threads-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUserById } from "@/db/data";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function Page({ params }: { params: { id: string } }) {
  const userId = params.id;
  if (!userId) return <></>;
  
  const user = await fetchUserById(userId);

  const activeUser = await currentUser();
  if (!activeUser) return <></>;

  return (
    <div className="space-y-8">
      {/* @ts-ignore  */}
      <ProfileHeader
        activeUserId={activeUser.id}
        accountId={userId}
        image={user.image}
        name={user.name}
        username={user.username}
        bio={user.bio}
      />

      <Tabs defaultValue="threads" className="">
        <TabsList className="tab">
          {profileTabs.map((profile) => (
            <TabsTrigger
              key={profile.value}
              value={profile.value}
              className="tab"
            >
              <Image
                src={profile.icon}
                alt={profile.value}
                width={20}
                height={20}
              />
              <p className="max-sm:hidden">{profile.label}</p>

              {profile.label === "Threads" && (
                <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                  {user.threads.length}
                </p>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="threads" className="mt-9 w-full text-light-1">
          <ThreadsTab
            accountId={user._id}
            activeUserId={activeUser.id}
            type="user"
          />
        </TabsContent>
        <TabsContent
          value="replies"
          className="mt-9 w-full text-light-1"
        ></TabsContent>
        <TabsContent
          value="tagged"
          className="mt-9 w-full text-light-1"
        ></TabsContent>
      </Tabs>
    </div>
  );
}
