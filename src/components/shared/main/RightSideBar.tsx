
import ProfileCard from "@/components/custom ui/profile-card";
import { fetchCommunities, fetchUsers } from "@/db/data";

async function RightSidebar() {
  const similarMinds = await fetchUsers({
    count: 4,
  });
  const topCommunities = await fetchCommunities({
    count: 4,
  });

  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          Suggested Communities
        </h3>

        <div className="mt-7 flex w-[350px] flex-col gap-9">
          {topCommunities && topCommunities.length > 0 ? (
            topCommunities.map((mind) => (
              <ProfileCard type="community" key={mind.id} user={mind}  />
            ))
          ) : (
            <p className="!text-base-regular text-light-3">
              No communities yet
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Similar Minds</h3>

        <div className="mt-7 flex w-[350px] flex-col gap-10 overflow-y-auto">
          {similarMinds && similarMinds.length > 0 ? (
            similarMinds.map((mind) => (
              <ProfileCard key={mind.id} user={mind} type="user" />
            ))
          ) : (
            <p className="!text-base-regular text-light-3">No users yet</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default RightSidebar;
