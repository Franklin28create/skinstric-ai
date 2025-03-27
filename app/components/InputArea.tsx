"use client";

import { InputType, userInfoHookTypes } from "@/types";
import { useUserInfo } from "@/app/store/useUserInfo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Input = ({
  type,
  name,
  origin,
  setName,
  setOrigin,
}: userInfoHookTypes & { type: InputType }) => {
  return (
    <input
      type={type === "name" ? "name" : "text"}
      name={type}
      placeholder={
        type === "name" ? "Introduce Yourself" : "Where are you from?"
      }
      className="intro_input gsap-opacity opacity-0"
      onChange={(e) => {
        if (type === "name") setName(e.target.value);
        else setOrigin(e.target.value);
      }}
      value={type === "name" ? name : origin}
    />
  );
};

const InputArea = ({ inputType }: { inputType: InputType }) => {
  const { name, origin, setName, setOrigin } = useUserInfo();

  useGSAP(() => {
    gsap.to(".gsap-opacity", {
      opacity: 1,
      duration: 1,
      delay: 1,
    });
  }, []);

  useGSAP(() => {
    gsap.to(".rombuses_img", {
      rotation: inputType === 'name' ? 180 : -180,
      duration: 2,
    });
  }, [inputType])

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full max-w-[70%] max-md:max-w-[98%]">
        <img
          src="/assets/rombuses.svg"
          alt="rombuses"
          className="w-full rombuses_img"
        />
        <div className="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] flex flex-col w-full items-center">
          <label className="uppercase text-primary-300 gsap-opacity opacity-0 max-md:text-[20px]">
            Click to Type
          </label>
          <Input
            type={inputType}
            name={name}
            origin={origin}
            setName={setName}
            setOrigin={setOrigin}
          />
        </div>
      </div>
    </div>
  );
};

export default InputArea;
