import { HiOutlineSquaresPlus as CreatePostOutline } from "react-icons/hi2";
import {
    TbRectangleVertical as AspectRatioDefaultOutline,
    TbRectangleVerticalFilled as AspectRatioDefaultSolid,
    TbRectangle as AspectRatioVideoOutline,
    TbRectangleFilled as AspectRatioVideoSolid,
    TbSquare as AspectRatioSquareOutline,
    TbSquareFilled as AspectRatioSquareSolid,
} from "react-icons/tb";
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
    const [aspectRatio, setAspectRatio] = useState<string>("4/5");
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
            aspectRatio: aspectRatio,
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
                <div className="flex flex-col m-10 gap-1 md:gap-2">
                    <div className="flex gap-3 md:gap-5 items-center">
                        <p className="text-md md:text-xl">
                            Select the aspect ratio:
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setAspectRatio("4/5");
                            }}
                        >
                            {aspectRatio === "4/5" ? (
                                <AspectRatioDefaultSolid className="h-7 w-7 transition duration-200 hover:scale-110 active:scale-90" />
                            ) : (
                                <AspectRatioDefaultOutline className="h-7 w-7 transition duration-200 hover:scale-110 active:scale-90" />
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setAspectRatio("1/1");
                            }}
                        >
                            {aspectRatio === "1/1" ? (
                                <AspectRatioSquareSolid className="h-7 w-7 transition duration-200 hover:scale-110 active:scale-90" />
                            ) : (
                                <AspectRatioSquareOutline className="h-7 w-7 transition duration-200 hover:scale-110 active:scale-90" />
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setAspectRatio("1.91/1");
                            }}
                        >
                            {aspectRatio === "1.91/1" ? (
                                <AspectRatioVideoSolid className="h-7 w-7 transition duration-200 hover:scale-110 active:scale-90" />
                            ) : (
                                <AspectRatioVideoOutline className="h-7 w-7 transition duration-200 hover:scale-110 active:scale-90" />
                            )}
                        </button>
                    </div>
                    <PhotoUploader
                        files={files}
                        setFiles={setFiles}
                        aspectRatio={aspectRatio}
                    />
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
