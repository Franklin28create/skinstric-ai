import { NavStatusHookTypes } from "@/types";
import { create } from "zustand";

export const useUserInfo = create<NavStatusHookTypes>((set) => ({
  name: "",
  origin: "",
  setName: (name) => set({ name }),
  setOrigin: (origin) => set({ origin }),
}));
