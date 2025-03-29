"use client";

import { NavigationArrows } from "@/app/components";
import { useNavStatus } from "@/app/store/useNavStatus";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { analysisOptions } from "@/constants";

const Analysis = () => {
  const router = useRouter();
  const { visible, setVisible } = useNavStatus();
  useEffect(() => {
    if (!visible) setVisible(true);
  }, []);

  return (
    <section className="px-8 h-full flex flex-col items-center justify-center relative">
      <div className="absolute left-8 top-4">
        <h1 className="font-semibold">A. I. Analysis</h1>
        <p className="font-light">
          A. I. has estimated the following. <br />
          Fix estimated information if needed.
        </p>
        <p></p>
      </div>
      <div className="h-full flex w-full max-w-[70%] max-md:max-w-[100%]">
        <img
          src="/assets/rombuses.svg"
          alt="rombus"
          className="flex-1 max-md:rotate-45"
        />
        <div className="absolute_center grid grid-cols-2 grid-rows-2 xl:size-[22vw] size-[28vw] max-md:size-[45vw] md:-rotate-45 gap-2">
          {analysisOptions.map((option, i) => (
            <div
              key={i}
              onClick={() => {
                option === "Demographics"
                  ? router.push("/demographics")
                  : alert("Haven't applied this feature yet!");
              }}
              className={`bg-primary-200 hover:bg-primary-300 transition-colors duration-300 ${
                option === "Demographics"
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
              } flex items-center justify-center text-white text-lg font-bold`}
            >
              <p className="md:rotate-45 text-secondary max-sm:text-[12px] max-md:text-[16px] text-center">
                {option}
              </p>
            </div>
          ))}
        </div>
      </div>

      <NavigationArrows handleLeftArrowClick={() => router.back()} />
    </section>
  );
};

export default Analysis;
