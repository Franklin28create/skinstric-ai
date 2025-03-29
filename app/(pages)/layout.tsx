"use client";

import { ReactNode, useEffect } from "react";
import { useNavStatus } from "../store/useNavStatus";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  const path = usePathname();
  const { setStatus } = useNavStatus();

  useEffect(() => {
    switch (path) {
      case "/analysis":
        setStatus("ANALYSIS");
        break;
      case "/camera":
        setStatus("");
      default:
        setStatus("INTRO");
        break;
    }
  }, [path]);

  return (
    <main className="max-w-8xl mx-auto h-screen py-4 overflow-y-auto pt-12">
      <Navbar />
      <div className="w-full h-full">
        {children}
      </div>
    </main>
  );
};

export default HomeLayout;
