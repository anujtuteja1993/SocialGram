import { Routes, Route } from "react-router-dom";
import SignIn from "../Auth/Forms/SignIn";
import HomePage from "../Root/Pages/HomePage";
import SignUp from "../Auth/Forms/SignUp";
import AuthLayout from "../Auth/AuthLayout";
import RootLayout from "../Root/RootLayout";

export const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-in" element={<SignUp />} />
                </Route>
                <Route element={<RootLayout />}>
                    <Route index element={<HomePage />} />
                </Route>
            </Routes>
        </>
    );
};

export default AppRoutes;
