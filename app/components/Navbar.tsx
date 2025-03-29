"use client";

import { useRouter } from "next/navigation";
import { useNavStatus } from "../store/useNavStatus";

const Navbar = ({ hideCodeButton = false }: { hideCodeButton?: boolean }) => {
  const { status, visible } = useNavStatus();
  const router = useRouter();
  if (!visible) return null;

  return (
    <div
      className={`flex w-full absolute top-0 justify-between mt-[1%] px-8 max-md:px-4 items-center h-[40px] z-10 ${
        !hideCodeButton && "max-sm:bg-primary-200"
      } max-sm:py-6 max-sm:rounded-xl`}
    >
      <div className="flex gap-3">
        <h1
          className={`font-light uppercase cursor-pointer ${
            hideCodeButton && "text-primary-300"
          }`}
          onClick={() => router.push("/")}
        >
          Skinstric
        </h1>
        <p
          className={`${
            hideCodeButton ? "text-primary-200" : "text-primary-300"
          }`}
        >
          [ {status || " ... "} ]
        </p>
      </div>
      {!hideCodeButton && (
        <button className="bg-secondary px-[16px] py-[8px] text-white uppercase cursor-not-allowed">
          Enter Code
        </button>
      )}
    </div>
  );
};

export default Navbar;
