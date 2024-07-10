import { Models } from "appwrite";
import PostCard from "../PostCard";
import { useUserContext } from "../../contexts/userContext";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { CgOptions } from "react-icons/cg";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { SetStateAction, useEffect, useRef } from "react";
import { useDeletePost } from "../../lib/react-query/queriesAndMutations";
import { toast } from "react-toastify";

type PostDetailsModalProps = {
    post?: Models.Document;
    setIsDeleting: React.Dispatch<SetStateAction<Boolean>>;
};

const PostDetailsModal = ({ post, setIsDeleting }: PostDetailsModalProps) => {
    const { user } = useUserContext();

    const { mutateAsync: deletePost } = useDeletePost();

    const deletePostClick = async () => {
        const postToastId = toast.loading("Deleting Post. Please wait!", {
            position: "top-center",
            draggable: true,
            theme: "dark",
            onOpen: () => {
                document.body.style.overflow = "hidden";
                setIsDeleting(true);
            },
            onClose: () => {
                document.body.style.overflow = "scroll";
                setIsDeleting(false);
            },
        });

        if (post) {
            const deletedPost = await deletePost({
                postId: post.$id,
                save: post.save,
                imgIds: post.imgIds,
                userId: user.id,
            });
            if (!deletedPost) {
                toast.update(postToastId, {
                    render: "There was an error deleting the post. Please try again.",
                    type: "error",
                    autoClose: 3000,
                    closeButton: true,
                    isLoading: false,
                });
                return;
            }
        }
        toast.update(postToastId, {
            render: "Post deleted successfully!",
            type: "success",
            autoClose: 3000,
            closeButton: true,
            isLoading: false,
        });
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
                <form method="dialog">
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
                                        // type="button"
                                        onClick={() => deletePostClick()}
                                    >
                                        <HiOutlineTrash />
                                        <span>Delete Post</span>
                                    </button>
                                </li>
                            </ul>
                        </details>
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
