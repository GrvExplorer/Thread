"use client";
import { usePathname } from "next/navigation";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  let path = usePathname();
  path = path.split("/")[2];

  return (
    <div>
      <h1 className="head-text capitalize mb-4">
        Profile {path === "edit" && "/ Edit"}
      </h1>

      {children}
    </div>
  );
}
