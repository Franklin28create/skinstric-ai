"use client";

import React, { useEffect, useState } from "react";
import { loadingImages } from "@/constants";
import { useNavStatus } from "../store/useNavStatus";
import { useUserInfo } from "../store/useUserInfo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Loader = () => {
// TODO: Implement isAILoader variable and reuse "TO GET BETTER RESULTS" component here and on camera
// for the camera component we can add a new layout.tsx outside of the root that has w-screen & h-screen

  const { visible, setVisible } = useNavStatus();
  useEffect(() => {
    if (!visible) setVisible(false);
    return () => {
      setVisible(true);
    };
  }, []);

  const [loadedImages, setLoadedImages] = useState(0);
  const [isAnimationActive, setIsAnimationActive] = useState<boolean>(false);
  const { image } = useUserInfo();
  useEffect(() => {
    const storedImage = localStorage.getItem("image");
    if (!storedImage) {
      if (image) localStorage.setItem("image", image);
    }
  }, []);

  useEffect(() => {
    if (loadedImages === loadingImages.length) {
      setIsAnimationActive(true);
    }
  }, [loadedImages, loadingImages.length]);

  useGSAP(() => {
    if (isAnimationActive) {
      gsap.to(".rotate-forward", {
        rotation: 360,
        duration: 4,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".rotate-backward", {
        rotation: -360,
        duration: 4,
        ease: "none",
        repeat: -1,
      });
    }
  }, [isAnimationActive]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full h-full flex md:max-w-[50%] relative">
        <div className="flex-1 relative">
          {loadingImages.map((imageUrl, i) => (
            <img
              src={imageUrl}
              alt="loader rombus"
              key={i}
              className={`absolute_center transition-opacity duration-500 ${
                loadedImages === loadingImages.length
                  ? i % 2
                    ? "rotate-forward"
                    : "rotate-backward"
                  : "opacity-0"
              }`}
              onLoad={() => setLoadedImages((prev) => prev + 1)}
            />
          ))}
          <h1 className="absolute_center uppercase max-lg:text-center">
            Preparing your <br className="hidden max-md:block" /> analysis ...
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Loader;
