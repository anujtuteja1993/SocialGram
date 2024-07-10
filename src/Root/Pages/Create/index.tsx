import { HiOutlineSquaresPlus as CreatePostOutline } from "react-icons/hi2";
import PostForm from "../../../components/PostForm";
import CoverScreen from "../../../components/CoverScreen";
import { useState } from "react";

const Create = () => {
    const [isCreating, setIsCreating] = useState<Boolean>(false);

    return (
        <>
            {isCreating && <CoverScreen />}
            <div className="flex flex-col mt-20 gap-4 items-center">
                <div className="flex gap-1 items-center">
                    <CreatePostOutline className="h-[25px] w-[25px] md:h-[30px] md:w-[30px]" />
                    <h1 className="text-2xl font-semibold md:text-3xl">
                        Create Post
                    </h1>
                </div>
                <PostForm mode="Create" setPostingStatus={setIsCreating} />
            </div>
        </>
    );
};

export default Create;
