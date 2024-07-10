import {
    useQuery,
    // useInfiniteQuery,
    useMutation,
    useQueryClient,
    useQueries,
} from "@tanstack/react-query";
import { DeletePost, NewUser, UpdatePost } from "../../types/types";
import {
    createNewPost,
    createNewUser,
    deletePost,
    getCurrentUser,
    getPostById,
    getRecentPosts,
    getUserById,
    likePost,
    savePost,
    signInAccount,
    signOutAccount,
    unSavePost,
    updatePost,
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
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createNewPost,
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ["getRecentPosts"],
            }),
    });
};

export const useGetRecentPosts = () => {
    return useQuery({
        queryKey: ["getRecentPosts"],
        queryFn: getRecentPosts,
        refetchOnWindowFocus: false,
        staleTime: 2 * 60 * 1000,
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
            // queryClient.invalidateQueries({
            //     queryKey: ["getRecentPosts"],
            // });
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
        queryKey: ["getUserById", userId],
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
            refetchOnWindowFocus: false,
        })),
        combine: (posts) => {
            return {
                data: posts.map((post) => post.data),
                pending: posts.some((post) => post.isFetching),
            };
        },
    });
};

export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (post: UpdatePost) => updatePost(post),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: ["getPostById", data?.$id],
            });
            queryClient.invalidateQueries({
                queryKey: ["getPostsByIds"],
            });
            queryClient.invalidateQueries({
                queryKey: ["getRecentPosts"],
            });
            queryClient.invalidateQueries({
                queryKey: ["getCurrentUser"],
            });
        },
    });
};

export const useDeletePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (post: DeletePost) => deletePost(post),
        onSuccess: (data: string | undefined) => {
            queryClient.invalidateQueries({
                queryKey: ["getCurrentUser"],
            });
            queryClient.invalidateQueries({
                queryKey: ["getRecentPosts"],
            });
            queryClient.invalidateQueries({
                queryKey: ["getUserById", data],
            });
        },
    });
};
