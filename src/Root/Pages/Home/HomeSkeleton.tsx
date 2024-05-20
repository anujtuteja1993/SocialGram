const HomeSkeleton = () => {
    return (
        <div className="container w-screen rounded-xl md:max-w-xl mb-12">
            <div className="flex flex-col m-10">
                <div className="flex flex-row mb-3">
                    <div className="avatar flex justify-center items-center">
                        <div className="w-10 skeleton rounded-full md:w-12"></div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center ml-2">
                            <div className="skeleton mx-1 h-4 w-20 md:h-5"></div>
                            <div className="mx-1 skeleton h-4 w-20 md:h-5"></div>
                        </div>
                        <div className="skeleton mx-3 items-center h-4 w-20 md:h-5"></div>
                    </div>
                </div>
                <div className="my-1 skeleton h-4 w-20 md:h-5"></div>
                <div className="flex flex-row my-2">
                    <div className="skeleton h-4 w-32 md:h-5"></div>
                </div>
                <div className="w-full skeleton carousel aspect-[4/5] rounded-box mt-1"></div>
            </div>
        </div>
    );
};

export default HomeSkeleton;
