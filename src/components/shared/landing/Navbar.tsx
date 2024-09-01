import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const UserButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-10 h-10", // Custom width and height
    },
  };

  return (
    <header className="">
      <nav className="flex justify-between items-center py-4 md:py-6 lg:py-8">
        <Link href={"/feed"}>
          <div className="flex gap-2 items-center font-bold">
            <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
            Threads
          </div>
        </Link>

        <ul className="lg:gap-4 justify-center pl-4 hidden md:flex">
          <li className="btn-base-ghost">Enterprise</li>
          <li className="btn-base-ghost">Pricing</li>
          <li className="btn-base-ghost">Docs</li>
          <li className="btn-base-ghost">FAQ</li>
        </ul>

        <div className="flex flex-row-reverse gap-4">
          {/* FIXME: suspense   */}
          <SignedOut>
            <SignInButton>
              <button
                type="button"
                className="btn-base-outline active:translates"
              >
                Login
              </button>
            </SignInButton>

            <SignUpButton>
              <button type="button" className="btn-base-ghost translates">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              userProfileUrl="/user-profile"
              userProfileMode="navigation"
              appearance={UserButtonAppearance}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
