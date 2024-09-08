import { getActivity } from "@/actions/user.actions";
import ProfilePhoto from "@/components/ui/profile-photo";
import { fetchUserById } from "@/db/data";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Page() {
  const user = await currentUser();
  if (!user) return;
  const userFromDB = await fetchUserById(user.id);

  const activities = await getActivity(userFromDB._id);

  return (
    <div>
      <h1 className="head-text">Activity</h1>
      <div className="mt-10">
        {activities && activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity._id}>
                <Link href={`/thread/${activity.parentId}`}>
                  <div className="activity-card">
                    <ProfilePhoto
                      image={activity.author.image}
                      className="w-8 h-8"
                    />
                    <p className="!text-small-regular text-light-1">
                      <span className="text-primary-500 mr-2">
                        {activity.author.name}
                      </span>
                      replied to your thread
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="!text-base-regular text-light-3">No Activity yet</p>
        )}
      </div>
    </div>
  );
}
