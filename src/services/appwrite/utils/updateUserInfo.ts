import { DATABASE_ID, USER_COLLECTION_ID } from "@/constants/appwrite";
import { databases } from "../client";
import { User } from "@/interfaces";

export const updateUserInfo = async (
  userId: string,
  name: string,
  bio: string
) => {
  return (await databases.updateDocument(
    DATABASE_ID,
    USER_COLLECTION_ID,
    userId,
    {
      full_name: name,
      bio,
    }
  )) as User;
};
