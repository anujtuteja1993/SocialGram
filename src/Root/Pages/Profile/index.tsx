import { useParams } from "react-router-dom";
import { useUserContext } from "../../../contexts/userContext";
import { useGetUserById } from "../../../lib/react-query/queriesAndMutations";
import PostGallery from "../../../components/PostGallery";
import { Squares2X2Icon } from "@heroicons/react/24/solid";

const Profile = () => {
    const { id } = useParams();
    const { data: user, isPending: isUserLoading } = useGetUserById(id || "");
    const { user: currentUser } = useUserContext();
    console.log(currentUser);

    return (
        <div className="flex flex-col mt-20 gap-20">
            {isUserLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="flex flex-row gap-16 justify-center">
                        <div className="flex flex-col gap-5">
                            <div className="avatar flex justify-center items-center transition duration-200 hover:scale-110 active:scale-90">
                                <div className="w-40 rounded-full cursor-pointer">
                                    <img src={user?.imgUrl} alt="logo" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 justify-center">
                            <span className="text-2xl font-semibold">
                                {user?.username}
                            </span>
                            <span className="text-lg">{user?.name}</span>
                            <span className="text-lg">
                                {user?.posts?.length} posts
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-10 items-center">
                        <div className="flex gap-1 items-center">
                            <Squares2X2Icon className="h-[25px] w-[25px] md:h-[30px] md:w-[30px]" />
                            <h1 className="text-2xl font-semibold md:text-3xl">
                                Posts
                            </h1>
                        </div>
                        <PostGallery posts={user?.posts} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Profile;
