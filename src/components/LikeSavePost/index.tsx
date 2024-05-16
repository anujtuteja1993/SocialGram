import {
    BookmarkIcon as SavedOutline,
    HeartIcon as LikedOutline,
} from "@heroicons/react/24/outline";
import {
    BookmarkIcon as SavedSolid,
    HeartIcon as LikedSolid,
} from "@heroicons/react/24/solid";

import { Models } from "appwrite";
import { useEffect, useState } from "react";
//import { likePost, savePost, unSavePost } from "../../lib/appwrite/api";
import {
    useGetCurrentUser,
    useLikePost,
    useSavePost,
    useUnsavePost,
} from "../../lib/react-query/queriesAndMutations";

type LikeSavePostProps = {
    post: Models.Document;
    userId: string;
};

const LikeSavePost = ({ post, userId }: LikeSavePostProps) => {
    // console.log(post);
    const [likes, setLikes] = useState<string[]>(
        post.likes.map((like: any) => like.$id)
    );
    const [saved, setSaved] = useState(false);

    const { data: currentUser, isPending: isSaveStatusLoading } =
        useGetCurrentUser();

    const { mutateAsync: likePost } = useLikePost();
    const { mutateAsync: savePost } = useSavePost();
    const { mutateAsync: unSavePost } = useUnsavePost();

    //console.log(currentUser);

    // const checkIsSaved = () => {
    //     if (
    //         post.save.find(
    //             (e: { user: { $id: string } }) => e.user.$id === userId
    //         )
    //     ) {
    //         console.log("Saved!");
    //         setSaved(true);
    //         return true;
    //     } else {
    //         console.log("Why this?");
    //         setSaved(false);
    //         return false;
    //     }
    // };

    const savedPost = currentUser?.save.find(
        (saved: Models.Document) => saved.post.$id === post.$id
    );

    useEffect(() => {
        setSaved(savedPost ? true : false);
        console.log(currentUser?.save);
    }, [currentUser]);

    const handleLikeClick = () => {
        try {
            let newLikes = [...likes];
            if (newLikes.find((id: string) => id === userId)) {
                newLikes = newLikes.filter((id: string) => id != userId);
            } else {
                newLikes.push(userId);
            }
            setLikes(newLikes);
            likePost({ postId: post.$id, likesArray: newLikes });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSaveClick = () => {
        // if (post.save.find((user: { $id: string }) => user.$id === userId)) {
        //         //delete saved
        // }
        // else {
        // }
        //savePost(userId, post.$id);
        // console.log(post);
        // if (
        //     post.save.find(
        //         (e: { user: { $id: string } }) => e.user.$id === userId
        //     )
        // ) {
        //     let savedPost = post.save.find(
        //         (e: { user: { $id: string } }) => e.user.$id === userId
        //     );
        //     console.log("Unsaving!");
        //     console.log(savedPost);
        //     setSaved(false);
        //     unSavePost(savedPost.$id);
        // } else {
        //     console.log("Saving!");
        //     setSaved(true);
        //     savePost(userId, post.$id);
        // }
        if (savedPost) {
            setSaved(false);
            console.log(savedPost);
            unSavePost(savedPost.$id);
        } else {
            savePost({ userId: userId, postId: post.$id });
            setSaved(true);
        }
    };

    console.log(isSaveStatusLoading);

    return (
        <div className="flex justify-between m-1">
            <div className="flex flex-row items-center gap-1">
                <button onClick={handleLikeClick}>
                    {likes.find((id: string) => id === userId) ? (
                        <LikedSolid className="h-[30px] w-[30px] md:h-[35px] md:w-[35px] cursor-pointer transition duration-200 hover:scale-110 active:scale-90" />
                    ) : (
                        <LikedOutline className="h-[30px] w-[30px] md:h-[35px] md:w-[35px] cursor-pointer transition duration-200 hover:scale-110 active:scale-90" />
                    )}
                </button>
                <p className="text-xl md:text-2xl">{likes.length}</p>
            </div>
            {isSaveStatusLoading ? (
                <span className="loading loading-bars loading-md"></span>
            ) : (
                <button onClick={handleSaveClick}>
                    {saved ? (
                        <SavedSolid className="h-[30px] w-[30px] md:h-[35px] md:w-[35px] cursor-pointer transition duration-200 hover:scale-110 active:scale-90" />
                    ) : (
                        <SavedOutline className="h-[30px] w-[30px] md:h-[35px] md:w-[35px] cursor-pointer transition duration-200 hover:scale-110 active:scale-90" />
                    )}
                </button>
            )}
        </div>
    );
};

export default LikeSavePost;
