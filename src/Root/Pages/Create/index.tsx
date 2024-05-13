import { SquaresPlusIcon as CreatePostOutline } from "@heroicons/react/24/outline";
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

const Create = () => {
    const [files, setFiles] = useState<File[]>([]);

    const { handleSubmit, register } = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
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

    const onSubmit = async (values: z.infer<typeof PostValidation>) => {
        const newPost = await createNewPost({
            ...values,
            hashtags: splitHashtagsToArray(values.hashtags),
            userId: user.id,
            file: files,
        });
        console.log(files);
        console.log(newPost);
        return newPost;
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
                className="container w-screen mb-5 border-[1px] rounded-xl border-primary-content md:max-w-xl"
            >
                <div className="flex flex-col m-10 gap-3 md:gap-5">
                    <PhotoUploader files={files} setFiles={setFiles} />
                    <textarea
                        className="textarea textarea-bordered textarea-md w-full md:textarea-lg"
                        placeholder="Caption"
                        inputMode="text"
                        {...register("caption")}
                    />
                    <textarea
                        className="textarea textarea-bordered textarea-md w-full md:textarea-lg"
                        placeholder="Tags"
                        inputMode="text"
                        {...register("hashtags")}
                    ></textarea>
                    <input
                        type="text"
                        placeholder="Location"
                        className="input input-bordered input-md w-full md:input-lg"
                        {...register("location")}
                    />
                    <div className="flex flex-row justify-between">
                        <button type="submit" className="btn w-[40%]">
                            Submit
                        </button>
                        <button className="btn w-[40%]">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Create;
