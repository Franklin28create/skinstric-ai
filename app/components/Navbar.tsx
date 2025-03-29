"use client";

import { useRouter } from "next/navigation";
import { useNavStatus } from "../store/useNavStatus";

const Navbar = () => {
  const { status, visible } = useNavStatus();
  const router = useRouter();
  if (!visible) return null;

  return (
    <div className="flex w-full absolute top-0 justify-between mt-[1%] px-8 max-md:px-4 items-center h-[40px]">
      <div className="flex gap-3">
        <h1
          className="font-semibold uppercase cursor-pointer"
          onClick={() => router.push("/")}
        >
          Skinstric
        </h1>
        <p className="text-primary-300">[ {status || '...'} ]</p>
      </div>
      <button className="bg-secondary px-[16px] py-[8px] text-white uppercase cursor-not-allowed">
        Enter Code
      </button>
    </div>
  );
};

export default Navbar;
