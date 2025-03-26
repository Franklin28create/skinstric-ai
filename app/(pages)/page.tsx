"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Home() {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState<boolean>();

  useGSAP(() => {
    gsap.to("#title", {
      y: 0,
      opacity: 1,
      duration: 0.5,
      x: isHovering ? "-35%" : 0,
    });

    gsap.to("#rectangle-left", {
      opacity: isHovering ? 0 : 1,
      duration: 0.2,
      delay: 0.5,
    });
  }, [isHovering]);

  // TODO: Mobile Responsiveness

  return (
    <section className="h-full flex justify-center items-center relative">
      <h1
        className={`text-center text-9xl font-light transition-all duration-600 translate-y-[35%] opacity-0`}
        id="title"
      >
        Sophisticated
        <br />
        skincare
      </h1>

      <div className={`absolute left-0`}>
        <div
          className="relative w-full h-full flex items-center"
          id="rectangle-left"
        >
          <img src="/assets/rectangle-left.svg" alt="rectangle" />
          <div className="flex items-center absolute bottom-[46%] cursor-not-allowed left-[20%] gap-2">
            <img
              src="/assets/arrow-left.svg"
              alt="arrow-left"
              className="max-h-[40px]"
            />
            Discover A.I
          </div>
        </div>
      </div>

      <div className="absolute right-0">
        <div className="relative w-full h-full">
          <img src="/assets/rectangle-right.svg" alt="rectangle" />
          <div className="absolute w-full h-full top-0">
            <img
              src="/assets/rectangle-right.svg"
              alt="rectangle"
              className={`opacity-0 absolute right-[24px] -z-1 ${
                isHovering && "opacity-40"
              } transition-all duration-400`}
            />
            <img
              src="/assets/rectangle-right.svg"
              alt="rectangle"
              className={`opacity-0 absolute right-[48px] -z-1 ${
                isHovering && "opacity-60"
              } transition-all duration-600`}
            />
          </div>
          <div className="flex items-center absolute bottom-[46%] right-[20%] gap-2">
            <h1>Take Test</h1>
            <img
              src={`/assets/arrow-${isHovering ? "expanded" : "right"}.svg`}
              alt="arrow-left"
              className="cursor-pointer max-h-[40px]"
              onClick={() => router.push("/intro")}
              onPointerEnter={() => setIsHovering(true)}
              onPointerLeave={() => setIsHovering(false)}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 p-12">
        <p className="max-w-[45%]">
          Skinstric developed an A.I. that creates a highly-personalised routine
          tailored to what your skin needs.
        </p>
      </div>
    </section>
  );
}
