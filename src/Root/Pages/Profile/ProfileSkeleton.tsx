import { HiSquares2X2 } from "react-icons/hi2";

const ProfileSkeleton = () => {
    return (
        <div className="flex flex-col mt-20 gap-20 items-center">
            <div className="flex flex-row gap-8 md:gap-16">
                <div className="flex flex-col gap-5 md:ml-5">
                    <div className="avatar flex">
                        <div className="skeleton w-32 md:w-40 rounded-full"></div>
                    </div>
                </div>
                <div className="flex flex-col gap-5 justify-center">
                    <div className="skeleton h-4 w-32 md:h-6 md:w-48"></div>
                    <div className="skeleton h-4 w-20 md:h-3 md:w-28"></div>
                    <div className="skeleton h-4 w-10 md:h-3 md:w-20"></div>
                </div>
            </div>
            <div className="flex flex-col gap-10">
                <div className="flex gap-1 items-center">
                    <HiSquares2X2 className="h-[25px] w-[25px] md:h-[30px] md:w-[30px]" />
                    <h1 className="text-2xl font-semibold md:text-3xl">
                        Posts
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default ProfileSkeleton;
