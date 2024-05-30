import { type Models } from "appwrite";
import Carousel from "../Carousel/Index";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LikeSavePost from "../LikeSavePost";
import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/userContext";

type PostCardProps = {
    post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
    const { user } = useUserContext();

    const postAge = (postDate: string) => {
        dayjs.extend(relativeTime);
        return dayjs(postDate).fromNow();
    };

    return (
        <div className="container w-screen rounded-xl border-primary-content md:max-w-xl">
            <div className="flex flex-col m-10">
                <div className="flex flex-row mb-3">
                    <Link
                        to={`/profile/${post.creator.$id}`}
                        className="avatar flex justify-center items-center"
                    >
                        <div className="w-10 rounded-full cursor-pointer md:w-12">
                            <img src={post.creator.imgUrl} />
                        </div>
                    </Link>
                    <div className="flex flex-col">
                        <div className="flex items-center ml-2">
                            <Link
                                to={`/profile/${post.creator.$id}`}
                                className="font-bold text-primary mx-1 text-sm md:text-lg"
                            >
                                {post.creator.username}
                            </Link>
                            <span className="mx-1 font-light text-secondary-content text-sm">
                                &#8226;
                            </span>
                            <p className="mx-1 text-nowrap font-light text-secondary-content text-sm">
                                {postAge(post.$createdAt)}
                            </p>
                        </div>
                        <div className="ml-2 items-center">
                            <span className="mx-1 font-light text-secondary-content text-sm">
                                {post.location}
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-primary font-normal mb-1">
                        {post.caption}
                    </p>
                </div>
                <div className="flex flex-row mb-3 text-secondary-content font-light">
                    {post.hashtags.map((hashtag: string, i: number) => (
                        <p key={i}>{"#" + hashtag} &nbsp;</p>
                    ))}
                </div>
                <Carousel
                    imgUrls={post.imgUrls}
                    blurHashes={post.blurHashes}
                    aspectRatio={post.aspectRatio}
                />
                <LikeSavePost post={post} userId={user.id} />
            </div>
        </div>
    );
};

export default PostCard;
