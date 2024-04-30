import { Outlet, Navigate } from "react-router-dom";
import sideImg from "../assets/sideImg.jpg";

const AuthLayout = () => {
    const isUserAuthenticated = false;

    return (
        <>
            {isUserAuthenticated ? (
                <Navigate to="/" />
            ) : (
                <>
                    <section className="flex flex-1 justify-center items-center flex-col py=10">
                        <Outlet />
                    </section>
                    <img
                        src={sideImg}
                        className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
                        alt="logo"
                    />
                </>
            )}
        </>
    );
};

export default AuthLayout;
