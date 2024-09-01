import ThreadCard from "@/components/custom ui/thread-card";
import { fetchAllThreads } from "@/db/data";

export default async function Page() {
  let threads = await fetchAllThreads();
  if (!threads) return <></>;
  threads = JSON.parse(threads);

  return (
    <div>
      <h1 className="head-text">Home</h1>
      <div className="mt-8">
        {/* @ts-ignore */}
        {threads.map((thread, i) => {
          return (
            <div key={i} className="space-y-8">
              <ThreadCard thread={thread} />;
            </div>
          );
        })}
      </div>
    </div>
  );
}
