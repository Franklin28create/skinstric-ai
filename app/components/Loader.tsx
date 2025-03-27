"use client";

import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { loadingImages } from "@/constants";

const Loader = () => {
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    imagesRef.current.forEach((img, index) => {
      gsap.to(img, {
        rotation: index % 2 ? 360 : -360,
        duration: 3,
        repeat: -1,
        ease: "none",
        delay: index * 0.15,
      });
    });
  }, []);
  return (
    <div className="h-full max-x-screen w-full max-h-screen">
      <div className="w-full h-full flex items-center justify-center max-w-[50%] mx-auto max-h-screen">
        <div className="relative w-full h-full">
          {loadingImages.map((imageUrl, i) => (
            <img
              src={imageUrl}
              ref={(el) => {
                if (el) imagesRef.current[i] = el;
              }}
              alt="loading image"
              className="rombus_loader"
              key={i}
            />
          ))}
          <h1 className="absolute top-[50%] -translate-x-[50%] -translate-y-[50%] left-[50%]">
            Preparing your analysis
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Loader;
