"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

function SearchBar({ type }: { type: "thread" | "community" }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const withPath = type === "thread" ? "search" : "communities";

  useEffect(() => {
    const delayBetweenHits = setTimeout(() => {
      if (q.trim() !== "") {
        router.push(`/${withPath}?q=${q}`);
      } else {
        router.push(`/${withPath}`);
      }
    }, 300);
    return () => clearTimeout(delayBetweenHits);
  }, [q, setQ, withPath, router]);

  return (
    <div className="my-4 searchbar">
      <Image
        src="/assets/search-gray.svg"
        alt="search"
        width={24}
        height={24}
        className="object-contain"
      />
      <Input
        className="no-focus searchbar_input"
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={`Search ${type === "thread" ? "thread" : "community"}`}
      />
    </div>
  );
}

export default SearchBar;
