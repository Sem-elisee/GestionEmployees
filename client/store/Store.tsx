import { create } from "zustand";

interface UserState {
  Email: string;
  Numero: string;
  setUserInfo: (Email: string, Numero: string) => void;
}
export const useUserStore = create<UserState>((set) => ({
  Email: "",
  Numero: "",
  setUserInfo: (Email, Numero) => set({ Email, Numero }),
}));
