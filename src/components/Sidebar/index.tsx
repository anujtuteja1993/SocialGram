import logo from "../../assets/logo.png";
import {
    HomeIcon as HomeSolid,
    UserGroupIcon as PeopleSolid,
    BookmarkIcon as SavedSolid,
    SquaresPlusIcon as CreatePostSolid,
    RectangleStackIcon as ExploreSolid,
} from "@heroicons/react/24/solid";
import {
    BookmarkIcon as SavedOutline,
    RectangleStackIcon as ExploreOutline,
    SquaresPlusIcon as CreatePostOutline,
    UserGroupIcon as PeopleOutline,
    ArrowLeftStartOnRectangleIcon as LogoutButton,
    HomeIcon as HomeOutline,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useSignOutAccount } from "../../lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "../../contexts/userContext";

const Sidebar = () => {
    const { mutateAsync: signOut, isSuccess } = useSignOutAccount();
    const { user } = useUserContext();

    useEffect(() => {
        if (isSuccess) {
            window.location.reload();
        }
    }, [isSuccess]);

    const location = useLocation();

    return (
        <div className="hidden md:flex flex-col w-[80px] h-screen items-center fixed left-0">
            <Link className="hidden md:block my-8" to={"/"}>
                <button className="h-[50px] w-[50px]">
                    <img src={logo} alt="logo"></img>
                </button>
            </Link>
            <Link to="/" className="mt-5">
                <div className="tooltip-right tooltip" data-tip="Home">
                    <button className="h-[50px] w-[50px] inline-flex justify-center items-center rounded-lg transition duration-200 hover:bg-primary hover:bg-opacity-20 hover:scale-110 active:scale-90">
                        {location.pathname === "/" ? (
                            <HomeSolid className="h-[35px] w-[35px]" />
                        ) : (
                            <HomeOutline className="h-[35px] w-[35px]" />
                        )}
                    </button>
                </div>
            </Link>
            <Link to="/people" className="mt-5">
                <div className="tooltip-right tooltip" data-tip="People">
                    <button className="h-[50px] w-[50px] inline-flex justify-center items-center rounded-lg transition duration-200 hover:bg-primary hover:bg-opacity-20 hover:scale-110 active:scale-90">
                        {location.pathname === "/people" ? (
                            <PeopleSolid className="h-[35px] w-[35px]" />
                        ) : (
                            <PeopleOutline className="h-[35px] w-[35px]" />
                        )}
                    </button>
                </div>
            </Link>
            <Link to="/explore" className="mt-5">
                <div className="tooltip-right tooltip" data-tip="Explore">
                    <button className="h-[50px] w-[50px] inline-flex justify-center items-center rounded-lg transition duration-200 hover:bg-primary hover:bg-opacity-20 hover:scale-110 active:scale-90">
                        {location.pathname === "/explore" ? (
                            <ExploreSolid className="h-[35px] w-[35px]" />
                        ) : (
                            <ExploreOutline className="h-[35px] w-[35px]" />
                        )}
                    </button>
                </div>
            </Link>
            <Link to="/saved" className="mt-5">
                <div className="tooltip-right tooltip" data-tip="Saved">
                    <button className="h-[50px] w-[50px] inline-flex justify-center items-center rounded-lg transition duration-200 hover:bg-primary hover:bg-opacity-20 hover:scale-110 active:scale-90">
                        {location.pathname === "/saved" ? (
                            <SavedSolid className="h-[35px] w-[35px]" />
                        ) : (
                            <SavedOutline className="h-[35px] w-[35px]" />
                        )}
                    </button>
                </div>
            </Link>
            <Link to="/create" className="mt-5">
                <div className="tooltip-right tooltip" data-tip="Create Post">
                    <button className="h-[50px] w-[50px] inline-flex justify-center items-center rounded-lg transition duration-200 hover:bg-primary hover:bg-opacity-20 hover:scale-110 active:scale-90">
                        {location.pathname === "/create" ? (
                            <CreatePostSolid className="h-[35px] w-[35px]" />
                        ) : (
                            <CreatePostOutline className="h-[35px] w-[35px]" />
                        )}
                    </button>
                </div>
            </Link>
            <Link to={`/profile/${user.id}`} className="mt-5">
                <div className="tooltip-right tooltip" data-tip="View Profile">
                    <div
                        className={`avatar flex justify-center items-center transition duration-200 hover:scale-110 active:scale-90 rounded-full ${
                            location.pathname.indexOf(`/profile/${user.id}`) ===
                            0
                                ? "ring ring-primary ring-offset-base-100 ring-offset-2 "
                                : ""
                        }`}
                    >
                        <div className="w-10 rounded-full cursor-pointer">
                            <img src={user.imgUrl} alt="logo" />
                        </div>
                    </div>
                </div>
            </Link>
            <div className="fixed bottom-0 mb-5">
                <div className="tooltip-right tooltip" data-tip="Logout">
                    <button
                        onClick={() => signOut()}
                        className="h-[50px] w-[50px] inline-flex justify-center items-center rounded-lg transition duration-200 hover:bg-primary hover:bg-opacity-20 hover:scale-110 active:scale-90"
                    >
                        <LogoutButton className="h-[35px] w-[35px]" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
