import LeftSideBar from "@/components/shared/main/LeftSideBar";
import RightSideBar from "@/components/shared/main/RightSideBar";
import Topbar from "@/components/shared/main/Topbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid bg-black grid-rows-[auto_1fr] h-screen">
      {/* TODO: do it later on + responsiveness + for auth use auth.js*/}
      <Topbar />
      <div className="grid w-screen grid-cols-[auto_1fr_auto]">
        <LeftSideBar />
        <section className="main-container">
          <div className="w-full max-w-4xl">{children}</div>
        </section>
        <RightSideBar />
        
      </div>
    </section>
  );
}
