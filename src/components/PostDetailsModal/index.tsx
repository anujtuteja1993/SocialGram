import { Models } from "appwrite";
import PostCard from "../PostCard";
import { useUserContext } from "../../contexts/userContext";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { CgOptions } from "react-icons/cg";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

type PostDetailsModalProps = {
    post?: Models.Document;
};

const PostDetailsModal = ({ post }: PostDetailsModalProps) => {
    const { user } = useUserContext();

    const deletePost = () => {
        console.log("Deleting Post!");
    };

    const dropdownRef = useRef<any>(null);

    const handleOutsideClick = (e: any) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            dropdownRef.current.removeAttribute("open");
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    });

    return (
        <dialog
            id="postModal"
            className="modal modal-middle bg-base-100 md:bg-base-100/90"
        >
            <div className="flex modal-box bg-base-100 h-full w-full overflow-hidden justify-center">
                {user.id === post?.creator.$id && (
                    <details
                        className="dropdown absolute left-3 top-3"
                        ref={dropdownRef}
                    >
                        <summary className="h-[20px] w-[20px] md:h-[25px] md:w-[25px] marker:content-none cursor-pointer">
                            <CgOptions className="h-full w-full" />
                        </summary>
                        <ul className="dropdown-content z-[999] menu shadow bg-base-100 rounded-box text-lg w-44">
                            <li>
                                <Link to={`/edit-post/${post.$id}`}>
                                    <HiOutlinePencilSquare />
                                    Edit Post
                                </Link>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() => deletePost()}
                                >
                                    <HiOutlineTrash />
                                    <span>Delete Post</span>
                                </button>
                            </li>
                        </ul>
                    </details>
                )}
                <form method="dialog">
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
