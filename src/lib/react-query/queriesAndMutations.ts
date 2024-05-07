import {
    useQuery,
    useInfiniteQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { NewUser } from "../../types/types";
import { createNewUser, signInAccount } from "../appwrite/api";

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
