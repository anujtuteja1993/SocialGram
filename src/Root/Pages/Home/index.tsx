import { HomeIcon as HomeSolid } from "@heroicons/react/24/solid";
import PostCard from "../../../components/PostCard";
import { useGetRecentPosts } from "../../../lib/react-query/queriesAndMutations";

const Home = () => {
    const { data: posts, isPending: isPostLoading } = useGetRecentPosts();

    return (
        <div className="flex flex-col mt-20 gap-5 items-center">
            <div className="flex gap-1 items-center">
                <HomeSolid className="h-[25px] w-[25px] md:h-[30px] md:w-[30px]" />
                <h1 className="text-2xl font-semibold md:text-3xl">Home</h1>
            </div>
            <>
                {isPostLoading ? (
                    <span className="loading loading-ball loading-md"></span>
                ) : (
                    posts?.documents.map((post, i) => (
                        <PostCard post={post} key={i} />
                    ))
                )}
            </>
        </div>
    );
};

export default Home;
