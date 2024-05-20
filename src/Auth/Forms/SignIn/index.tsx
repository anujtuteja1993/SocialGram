import logo from "../../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SignInValidation } from "../../../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useUserContext } from "../../../contexts/userContext";
import { useSignInAccount } from "../../../lib/react-query/queriesAndMutations";

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof SignInValidation>>({
        resolver: zodResolver(SignInValidation),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { mutateAsync: signInAccount } = useSignInAccount();
    const { checkCurrentUser } = useUserContext();
    const navigate = useNavigate();

    const onSubmit = async (values: z.infer<typeof SignInValidation>) => {
        const session = await signInAccount({
            email: values.email,
            password: values.password,
        });

        const isUserLoggedIn = await checkCurrentUser();
        console.log(isUserLoggedIn);

        if (isUserLoggedIn) {
            console.log("isUserLoggedin Should navigate");
            navigate("/");
        } else {
            toast.error(
                `${session}` ===
                    "AppwriteException: Invalid credentials. Please check the email and password."
                    ? "Invalid credentials. Please check the email and password."
                    : "Error Signing in. Try again in a few minutes.",
                {
                    position: "top-center",
                    draggable: true,
                    theme: "dark",
                }
            );
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[400px] mx-auto w-full p-7 relative"
        >
            <div className="flex-center flex-col mb-4">
                <div className="flex flex-row justify-center items-center py-3">
                    <img
                        src={logo}
                        className="w-16 h-16 inline-block"
                        alt="logo"
                    />
                    <h1 className="font-bold text-2xl">SocialGram</h1>
                </div>
            </div>
            <div className="flex-col max-w-[300px] m-auto">
                <div>
                    <div className="flex flex-col">
                        <label
                            className={
                                errors.email
                                    ? "input input-bordered input-error flex items-center gap-2"
                                    : "input input-bordered flex items-center gap-2"
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4 opacity-70"
                            >
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input
                                {...register("email")}
                                type="text"
                                className="grow"
                                placeholder="Email"
                            />
                        </label>
                        <div className="h-[20px] mt-1">
                            {errors.email && (
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
                                    <p className="text-xs text-red-500 ml-1">
                                        {errors?.email?.message}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col mb-5">
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4 opacity-70"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <input
                                {...register("password")}
                                type="password"
                                className="grow"
                                placeholder="Password"
                            />
                        </label>
                        <div className="h-[20px] mt-1">
                            {errors.password && (
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
                                    <p className="text-xs text-red-500 ml-1">
                                        {errors?.password?.message}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* <div className="h-[20px] mb-3 opacity-0">
                    <div className="flex flex-row justify-center items-center">
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
                        <p className="text-xs text-red-500 ml-1">
                            The username of password is incorrect
                        </p>
                    </div>
                </div> */}
                <button type="submit" className="btn w-full py-4 relative">
                    Login
                </button>
                <p className="text-center mt-4">
                    Don't have an account?
                    <Link
                        className="ml-1 underline text-accent-content"
                        to={"/sign-up"}
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default SignIn;
