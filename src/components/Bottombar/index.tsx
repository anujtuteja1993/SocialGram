import { HomeIcon as HomeSolid } from "@heroicons/react/20/solid";
import {
    BookmarkIcon as SavedOutline,
    RectangleStackIcon as ExploreOutline,
    SquaresPlusIcon as CreatePostOutline,
    UserGroupIcon as PeopleOutline,
} from "@heroicons/react/24/outline";

const Bottombar = () => {
    return (
        <div className="flex fixed bottom-0 md:hidden">
            <div className="flex flex-row w-screen h-auto justify-around">
                <div>
                    <button className="h-[50px] w-[50px] inline-flex justify-center items-center">
                        <HomeSolid className="h-[30px] w-[30px]" />
                    </button>
                </div>
                <div>
                    <button className="h-[50px] w-[50px] inline-flex justify-center items-center">
                        <PeopleOutline className="h-[30px] w-[30px]" />
                    </button>
                </div>
                <div>
                    <button className="h-[50px] w-[50px] inline-flex justify-center items-center">
                        <ExploreOutline className="h-[30px] w-[30px]" />
                    </button>
                </div>
                <div>
                    <button className="h-[50px] w-[50px] inline-flex justify-center items-center">
                        <SavedOutline className="h-[30px] w-[30px]" />
                    </button>
                </div>
                <div>
                    <button className="h-[50px] w-[50px] inline-flex justify-center items-center">
                        <CreatePostOutline className="h-[30px] w-[30px]" />
                    </button>
                </div>
                <div className="avatar h-[50px] w-[50px] items-center justify-center">
                    <div className="w-8 rounded-full cursor-pointer">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bottombar;
