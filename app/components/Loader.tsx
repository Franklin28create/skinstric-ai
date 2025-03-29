"use client";

import React, { useEffect, useState } from "react";
import { loadingImages } from "@/constants";
import { useNavStatus } from "../store/useNavStatus";
import { useUserInfo } from "../store/useUserInfo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CameraCaption from "./CameraCaption";
import { useRouter } from "next/navigation";

const Loader = ({ isCameraLoader }: { isCameraLoader: boolean }) => {
  const [loadedImages, setLoadedImages] = useState(0);
  const [isAnimationActive, setIsAnimationActive] = useState<boolean>(false);
  const { image } = useUserInfo();
  const router = useRouter();

  const { visible, setVisible } = useNavStatus();

  useEffect(() => {
    if (!visible) setVisible(false);
    return () => {
      setVisible(true);
    };
  }, []);

  useEffect(() => {
    if (isCameraLoader) {
      setTimeout(() => {
        router.push("/camera");
      }, 2000);
    } else {
      const storedImage = localStorage.getItem("image");
      if (!storedImage) if (image) localStorage.setItem("image", image);
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
    <div className="w-full h-full flex justify-center items-center relative">
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
          {isCameraLoader ? (
            <div className="absolute_center flex flex-col items-center justify-center">
              <img src="/assets/camera.svg" alt="camera" />
              <h1 className="uppercase font-bold">Setting up camera...</h1>
            </div>
          ) : (
            <h1 className="absolute_center uppercase max-lg:text-center">
              Preparing your <br className="hidden max-md:block" /> analysis ...
            </h1>
          )}
        </div>
      </div>
      {isCameraLoader && (
        <div className="absolute bottom-25 max-sm:max-w-[90vw]">
          <CameraCaption />
        </div>
      )}
    </div>
  );
};

export default Loader;
