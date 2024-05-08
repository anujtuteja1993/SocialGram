import { Routes, Route } from "react-router-dom";
import SignIn from "../Auth/Forms/SignIn";
import Home from "../Root/Pages/Home";
import SignUp from "../Auth/Forms/SignUp";
import AuthLayout from "../Auth/AuthLayout";
import RootLayout from "../Root/RootLayout";
import People from "../Root/Pages/People";
import Explore from "../Root/Pages/Explore";
import Saved from "../Root/Pages/Saved";
import Create from "../Root/Pages/Create";
import Profile from "../Root/Pages/Profile";
import PostDetails from "../Root/Pages/PostDetails";

export const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Route>
                <Route element={<RootLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/people" element={<People />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/saved" element={<Saved />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/posts/:id" element={<PostDetails />} />
                </Route>
            </Routes>
        </>
    );
};

export default AppRoutes;
