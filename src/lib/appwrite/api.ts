import { NewPost, NewUser } from "../../types/types";
import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases, storage } from "./config";

export const createNewUser = async (user: NewUser) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );

        if (!newAccount) {
            throw Error;
        }

        const avatarUrl = avatars.getInitials(user.name);

        const newAccountDB = await addUsertoDB({
            userId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imgUrl: avatarUrl,
        });

        return newAccountDB;
    } catch (error) {
        return error;
    }
};

export const addUsertoDB = async (user: {
    userId: string;
    name: string;
    email: string;
    username: string;
    imgUrl: URL;
}) => {
    try {
        const newUserDB = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            ID.unique(),
            user
        );
        return newUserDB;
    } catch (error) {
        console.log(error);
    }
};

export const signInAccount = async (user: {
    email: string;
    password: string;
}) => {
    try {
        const session = await account.createEmailPasswordSession(
            user.email,
            user.password
        );
        return session;
    } catch (error) {
        console.log(error);
    }
};

export const getCurrentUser = async () => {
    try {
        const currentUser = await account.get();
        if (!currentUser) {
            throw Error;
        }
        const currentUserDB = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [Query.equal("userId", currentUser.$id)]
        );

        if (!currentUserDB) {
            throw Error;
        }
        return currentUserDB.documents[0];
    } catch (error) {
        console.log(error);
    }
};

export const signOutAccount = async () => {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        console.log(error);
    }
};

export const addPostToDB = async (post: {
    creator: string;
    caption: string;
    hashtags: string[];
    imgUrl: URL;
    imgId: string;
    location: string;
}) => {
    try {
        const newPostDB = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postsCollectionId,
            ID.unique(),
            post
        );
        return newPostDB;
    } catch (error) {
        console.log(error);
    }
};

export const createNewPost = async (post: NewPost) => {
    try {
        const upload = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            post.file[0]
        );
        if (!upload) {
            throw Error;
        }

        const result = storage.getFileView(
            appwriteConfig.storageId,
            upload.$id
        );

        const newPostDB = await addPostToDB({
            creator: post.userId,
            caption: post.caption,
            hashtags: post.hashtags,
            imgUrl: result,
            imgId: upload.$id,
            location: post.location,
        });
        console.log(newPostDB);
        return newPostDB;
    } catch (error) {
        console.log(error);
    }
};
