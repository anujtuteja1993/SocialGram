import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Bottombar from "../components/Bottombar";

const RootLayout = () => {
    return (
        <div className="w-full md:flex">
            <Sidebar />
            <section className="flex flex-1 h-full w-auto justify-center">
                <Outlet />
            </section>
            <Bottombar />
        </div>
    );
};

export default RootLayout;
