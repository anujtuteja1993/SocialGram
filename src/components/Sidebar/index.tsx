import logo from "../../assets/logo.png";
import { HomeIcon as HomeSolid } from "@heroicons/react/20/solid";
import {
    BookmarkIcon as SavedOutline,
    RectangleStackIcon as ExploreOutline,
    SquaresPlusIcon as CreatePostOutline,
    UserGroupIcon as PeopleOutline,
    ArrowLeftStartOnRectangleIcon as LogoutButton,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
    return (
        <div className="hidden md:flex flex-col w-[80px] h-screen items-center fixed left-0">
            <div className="hidden md:block my-8">
                <button className="h-[50px] w-[50px]">
                    <img src={logo} alt="logo"></img>
                </button>
            </div>
            <div className="mt-5">
                <div className="tooltip-right tooltip" data-tip="Home">
                    <button className="h-[50px] w-[50px] inline-flex justify-center items-center rounded-lg transition duration-200 hover:bg-primary hover:bg-opacity-20 hover:scale-110 active:scale-90">
                        <HomeSolid className="h-[35px] w-[35px]" />
                    </button>
                </div>
            </div>
            <div className="mt-5">
                <div className="tooltip-right tooltip" data-tip="People">
                    <button className="h-[50px] w-[50px] inline-flex justify-center items-center rounded-lg transition duration-200 hover:bg-primary hover:bg-opacity-20 hover:scale-110 active:scale-90">
                        <PeopleOutline className="h-[35px] w-[35px]" />
                    </button>
                </div>
            </div>
            <div className="mt-5">
                <div className="tooltip-right tooltip" data-tip="Explore">
                    <button className="h-[50px] w-[50px] inline-flex justify-center items-center rounded-lg transition duration-200 hover:bg-primary hover:bg-opacity-20 hover:scale-110 active:scale-90">
                        <ExploreOutline className="h-[35px] w-[35px]" />
                    </button>
                </div>
            </div>
            <div className="mt-5">
                <div className="tooltip-right tooltip" data-tip="Saved">
                    <button className="h-[50px] w-[50px] inline-flex justify-center items-center rounded-lg transition duration-200 hover:bg-primary hover:bg-opacity-20 hover:scale-110 active:scale-90">
                        <SavedOutline className="h-[35px] w-[35px]" />
                    </button>
                </div>
            </div>
            <div className="mt-5">
                <div className="tooltip-right tooltip" data-tip="Create Post">
                    <button className="h-[50px] w-[50px] inline-flex justify-center items-center rounded-lg transition duration-200 hover:bg-primary hover:bg-opacity-20 hover:scale-110 active:scale-90">
                        <CreatePostOutline className="h-[35px] w-[35px]" />
                    </button>
                </div>
            </div>
            <div className="mt-5 transition duration-200 hover:scale-110 active:scale-90">
                <div className="tooltip-right tooltip" data-tip="View Profile">
                    <div className="avatar flex justify-center items-center">
                        <div className="w-10 rounded-full cursor-pointer">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 mb-5">
                <div className="tooltip-right tooltip" data-tip="Logout">
                    <button className="h-[50px] w-[50px] inline-flex justify-center items-center rounded-lg transition duration-200 hover:bg-primary hover:bg-opacity-20 hover:scale-110 active:scale-90">
                        <LogoutButton className="h-[35px] w-[35px]" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
