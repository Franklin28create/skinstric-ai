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

export {
  status,
  NavStatusTypes,
  userInfoType,
  userInfoHookTypes,
  InputType,
  UploadOptionsType,
  NavigationArrowsTypes,
};
