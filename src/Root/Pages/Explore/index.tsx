import { HiRectangleStack } from "react-icons/hi2";

const Explore = () => {
    return (
        <div className="flex flex-col gap-10 mt-20 items-center">
            <div className="flex gap-1 items-center">
                <HiRectangleStack className="h-[25px] w-[25px] md:h-[30px] md:w-[30px]" />
                <h1 className="text-2xl font-semibold md:text-3xl">Explore</h1>
            </div>
        </div>
    );
};

export default Explore;
