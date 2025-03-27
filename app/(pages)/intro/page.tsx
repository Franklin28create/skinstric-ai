"use client";

import InputArea from "@/app/components/InputArea";
import { InputType, userInfoType } from "@/types";
import { useRef, useState } from "react";
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
    inputType === "origin" ? router.push("/analysis") : setInputType("origin");
  };

  return (
    <div className="px-8 h-full flex flex-col">
      <h1 className="uppercase font-bold">To start analysis</h1>

      <div className="flex-1 flex items-center justify-center" id="input_area">
        <InputArea inputType={inputType} />
      </div>

      <div className="w-full flex justify-between">
        <h1 className="intro_btn" onClick={handleBackButtonClick}>
          <img src="/assets/arrow-left.svg" alt="arrow" />
          Back
        </h1>

        <h1
          className="intro_btn opacity-0"
          id="proceed_btn"
          onClick={handleProceedButtonClick}
        >
          <img src="/assets/arrow-right.svg" alt="arrow" />
          Proceed
        </h1>
      </div>
    </div>
  );
};

export default Intro;
