import { Models } from "appwrite";
import { HiHeart, HiSquare2Stack } from "react-icons/hi2";
import { useGetPostsbyIds } from "../../lib/react-query/queriesAndMutations";
import { Blurhash } from "react-blurhash";
import { useState } from "react";
import PostDetailsModal from "../PostDetailsModal";

const PostGallery = ({ postIds }: { postIds: string[] }) => {
    const fetchedPosts = useGetPostsbyIds(postIds);
    const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);
    const [modalPost, setModalPost] = useState<Models.Document | undefined>();

    return (
        <>
            {fetchedPosts.pending ? (
                <span className="loading loading-ring loading-lg"></span>
            ) : (
                <div className="w-full grid grid-cols-3 gap-1 items-center px-1 mb-[50px] md:m-0 md:px-12 max-w-7xl">
                    {fetchedPosts?.data.map(
                        (fetched: Models.Document | undefined, i: number) => (
                            <div
                                key={i}
                                className="relative flex"
                                onClick={() => {
                                    setModalPost(fetched);
                                    const modal: any =
                                        document.getElementById("postModal");
                                    modal?.showModal();
                                }}
                            >
                                <div
                                    className={`aspect-square flex w-full
                                    }`}
                                >
                                    {!isImgLoaded && fetched?.blurHashes[0] && (
                                        <div className="top-0 bottom-0 w-full overflow-clip">
                                            <Blurhash
                                                hash={fetched?.blurHashes[0]}
                                                width="100%"
                                                height="100%"
                                                resolutionX={32}
                                                resolutionY={32}
                                                punch={1}
                                            />
                                        </div>
                                    )}
                                    <img
                                        className={`aspect-square object-cover object-center ${
                                            !isImgLoaded ? "hidden" : ""
                                        }`}
                                        src={fetched?.imgUrls[0]}
                                        onLoad={() => setIsImgLoaded(true)}
                                    />
                                </div>

                                {fetched?.imgUrls.length > 1 && (
                                    <HiSquare2Stack className="absolute top-0 right-0 h-[25px] w-[25px] fill-white m-1 md:m-3 opacity-90" />
                                )}
                                <div className="absolute top-0 left-0 h-full w-full hover:bg-black/50 text-white cursor-pointer opacity-0 hover:opacity-100 active:bg-black/80">
                                    <div className="flex flex-row gap-1 justify-center items-center h-full">
                                        <HiHeart className="h-[25px] w-[25px] md:h-[35px] md:w-[35px]" />
                                        {!fetched?.likes?.length ? (
                                            <p className="white-space-normal md:text-xl font-bold">
                                                0
                                            </p>
                                        ) : (
                                            <p className="white-space-normal md:text-xl font-bold">
                                                {fetched?.likes?.length}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}
            <PostDetailsModal post={modalPost} />
        </>
    );
};

export default PostGallery;
