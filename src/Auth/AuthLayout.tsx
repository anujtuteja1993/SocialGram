import { Outlet, Navigate } from "react-router-dom";
import sideImg from "../assets/sideImg.jpg";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

const AuthLayout = () => {
    const { isUserAuthenticated } = useContext(UserContext);

    return (
        <>
            {isUserAuthenticated ? (
                <Navigate to="/" />
            ) : (
                <>
                    <section className="flex flex-1 justify-center items-center flex-col">
                        <Outlet />
                    </section>
                    <img
                        src={sideImg}
                        className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
                        alt="sideImg"
                    />
                </>
            )}
        </>
    );
};

export default AuthLayout;
