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
                    <button className="h-[50px] w-[50px] inline-flex justify-center items-center rounded-lg transition duration-200 hover:bg-primary hover:bg-opacity-20 hover:scale-110 active:scale-90">
                        <HomeSolid className="h-[30px] w-[30px]" />
                    </button>
                </div>
                <div>
                    <button className="h-[50px] w-[50px] inline-flex justify-center items-center rounded-lg transition duration-200 hover:bg-primary hover:bg-opacity-20 hover:scale-110 active:scale-90">
                        <PeopleOutline className="h-[30px] w-[30px]" />
                    </button>
                </div>
                <div>
                    <button className="h-[50px] w-[50px] inline-flex justify-center items-center rounded-lg transition duration-200 hover:bg-primary hover:bg-opacity-20 hover:scale-110 active:scale-90">
                        <ExploreOutline className="h-[30px] w-[30px]" />
                    </button>
                </div>
                <div>
                    <button className="h-[50px] w-[50px] inline-flex justify-center items-center rounded-lg transition duration-200 hover:bg-primary hover:bg-opacity-20 hover:scale-110 active:scale-90">
                        <SavedOutline className="h-[30px] w-[30px]" />
                    </button>
                </div>
                <div>
                    <button className="h-[50px] w-[50px] inline-flex justify-center items-center rounded-lg transition duration-200 hover:bg-primary hover:bg-opacity-20 hover:scale-110 active:scale-90">
                        <CreatePostOutline className="h-[30px] w-[30px]" />
                    </button>
                </div>
                <div className="avatar h-[50px] w-[50px] items-center justify-center rounded-lg transition duration-200 hover:bg-primary hover:bg-opacity-20 hover:scale-110 active:scale-90">
                    <div className="w-8 rounded-full cursor-pointer">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bottombar;
