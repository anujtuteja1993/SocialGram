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
        console.log(newAccount);
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
        //console.log(newAccountDB);
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
        return error;
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
    imgUrls: URL[];
    imgIds: string[];
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
        const imgViews: URL[] = [];
        const imgIds: string[] = [];

        for (let i = 0; i < post.file.length; i++) {
            const upload = await storage.createFile(
                appwriteConfig.storageId,
                ID.unique(),
                post.file[i]
            );

            if (!upload) {
                throw Error;
            }

            const imgView = storage.getFilePreview(
                appwriteConfig.storageId,
                upload.$id,
                0,
                0,
                undefined,
                40
            );

            if (!imgView) {
                try {
                    await storage.deleteFile(
                        appwriteConfig.storageId,
                        upload.$id
                    );
                    return true;
                } catch (error) {
                    console.log(error);
                }
                throw Error;
            }

            imgViews.push(imgView);
            imgIds.push(upload.$id);
        }

        const newPostDB = await addPostToDB({
            creator: post.userId,
            caption: post.caption,
            hashtags: post.hashtags,
            imgUrls: imgViews,
            imgIds: imgIds,
            location: post.location,
        });

        if (!newPostDB) {
            for (let i = 0; i < imgIds.length; i++) {
                await storage.deleteFile(appwriteConfig.storageId, imgIds[i]);
            }
        }
        return newPostDB;
    } catch (error) {
        console.log(error);
    }
};

export const getRecentPosts = async () => {
    try {
        const recentPosts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postsCollectionId,
            [Query.orderDesc("$createdAt"), Query.limit(10)]
        );
        return recentPosts;
    } catch (error) {
        console.log(error);
    }
};

export const getUserById = async (userId: string) => {
    try {
        const user = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [Query.equal("$id", userId)]
        );
        return user.documents[0];
    } catch (error) {
        console.log(error);
    }
};

export const likePost = async (postId: string, likesArray: string[]) => {
    try {
        const like = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postsCollectionId,
            postId,
            { likes: likesArray }
        );

        console.log(like);
        return like;
    } catch (error) {
        console.log(error);
    }
};

export const savePost = async (userId: string, postId: string) => {
    try {
        const save = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            ID.unique(),
            {
                user: userId,
                post: postId,
            }
        );

        console.log(save);
        return save;
    } catch (error) {
        console.log(error);
    }
};

export const unSavePost = async (saveId: string) => {
    try {
        const save = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            saveId
        );

        console.log(save);
        return save;
    } catch (error) {
        console.log(error);
    }
};

export const getPostById = async (postId: string) => {
    try {
        const post = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postsCollectionId,
            [Query.equal("$id", postId)]
        );

        return post.documents[0];
    } catch (error) {
        console.log(error);
    }
};
