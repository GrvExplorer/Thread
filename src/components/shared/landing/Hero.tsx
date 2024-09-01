"use client";
import { GridBackground } from "@/components/ui/GridBackground";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <main className="">
      <GridBackground>
        <div className="flex flex-col items-center mt-10 gap-2">
          <h1 className="text-heading-1 text-center max-w-[43rem] text-base-content">
            Power connection with{" "}
            <span className="bg-primary inline-block -rotate-1 text-primary-content px-2">
              friends and family
            </span>
          </h1>
          <h2 className="text-sub-heading text-center max-w-[30rem] ">
            Savings, visibility, and infrastructure guardrails. One automated
            platform.
          </h2>

          <button
            onClick={() => router.push("/feed")}
            className="relative inline-flex h-16 w-[160px] overflow-hidden rounded-full p-[1px] focus:outline-none "
          >
            <span className="absolute inset-[-100%] animate-[spin_2s_linear_infinite] btn-cta" />
            <div className="flex justify-center items-center w-full h-full">
              <span className="inline-flex h-[54px] w-[150px] cursor-pointer items-center justify-center rounded-full px-3 py-1 text-sm font-medium text-primary-content backdrop-blur-3xl">
                Start Now
              </span>
            </div>
          </button>
        </div>
      </GridBackground>
    </main>
  );
}
