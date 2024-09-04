'use client'
import { usePathname } from "next/navigation";

export default function Layout({children}: {children: React.ReactNode}) {
  const path = usePathname();
  const pathNew = path.split('/')
  console.log("🚀 ~ file: layout.tsx:6 ~ Layout ~ pathNew:", pathNew)


  return (
    <div>
      <h1 className="head-text capitalize mb-4">
        {pathNew.length > 2 ? 'Community Profile': 'Communities'}
      </h1>

      {children}
    </div>
  );
}