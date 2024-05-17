import { Models } from "appwrite";
import { HeartIcon } from "@heroicons/react/24/solid";

const PostGallery = ({ posts }: { posts: Models.Document[] }) => {
    console.log(posts);
    return (
        <div className="w-full grid grid-cols-3 gap-1 items-center px-1 md:px-12 max-w-7xl">
            {posts?.map((post: Models.Document, i: number) => (
                <div key={i} className="relative">
                    <img
                        className="aspect-square object-cover object-center"
                        src={post?.imgUrl}
                    />
                    <div className="absolute top-0 left-0 w-full h-full hover:bg-black/50 text-white cursor-pointer opacity-0 hover:opacity-100 active:bg-black/80 ">
                        <div className="flex flex-row gap-1 justify-center items-center h-full">
                            <HeartIcon className="h-[25px] w-[25px] md:h-[35px] md:w-[35px]" />
                            {!post?.likes?.length ? (
                                <p className="white-space-normal md:text-xl font-bold">
                                    0
                                </p>
                            ) : (
                                <p className="white-space-normal md:text-xl font-bold">
                                    {post?.likes?.length}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostGallery;
