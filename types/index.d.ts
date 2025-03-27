export type status = "INTRO" | "ANALYSIS" | "";

export type NavStatusTypes = {
  status: status;
  visible: boolean;
  setStatus: (status: status) => void;
  setVisible: (value: boolean) => void;
}

export interface userInfoType {
  name: string;
  origin: string;
  image?: string
};

export interface userInfoHookTypes extends userInfoType {
  setImage: (image: string) => void;
  setName: (name: string) => void;
  setOrigin: (origin: string) => void;
}

export type InputType = "name" | "origin";

export type UploadOptionsType = "camera" | "upload"