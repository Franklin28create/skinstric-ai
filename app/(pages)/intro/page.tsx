"use client";

import { InputArea, NavigationArrows } from "@/app/components";
import { InputType } from "@/types";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useUserInfo } from "@/app/store/useUserInfo";

const Intro = () => {
  // TODO: Add data to database in handleProceedButton function

  const router = useRouter();
  const [inputType, setInputType] = useState<InputType>("name");
  const userInfo = useUserInfo();

  useGSAP(() => {
    gsap.to("#proceed_btn", {
      opacity: userInfo[inputType].length > 0 ? 1 : 0,
    });
  }, [userInfo[inputType]]);

  useGSAP(() => {
    gsap.from("#input_area", {
      y: inputType === "name" ? 100 : -100,
      duration: 1.2,
    });

    gsap.to("#input_area", {
      opacity: 1,
      y: 0,
      duration: 1.2,
    });
  }, [inputType]);

  const handleBackButtonClick = () => {
    inputType === "origin" ? setInputType("name") : router.push("/");
  };

  const handleProceedButtonClick = () => {
    inputType === "origin" ? router.push("/upload") : setInputType("origin");
  };

  return (
    <div className="px-8 h-full flex flex-col">
      <h1 className="uppercase font-bold">To start analysis</h1>

      <div className="flex-1 flex items-center justify-center" id="input_area">
        <InputArea inputType={inputType} />
      </div>

      <NavigationArrows
        handleLeftArrowClick={handleBackButtonClick}
        handleRightArrowClick={handleProceedButtonClick}
        
      />
    </div>
  );
};

export default Intro;
