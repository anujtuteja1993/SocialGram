import logo from "../../assets/logo.png";
import { ArrowLeftStartOnRectangleIcon as LogoutButton } from "@heroicons/react/24/outline";
import { useSignOutAccount } from "../../lib/react-query/queriesAndMutations";
import { useEffect } from "react";

const Topbar = () => {
    const { mutateAsync: signOut, isSuccess } = useSignOutAccount();

    useEffect(() => {
        if (isSuccess) {
            window.location.reload();
        }
    }, [isSuccess]);

    return (
        <div className="flex justify-between w-full fixed top-0 bg-base-100 md:hidden">
            <div className="flex flex-row justify-center items-center ml-1">
                <img src={logo} className="w-12 h-12 inline-block" alt="logo" />
                <h1 className="font-bold text-xl">SocialGram</h1>
            </div>
            <div className="flex items-center mr-1">
                <button
                    onClick={() => signOut()}
                    className="h-[30px] w-[30px] inline-flex justify-center items-center rounded-lg transition hover:scale-110 active:scale-90"
                >
                    <LogoutButton className="h-[30px] w-[30px]" />
                </button>
            </div>
        </div>
    );
};

export default Topbar;
