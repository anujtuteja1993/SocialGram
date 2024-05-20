import {
    useQuery,
    // useInfiniteQuery,
    useMutation,
    useQueryClient,
    useQueries,
} from "@tanstack/react-query";
import { NewUser } from "../../types/types";
import {
    createNewPost,
    createNewUser,
    getCurrentUser,
    getPostById,
    getRecentPosts,
    getUserById,
    likePost,
    savePost,
    signInAccount,
    signOutAccount,
    unSavePost,
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
        queryKey: ["getRecentPosts"],
        queryFn: getRecentPosts,
    });
};

export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: ["getCurrentUser"],
        queryFn: getCurrentUser,
    });
};

export const useLikePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            postId,
            likesArray,
        }: {
            postId: string;
            likesArray: string[];
        }) => likePost(postId, likesArray),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["getCurrentUser"],
            });
            queryClient.invalidateQueries({
                queryKey: ["getRecentPosts"],
            });
        },
    });
};

export const useSavePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
            savePost(userId, postId),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ["getCurrentUser"],
            }),
    });
};

export const useUnsavePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (saveId: string) => unSavePost(saveId),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ["getCurrentUser"],
            }),
    });
};

export const useGetUserById = (userId: string) => {
    return useQuery({
        queryKey: ["getUserByID"],
        queryFn: () => getUserById(userId),
        enabled: !!userId,
        refetchOnWindowFocus: false,
    });
};

export const useGetPostById = (postId: string) => {
    return useQuery({
        queryKey: ["getPostById", postId],
        queryFn: () => getPostById(postId),
    });
};

export const useGetPostsbyIds = (postsIds: string[]) => {
    return useQueries({
        queries: postsIds?.map((id: string) => ({
            queryKey: ["getPostsByIds", id],
            queryFn: () => getPostById(id),
        })),
        combine: (posts) => {
            return {
                data: posts.map((post) => post.data),
                pending: posts.some((post) => post.isPending),
            };
        },
    });
};

// export const useGetPostsbyIds = (postsIds: string[]) => {
//     return useQueries({
//         queries: postsIds?.map((id: string) => ({
//             queryKey: ["getPostsByIds", id],
//             queryFn: () => getPostById(id),
//         })),
//     });
// };
