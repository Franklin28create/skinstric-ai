"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useNavStatus } from "../store/useNavStatus";

export default function Home() {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState<boolean>();
  const { visible, setVisible } = useNavStatus();

  useEffect(() => {
    if (!visible) setVisible(true);
  }, []);

  useGSAP(() => {
    gsap.to("#title", {
      y: 0,
      opacity: 1,
      duration: 0.5,
      x: isHovering ? -250 : 0,
      ease: "power2.inOut",
    });

    gsap.to("#rectangle-left", {
      opacity: isHovering ? 0 : 1,
      duration: 0.2,
      delay: 0.5,
    });

    gsap.to("#description", {
      y: isHovering ? 20 : 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [isHovering]);

  return (
    <section className="h-full flex justify-center items-center relative max-md:flex-col">
      <h1
        className="text-center text-9xl font-light transition-all duration-600 translate-y-[35%] opacity-0 max-md:text-5xl max-lg:text-7xl"
        id="title"
      >
        Sophisticated
        <br />
        skincare
      </h1>

      <div className="absolute left-0 max-md:left-0 home-button_responsive">
        <div className="home-rectangles" id="rectangle-left">
          <img
            src="/assets/rectangle-left.svg"
            alt="rectangle"
            className="max-md:hidden"
          />
          <div className="home-rectangles_img cursor-not-allowed left-[20%]">
            <img
              src="/assets/arrow-left.svg"
              alt="arrow-left"
              className="max-h-[40px]"
            />
            Discover A.I
          </div>
        </div>
      </div>

      <div className="absolute right-0 max-md:right-12 home-button_responsive">
        <div className="home-rectangles">
          <img
            src="/assets/rectangle-right.svg"
            alt="rectangle"
            className="max-md:hidden"
          />
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
          <div className="home-rectangles_img right-[20%]">
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

      <div
        className="absolute bottom-0 md:left-0 p-12 md:max-w-[30%] text-sm max-md:text-md max-md:text-center"
        id="description"
      >
        <p>
          Skinstric developed an A.I. that creates a highly-personalised routine
          tailored to what your skin needs.
        </p>
      </div>
    </section>
  );
}
