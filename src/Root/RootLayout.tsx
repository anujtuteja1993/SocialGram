import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Bottombar from "../components/Bottombar";
import Topbar from "../components/Topbar";

const RootLayout = () => {
    return (
        <div className="w-full md:flex">
            <Topbar />
            <Sidebar />
            <section className="flex flex-1 h-full w-auto justify-center md:pl-[80px]">
                <Outlet />
            </section>
            <Bottombar />
        </div>
    );
};

export default RootLayout;
