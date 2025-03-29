"use client";

import { NavigationArrows } from "@/app/components";
import { scanImage } from "@/lib/actions/user.actions";
import { convertToPercentages } from "@/lib/utils/utils";
import { DemographicsType, CurrentDemographicsType } from "@/types";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { demographicOptions } from "@/constants";

const Demographics = () => {
  const router = useRouter();
  const [userDemographics, setUserDemographics] = useState({});
  const [currentDemographic, setCurrentDemographic] =
    useState<CurrentDemographicsType>("race");
  const [selectedDemographics, setSelectedDemographics] = useState<any>({
    race: "",
    gender: "",
    age: "",
  });

  const sortDemographics = (demographic: CurrentDemographicsType) => {
    const sortedEntries = Object.entries(demographic)
      .map(([key, value]) => [key, Number(value)])
      .sort((a, b) => b[1] - a[1]);

    return Object.fromEntries(sortedEntries);
  };

  useEffect(() => {
    const image = localStorage.getItem("image");
    if (!image) {
      alert("You'll need to tell us a bit about yourself first!");
      redirect("/intro");
    } else {
      try {
        const sendImage = async (image: string) => {
          const response = await scanImage(image);
          const { data } = await response?.data;
          let updatedDemographics: any = {};
          for (const demographic in data) {
            let updatedValues = convertToPercentages(
              data[demographic] as DemographicsType
            );
            updatedDemographics = {
              ...updatedDemographics,
              [demographic]: updatedValues,
            };
          }
          let sortedDemographics: any = {};
          for (const demographic in updatedDemographics) {
            const sortedValues = sortDemographics(
              updatedDemographics[demographic] as CurrentDemographicsType
            );
            sortedDemographics = {
              ...sortedDemographics,
              [demographic]: sortedValues,
            };
          }

          setUserDemographics(sortedDemographics);
        };

        sendImage(image);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(userDemographics).length > 0) {
      // TODO: Implement default values: setDefaultValues() OR have separate states for each individual demographic setRace, etc.
    }
  }, [userDemographics]);

  const getDominantDemographic = (option: CurrentDemographicsType) =>
    Object.entries(userDemographics[option])[0][0];

  return (
    <div className="px-8 h-full w-full relative flex flex-col gap-2 overflow-x-hidden">
      <div className="flex flex-col">
        <h1 className="uppercase font-light text-xl">A.I Analysis</h1>
        <h1 className="uppercase font-bold text-7xl">Demographics</h1>
        <p className="uppercase text-primary-300 text-sm">
          Predicted age & race
        </p>
      </div>

      <div className="flex-1 flex gap-2">
        <div className="w-[15%] h-full flex flex-col gap-1">
          {demographicOptions.map((option, i) => (
            <div
              key={i}
              className={`h-[104px] flex justify-between flex-col ${
                currentDemographic === option
                  ? "bg-secondary text-white"
                  : "bg-primary-100 hover:bg-primary-200 border-t-2"
              } transition-colors duration-400`}
              onClick={() => {
                if (currentDemographic !== option)
                  setCurrentDemographic(option as CurrentDemographicsType);
              }}
            >
              <div>
                {Object.keys(userDemographics).length > 0 ? (
                  <h1 className="capitalize">
                    {selectedDemographics[option] ||
                      getDominantDemographic(option as CurrentDemographicsType)}
                  </h1>
                ) : (
                  <h1>Loading...</h1>
                )}
              </div>

              <h1 className="uppercase">{option}</h1>
            </div>
          ))}
        </div>

        <div className="w-[60%] border h-full"></div>

        <div className="w-[25%] border-t-2 h-full">
          <div className="w-full flex justify-between p-2">
            <h1 className="uppercase font-extralight text-sm">
              {currentDemographic}
            </h1>
            <p className="uppercase font-light text-sm">A.I Condfidence</p>
          </div>

          <div className="px-2 flex flex-col h-full">
            {Object.keys(userDemographics).length > 0 ? (
              <>
                {Object.entries(userDemographics[currentDemographic]).map(
                  ([key, value], index) => (
                    <div
                      className={`flex justify-between border cursor-pointer ${
                        selectedDemographics[currentDemographic] === key
                          ? "bg-secondary text-white"
                          : "bg-primary-100 hover:bg-primary-200 transition-colors duration-300"
                      }`}
                      key={key}
                      onClick={() => {
                        if (selectedDemographics[currentDemographic] !== key) {
                          setSelectedDemographics({
                            ...selectedDemographics,
                            [currentDemographic]: key,
                          });
                        }
                      }}
                    >
                      <h2 className="flex gap-2">
                        <img
                          src={
                            selectedDemographics[currentDemographic] === key
                              ? "/assets/radio-button_selected.svg"
                              : "/assets/radio-button.svg"
                          }
                          alt=""
                        />
                        <span>{key}</span>
                      </h2>

                      <p>{value as string} %</p>
                    </div>
                  )
                )}
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>

      <NavigationArrows handleLeftArrowClick={() => router.back()} />
    </div>
  );
};

export default Demographics;
