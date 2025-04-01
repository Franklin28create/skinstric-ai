type status = "INTRO" | "ANALYSIS" | "";

type NavStatusTypes = {
  status: status;
  visible: boolean;
  setStatus: (status: status) => void;
  setVisible: (value: boolean) => void;
};

type CameraStatusTypes = {
  isCameraOn: boolean;
  setIsCameraOn: (value: boolean) => void;
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
  isConfirmButton?: boolean;
  setConfirmedDemographics?: React.Dispatch<
    React.SetStateAction<DemographicsState>
  >;
  isAllDataConfirmed?: boolean;
  setIsAllDataConfirmed?: React.Dispatch<React.SetStateAction<boolean>>;
};

type DemographicsState = {
  race: boolean;
  gender: boolean;
  age: boolean;
};

interface DemographicsOptions {
  option: CurrentDemographicsType;
  confirmedDemographics: DemographicsState;
  currentDemographic: CurrentDemographicsType;
  setCurrentDemographic: React.SetStateAction<CurrentDemographicsType>;
  userDemographics: DemographicsType;
  selectedDemographics: any;
}

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

type DemographicsType = Race | Age | Gender;

type userDemographicsType = {
  race: Race;
  age: Age;
  gender: Gender;
};
type CurrentDemographicsType = keyof userDemographicsType;

type Demographics = {
  age: Age;
  race: Race;
  gender: Gender;
};

interface CircularProgressProps {
  percentage: number | undefined;
  color?: string;
}

type ModalProps = {
  option: UploadOptionsType;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  showModal?: boolean;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
  setIsCameraLoader?: Dispatch<SetStateAction<boolean>>;
};

interface DemographicPossibilityProps {
  demographic: string;
  value: number;
  confirmedDemographics: Demographics;
  currentDemographic: CurrentDemographicsType;
  selectedDemographics: any;
  setSelectedDemographics: React.Dispatch<React.SetStateAction<any>>;
}

type UserUploadInformationType = {
  name: string,
  location: string,
  race: string,
  age: string,
  gender: string
}

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
  CircularProgressProps,
  DemographicsState,
  DemographicPossibilityProps,
  userDemographicsType,
  DemographicsOptions,
  ModalProps,
  CameraStatusTypes,
  UserUploadInformationType
};
