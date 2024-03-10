import { DATABASE_ID, USER_COLLECTION_ID } from "@/constants/appwrite";
import { databases } from "../client";
import { User } from "@/interfaces";

export const getUserWithId = async (userId: string) =>
  (await databases.getDocument(
    DATABASE_ID,
    USER_COLLECTION_ID,
    userId
  )) as User;
