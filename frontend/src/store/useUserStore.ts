import { create } from "zustand";

interface UserState {
    id: number;
    username: string;
    fullName: string;
    email: string;
    avatar: string;
    setUserEmail: (email: string) => void;
    setUsername: (username: string) => void;
    setUserId: (id: number) => void;
    setUserFullName: (fullName: string) => void;
    setAvatar: (src: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
    id: 0,
    username: "",
    fullName: "",
    email: "",
    avatar: "",
    setUserEmail: (email: string) => set({ email }),
    setUsername: (username: string) => set({ username }),
    setUserId: (id: number) => set({ id }),
    setUserFullName: (fullName: string) => set({ fullName}),
    setAvatar: (src: string) => set({ avatar: src })
}))