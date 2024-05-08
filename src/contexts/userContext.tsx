import { createContext, useContext, useEffect, useState } from "react";
import { User, UserContextType } from "../types/types";
import { getCurrentUser } from "../lib/appwrite/api";
import { useNavigate } from "react-router-dom";

export const InitialUser = {
    id: "",
    name: "",
    username: "",
    email: "",
    imgUrl: "",
    bio: "",
};

export const InitialState = {
    user: InitialUser,
    isUserAuthenticated: false,
    setUser: () => {},
    setIsUserAuthenticated: () => {},
    checkCurrentUser: async () => false as boolean,
};

export const UserContext = createContext<UserContextType>(InitialState);

export const UserContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [user, setUser] = useState<User>(InitialUser);
    const [isUserAuthenticated, setIsUserAuthenticated] =
        useState<boolean>(false);
    const navigate = useNavigate();

    const checkCurrentUser = async () => {
        try {
            const currentUser = await getCurrentUser();
            console.log(currentUser);
            if (currentUser) {
                setUser({
                    id: currentUser.$id,
                    name: currentUser.name,
                    username: currentUser.username,
                    email: currentUser.email,
                    imgUrl: currentUser.imgUrl,
                    bio: currentUser.bio,
                });
                setIsUserAuthenticated(true);
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    useEffect(() => {
        if (
            localStorage.getItem("cookieFallback") === "[]" ||
            localStorage.getItem("cookieFallback") === null
        ) {
            navigate("/sign-in");
        }
        checkCurrentUser();
    }, []);

    const value = {
        user,
        setUser,
        isUserAuthenticated,
        setIsUserAuthenticated,
        checkCurrentUser,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

export default UserContextProvider;

export const useUserContext = () => useContext(UserContext);
