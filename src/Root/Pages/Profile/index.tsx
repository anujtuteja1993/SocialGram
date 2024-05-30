import { useParams } from "react-router-dom";
import { useGetUserById } from "../../../lib/react-query/queriesAndMutations";
import PostGallery from "../../../components/PostGallery";
import { HiSquares2X2 } from "react-icons/hi2";
import ProfileSkeleton from "./ProfileSkeleton";

const Profile = () => {
    const { id } = useParams();
    const { data: user, isFetching: isUserFetching } = useGetUserById(id || "");

    const userPostIds = user?.posts
        .map((post: { $id: string }) => post.$id)
        .reverse();

    return (
        <>
            {isUserFetching ? (
                <ProfileSkeleton />
            ) : (
                <div className="flex flex-col mt-20 gap-20 items-center w-full">
                    <div className="flex flex-row gap-8 md:gap-16">
                        <div className="flex flex-col gap-5">
                            <div className="avatar flex justify-center items-center transition duration-200 hover:scale-110 active:scale-90">
                                <div className="w-32 md:w-40 rounded-full cursor-pointer">
                                    <img src={user?.imgUrl} alt="logo" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 justify-center">
                            <span className="text-lg md:text-2xl font-semibold">
                                {user?.username}
                            </span>
                            <span className="md:text-lg">{user?.name}</span>
                            <span className="md:text-lg">
                                {user?.posts?.length} posts
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-10 w-full items-center">
                        <div className="flex gap-1 items-center">
                            <HiSquares2X2 className="h-[25px] w-[25px] md:h-[30px] md:w-[30px]" />
                            <h1 className="text-2xl font-semibold md:text-3xl">
                                Posts
                            </h1>
                        </div>
                        <PostGallery postIds={userPostIds} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;
