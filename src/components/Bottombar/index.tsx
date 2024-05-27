import {
    HiHome as HomeSolid,
    HiBookmark as SavedSolid,
    HiRectangleStack as ExploreSolid,
    HiSquaresPlus as CreatePostSolid,
    HiUserGroup as PeopleSolid,
    HiOutlineHome as HomeOutline,
    HiOutlineBookmark as SavedOutline,
    HiOutlineRectangleStack as ExploreOutline,
    HiOutlineSquaresPlus as CreatePostOutline,
    HiOutlineUserGroup as PeopleOutline,
} from "react-icons/hi2";
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
                    className="flex avatar items-center justify-center"
                    to={`/profile/${user.id}`}
                    //className="avatar h-[50px] w-[50px] items-center justify-center rounded-lg transition hover:scale-110 active:scale-90"
                >
                    <div
                        className={`h-8 w-8 cursor-pointer transition duration-200 hover:scale-110 active:scale-90 rounded-full ${
                            location.pathname.indexOf(`/profile/${user.id}`) ===
                            0
                                ? "ring ring-primary ring-offset-base-100 ring-offset-1"
                                : ""
                        }`}
                    >
                        {/* <div className="w-8 rounded-full cursor-pointer"> */}
                        {!user.imgUrl ? (
                            <div className="skeleton w-8 h-8 rounded-full shrink-0"></div>
                        ) : (
                            <img src={user.imgUrl} alt="logo" />
                        )}
                        {/* </div> */}
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Bottombar;
