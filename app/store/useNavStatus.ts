import { create } from "zustand";

type status = "INTRO" | "ANALYSIS" | "";

type NavStatusTypes = {
  status: status;
  visible: boolean;
  setStatus: (status: status) => void;
  setVisible: (value: boolean) => void;
};

export const useNavStatus = create<NavStatusTypes>((set) => ({
  status: "",
  visible: true,
  setStatus: (status) => set({ status }),
  setVisible: (value) => set({ visible: value }),
}));
