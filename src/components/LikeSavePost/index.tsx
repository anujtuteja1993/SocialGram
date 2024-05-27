import {
    HiBookmark as SavedSolid,
    HiHeart as LikedSolid,
    HiOutlineBookmark as SavedOutline,
    HiOutlineHeart as LikedOutline,
} from "react-icons/hi2";

import { Models } from "appwrite";
import { useEffect, useState } from "react";
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

    const { data: currentUser } = useGetCurrentUser();

    const { mutateAsync: likePost } = useLikePost();
    const { mutateAsync: savePost, isPending: isSavingPost } = useSavePost();
    const { mutateAsync: unSavePost, isPending: isUnsavingPost } =
        useUnsavePost();

    const savedPost = currentUser?.save.find(
        (saved: Models.Document) => saved.post.$id === post.$id
    );

    useEffect(() => {
        setSaved(savedPost ? true : false);
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
        if (savedPost) {
            setSaved(false);
            console.log(savedPost);
            unSavePost(savedPost.$id);
        } else {
            savePost({ userId: userId, postId: post.$id });
            setSaved(true);
        }
    };

    return (
        <div className="flex justify-between m-2">
            <div className="flex flex-row items-center gap-1">
                <button onClick={handleLikeClick}>
                    {likes.find((id: string) => id === userId) ? (
                        <LikedSolid className="h-[30px] w-[30px] md:h-[35px] md:w-[35px] cursor-pointer transition duration-200 hover:scale-110 active:scale-90 fill-red-500" />
                    ) : (
                        <LikedOutline className="h-[30px] w-[30px] md:h-[35px] md:w-[35px] cursor-pointer transition duration-200 hover:scale-110 active:scale-90" />
                    )}
                </button>
                <p className="text-xl md:text-2xl">{likes.length}</p>
            </div>
            <div className="flex justify-center h-[30px] w-[30px] md:h-[35px] md:w-[35px]">
                {isSavingPost || isUnsavingPost ? (
                    <span className="loading loading-bars"></span>
                ) : (
                    <button onClick={handleSaveClick}>
                        {saved ? (
                            <SavedSolid className="h-full w-full cursor-pointer transition duration-200 hover:scale-110 active:scale-90" />
                        ) : (
                            <SavedOutline className="h-full w-full cursor-pointer transition duration-200 hover:scale-110 active:scale-90" />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default LikeSavePost;
