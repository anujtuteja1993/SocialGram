import { Models } from "appwrite";
import PostCard from "../PostCard";
import { useUserContext } from "../../contexts/userContext";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

type PostDetailsModalProps = {
    post?: Models.Document;
};

const PostDetailsModal = ({ post }: PostDetailsModalProps) => {
    const { user } = useUserContext();

    return (
        <dialog id="postModal" className="modal modal-middle">
            <div className="flex modal-box w-full overflow-hidden justify-center">
                <form method="dialog">
                    {user.id === post?.creator.$id && (
                        <Link
                            to={`/edit-post/${post.$id}`}
                            className="h-[20px] w-[20px] md:h-[25px] md:w-[25px] absolute left-3 top-3"
                        >
                            <HiOutlinePencilSquare className="h-full w-full" />
                        </Link>
                    )}
                    <button className="h-[20px] w-[20px] md:h-[25px] md:w-[25px] btn-circle btn-ghost absolute right-3 top-3">
                        <MdClose className="h-full w-full" />
                    </button>
                </form>
                {post && <PostCard post={post} />}
            </div>
        </dialog>
    );
};

export default PostDetailsModal;
