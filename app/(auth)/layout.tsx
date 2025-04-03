"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ReactNode } from "react";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const AuthLayout = ({ children }: { children: ReactNode }) => {
  useGSAP(() => {
    gsap.from(".auth-page_modal", {
      opacity: 0,
      rotation: 12,
      scale: 1.05,
      delay: 2,
      duration: 3,
      ease: "none",
    });
    gsap.to(".auth-page_modal", {
      scale: 1,
      duration: 2,
      ease: "bounce.in",
    });

    gsap.from(".auth_modal-text", {
      duration: 3,
      delay: 1.2,
      color: "#1a1b1c",
      ease: "power2.inOut",
    });
    gsap.to(".auth_modal-text", {
      color: "#fcfcfc",
      duration: 5,
      opacity: 1,
      text: "To Proceded to Skinstric AI:",
      ease: "power2.inOut",
    });

    gsap.to(".auth-container", {
      opacity: 1,
      duration: 1.5,
      ease: "none",
    });
  }, []);
  return (
    <div className="w-full h-screen flex justify-center items-center overflow-hidden bg-primary-300 flex-col gap-4 auth-container">
      <h1 className="font-light text-2xl auth_modal-text opacity-0">
        你好您好早上好谢谢你好您好早上好谢谢
      </h1>
      {children}
    </div>
  );
};

export default AuthLayout;
