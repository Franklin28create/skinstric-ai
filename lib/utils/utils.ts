import { CurrentDemographicsType, DemographicsType, userDemographicsType } from "@/types";

const convertToPercentages = (demographics: DemographicsType) => {
    const result = Object.fromEntries(
        Object.entries(demographics).map(([key, value]) => {
          const percentage = Math.floor(value * 100);
          return [key, percentage];
        })
      );
    
      return result;
};

const getDefaultValues = (obj: CurrentDemographicsType) => {
  const getFirstEntry = (demographic: CurrentDemographicsType) => {
    const [key, value] = Object.entries(demographic)[0];
    return { [key]: value };
  };

  return {
    "race": getFirstEntry(obj["race"]),
    "age": getFirstEntry(obj["age"]),
    "gender": getFirstEntry(obj["gender"]),
  }
}

const sortDemographics = (demographic: CurrentDemographicsType) => {
  const sortedEntries = Object.entries(demographic)
    .map(([key, value]) => [key, Number(value)])
    .sort((a, b) => b[1] - a[1]);

  return Object.fromEntries(sortedEntries);
};

const setupDemographicData = (data: userDemographicsType | any) => {
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

  return sortedDemographics;
}

export {
    getDefaultValues,
    setupDemographicData
}