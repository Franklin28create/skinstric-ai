type status = "INTRO" | "ANALYSIS" | "";

type NavStatusTypes = {
  status: status;
  visible: boolean;
  setStatus: (status: status) => void;
  setVisible: (value: boolean) => void;
};

interface userInfoType {
  name: string;
  origin: string;
  image?: string;
}

interface userInfoHookTypes extends userInfoType {
  setImage: (image: string) => void;
  setName: (name: string) => void;
  setOrigin: (origin: string) => void;
}

type InputType = "name" | "origin";

type UploadOptionsType = "camera" | "upload";

type NavigationArrowsTypes = {
  handleLeftArrowClick: () => void;
  handleRightArrowClick?: () => void;
  leftButtonText?: string;
};

interface Race {
  black: number;
  white: number;
  "southeast asian": number;
  "south asian": number;
  "latino hispanic": number;
  "east asian": number;
  "middle eastern": number;
}
interface Age {
  "0-2": number;
  "3-9": number;
  "20-29": number;
  "30-39": number;
  "40-49": number;
  "10-19": number;
  "50-59": number;
  "60-69": number;
  "70+": number;
}
interface Gender {
  male: number;
  female: number;
}

type CurrentDemographicsType = "race" | "sex" | "gender";

type DemographicsType = Race | Age | Gender;

type Demographics = {
  age: Age;
  race: Race;
  gender: Gender;
};

export {
  status,
  NavStatusTypes,
  userInfoType,
  userInfoHookTypes,
  InputType,
  UploadOptionsType,
  NavigationArrowsTypes,
  Race,
  Age,
  CurrentDemographicsType,
  Gender,
  DemographicsType,
  Demographics,
};
