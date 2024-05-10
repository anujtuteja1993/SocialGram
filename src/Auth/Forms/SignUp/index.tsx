import logo from "../../../assets/logo.png";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignUpValidation } from "../../../lib/validation";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    useCreateUserAccount,
    useSignInAccount,
} from "../../../lib/react-query/queriesAndMutations";
import { useUserContext } from "../../../contexts/userContext";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof SignUpValidation>>({
        resolver: zodResolver(SignUpValidation),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
        },
    });

    const { mutateAsync: createNewUser } = useCreateUserAccount();
    const { mutateAsync: signInAccount } = useSignInAccount();

    const { checkCurrentUser } = useUserContext();
    const navigate = useNavigate();

    async function onSubmit(values: z.infer<typeof SignUpValidation>) {
        let newAccount: unknown = await createNewUser(values);
        if (
            (newAccount =
                "AppwriteException: A user with the same id, email, or phone already exists in this project.")
        ) {
            toast("User Registeration failed", {
                className: "custom-toast",
                draggable: true,
            });
        }
        const session = await signInAccount({
            email: values.email,
            password: values.password,
        });
        if (!session) {
            toast("Unable to create session", {
                className: "custom-toast",
                draggable: true,
            });
        }
        const isUserLoggedIn = await checkCurrentUser();
        if (isUserLoggedIn) {
            navigate("/");
        } else {
            toast("Sign up failed", {
                className: "custom-toast",
                draggable: true,
            });
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[400px] mx-auto w-full p-7 relative"
        >
            <div className="flex-center flex-col">
                <div className="flex flex-row justify-center items-center py-3">
                    <img
                        src={logo}
                        className="w-16 h-16 inline-block"
                        alt="logo"
                    />
                    <h1 className="font-bold text-2xl">SocialGram</h1>
                </div>
                <div className="flex justify-center">
                    <h2 className="font-medium text-2xl pb-4">
                        Create a new account
                    </h2>
                </div>
            </div>
            <div className="flex-col max-w-[300px] m-auto">
                <div>
                    <div className="flex flex-col mb-1">
                        <label
                            className={
                                errors.name
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
                                <path
                                    d="M13 15C13 16.1046 13 17 9 17C5 17 5 16.1046 5 15C5 13.8954 6.79086 13 9 13C11.2091 13 13 13.8954 13 15Z"
                                    stroke="#1C274C"
                                    strokeWidth="1.5"
                                />
                                <path
                                    d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
                                    stroke="#1C274C"
                                    strokeWidth="1.5"
                                />
                                <path
                                    d="M19 12H15"
                                    stroke="#1C274C"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M19 9H14"
                                    stroke="#1C274C"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M19 15H16"
                                    stroke="#1C274C"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <input
                                {...register("name")}
                                type="text"
                                className="grow"
                                placeholder="Name"
                            />
                        </label>
                        <div className="h-[20px] mt-1">
                            {errors.name && (
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
                                        {errors?.name?.message}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col mb-1">
                        <label
                            className={
                                errors.username
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
                                {...register("username")}
                                type="text"
                                className="grow"
                                placeholder="Username"
                            />
                        </label>
                        <div className="h-[20px] mt-1">
                            {errors.username && (
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
                                        {errors?.username?.message}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col mb-1">
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
                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
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
                        <label
                            className={
                                errors.password
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
                <button type="submit" className="btn w-full py-4 relative">
                    Sign Up
                </button>
                <p className="text-center mt-4">
                    Already registered?
                    <Link
                        className="ml-1 underline text-accent-content"
                        to={"/sign-in"}
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default SignUp;
