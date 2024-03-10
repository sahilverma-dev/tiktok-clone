import { DATABASE_ID, USER_COLLECTION_ID } from "@/constants/appwrite";
import { databases } from "../client";
import { User } from "@/interfaces";

export async function getUserById(userId: string) {
  try {
    const user = await databases.getDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      userId
    );

    if (!user) throw Error;

    return user as User;
  } catch (error) {
    console.log(error);
  }
}
