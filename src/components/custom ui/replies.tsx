import ThreadCard from "./thread-card";

function ShowReplies({ replies }) {
  console.log(replies);

  return (
    <>
      {replies.map((reply, i) => (
        <div key={i} className="space-y-4">
          <ThreadCard thread={reply} />
        </div>
      ))}
    </>
  );
}

export default ShowReplies;
