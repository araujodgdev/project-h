import { PostProps } from "@/components/Post";
import { create } from "zustand";

interface PostState {
    posts: PostProps[];
    setPosts: (posts: PostProps[]) => void;
}

export const usePostStore = create<PostState>((set) => ({
    posts: [],
    setPosts: (posts: PostProps[]) => set({ posts })
}))