import { HiBookmark } from "react-icons/hi2";
import PostGallery from "../../../components/PostGallery";
import { useGetCurrentUser } from "../../../lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Saved = () => {
    const { data: user } = useGetCurrentUser();

    // console.log(user?.save);

    // const savedPosts = user?.save
    //     .map((saved: { post: Models.Document[] }) => saved.post)
    //     .reverse();

    const savedPostsIds = user?.save
        .map((saved: Models.Document) => saved.post.$id)
        .reverse();

    // console.log(test);
    return (
        <div className="flex flex-col gap-10 mt-20 items-center w-full">
            <div className="flex gap-1 items-center">
                <HiBookmark className="h-[25px] w-[25px] md:h-[30px] md:w-[30px]" />
                <h1 className="text-2xl font-semibold md:text-3xl">Saved</h1>
            </div>
            {!user ? (
                <span className="loading loading-ring loading-lg"></span>
            ) : (
                <PostGallery postIds={savedPostsIds} />
            )}
        </div>
    );
};

export default Saved;
