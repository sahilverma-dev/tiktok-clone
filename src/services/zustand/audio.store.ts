import { create } from "zustand";

interface AudioStore {
  mute: boolean;
  setMute: (mute: boolean) => void;
}

export const audioStore = create<AudioStore>((set) => ({
  mute: true,
  setMute: (mute) => set({ mute }),
}));
