import { userInfoHookTypes } from "@/types";
import { create } from "zustand";

export const useUserInfo = create<userInfoHookTypes>((set) => ({
  name: "",
  origin: "",
  image: '',
  setImage: (image) => set({image}),
  setName: (name) => set({ name }),
  setOrigin: (origin) => set({ origin }),
}));
