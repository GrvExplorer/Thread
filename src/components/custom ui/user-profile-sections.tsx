'use client';
import { profileTabs } from "@/constants";
import { cn } from "@/utils/utils";
import Image from "next/image";
import { useState } from "react";

function UserProfileSections() {
  const [activeTab, setActiveTab] = useState('threads');
  return (
    <div className="flex w-full bg-dark-4 rounded-lg justify-between text-light-1">
      {profileTabs.map((tab) => (
        <div key={tab.label}
        onClick={() => setActiveTab(tab.value)}
        className={cn("flex px-6 py-3 w-full h-full items-center gap-2 cursor-pointer", tab.value === activeTab ? "border-b-2 rounded-lg animate-in border-primary-500 bg-dark-3" : "")}>
          <Image
            src={tab.icon}
            alt={tab.value}
            width={20}
            height={20}
          />
          { tab.label }
        </div>
      ))}
    </div>
  );
}

export default UserProfileSections;
