import { fetchCommunities } from "@/actions/community.actions";
import ProfileCard from "@/components/custom ui/profile-card";
import SearchBar from "@/components/custom ui/search-bar";

export default async function Page({
  searchParams,
}: {
  searchParams: { q: string | undefined };
}) {
  const { q } = searchParams;

  const { communities, isNext } = await fetchCommunities({ searchString: q });

  return (
    <div className="">
      <SearchBar type={"community"} />

      <div className="space-y-4">
        {communities ? (
          communities.map((community) => (
            <ProfileCard type="community" key={community.id} user={community} />
          ))
        ) : (
          <p className="!text-base-regular text-light-3">No communities yet</p>
        )}

        {/* FIXME: add pagination */}
      </div>
    </div>
  );
}
