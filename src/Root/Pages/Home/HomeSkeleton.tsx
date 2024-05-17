const HomeSkeleton = () => {
    return (
        <div className="container w-screen rounded-xl md:max-w-xl border-2">
            <div className="flex flex-col m-10">
                <div className="flex flex-row mb-3">
                    <div className="avatar flex justify-center items-center">
                        <div className="w-10 skeleton rounded-full md:w-12">
                            {/* <img src={post.creator.imgUrl} /> */}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center ml-2">
                            <div className="skeleton mx-1 md:text-lg"></div>
                            <p className="mx-1 skeleton"></p>
                        </div>
                        <div className="ml-2 items-center">
                            <span className="mx-1 skeleton"></span>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="mb-1 skeleton"></p>
                </div>
                <div className="flex flex-row mb-3">
                    <p className="skeleton"></p>
                </div>
                <div className="w-full skeleton carousel aspect-[4/5] rounded-box"></div>
                {/* <LikeSavePost post={post} userId={user.id} /> */}
            </div>
        </div>
    );
};

export default HomeSkeleton;
