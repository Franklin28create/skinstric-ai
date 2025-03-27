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
};

export interface userInfoHookTypes extends userInfoType {
  setName: (name: string) => void;
  setOrigin: (origin: string) => void;
}

export type InputType = "name" | "origin";
