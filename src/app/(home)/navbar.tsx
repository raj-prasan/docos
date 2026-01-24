import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import {UserButton} from "@clerk/nextjs"

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-full w-full ">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href={"/"}>
          <Image
            src="/docos-custom-logo.svg"
            alt="logo"
            width={110}
            height={50}
          />
        </Link>
      </div>
      <SearchInput/>
      <UserButton/>
    </nav>
  );
};
