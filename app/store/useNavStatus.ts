import { NavStatusTypes } from "@/types";
import { create } from "zustand";

export const useNavStatus = create<NavStatusTypes>((set) => ({
  status: "",
  visible: true,
  setStatus: (status) => set({ status }),
  setVisible: (value) => set({ visible: value }),
}));
