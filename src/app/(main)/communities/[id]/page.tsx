import { fetchCommunityDetails } from "@/actions/community.actions";
import ProfileCard from "@/components/custom ui/profile-card";
import ProfileHeader from "@/components/custom ui/profile-header";
import ThreadsTab from "@/components/custom ui/threads-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { communityTabs } from "@/constants";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

async function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const communityId = params.id;

  const activeUser = await currentUser();
  if (!activeUser) return <></>;
  const communityDetails = await fetchCommunityDetails(communityId);

  return (
    <div className="space-y-8">
      <ProfileHeader
        activeUserId={activeUser.id}
        accountId={communityId}
        image={communityDetails.image}
        name={communityDetails.name}
        username={communityDetails.username}
        bio={communityDetails.bio}
        type="community"
      />

      <Tabs defaultValue="threads" className="">
        <TabsList className="tab">
          {communityTabs.map((community) => (
            <TabsTrigger
              key={community.value}
              value={community.value}
              className="tab"
            >
              <Image
                src={community.icon}
                alt={community.value}
                width={20}
                height={20}
              />
              <p className="max-sm:hidden">{community.label}</p>

              {community.label === "Threads" && (
                <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                  {communityDetails.threads.length}
                </p>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="threads" className="mt-9 w-full text-light-1">
          <ThreadsTab
            accountId={communityDetails._id}
            activeUserId={activeUser.id}
            type="community"
          />
        </TabsContent>
        <TabsContent value="members" className="mt-9 w-full text-light-1">
          {communityDetails.members.map(
            (
              user: {
                id: string;
                username: string;
                name: string;
                image: string;
              },
              i: number
            ) => (
              <ProfileCard type="user" user={user} key={i}  />
            )
          )}
        </TabsContent>
        <TabsContent
          value="requests"
          className="mt-9 w-full text-light-1"
        ></TabsContent>
      </Tabs>
    </div>
  );
}

export default page;
