import { HiOutlinePencilSquare as EditPostOutline } from "react-icons/hi2";
import PostForm from "../../../components/PostForm";
import { useParams } from "react-router-dom";
import { useGetPostById } from "../../../lib/react-query/queriesAndMutations";
import { useState } from "react";
import CoverScreen from "../../../components/CoverScreen";

const EditPost = () => {
    const { postId } = useParams();
    const [isEditing, setIsEditing] = useState<Boolean>(false);

    const { data: post, isLoading: isPostLoading } = useGetPostById(
        postId || ""
    );

    return (
        <>
            {isEditing && <CoverScreen />}
            <div className="flex flex-col mt-20 gap-4 items-center">
                <div className="flex gap-1 items-center">
                    <EditPostOutline className="h-[25px] w-[25px] md:h-[30px] md:w-[30px]" />
                    <h1 className="text-2xl font-semibold md:text-3xl">
                        Edit Post
                    </h1>
                </div>
                {isPostLoading ? (
                    <span className="loading loading-ring loading-lg"></span>
                ) : (
                    <PostForm
                        post={post}
                        mode="Edit"
                        setPostingStatus={setIsEditing}
                    />
                )}
            </div>
        </>
    );
};

export default EditPost;
