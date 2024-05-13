import {
    useQuery,
    useInfiniteQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { NewUser } from "../../types/types";
import {
    createNewPost,
    createNewUser,
    getRecentPosts,
    signInAccount,
    signOutAccount,
} from "../appwrite/api";

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: NewUser) => createNewUser(user),
    });
};

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: { email: string; password: string }) =>
            signInAccount(user),
    });
};

export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: signOutAccount,
    });
};

export const useCreateNewPost = () => {
    return useMutation({
        mutationFn: createNewPost,
    });
};

export const useGetRecentPosts = () => {
    return useQuery({
        queryKey: [],
        queryFn: getRecentPosts,
    });
};
