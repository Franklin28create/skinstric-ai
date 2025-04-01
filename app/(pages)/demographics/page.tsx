// @ts-nocheck
"use client";

import {
  NavigationArrows,
  CircularProgress,
  DemographicPossibility,
} from "@/app/components";
import { scanImage, uploadDemographics } from "@/lib/actions/user.actions";
import {
  getDefaultValues,
  setupDemographicData,
  getDemographic,
} from "@/lib/utils/utils";
import { CurrentDemographicsType, DemographicsState } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { demographicOptions } from "@/constants";
import DemographicOptionsButton from "@/app/components/DemographicOptionsButton";
import { useUserInfo } from "@/app/store/useUserInfo";

const Demographics = () => {
  const router = useRouter();
  const [userDemographics, setUserDemographics] = useState<any>({});
  const [currentPercentage, setCurrentPercentage] = useState<number>();
  const { image: savedImage, name, origin } = useUserInfo();
  const [currentDemographic, setCurrentDemographic] =
    useState<CurrentDemographicsType>("race");
  const [isAllDataConfirmed, setIsAllDataConfirmed] = useState<boolean>(false);
  const [confirmedDemographics, setConfirmedDemographics] =
    useState<DemographicsState>({
      race: false,
      gender: false,
      age: false,
    });

  const [selectedDemographics, setSelectedDemographics] = useState<any>({
    race: {},
    gender: {},
    age: {},
  });

  useEffect(() => {
    const image = localStorage.getItem("image") || savedImage;

    if (!image) {
      alert("You'll need to tell us a bit about yourself first!");
      router.push("/intro");
    } else {
      try {
        const sendImage = async (image: string) => {
          const response = await scanImage(image);
          const { data } = await response?.data;
          const sortedDemographics = setupDemographicData(data);
          const defaultValues = getDefaultValues(sortedDemographics);
          setSelectedDemographics({ ...defaultValues });
          setUserDemographics(sortedDemographics);
        };

        sendImage(image);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(selectedDemographics[currentDemographic]).length > 0) {
      const newPercentage = Object.values(
        selectedDemographics[currentDemographic]
      )[0];
      setCurrentPercentage(newPercentage as number);
    }
  }, [userDemographics, selectedDemographics[currentDemographic]]);

  useEffect(() => {
    if (
      confirmedDemographics.age &&
      confirmedDemographics.gender &&
      confirmedDemographics.race
    )
      setIsAllDataConfirmed(true);
  }, [confirmedDemographics]);

  const handleConfirm = () => {
    setConfirmedDemographics({
      ...confirmedDemographics,
      [currentDemographic]: true,
    });
  };

  const handleDemographicsUpload = async (data) => {
    const { race, gender, age } = data;
    if (!race || !gender || !age) {
      return alert("Please confirm All fields");
    }

    const dataToUpload = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, getDemographic(value)])
    );
    try {
      const response = await uploadDemographics({
        ...dataToUpload,
        name,
        location: origin,
      });

      alert("Your information has been updated! Back to the home page...");
      router.push("/");
    } catch (error: any) {
      console.error(error.error);
    }
  };

  return (
    <div className="px-8 h-full w-full md:relative flex flex-col gap-2 md:overflow-hidden max-sm:my-2">
      <div className="flex flex-col">
        <h1 className="uppercase font-light text-xl">A.I Analysis</h1>
        <h1 className="uppercase font-bold text-3xl md:text-7xl">
          Demographics
        </h1>
        <p className="uppercase text-primary-300 text-sm">
          Predicted age & race
        </p>
      </div>

      <div className="flex-1 flex gap-2 max-sm:flex-col">
        <div className="w-full md:w-[15%] h-full flex flex-col gap-1">
          {demographicOptions.map((option, i) => (
            <DemographicOptionsButton
              key={i}
              option={option}
              confirmedDemographics={confirmedDemographics}
              currentDemographic={currentDemographic}
              userDemographics={userDemographics}
              setCurrentDemographic={setCurrentDemographic}
              selectedDemographics={selectedDemographics}
            />
          ))}
        </div>

        <div className="w-full md:w-[60%] h-full max-h-[60vh] bg-primary-150 border-t-2">
          <h1 className="text-4xl capitalize font-light p-2">
            {Object.keys(selectedDemographics[currentDemographic])}
          </h1>

          <div className="flex h-full max-h-[70vh] pb-20">
            <div className="w-full flex justify-end pt-8 px-10">
              <div className="relative w-full max-w-[25vw] h-full max-h-[25vw] self-end">
                <CircularProgress
                  percentage={currentPercentage}
                  color="black"
                />
                <h1 className="absolute_center text-4xl flex font-light max-sm:text-2xl relative">
                  {currentPercentage ? `${currentPercentage}` : "0"}
                  &nbsp;
                  <span className="text-2xl -translate-y-[25%] max-sm:text-sm max-sm:absolute max-sm:top-0 max-sm:right-0 max-sm:translate-x-[75%]">
                    %
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[25%] border-t-2 h-full max-h-[60vh] bg-primary-150">
          <div className="w-full flex justify-between p-2">
            <h1 className="uppercase font-extralight text-sm">
              {currentDemographic}
            </h1>
            <p className="uppercase font-light text-sm">A.I Condfidence</p>
          </div>

          <div className="flex flex-col h-full">
            {Object.keys(userDemographics).length > 0 ? (
              <>
                {Object.entries(userDemographics[currentDemographic]).map(
                  ([demographic, value]) => (
                    <DemographicPossibility
                      confirmedDemographics={confirmedDemographics}
                      demographic={demographic}
                      key={demographic}
                      value={value as number}
                      currentDemographic={currentDemographic}
                      selectedDemographics={selectedDemographics}
                      setSelectedDemographics={setSelectedDemographics}
                    />
                  )
                )}
              </>
            ) : (
              <p className="font-light text-center my-auto pb-20">Loading...</p>
            )}
          </div>
        </div>
      </div>

      <NavigationArrows
        handleLeftArrowClick={() => router.back()}
        isConfirmButton
        isAllDataConfirmed={isAllDataConfirmed}
        setIsAllDataConfirmed={setIsAllDataConfirmed}
        handleRightArrowClick={
          isAllDataConfirmed
            ? () => handleDemographicsUpload(selectedDemographics)
            : handleConfirm
        }
        setConfirmedDemographics={setConfirmedDemographics}
      />
    </div>
  );
};

export default Demographics;
