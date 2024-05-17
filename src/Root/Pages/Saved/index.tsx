import { BookmarkIcon } from "@heroicons/react/24/solid";
import PostGallery from "../../../components/PostGallery";
import { useGetCurrentUser } from "../../../lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Saved = () => {
    const { data: user } = useGetCurrentUser();

    const savedPosts = user?.save.map(
        (a: { post: Models.Document[] }) => a.post
    );

    return (
        <div className="flex flex-col gap-10 mt-20 items-center">
            <div className="flex gap-1 items-center">
                <BookmarkIcon className="h-[25px] w-[25px] md:h-[30px] md:w-[30px]" />
                <h1 className="text-2xl font-semibold md:text-3xl">Saved</h1>
            </div>
            {!user ? (
                <span className="loading loading-ball loading-md"></span>
            ) : (
                <PostGallery posts={savedPosts} />
            )}
        </div>
    );
};

export default Saved;
