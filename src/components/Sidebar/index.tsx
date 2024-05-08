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
        <div className="hidden md:flex flex-col w-[80px] h-screen items-center">
            <div className="hidden md:block my-8">
                <button className="h-[50px] w-[50px]">
                    <img src={logo} alt="logo"></img>
                </button>
            </div>
            <div>
                <button className="h-[50px] w-[50px] inline-flex justify-center items-center mt-5">
                    <HomeSolid className="h-[35px] w-[35px]" />
                </button>
            </div>
            <div>
                <button className="h-[50px] w-[50px] inline-flex justify-center items-center mt-5">
                    <PeopleOutline className="h-[35px] w-[35px]" />
                </button>
            </div>
            <div>
                <button className="h-[50px] w-[50px] inline-flex justify-center items-center mt-5">
                    <ExploreOutline className="h-[35px] w-[35px]" />
                </button>
            </div>
            <div>
                <button className="h-[50px] w-[50px] inline-flex justify-center items-center mt-5">
                    <SavedOutline className="h-[35px] w-[35px]" />
                </button>
            </div>
            <div>
                <button className="h-[50px] w-[50px] inline-flex justify-center items-center mt-5">
                    <CreatePostOutline className="h-[35px] w-[35px]" />
                </button>
            </div>
            <div className="avatar">
                <div className="w-10 rounded-full mt-5 cursor-pointer">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </div>
            <div className="fixed bottom-0 mb-5">
                <button className="h-[50px] w-[50px] inline-flex justify-center items-center mt-5">
                    <LogoutButton className="h-[35px] w-[35px]" />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
