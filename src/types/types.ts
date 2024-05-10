export type NewUser = {
    name: string;
    username: string;
    email: string;
    password: string;
};

export type User = {
    id: string;
    name: string;
    username: string;
    email: string;
    imgUrl: string;
    bio: string;
};

export type UserContextType = {
    user: User;
    isUserAuthenticated: boolean;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    setIsUserAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkCurrentUser: Function;
};

export type NewPost = {
    userId: string;
    file: File[];
    caption: string;
    hashtags: string[];
    location: string;
};
