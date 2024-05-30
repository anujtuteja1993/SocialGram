// import {
//     TbRectangleVertical as AspectRatioDefaultOutline,
//     TbRectangleVerticalFilled as AspectRatioDefaultSolid,
//     TbRectangle as AspectRatioVideoOutline,
//     TbRectangleFilled as AspectRatioVideoSolid,
//     TbSquare as AspectRatioSquareOutline,
//     TbSquareFilled as AspectRatioSquareSolid,
// } from "react-icons/tb";
import { Controller, useForm } from "react-hook-form";
import PhotoUploader from "../PhotoUploader";
import { z } from "zod";
import { PostValidation } from "../../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "../../contexts/userContext";
import { useState } from "react";
import {
    useCreateNewPost,
    useUpdatePost,
} from "../../lib/react-query/queriesAndMutations";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Models } from "appwrite";
import AspectRatioSelector from "../AspectRatioSelector";

type PostFormProps = {
    post?: Models.Document;
    mode: "Create" | "Edit";
};

const PostForm = ({ post, mode }: PostFormProps) => {
    const [aspectRatio, setAspectRatio] = useState<string>(
        post ? post.aspectRatio : "4/5"
    );

    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            mode: mode,
            aspectRatio: post ? post.aspectRatio : "4/5",
            files: [],
            caption: post ? post.caption : "",
            hashtags: post ? post.hashtags.join(" ") : "",
            location: post ? post.location : "",
        },
    });

    const { user } = useUserContext();
    const { mutateAsync: createNewPost } = useCreateNewPost();
    const { mutateAsync: updatePost } = useUpdatePost();

    const splitHashtagsToArray = (hashtags: string) => {
        const hashTagsArray = hashtags.split(" ");
        return hashTagsArray;
    };

    const navigate = useNavigate();

    const postSubmit = async (values: z.infer<typeof PostValidation>) => {
        if (post && mode === "Edit") {
            const postToastId = toast.loading("Updating Post. Please wait!", {
                position: "top-center",
                draggable: true,
                theme: "dark",
            });
            const updatedPost = await updatePost({
                ...values,
                hashtags: splitHashtagsToArray(values.hashtags),
                postId: post.$id,
                imgIds: post.imgIds,
            });
            toast.update(postToastId, {
                render: "Post updated successfully!",
                type: "success",
                autoClose: 3000,
                closeButton: true,
                isLoading: false,
            });
            navigate(-1);
            return updatedPost;
        }
        const postToastId = toast.loading("Creating Post. Please wait!", {
            position: "top-center",
            draggable: true,
            theme: "dark",
        });
        const newPost = await createNewPost({
            ...values,
            hashtags: splitHashtagsToArray(values.hashtags),
            userId: user.id,
        });
        if (!newPost) {
            toast.update(postToastId, {
                render: "There was an error creating the post. Please try again.",
                type: "error",
                autoClose: 3000,
                closeButton: true,
                isLoading: false,
            });
            return;
        }
        toast.update(postToastId, {
            render: "Post created successfully!",
            type: "success",
            autoClose: 3000,
            closeButton: true,
            isLoading: false,
        });
        navigate("/");
        return newPost;
    };

    const handleCancel = () => {
        window.location.reload();
    };

    return (
        <form
            onSubmit={form.handleSubmit(postSubmit)}
            className="container w-screen mb-5 md:border-[1px] rounded-xl border-primary-content md:max-w-xl"
        >
            <div className="flex flex-col m-10 gap-1 md:gap-2">
                <Controller
                    control={form.control}
                    name="aspectRatio"
                    render={({ field: { onChange } }) => (
                        <AspectRatioSelector
                            aspectRatio={aspectRatio}
                            setAspectRatio={setAspectRatio}
                            onFieldChange={onChange}
                        />
                    )}
                />
                <Controller
                    control={form.control}
                    name="files"
                    render={({ field: { onChange } }) => (
                        <PhotoUploader
                            onFieldChange={onChange}
                            aspectRatio={aspectRatio}
                            imgUrls={post?.imgUrls}
                            blurHashes={post?.blurHashes}
                            errored={form.formState.errors.files ? true : false}
                        />
                    )}
                />
                <div className="h-[20px]">
                    {form.formState.errors.files && (
                        <div className="flex flex-row ml-2 items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current shrink-0 h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    stroke="rgb(239 68 68)"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p className="text-xs md:text-md text-red-500 ml-1">
                                {form.formState.errors.files.message}
                            </p>
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-1 md:gap-2">
                    <textarea
                        className={`textarea textarea-bordered textarea-md w-full md:textarea-lg ${
                            form.formState.errors.caption
                                ? "textarea-error"
                                : ""
                        }`}
                        placeholder="Caption"
                        inputMode="text"
                        {...form.register("caption")}
                    />
                    <div className="h-[20px]">
                        {form.formState.errors.caption && (
                            <div className="flex flex-row ml-2 items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="stroke-current shrink-0 h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        stroke="rgb(239 68 68)"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <p className="text-xs md:text-md text-red-500 ml-1">
                                    {form.formState.errors?.caption?.message}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-1 md:gap-2">
                    <textarea
                        className={`textarea textarea-bordered textarea-md w-full md:textarea-lg ${
                            form.formState.errors.hashtags
                                ? "textarea-error"
                                : ""
                        }`}
                        placeholder="Tags (Space separated)"
                        inputMode="text"
                        {...form.register("hashtags")}
                    />
                    <div className="h-[20px]">
                        {form.formState.errors.hashtags && (
                            <div className="flex flex-row ml-2 items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="stroke-current shrink-0 h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        stroke="rgb(239 68 68)"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <p className="text-xs md:text-md text-red-500 ml-1">
                                    {form.formState.errors?.hashtags?.message}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-1 md:gap-2">
                    <input
                        type="text"
                        placeholder="Location"
                        className={`input input-bordered input-md w-full md:input-lg ${
                            form.formState.errors.location ? "input-error" : ""
                        }`}
                        {...form.register("location")}
                    />
                    <div className="h-[20px]">
                        {form.formState.errors.location && (
                            <div className="flex flex-row ml-2 items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="stroke-current shrink-0 h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        stroke="rgb(239 68 68)"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <p className="text-xs md:text-md text-red-500 ml-1">
                                    {form.formState.errors?.location?.message}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <button type="submit" className="btn w-[40%]">
                        Submit
                    </button>
                    <button
                        type="button"
                        className="btn w-[40%]"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
};

export default PostForm;
