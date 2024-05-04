import { NewUser } from "../../types/types";
import { ID } from "appwrite";
import { account } from "./config";

export const createNewUser = async (user: NewUser) => {
    const newAccount = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name
    );
    console.log(newAccount);
};