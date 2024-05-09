import { SquaresPlusIcon as CreatePostOutline } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import PhotoUploader from "../../../components/PhotoUploader";

const Create = () => {
    const { handleSubmit } = useForm();

    const onSubmit = async () => {
        console.log("Submit pressed");
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
                    <PhotoUploader />
                    <textarea
                        className="textarea textarea-bordered textarea-md w-full md:textarea-lg"
                        placeholder="Caption"
                    ></textarea>
                    <textarea
                        className="textarea textarea-bordered textarea-md w-full md:textarea-lg"
                        placeholder="Tags"
                    ></textarea>
                    <input
                        type="text"
                        placeholder="Location"
                        className="input input-bordered input-md w-full md:input-lg"
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
