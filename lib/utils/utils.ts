import { DemographicsType } from "@/types";

const convertToPercentages = (demographics: DemographicsType) => {
    const result = Object.fromEntries(
        Object.entries(demographics).map(([key, value]) => {
          const percentage = Math.floor(value * 100);
          return [key, percentage];
        })
      );
    
      return result;
};

export {
    convertToPercentages
}