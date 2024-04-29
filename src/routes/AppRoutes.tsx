import { Routes, Route } from "react-router-dom";
import SignIn from "../components/SignIn";
import HomePage from "../components/HomePage";

export const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route index element={<HomePage />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
