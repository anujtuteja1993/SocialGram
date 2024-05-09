import {
    HomeIcon as HomeSolid,
    BookmarkIcon as SavedSolid,
    RectangleStackIcon as ExploreSolid,
    SquaresPlusIcon as CreatePostSolid,
    UserGroupIcon as PeopleSolid,
} from "@heroicons/react/20/solid";
import {
    HomeIcon as HomeOutline,
    BookmarkIcon as SavedOutline,
    RectangleStackIcon as ExploreOutline,
    SquaresPlusIcon as CreatePostOutline,
    UserGroupIcon as PeopleOutline,
} from "@heroicons/react/24/outline";
import { useUserContext } from "../../contexts/userContext";
import { Link } from "react-router-dom";

const Bottombar = () => {
    const { user } = useUserContext();
    return (
        <div className="flex fixed bottom-0 bg-base-100 md:hidden">
            <div className="flex flex-row w-screen h-auto justify-around">
                <Link to="/">
                    <button className="h-[50px] w-[50px] inline-flex justify-center items-center rounded-lg transition hover:scale-110 active:scale-90">
                        {location.pathname === "/" ? (
                            <HomeSolid className="h-[30px] w-[30px]" />
                        ) : (
                            <HomeOutline className="h-[30px] w-[30px]" />
                        )}
                    </button>
                </Link>
                <Link to="/people">
                    <button className="h-[50px] w-[50px] inline-flex justify-center items-center rounded-lg transition hover:scale-110 active:scale-90">
                        {location.pathname === "/people" ? (
                            <PeopleSolid className="h-[30px] w-[30px]" />
                        ) : (
                            <PeopleOutline className="h-[30px] w-[30px]" />
                        )}
                    </button>
                </Link>
                <Link to="/explore">
                    <button className="h-[50px] w-[50px] inline-flex justify-center items-center rounded-lg transition hover:scale-110 active:scale-90">
                        {location.pathname === "/explore" ? (
                            <ExploreSolid className="h-[30px] w-[30px]" />
                        ) : (
                            <ExploreOutline className="h-[30px] w-[30px]" />
                        )}
                    </button>
                </Link>
                <Link to="/saved">
                    <button className="h-[50px] w-[50px] inline-flex justify-center items-center rounded-lg transition hover:scale-110 active:scale-90">
                        {location.pathname === "/saved" ? (
                            <SavedSolid className="h-[30px] w-[30px]" />
                        ) : (
                            <SavedOutline className="h-[30px] w-[30px]" />
                        )}
                    </button>
                </Link>
                <Link to="/create">
                    <button className="h-[50px] w-[50px] inline-flex justify-center items-center rounded-lg transition hover:scale-110 active:scale-90">
                        {location.pathname === "/create" ? (
                            <CreatePostSolid className="h-[30px] w-[30px]" />
                        ) : (
                            <CreatePostOutline className="h-[30px] w-[30px]" />
                        )}
                    </button>
                </Link>
                <Link
                    to={`/profile/${user.id}`}
                    className="avatar h-[50px] w-[50px] items-center justify-center rounded-lg transition hover:scale-110 active:scale-90"
                >
                    <div className="w-8 rounded-full cursor-pointer">
                        <img src={user.imgUrl} alt="logo" />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Bottombar;
