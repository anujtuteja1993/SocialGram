import { HiOutlineSquaresPlus as CreatePostOutline } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import PhotoUploader from "../../../components/PhotoUploader";
import { z } from "zod";
// import img from "../../../assets/sideImg.jpg";
// import { fileUpload } from "../../../lib/appwrite/api";
//import { useState } from "react";
import { PostValidation } from "../../../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "../../../contexts/userContext";
import { useState } from "react";
import { useCreateNewPost } from "../../../lib/react-query/queriesAndMutations";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [files, setFiles] = useState<File[]>([]);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            aspectRatio: "4/5",
            file: [],
            caption: "",
            hashtags: "",
            location: "",
        },
    });
    const { user } = useUserContext();
    const { mutateAsync: createNewPost } = useCreateNewPost();

    const splitHashtagsToArray = (hashtags: string) => {
        const hashTagsArray = hashtags.split(" ");
        return hashTagsArray;
    };

    const navigate = useNavigate();

    const onSubmit = async (values: z.infer<typeof PostValidation>) => {
        if (files.length === 0) {
            return;
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
            file: files,
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
        <div className="flex flex-col mt-20 gap-4 items-center">
            <div className="flex gap-1 items-center">
                <CreatePostOutline className="h-[25px] w-[25px] md:h-[30px] md:w-[30px]" />
                <h1 className="text-2xl font-semibold md:text-3xl">
                    Create Post
                </h1>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="container w-screen mb-5 md:border-[1px] rounded-xl border-primary-content md:max-w-xl"
            >
                <div className="flex flex-col m-10 gap-5 md:gap-2">
                    <div className="flex gap-1 items-center">
                        <p>Select the aspect ratio:</p>
                    </div>
                    <PhotoUploader files={files} setFiles={setFiles} />
                    <div className="h-[20px]">
                        {files.length < 1 && (
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
                                    Atleast 1 image is required
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-1 md:gap-2">
                        <textarea
                            className={`textarea textarea-bordered textarea-md w-full md:textarea-lg ${
                                errors.caption ? "textarea-error" : ""
                            }`}
                            placeholder="Caption"
                            inputMode="text"
                            {...register("caption")}
                        />
                        <div className="h-[20px]">
                            {errors.caption && (
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
                                        {errors?.caption?.message}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 md:gap-2">
                        <textarea
                            className={`textarea textarea-bordered textarea-md w-full md:textarea-lg ${
                                errors.hashtags ? "textarea-error" : ""
                            }`}
                            placeholder="Tags (Space separated)"
                            inputMode="text"
                            {...register("hashtags")}
                        />
                        <div className="h-[20px]">
                            {errors.hashtags && (
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
                                        {errors?.hashtags?.message}
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
                                errors.location ? "input-error" : ""
                            }`}
                            {...register("location")}
                        />
                        <div className="h-[20px]">
                            {errors.location && (
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
                                        {errors?.location?.message}
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
        </div>
    );
};

export default Create;
